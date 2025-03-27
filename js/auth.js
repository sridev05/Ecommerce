// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('user') !== null;
}

// Update navigation based on auth status
function updateNavigation() {
    const nav = document.querySelector('nav ul');
    if (isLoggedIn()) {
        nav.innerHTML = `
            <li><a href="index.html">Home</a></li>
            <li><a href="shop.html">Shop</a></li>
            <li><a href="cart.html">Cart</a></li>
            <li><a href="profile.html">Profile</a></li>
            <li><a href="index.html" onclick="logout()">Logout</a></li>
        `;
    } else {
        nav.innerHTML = `
            <li><a href="index.html">Home</a></li>
            <li><a href="shop.html">Shop</a></li>
            <li><a href="cart.html">Cart</a></li>
            <li><a href="login.html">Login</a></li>
        `;
    }
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('').value;
    const password = document.getElementById('').value;
    
    // Add your authentication logic here
    // For demo purposes, we'll just store the username
    const userData = {
        username: username,
        email: username + '@example.com',
        joinDate: new Date().toLocaleDateString()
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    window.location.href = 'profile.html';
}

// Handle logout
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Initialize profile page if user is logged in
function initializeProfile() {
    if (window.location.pathname.includes('profile.html')) {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
            window.location.href = 'login.html';
            return;
        }
        
        document.getElementById('user-name').textContent = userData.name;
        document.getElementById('user-email').textContent = userData.email;
        document.getElementById("join-date").textContent = "January 2024";
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
    updateNavigation();
    initializeProfile();
    
    // Add login form handler
    const loginForm = document.querySelector('form');
    if (loginForm && window.location.pathname.includes('login.html')) {
        loginForm.addEventListener('submit', handleLogin);
    }
});