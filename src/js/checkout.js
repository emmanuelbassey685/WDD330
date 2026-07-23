import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess(
  "so-cart",
  "#order-summary"
);

checkout.init();

const zip = document.querySelector("#zip");

zip.addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});

const form = document.querySelector("#checkoutForm");

form.addEventListener("submit", async (event) => {

  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  await checkout.checkout(form);

});