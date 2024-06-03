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

        if (!response.ok) {
            const data = await response.json();
            document.getElementById('signUpError').innerText = data.message || 'Signup failed';
        } else {
            window.location.href = 'tutorial.html';
        }
    } catch (error) {
        document.getElementById('signUpError').innerText = 'An error occurred. Please try again.';
    }
});
