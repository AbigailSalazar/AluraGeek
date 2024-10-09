const urlService = "https://alura-geek-api-theta.vercel.app/";

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

async function editProduct(id, name, price, img) {
  const conexion = await fetch(`${urlService}/${id}`, {
    method: "PUT",
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

async function deleteProduct(id) {
  const response = await fetch(`${urlService}/${id}`, {
    method: "DELETE",
  });

  if (response.status === 404) {
    throw new Error(`Producto con id ${id} no existe`);
  }

  if (!response.ok) {
    const errorMessage = await response.text();
    console.log(errorMessage);
    throw new Error("No se pudo eliminar el producto");
  }

  return true;
}

export const productsAPI = {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
};
