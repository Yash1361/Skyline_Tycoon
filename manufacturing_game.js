document.addEventListener('DOMContentLoaded', () => {
    let currentMoney = 200000;
    let earningsPerMin = 0;
    const moneyDisplay = document.getElementById('current-money');
    const earningsDisplay = document.getElementById('earnings-per-min');

    function updateMoney(amount) {
        currentMoney += amount;
        moneyDisplay.textContent = `Money: $${currentMoney.toLocaleString()}`;
    }

    function updateEarnings(amount) {
        earningsPerMin += amount;
        earningsDisplay.textContent = `Earnings/Min: $${earningsPerMin.toLocaleString()}`;
    }

    // Function to unlock an investment
    function unlockInvestment(investment) {
        const investmentType = investment.dataset.investment;
        const unlockButton = investment.querySelector('.unlock-btn');
        const cost = parseInt(unlockButton.dataset.cost);

        if (currentMoney >= cost) {
            updateMoney(-cost);
            investment.classList.remove('locked');

            // After unlocking, replace unlock button with buy button
            const buyButtonHTML = `
                <button class="buy-btn" data-cost="${cost * 10}">Buy x1</button>
                <p class="cost">${(cost * 10).toLocaleString()}</p>
            `;
            investment.querySelector('.investment-actions').innerHTML = buyButtonHTML;

            // Add event listener to the new buy button
            const newBuyButton = investment.querySelector('.buy-btn');
            newBuyButton.addEventListener('click', () => handleBuy(investment));
        } else {
            alert('Not enough money to unlock!');
        }
    }

    // Function to handle buying investments
    function handleBuy(investment) {
        const investmentType = investment.dataset.investment;
        const buyButton = investment.querySelector('.buy-btn');
        const costDisplay = investment.querySelector('.cost');
        const quantityDisplay = investment.querySelector('#' + investmentType + '-quantity');
        let ownedQuantity = parseInt(quantityDisplay.textContent);

        const cost = parseInt(buyButton.dataset.cost);
        if (currentMoney >= cost && ownedQuantity < 10) {
            updateMoney(-cost);
            ownedQuantity++;
            quantityDisplay.textContent = ownedQuantity;

            // Update the buy button's cost for the next purchase (e.g., increase by 1.5x)
            const newCost = Math.round(cost * 1.5); 
            buyButton.dataset.cost = newCost;
            costDisplay.textContent = newCost.toLocaleString();

            // Update earnings based on the investment type
            if (investmentType === 'solar') {
                updateEarnings(100);
            } else if (investmentType === 'chips') {
                updateEarnings(10000);
            } else if (investmentType === 'cars') {
                updateEarnings(100000);
            }
        } else if (ownedQuantity >= 10) {
            alert("You've reached the maximum ownership limit for this investment!");
        } else {
            alert('Not enough money to buy!');
        }
    }

    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const investments = document.querySelectorAll('.investment');

    // Event listener for navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.dataset.target;

            navButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(targetTabId).classList.add('active');
        });
    });

    // Event listener for investment buttons (both buy and unlock)
    investments.forEach(investment => {
        const unlockButton = investment.querySelector('.unlock-btn');
        const buyButton = investment.querySelector('.buy-btn');

        if (unlockButton) {
            unlockButton.addEventListener('click', () => unlockInvestment(investment));
        }

        if (buyButton) {
            buyButton.addEventListener('click', () => handleBuy(investment));
        }
    });

    const modal = document.getElementById('modal');

    function openModal(message) {
        document.getElementById('modal-text').textContent = message;
        modal.style.display = 'flex';
    }

    window.openModal = openModal; 

    function closeModal() {
        modal.style.display = 'none';
    }

    window.closeModal = closeModal;

    setInterval(() => {
        updateMoney(earningsPerMin / 60); 
    }, 1000); 
});