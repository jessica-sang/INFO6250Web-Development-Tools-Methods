import { products } from './product.js';
import { addToCart, renderCart, toggleCartVisibility, checkoutCart } from './cart.js';

document.addEventListener('DOMContentLoaded', () => {
    products.forEach(product => {
        document.getElementById('products').innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
    });
});

document.body.addEventListener('click', event => {
    if (event.target.matches('.add-to-cart-btn')) {
        const id = event.target.dataset.id;
        addToCart(id);
    } else if (event.target.matches('#view-cart-btn')) {
        toggleCartVisibility(true);
    } else if (event.target.matches('#hide-cart-btn')) {
        toggleCartVisibility(false);
    } else if (event.target.matches('#checkout-btn')) {
        checkoutCart();
    }
});

document.body.addEventListener('change', event => {
    if (event.target.matches('.cart-item-quantity')) {
        const id = event.target.dataset.id;
        const quantity = parseInt(event.target.value, 10);
        updateQuantity(id, quantity);
    }
});

window.addToCart = addToCart;
window.toggleCartVisibility = toggleCartVisibility;
window.checkoutCart = checkoutCart;
window.updateQuantity = updateQuantity;
