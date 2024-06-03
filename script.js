function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function showSignUpModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('signUpModal').style.display = 'block';
}

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const data = await response.json();
            document.getElementById('loginError').innerText = data.message || 'Login failed';
        } else {
            window.location.href = 'industries.html';
        }
    } catch (error) {
        document.getElementById('loginError').innerText = 'An error occurred. Please try again.';
    }
});

document.getElementById('signUpForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('signUpUsername').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            showOtpModal(email);
        } else {
            document.getElementById('signUpError').innerText = data.message || 'Signup failed';
        }
    } catch (error) {
        document.getElementById('signUpError').innerText = 'An error occurred. Please try again.';
    }
});

function showOtpModal(email) {
    document.getElementById('signUpModal').style.display = 'none';
    document.getElementById('otpModal').style.display = 'block';
    document.getElementById('otpEmail').value = email;
}

document.getElementById('otpForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('otpEmail').value;
    const otp = document.getElementById('otpCode').value;

    try {
        const response = await fetch('/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = 'tutorial.html';
        } else {
            document.getElementById('otpError').innerText = data.message || 'OTP verification failed';
        }
    } catch (error) {
        document.getElementById('otpError').innerText = 'An error occurred. Please try again.';
    }
});
