function showTab(tabName) {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => {
        content.style.display = 'none';
    });
    
    const activeTab = document.getElementById(tabName);
    activeTab.style.display = 'block';
}

function confirmAction(actionType) {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    
    if (actionType === 'lawsuit') {
        modalText.innerText = 'Are you sure you want to file a lawsuit?';
    } else if (actionType === 'spy') {
        modalText.innerText = 'Are you sure you want to send a spy?';
    }
    
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

function confirmModal() {
    // Add logic for confirming the action
    closeModal();
}
