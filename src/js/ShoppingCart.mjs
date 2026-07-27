import {
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate,
} from "./utils.mjs";

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">

      <a href="#" class="cart-card__image">
        <img src="${item.Images.PrimaryMedium}" alt="${item.Name}">
      </a>

      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>

      <p class="cart-card__color">${item.Colors[0].ColorName}</p>

      <div class="cart-card__quantity">
        <label>Qty:</label>

        <input
          type="number"
          class="cart-qty"
          data-id="${item.Id}"
          min="1"
          value="${item.quantity || 1}"
        />
      </div>

      <p class="cart-card__price">
        $${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}
      </p>

      <button
        class="remove-item"
        data-id="${item.Id}">
        Remove
      </button>

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
  }

  renderCart() {
    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      this.cartItems
    );

    this.calculateTotal();
    this.attachQuantityListeners();
    this.attachRemoveListeners();
  }

  calculateTotal() {
    const total = this.cartItems.reduce((sum, item) => {
      return sum + item.FinalPrice * (item.quantity || 1);
    }, 0);

    const totalElement = document.querySelector("#cart-total");

    if (totalElement) {
      totalElement.textContent = `$${total.toFixed(2)}`;
    }
  }

  attachQuantityListeners() {
    document.querySelectorAll(".cart-qty").forEach((input) => {
      input.addEventListener("change", (e) => {
        const id = e.target.dataset.id;
        const quantity = Number(e.target.value);

        this.updateQuantity(id, quantity);
      });
    });
  }

  updateQuantity(id, quantity) {
    const item = this.cartItems.find(
      (item) => String(item.Id) === String(id)
    );

    if (!item) return;

    if (quantity <= 0) {
      this.removeItem(id);
      return;
    }

    item.quantity = quantity;

    setLocalStorage("so-cart", this.cartItems);

    this.renderCart();
  }

  attachRemoveListeners() {
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", () => {
        this.removeItem(button.dataset.id);
      });
    });
  }

  removeItem(id) {
    this.cartItems = this.cartItems.filter(
      (item) => String(item.Id) !== String(id)
    );

    setLocalStorage("so-cart", this.cartItems);

    this.renderCart();
  }
}