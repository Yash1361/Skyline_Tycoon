let currentMoney = 20000; // Initialize current money

function showTab(tabName) {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => {
        content.style.display = 'none';
    });
    
    const activeTab = document.getElementById(tabName);
    activeTab.style.display = 'block';
}

function updateMoneyDisplay() {
    document.getElementById('current-money').innerText = `Current Money: $${currentMoney}`;
}

function buyInvestment(type, cost) {
    if (currentMoney >= cost) {
        currentMoney -= cost;
        updateMoneyDisplay();

        if (type === 'chips') {
            const chipsDiv = document.getElementById('investment-chips');
            chipsDiv.classList.remove('locked');
            chipsDiv.innerHTML = `
                <div class="investment-icon">
                    <i class="fas fa-microchip"></i>
                </div>
                <div class="investment-info">
                    <p>0/10</p>
                    <div class="earnings">
                        <p>10000 / sec</p>
                        <button class="small-btn">0s</button>
                    </div>
                </div>
                <div class="investment-buy">
                    <button>Buy x25</button>
                    <p>17.606 quadrillion</p>
                </div>
            `;
        } else if (type === 'cars') {
            const carsDiv = document.getElementById('investment-cars');
            carsDiv.classList.remove('locked');
            carsDiv.innerHTML = `
                <div class="investment-icon">
                    <i class="fas fa-car"></i>
                </div>
                <div class="investment-info">
                    <p>0/10</p>
                    <div class="earnings">
                        <p>100000 / sec</p>
                        <button class="small-btn">0s</button>
                    </div>
                </div>
                <div class="investment-buy">
                    <button>Buy x100</button>
                    <p>606.26 quadrillion</p>
                </div>
            `;
        }
    } else {
        alert('Not enough money to make this purchase.');
    }
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

updateMoneyDisplay(); // Initial call to display the current money
