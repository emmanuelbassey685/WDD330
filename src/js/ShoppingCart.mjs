import {
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate,
} from "./utils.mjs";

// Template for one cart item
function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">

      <button
        class="remove-item"
        data-id="${item.Id}"
        aria-label="Remove item">
        &times;
      </button>

      <a href="#" class="cart-card__image">
        <img
          src="${item.Image}"
          alt="${item.Name}"
        >
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
  constructor(listElement) {
    this.listElement = listElement;
    this.cartItems = [];
  }

  init() {
    this.cartItems = getLocalStorage("so-cart") || [];

    this.renderCartContents();
  }

  renderCartContents() {
    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      this.cartItems,
      "afterbegin",
      true
    );

    this.calculateTotal();

    this.addRemoveListeners();
  }

  addRemoveListeners() {
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (event) => {
        const id = event.currentTarget.dataset.id;

        this.removeItem(id);
      });
    });
  }

  removeItem(productId) {
    // Remove only one matching product
    const index = this.cartItems.findIndex(
      (item) => item.Id === productId
    );

    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }

    setLocalStorage("so-cart", this.cartItems);

    this.renderCartContents();
  }

  calculateTotal() {
    const totalElement = document.querySelector(".cart-total");

    if (!totalElement) return;

    const total = this.cartItems.reduce(
      (sum, item) => sum + item.FinalPrice,
      0
    );

    totalElement.textContent = `$${total.toFixed(2)}`;
  }
}