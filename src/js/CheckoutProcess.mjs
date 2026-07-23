import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

/**
 * Converts a form into a JSON object.
 */
function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

/**
 * Converts cart items into the format expected by the server.
 */
function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.quantity || 1,
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;

    this.list = [];

    this.itemTotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.orderTotal = 0;

    this.services = new ExternalServices();
  }

  init() {
    this.list = getLocalStorage(this.key) || [];

    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce((total, item) => {
      return total + item.FinalPrice * (item.quantity || 1);
    }, 0);

    document.querySelector(
      `${this.outputSelector} #subtotal`
    ).textContent = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;

    const itemCount = this.list.reduce((sum, item) => {
      return sum + (item.quantity || 1);
    }, 0);

    this.shipping =
      itemCount > 0
        ? 10 + (itemCount - 1) * 2
        : 0;

    this.orderTotal =
      this.itemTotal +
      this.tax +
      this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector(
      `${this.outputSelector} #tax`
    ).textContent = `$${this.tax.toFixed(2)}`;

    document.querySelector(
      `${this.outputSelector} #shipping`
    ).textContent = `$${this.shipping.toFixed(2)}`;

    document.querySelector(
      `${this.outputSelector} #orderTotal`
    ).textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {

    try {
        const order = formDataToJSON(form);

        // Add additional properties required by the server
        order.orderDate = new Date().toISOString();
        order.items = packageItems(this.list);
        order.orderTotal = this.orderTotal.toFixed(2);
        order.shipping = this.shipping;
        order.tax = this.tax.toFixed(2);

        const result = await this.services.checkout(order);

        console.log(result);

        // Clear cart
        localStorage.removeItem(this.key);

        alert("🎉 Thank you! Your order has been placed successfully.");

        // Redirect back to the home page
        window.location.href = "../index.html";

    } catch (error) {
        console.error(error);

        alert("Checkout failed. Please verify your information and try again.");
    }
  }
}