import { createProductCard } from "./listProducts.js";
import { productsAPI } from "./productsService.js";

const inputName = document.querySelector("[data-name]");
const inputPrice = document.querySelector("[data-price]");
const inputImg = document.querySelector("[data-img]");

const form = document.getElementById("products-add-form");

form.addEventListener("submit", async (e) => {
  await addProduct(e);
});

async function addProduct(e) {
  e.preventDefault();
  try {
    const product = await productsAPI.addProduct(inputName.value, inputPrice.value, inputImg.value);
    if (product) {
      clean();
      createProductCard(product);
    }
  } catch (error) {
    alert(error.message);
  }
}

function clean() {
  inputName.value = "";
  inputImg.value = "";
  inputPrice.value = "";
}
