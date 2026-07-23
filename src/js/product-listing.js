import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

document.querySelector(".title").textContent =
  `Top Products: ${
    category
      .replace("-", " ")
      .replace(/\b\w/g, c => c.toUpperCase())
  }`;

const dataSource = new ExternalServices();

const listElement = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, listElement);

productList.init();