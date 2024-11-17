// Simulated database
const users = [
    { username: 'admin', password: 'admin', balance: 1000 }
];

const transactions = [];

function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', username);
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('welcome-message').innerText = `Welcome, ${username}!`;
    } else {
        document.getElementById('login-error').innerText = 'Invalid credentials.';
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
}

function addUser() {
    const username = prompt('Enter new username:');
    const password = prompt('Enter password:');
    if (username && password) {
        users.push({ username, password, balance: 0 });
        alert('User added successfully.');
    }
}

function deposit() {
    const amount = parseFloat(prompt('Enter amount to deposit:'));
    if (amount > 0) {
        const username = localStorage.getItem('currentUser');
        const user = users.find(u => u.username === username);
        user.balance += amount;
        transactions.push({ username, type: 'deposit', amount });
        alert(`Deposited $${amount}. New Balance: $${user.balance}`);
    } else {
        alert('Invalid amount.');
    }
}

function withdraw() {
    const amount = parseFloat(prompt('Enter amount to withdraw:'));
    if (amount > 0) {
        const username = localStorage.getItem('currentUser');
        const user = users.find(u => u.username === username);
        if (user.balance >= amount) {
            user.balance -= amount;
            transactions.push({ username, type: 'withdraw', amount });
            alert(`Withdrew $${amount}. New Balance: $${user.balance}`);
        } else {
            alert('Insufficient funds.');
        }
    } else {
        alert('Invalid amount.');
    }
}

function transferFunds() {
    const toUser = prompt('Enter username of recipient:');
    const amount = parseFloat(prompt('Enter amount to transfer:'));
    const fromUser = localStorage.getItem('currentUser');
    const sender = users.find(u => u.username === fromUser);
    const receiver = users.find(u => u.username === toUser);

    if (sender && receiver && sender.balance >= amount && amount > 0) {
        sender.balance -= amount;
        receiver.balance += amount;
        transactions.push({ username: fromUser, type: 'transfer', to: toUser, amount });
        alert(`Transferred $${amount} to ${toUser}. Your New Balance: $${sender.balance}`);
    } else {
        alert('Transfer failed.');
    }
}

function checkFraud() {
    const fraudThreshold = 10000;
    const largeTransactions = transactions.filter(t => t.amount > fraudThreshold);
    const output = largeTransactions.length > 0
        ? `Fraud Alerts: ${JSON.stringify(largeTransactions)}`
        : 'No fraud detected.';
    document.getElementById('output').innerText = output;
}

document.getElementById('login-form').addEventListener('submit', login);