import {
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate,
} from "./utils.mjs";

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <button
        class="remove-item"
        data-id="${item.Id}"
        aria-label="Remove ${item.Name}">
        &times;
      </button>

      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}">
      </a>

      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>

      <p class="cart-card__color">
        ${item.Colors[0].ColorName}
      </p>

      <p class="cart-card__quantity">
        Qty: 1
      </p>

      <p class="cart-card__price">
        $${item.FinalPrice.toFixed(2)}
      </p>
    </li>
  `;
}

export default class ShoppingCart {
  constructor(selector) {
    this.listElement = document.querySelector(selector);
    this.cartItems = [];
  }

  init() {
    this.cartItems = getLocalStorage("so-cart") || [];

    this.renderCart();

    this.calculateTotal();

    this.addRemoveListeners();
  }

  renderCart() {
    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      this.cartItems
    );
  }

  calculateTotal() {
    const total = this.cartItems.reduce(
      (sum, item) => sum + item.FinalPrice,
      0
    );

    document.querySelector(".cart-total").textContent =
      `$${total.toFixed(2)}`;
  }

  addRemoveListeners() {
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", () => {
        this.removeItem(button.dataset.id);
      });
    });
  }

  removeItem(id) {
    this.cartItems = this.cartItems.filter(
      (item) => item.Id !== id
    );

    setLocalStorage("so-cart", this.cartItems);

    this.renderCart();

    this.calculateTotal();

    this.addRemoveListeners();
  }
}