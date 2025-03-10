import { getAllProducts, createProduct, updateProduct, deleteProduct, getProductById } from "../Services/products.js";

export const getAllProductsController = async (req, res) => {
  const products = await getAllProducts();
  res.status(200).json(products);
};

export const createProductController = async (req, res) => {
  await createProduct(req.body);
  res.status(201).json({ message: "Created" });
};

export const updateProductController = async (req, res) => {
  const { id } = req.params;
  const matchedCount = await updateProduct(id, req.body);
  if (matchedCount === 0) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
  res.status(200).json({ message: "Updated" });
};

export const deleteProductController = async (req, res) => {
  const { id } = req.params;
  const deletedCount = await deleteProduct(id);
  if (deletedCount === 0) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
  res.status(200).json({ message: "Deleted" });
};

export const getProductByIdController = async (req, res) => {
  const { id } = req.params;
  const product = await getProductById(id);
  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
  res.status(200).json(product);
};