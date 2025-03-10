import { connectDB } from "../Models/index.js";
import { ObjectId } from "mongodb";

export const getAllProducts = async () => {
  const { dbInstanceProducts } = await connectDB();
  return dbInstanceProducts.collection("products").find().toArray();
};

export const createProduct = async (productData) => {
  const { dbInstanceProducts } = await connectDB();
  await dbInstanceProducts.collection("products").insertOne(productData);
};

export const updateProduct = async (id, productData) => {
  const { dbInstanceProducts } = await connectDB();
  const result = await dbInstanceProducts.collection("products").updateOne(
    { _id: new ObjectId(id) },
    { $set: productData }
  );
  return result.matchedCount;
};

export const deleteProduct = async (id) => {
  const { dbInstanceProducts } = await connectDB();
  const result = await dbInstanceProducts.collection("products").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount;
};

export const getProductById = async (id) => {
  const { dbInstanceProducts } = await connectDB();
  return dbInstanceProducts.collection("products").findOne({ _id: new ObjectId(id) });
};