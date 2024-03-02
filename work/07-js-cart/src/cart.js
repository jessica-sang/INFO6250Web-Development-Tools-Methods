import { products } from './product.js';

let cart = [];

export const addToCart = (id) => {
    const numericId = parseInt(id, 10);
    const product = products.find(product => product.id === numericId);
    const cartItem = cart.find(item => item.id === numericId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
};

export const renderCart = () => {
    let cartHtml = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            </div>
            <div class="cart-item-price">
                <p>Price: $${item.price}</p>
                <p>Quantity: <input type="number" value="${item.quantity}" data-id="${item.id}" class="cart-item-quantity"></p>
            </div>
        </div>
    `).join('');

    cartHtml += '<button id="checkout-btn">Checkout</button>';
    document.getElementById('cart').innerHTML = cartHtml;
    document.getElementById('view-cart-btn').style.display = 'none';
    document.getElementById('cart').style.display = 'block';
};

export const toggleCartVisibility = (show) => {
    const cart = document.getElementById('cart');
    const viewCartBtn = document.getElementById('view-cart-btn');
    const hideCartBtn = document.getElementById('hide-cart-btn');

    if (show) {
        cart.classList.add('visible');
        cart.style.display = 'block';
        viewCartBtn.style.display = 'none';
        hideCartBtn.style.display = 'block';
    } else {
        cart.classList.remove('visible');
        cart.style.display = 'none';
        viewCartBtn.style.display = 'block';
        hideCartBtn.style.display = 'none';
    }
};

export const checkoutCart = () => {
    cart = [];
    renderCart();
    toggleCartVisibility();
};

window.updateQuantity = (id, quantity) => {
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        cartItem.quantity = quantity;
        renderCart();
    }
};
