import { createProductCard } from "./listProducts.js";
import { productsAPI } from "./productsService.js";

const inputName = document.querySelector("[data-name]");
const inputPrice = document.querySelector("[data-price]");
const inputImg = document.querySelector("[data-img]");

const form = document.getElementById("products-add-form");
const btnClean = document.getElementById("btn-clean");

btnClean.addEventListener("click", () => {
  const form_title = document.getElementById("products-add_title");
  form_title.textContent = "AGREGAR PRODUCTO";
  form.setAttribute("data-id", "");
});

form.addEventListener("submit", async (e) => {
  const id = form.getAttribute("data-id");
  if (id == null || id == "") {
    await addProduct(e);
  } else {
    sendEditProduct(e, id);
  }
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

async function sendEditProduct(e, id) {
  e.preventDefault();
  try {
    const product = await productsAPI.editProduct(id, inputName.value, inputPrice.value, inputImg.value);
    if (product) {
      clean();
      const oldProduct = document.getElementById(product.id);
      oldProduct.remove();
      createProductCard(product);
      form.setAttribute("data-id", "");
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
