import { getUsers, createUser, updateUser, deleteUser } from "../Services/users.js";

export const getUsersController = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json({ results: users });
  } catch (error) {
    res.status(500).json({ error: "Error getting users" });
  }
};

export const createUserController = async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json({ message: "Created", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUserController = async (req, res) => {
  const { id } = req.params;
  try {
    const matchedCount = await updateUser(id, req.body);
    if (matchedCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Updated" });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

export const deleteUserController = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCount = await deleteUser(id);
    if (deletedCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};