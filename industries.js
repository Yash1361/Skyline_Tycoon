const buttons = document.querySelectorAll('.retro-btn');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const targetModalId = button.getAttribute('data-target');
        const modal = document.getElementById(targetModalId);
        modal.style.display = 'block';
    });
});

closeButtons.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        closeButton.parentElement.parentElement.style.display = 'none';
    });
});

function finalChoice(industry) {
    alert(`You've chosen the ${industry} industry! Prepare for the challenge!`);
    // Add your game logic to proceed based on the industry choice
}