document.addEventListener('DOMContentLoaded', () => {
    let currentMoney = 200000;
    let earningsPerMin = 0;
    const moneyDisplay = document.getElementById('current-money');
    const earningsDisplay = document.getElementById('earnings-per-min');

    const investmentsData = {
        ai: {
            name: "AI Research",
            icon: "fas fa-robot",
            description: "Innovate the future with AI technology.",
            baseCost: 26000,
            output: 100,
            maxQuantity: 10
        },
        cloud: {
            name: "Cloud Computing",
            icon: "fas fa-cloud",
            description: "Harness the power of cloud infrastructure.",
            unlockCost: 20000,
            baseCost: 1000,
            output: 10000,
            maxQuantity: 10
        },
        blockchain: {
            name: "Blockchain Development",
            icon: "fas fa-link",
            description: "Revolutionize transactions with blockchain.",
            unlockCost: 200000,
            baseCost: 10000,
            output: 100000,
            maxQuantity: 10
        }
    };

    function updateMoney(amount) {
        currentMoney += amount;
        moneyDisplay.textContent = `Money: $${currentMoney.toLocaleString()}`;
    }

    function updateEarnings(amount) {
        earningsPerMin += amount;
        earningsDisplay.textContent = `Earnings/Min: $${earningsPerMin.toLocaleString()}`;
    }

    // Function to create an investment element (modified for new HTML structure)
    function createInvestmentElement(investmentKey, investmentData) {
        const investmentDiv = document.createElement('div');
        investmentDiv.classList.add('investment', investmentKey === 'ai' ? 'active' : 'locked');
        investmentDiv.dataset.investment = investmentKey;

        const isUnlocked = investmentKey === 'ai';

        investmentDiv.innerHTML = `
            <div class="investment-header">
                <i class="${investmentData.icon}"></i>
                <h3>${investmentData.name}</h3>
            </div>
            <p>${investmentData.description}</p>
            <div class="investment-stats">
                ${isUnlocked ? 
                    `<p>Owned: <span id="${investmentKey}-quantity">0</span>/10</p>
                    <p>Output: <span class="output">${investmentData.output}</span> / sec</p>`
                    :
                    `<p>Unlock Cost: <span class="cost">$${investmentData.unlockCost.toLocaleString()}</span></p>`
                }
            </div>
            <div class="investment-actions">
                ${isUnlocked ?
                    `<button class="buy-btn" data-cost="${investmentData.baseCost}">Acquire (1x)</button>
                    <p class="cost">$${investmentData.baseCost.toLocaleString()}</p>`
                    :
                    `<button class="buy-btn unlock-btn" data-cost="${investmentData.unlockCost}">Unlock</button>`
                }
            </div>
        `;

        // Add event listeners after the HTML is set
        const buyButton = investmentDiv.querySelector('.buy-btn');
        buyButton.addEventListener('click', () => handleInvestmentAction(investmentDiv));

        return investmentDiv;
    }

    function unlockInvestment(investment) {
        const investmentType = investment.dataset.investment;
        const investmentData = investmentsData[investmentType];
        const unlockButton = investment.querySelector('.unlock-btn');
        const cost = parseInt(unlockButton.dataset.cost.replace(/,/g, ''), 10);

        if (currentMoney >= cost) {
            updateMoney(-cost);
            investment.classList.remove('locked');

            // After unlocking, replace unlock button with buy button and update stats
            const buyButtonHTML = `
                <button class="buy-btn" data-cost="${investmentData.baseCost}">Buy x1</button>
                <p class="cost">$${investmentData.baseCost.toLocaleString()}</p>
            `;
            const investmentStatsHTML = `
                <p>Owned: <span id="${investmentType}-quantity">0</span>/${investmentData.maxQuantity}</p>
                <p>Output: <span class="output">${investmentData.output}</span> / sec</p>
            `;
            investment.querySelector('.investment-actions').innerHTML = buyButtonHTML;
            investment.querySelector('.investment-stats').innerHTML = investmentStatsHTML;

            // Add event listener to the new buy button
            const newBuyButton = investment.querySelector('.buy-btn');
            newBuyButton.addEventListener('click', () => handleInvestmentAction(investment));
        } else {
            alert("Not enough money to unlock!");
        }
    }

    function buyInvestment(investment) {
        const investmentType = investment.dataset.investment;
        const investmentData = investmentsData[investmentType];
        const buyButton = investment.querySelector('.buy-btn');
        const costDisplay = investment.querySelector('.cost');
        const quantityDisplay = investment.querySelector(`#${investmentType}-quantity`);
        let ownedQuantity = parseInt(quantityDisplay.textContent);

        const cost = parseInt(buyButton.dataset.cost.replace(/,/g, ''), 10); 

        if (currentMoney >= cost && ownedQuantity < investmentData.maxQuantity) {
            updateMoney(-cost);
            ownedQuantity++;
            quantityDisplay.textContent = ownedQuantity;

            // Update the buy button's cost for the next purchase 
            const newCost = Math.round(cost * 1.15); 
            buyButton.dataset.cost = newCost;
            costDisplay.textContent = newCost.toLocaleString();

            updateEarnings(investmentData.output);
        } else if (ownedQuantity >= investmentData.maxQuantity) {
            alert("You've reached the maximum ownership limit for this investment!");
        } else {
            alert("Not enough money to buy!");
        }
    }

    function handleInvestmentAction(investment) {
        if (investment.classList.contains('locked')) {
            unlockInvestment(investment);
        } else {
            buyInvestment(investment);
        }
    }


    const investmentGrid = document.querySelector('.investment-grid');
    for (const investmentKey in investmentsData) {
        const investmentElement = createInvestmentElement(investmentKey, investmentsData[investmentKey]);
        investmentGrid.appendChild(investmentElement);
    }

    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.dataset.target;

            navButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(targetTabId).classList.add('active');
        });
    });


    // Function to handle sabotage actions - To be implemented
    function handleSabotage(action, target) {
        console.log(`You are attempting to ${action} ${target}. This functionality is under construction.`); 
    }

    // Event listener for sabotage buttons - To be implemented
    const sabotageButtons = document.querySelectorAll('.sabotage-btn');
    sabotageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            const target = button.parentElement.parentElement.querySelector('h3').textContent;
            handleSabotage(action, target);
        });
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
