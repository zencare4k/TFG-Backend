import { connectDB } from "../Models/index.js";
import { ObjectId } from "mongodb";
import config from "../../config.js";

export const getUsers = async () => {
  const { dbInstanceUsers } = await connectDB();
  return dbInstanceUsers.collection("users").find().toArray();
};

export const createUser = async (userData) => {
  const { name, email, password, isAdmin, adminPassword } = userData;

  if (isAdmin && adminPassword !== config.adminPassword) {
    throw new Error("Contraseña de administrador incorrecta");
  }

  const { dbInstanceUsers } = await connectDB();
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { name, email, password: hashedPassword, isAdmin: isAdmin || false };

  await dbInstanceUsers.collection("users").insertOne(newUser);
  return newUser;
};

export const updateUser = async (id, userData) => {
  const { dbInstanceUsers } = await connectDB();
  const result = await dbInstanceUsers.collection("users").updateOne(
    { _id: new ObjectId(id) },
    { $set: userData }
  );
  return result.matchedCount;
};

export const deleteUser = async (id) => {
  const { dbInstanceUsers } = await connectDB();
  const result = await dbInstanceUsers.collection("users").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount;
};