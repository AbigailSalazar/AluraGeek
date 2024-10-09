const urlService = "http://localhost:3001/productos";

async function getProducts() {
  const conexion = await fetch(urlService);
  const products = await conexion.json();
  return products;
}

async function addProduct(name, price, img) {
  const conexion = await fetch(urlService, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      nombre: name,
      precio: price,
      imagen: img,
    }),
  });

  if (!conexion.ok) {
    const errorMessage = await conexion.text();
    console.log(errorMessage);
    throw new Error("Ha ocurrido un error al enviar el producto");
  }

  const result = await conexion.json();
  return result;
}

export const productsAPI = {
  getProducts,
  addProduct,
};
