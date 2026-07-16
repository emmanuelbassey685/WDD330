// src/js/ShoppingCart.mjs

// Helper function to generate the HTML template for a single cart item
function cartItemTemplate(item) {
  return `<li class="cart-card program-card">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key; // The localStorage key (e.g., 'so-cart')
    this.parentSelector = parentSelector; // The DOM element to render into
  }

  init() {
    const cartItems = this.getLocalStorage(this.key) || [];
    this.renderCartContents(cartItems);
  }

  getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  renderCartContents(cartItems) {
    const parentElement = document.querySelector(this.parentSelector);
    
    // Convert the array of items into an HTML string using the template
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    
    // Join the array elements into a single string and insert it into the DOM
    parentElement.innerHTML = htmlItems.join("");
  }
}