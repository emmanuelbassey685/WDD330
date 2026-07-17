import ShoppingCart from "./ShoppingCart.mjs";

const cart = new ShoppingCart(
  document.querySelector(".product-list")
);

cart.init();