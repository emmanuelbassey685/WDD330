import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }
  async init() {
    this.product = await this.dataSource.findProductById(
      this.productId
    );

    this.renderProductDetails();
  }

  renderProductDetails() {
    const product = this.product;

    document.querySelector("title").textContent = product.Name;

    document.querySelector("#product-detail").innerHTML = `
      <section class="product-detail">

        <img
          src="${product.Images.PrimaryLarge}"
          alt="${product.Name}"
        />

        <div class="product-detail__info">

          <h2>${product.Brand.Name}</h2>

          <h1>${product.Name}</h1>

          <p class="product-card__price">
            $${product.FinalPrice}
          </p>

          <p class="product__color">
            ${product.Colors?.[0]?.ColorName ?? ""}
          </p>

          <p class="product__description">
            ${product.DescriptionHtmlSimple}
          </p>

          <button id="addToCart">
            Add to Cart
          </button>

        </div>

      </section>
    `;

    document
      .querySelector("#addToCart")
      .addEventListener("click", () => {
        this.addProductToCart();
      });
  }

    addProductToCart() {
      console.log("Button clicked");
      console.log(this.product);

      const cart = getLocalStorage("so-cart") || [];

      cart.push(this.product);

      setLocalStorage("so-cart", cart);

      console.log(getLocalStorage("so-cart"));
  }
}


// ************* Alternative Display Product Details Method *******************
// function productDetailsTemplate(product) {
//   return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
//     <h2 class="divider">${product.NameWithoutBrand}</h2>
//     <img
//       class="divider"
//       src="${product.Image}"
//       alt="${product.NameWithoutBrand}"
//     />
//     <p class="product-card__price">$${product.FinalPrice}</p>
//     <p class="product__color">${product.Colors[0].ColorName}</p>
//     <p class="product__description">
//     ${product.DescriptionHtmlSimple}
//     </p>
//     <div class="product-detail__add">
//       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//     </div></section>`;
// }