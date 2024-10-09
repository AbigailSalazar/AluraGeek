const urlService = "http://localhost:3001/productos";

async function getProducts() {
  const conexion = await fetch(urlService);
  const products = await conexion.json();
  return products;
}

export const productsAPI = {
  getProducts,
};
