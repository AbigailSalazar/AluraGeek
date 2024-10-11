import { createProductCard } from "./listProducts.js";
import { productsAPI } from "./productsService.js";

const message = document.querySelector(".products-add__message");
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
      mostrarMensaje(" ✅ Producto agregado correctamente :)");
      clean();
      createProductCard(product);
    }
  } catch (error) {
    mostrarMensaje(`❌ Error: ${error.message}`);
  }
}

async function sendEditProduct(e, id) {
  e.preventDefault();
  try {
    const product = await productsAPI.editProduct(id, inputName.value, inputPrice.value, inputImg.value);
    if (product) {
      mostrarMensaje(" ✅ Producto editado correctamente :)");
      clean();
      const oldProduct = document.getElementById(product.id);
      oldProduct.remove();
      createProductCard(product);
      form.setAttribute("data-id", "");
    }
  } catch (error) {
    mostrarMensaje(`❌ Error: ${error.message}`);
  }
}

function clean() {
  inputName.value = "";
  inputImg.value = "";
  inputPrice.value = "";
}

function mostrarMensaje(mensaje) {
  message.textContent = mensaje;
  message.classList.add("show");
  setTimeout(() => {
    message.classList.remove("show");
  }, 3000);
}
