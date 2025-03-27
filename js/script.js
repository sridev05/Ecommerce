// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = 0;

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    showNotification(`${productName} added to cart!`);
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    totalPrice = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name}</span>
            <span>₹${item.price.toLocaleString()}</span>
            <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
        `;
        cartItems.appendChild(li);
        totalPrice += item.price;
    });

    const totalElement = document.getElementById('total-price');
    if (totalElement) {
        totalElement.textContent = totalPrice.toLocaleString();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }
    
    window.location.href = 'checkout.html';
}

// User Authentication
function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation - in real app, this would connect to a backend
    if (username && password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        window.location.href = 'account.html';
    } else {
        showNotification('Please enter valid credentials', 'error');
    }
}

function signup(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }

    // Simple validation - in real app, this would connect to a backend
    if (name && email && password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', name);
        window.location.href = 'account.html';
    } else {
        showNotification('Please fill all fields', 'error');
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Product Search and Filter
function searchProducts(query) {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        if (title.includes(query.toLowerCase())) {
            product.style.display = 'inline-block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    
    // Add event listeners for forms
    const loginForm = document.querySelector('form[action="#"]');
    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }

    const signupForm = document.querySelector('.signup-container form');
    if (signupForm) {
        signupForm.addEventListener('submit', signup);
    }

    // Check authentication status
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loginLink = document.querySelector('a[href="login.html"]');
    if (loginLink && isLoggedIn) {
        loginLink.href = 'account.html';
        loginLink.textContent = 'My Account';
    }
});
