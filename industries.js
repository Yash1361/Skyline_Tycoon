const buttons = document.querySelectorAll('.retro-btn');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close');
const initialContainer = document.getElementById('initialContainer');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const targetModalId = button.getAttribute('data-target');
        const modal = document.getElementById(targetModalId);
        modal.style.display = 'block';
        initialContainer.style.display = 'none';
    });
});

// Corrected closeModal function:
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    initialContainer.style.display = 'block'; // Show initial container
}

function finalChoice(industry) {
    alert(`You've chosen the ${industry} industry! Prepare for the challenge!`);
    initialContainer.style.display = 'none'; 

    // ... Your game logic based on the industry choice ... 
}