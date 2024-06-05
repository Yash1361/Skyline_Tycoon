let currentMoney = 20000; // Initialize current money

// Function to show the selected tab
function showTab(tabName) {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => {
        content.style.display = 'none';
    });
    
    const activeTab = document.getElementById(tabName);
    activeTab.style.display = 'block';
}

// Function to update the displayed money
function updateMoneyDisplay() {
    document.getElementById('current-money').innerText = `Current Money: $${currentMoney.toFixed(2)}`;
}

// Function to handle buying investments
function buyInvestment(type, cost) {
    if (currentMoney >= cost) {
        currentMoney -= cost;
        updateMoneyDisplay();

        if (type === 'chips') {
            // Logic for buying chips
            const chipsDiv = document.getElementById('investment-chips');
            chipsDiv.classList.remove('locked');
            chipsDiv.innerHTML = `
                <div class="investment-icon">
                    <i class="fas fa-microchip"></i>
                </div>
                <div class="investment-info">
                    <p>Chips: <span id="chips-quantity">0</span>/10</p>
                    <div class="earnings">
                        <p>10,000 / sec</p>
                        <button class="small-btn">0s</button>
                    </div>
                </div>
                <div class="investment-buy">
                    <button onclick="buyInvestment('more-chips', 17.606)">Buy x25</button>
                    <p>17.606 quadrillion</p>
                </div>
            `;
        } else if (type === 'cars') {
            // Logic for buying cars
            const carsDiv = document.getElementById('investment-cars');
            carsDiv.classList.remove('locked');
            carsDiv.innerHTML = `
                <div class="investment-icon">
                    <i class="fas fa-car"></i>
                </div>
                <div class="investment-info">
                    <p>Electric Cars: <span id="cars-quantity">0</span>/10</p>
                    <div class="earnings">
                        <p>100,000 / sec</p>
                        <button class="small-btn">0s</button>
                    </div>
                </div>
                <div class="investment-buy">
                    <button onclick="buyInvestment('more-cars', 606.26)">Buy x100</button>
                    <p>606.26 quadrillion</p>
                </div>
            `;
        } else if (type === 'solar') {
            // Logic for buying solar panels
            let quantity = parseInt(document.getElementById('solar-quantity').innerText);
            quantity += 100; // Assuming buy x100
            document.getElementById('solar-quantity').innerText = quantity;

            // Further logic for solar panel purchase
        } else if (type === 'more-chips') {
            // Logic for buying more chips
            let quantity = parseInt(document.getElementById('chips-quantity').innerText);
            quantity += 25; // Assuming buy x25
            document.getElementById('chips-quantity').innerText = quantity;

            // Further logic for chips purchase
        } else if (type === 'more-cars') {
            // Logic for buying more cars
            let quantity = parseInt(document.getElementById('cars-quantity').innerText);
            quantity += 100; // Assuming buy x100
            document.getElementById('cars-quantity').innerText = quantity;

            // Further logic for car purchase
        }
    } else {
        alert('Not enough money to make this purchase.');
    }
}

// Function to confirm an action
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

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Function to handle modal confirmation
function confirmModal() {
    // Add logic for confirming the action
    closeModal();
}

updateMoneyDisplay(); // Initial call to display the current money