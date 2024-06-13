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
        moneyDisplay.textContent = `Credits: $${currentMoney.toLocaleString()}`;
    }

    function updateEarnings(amount) {
        earningsPerMin += amount;
        earningsDisplay.textContent = `Credit Flow/s: $${earningsPerMin.toLocaleString()}`;
    }

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

            const buyButtonHTML = `
                <button class="buy-btn" data-cost="${investmentData.baseCost}">Acquire (1x)</button>
                <p class="cost">$${investmentData.baseCost.toLocaleString()}</p>
            `;
            const investmentStatsHTML = `
                <p>Owned: <span id="${investmentType}-quantity">0</span>/${investmentData.maxQuantity}</p>
                <p>Output: <span class="output">${investmentData.output}</span> / sec</p>
            `;
            investment.querySelector('.investment-actions').innerHTML = buyButtonHTML;
            investment.querySelector('.investment-stats').innerHTML = investmentStatsHTML;

            const newBuyButton = investment.querySelector('.buy-btn');
            newBuyButton.addEventListener('click', () => handleInvestmentAction(investment));

            updateEarnings(investmentData.output);
        } else {
            alert("Not enough credits to unlock!");
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

            const newCost = Math.round(cost * 1.15); 
            buyButton.dataset.cost = newCost;
            costDisplay.textContent = `$${newCost.toLocaleString()}`;

            updateEarnings(investmentData.output);
        } else if (ownedQuantity >= investmentData.maxQuantity) {
            alert("You've reached the maximum ownership limit for this investment!");
        } else {
            alert("Not enough credits to acquire!");
        }
    }

    function handleInvestmentAction(investment) {
        if (investment.classList.contains('locked')) {
            unlockInvestment(investment);
        } else {
            buyInvestment(investment);
        }
    }

    function handleLawsuit(targetName) {
        const lawsuitSuccessChance = Math.floor(Math.random() * 100) + 1;
        const penaltyChance = Math.floor(Math.random() * 50) + 1;
        const penaltyAmount = Math.floor(Math.random() * 50000) + 10000;

        const lawsuitMessage = `
            Filing a lawsuit can be a quick way to slow down your competitors while increasing your own wealth. However, if it fails, the consequences can be harsh:
            <br><br>
            - Legal fees and penalties may drain your resources.
            <br>
            - You might lose credibility in the industry.
            <br>
            - Risk of counter-lawsuits and further financial loss.
            <br><br>
            Stats for this lawsuit:
            <br>
            - Chance of Success: ${lawsuitSuccessChance}%
            <br>
            - Chance of Harsh Penalty: ${penaltyChance}%
            <br>
            - Potential Penalty Amount: $${penaltyAmount.toLocaleString()}
        `;

        openModal(lawsuitMessage, () => {
            if (Math.random() * 100 < lawsuitSuccessChance) {
                showSuccessModal(`Lawsuit successful against ${targetName}! You have gained $${penaltyAmount.toLocaleString()}.`);
                updateMoney(penaltyAmount); // Example: Gain the penalty amount on success
            } else {
                showFailureModal(`Lawsuit failed against ${targetName}. You have been penalized $${penaltyAmount.toLocaleString()}.`);
                updateMoney(-penaltyAmount);
            }
        });
    }

    function openModal(message, confirmCallback) {
        document.getElementById('modal-text').innerHTML = message;
        document.getElementById('confirm-modal-btn').onclick = () => {
            confirmCallback();
            closeModal();
        };
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    window.closeModal = closeModal;

    function showSuccessModal(message) {
        document.getElementById('success-modal-text').innerHTML = message;
        document.getElementById('success-modal').style.display = 'flex';
    }

    function closeSuccessModal() {
        document.getElementById('success-modal').style.display = 'none';
    }

    window.closeSuccessModal = closeSuccessModal;

    function showFailureModal(message) {
        document.getElementById('failure-modal-text').innerHTML = message;
        document.getElementById('failure-modal').style.display = 'flex';
    }

    function closeFailureModal() {
        document.getElementById('failure-modal').style.display = 'none';
    }

    window.closeFailureModal = closeFailureModal;

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

    const sabotageButtons = document.querySelectorAll('.sabotage-btn');
    sabotageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            const target = button.parentElement.parentElement.querySelector('h3').textContent;
            if (action === 'lawsuit') {
                handleLawsuit(target);
            } else {
                handleSabotage(action, target);
            }
        });
    });

    const modal = document.getElementById('modal');

    setInterval(() => {
        updateMoney(earningsPerMin / 60);
    }, 1000);
});
