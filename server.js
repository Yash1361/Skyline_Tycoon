require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');
const validator = require('validator');
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(SENDGRID_API_KEY);

// Middleware
app.use(bodyParser.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// MongoDB Connection
mongoose.connect(`${process.env.MONGO_URI}`, { useNewUrlParser: true, useUnifiedTopology: true });

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

// Temporary store for OTPs
const otpStore = {};

// Serve index.html at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Generate and send OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOTPEmail = (email, otp) => {
    const msg = {
        to: email,
        from: 'yashaggarwal3011@gmail.com', // Use the email address or domain you verified with SendGrid
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
        html: `<strong>Your OTP code is ${otp}</strong>`,
    };
    return sgMail.send(msg);
};

// Signup Route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    console.log('Signup request:', req.body);

    // Validate email
    if (!validator.isEmail(email)) {
        console.log('Invalid email');
        return res.status(400).send({ message: 'Invalid email' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        console.log('Username or email already exists');
        return res.status(400).send({ message: 'Username or email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate and send OTP
    const otp = generateOTP();
    otpStore[email] = otp;
    await sendOTPEmail(email, otp);

    res.status(200).send({ message: 'User created successfully, please verify your email', email });
});

// Verify OTP Route
app.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    console.log('OTP verification request:', req.body);

    if (otpStore[email] === otp) {
        const user = await User.findOne({ email });
        if (user) {
            user.isVerified = true;
            await user.save();
            delete otpStore[email];
            return res.status(200).send({ message: 'Email verified successfully' });
        }
    }

    return res.status(400).send({ message: 'Invalid OTP' });
});

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    console.log('Login request:', req.body);

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
        console.log('Invalid username');
        return res.status(400).send({ message: 'Invalid username or password' });
    }

    // Check if user is verified
    if (!user.isVerified) {
        console.log('User not verified');
        return res.status(400).send({ message: 'Please verify your email first' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        console.log('Invalid password');
        return res.status(400).send({ message: 'Invalid username or password' });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).send({ message: 'Login successful', token });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
