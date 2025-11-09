// Cart functionality
let cart = [];
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutPage = document.getElementById('checkoutPage');
const orderItems = document.getElementById('orderItems');
const orderTotal = document.getElementById('orderTotal');
const placeOrderBtn = document.getElementById('placeOrderBtn');
const checkoutForm = document.getElementById('checkoutForm');

// Open cart
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close cart
closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close cart when clicking overlay
overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        const name = e.target.getAttribute('data-name');
        const price = parseInt(e.target.getAttribute('data-price'));
        
        // Check if item already in cart
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                quantity: 1
            });
        }
        
        updateCart();
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Update cart display
function updateCart() {
    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    cartItems.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center">Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="https://via.placeholder.com/80" class="cart-item-img" alt="${item.name}">
                <div class="cart-item-details">
                    <h5 class="cart-item-name">${item.name}</h5>
                    <div class="cart-item-price">₹${item.price}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            cartItems.appendChild(cartItem);
        });
    }
    
    // Update total
    cartTotal.textContent = `₹${total}`;
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const item = cart.find(item => item.id === id);
            
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart = cart.filter(item => item.id !== id);
            }
            
            updateCart();
        });
    });
    
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const item = cart.find(item => item.id === id);
            item.quantity += 1;
            updateCart();
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.closest('.remove-item').getAttribute('data-id');
            cart = cart.filter(item => item.id !== id);
            updateCart();
        });
    });
}

// Proceed to checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty. Add some items to proceed.');
        return;
    }
    
    // Update order summary
    orderItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>₹${itemTotal}</span>
        `;
        
        orderItems.appendChild(orderItem);
    });
    
    orderTotal.textContent = `₹${total}`;
    
    // Show checkout page
    checkoutPage.style.display = 'block';
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Scroll to checkout page
    checkoutPage.scrollIntoView({ behavior: 'smooth' });
});

// Place order
placeOrderBtn.addEventListener('click', () => {
    if (!checkoutForm.checkValidity()) {
        checkoutForm.reportValidity();
        return;
    }
    
    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;
    
    alert(`Thank you, ${name}! Your order has been placed successfully. We'll deliver it to you soon.`);
    
    // Reset cart and form
    cart = [];
    updateCart();
    checkoutForm.reset();
    checkoutPage.style.display = 'none';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// View menu buttons
document.querySelectorAll('.view-menu-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    });
});

// Initialize cart
updateCart();