let balance = 1000; // Mock balance

function checkBalance() {
  document.getElementById('balance-display').innerText = `Your balance is $${balance}`;
}

function sendPayment(event) {
  event.preventDefault();
  const recipient = document.getElementById('recipient').value;
  const amount = parseFloat(document.getElementById('amount').value);
  
  if (amount <= balance) {
    balance -= amount;
    document.getElementById('payment-status').innerText = `Payment of $${amount} sent to ${recipient}. New balance: $${balance}`;
  } else {
    document.getElementById('payment-status').innerText = 'Insufficient funds.';
  }
}

function showInvestmentOpportunities() {
  const opportunities = ['Stock A - High Risk', 'Bond B - Low Risk', 'Real Estate C'];
  const list = document.getElementById('investment-list');
  list.innerHTML = ''; // Clear previous list
  opportunities.forEach(opportunity => {
    const li = document.createElement('li');
    li.textContent = opportunity;
    list.appendChild(li);
  });
}

function simulateFraudDetection() {
  const result = Math.random() > 0.5 ? 'No fraud detected' : 'Fraudulent activity detected!';
  document.getElementById('fraud-result').innerText = result;
}



