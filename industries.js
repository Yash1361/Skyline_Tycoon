function showModal(industry) {
    if (industry === 'tech') {
        document.getElementById('techModal').style.display = 'block';
    } else if (industry === 'manufacturing') {
        document.getElementById('manufacturingModal').style.display = 'block';
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function finalChoice(industry) {
    alert('You have chosen the ' + industry + ' industry!');
    // You can add further logic here if needed
}
