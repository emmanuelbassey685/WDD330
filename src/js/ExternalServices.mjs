const baseURL = import.meta.env.VITE_SERVER_URL;
console.log("baseURL is:", baseURL);
 
 
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}
 
export default class ExternalServices {
  constructor() {
    // this.categorProductData = category;
    // this.path = `/json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
 
    const response = await fetch("https://wdd330-backend.onrender.com/checkout", options);
    return await response.json();
  }
  
  async checkout(order) {
    const response = await fetch(
      `${baseURL}checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Checkout failed");
    }

    return data;
  }
}