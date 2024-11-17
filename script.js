let balance = 2500; // Mock balance

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
  list.innerHTML = ''; 
  opportunities.forEach(opportunity => {
    const li = document.createElement('li');
    li.textContent = opportunity;
    list.appendChild(li);
  });
}

function simulateFraudDetection(transaction) {
  const maxTransactionAmount = 10000; 
  const susHours = [0, 1, 2, 3, 4, 23]; 

  const transactionTime = new Date(transaction.timestamp).getHours();

  if (transaction.amount > maxTransactionAmount) {
    return 'High transaction amount';
  } 
  else if (susHours.includes(transactionTime)) {
    return 'Suspicious transaction time';
  } 
  else {
    return 'No fraud detected';
  }
}
