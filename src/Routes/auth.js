import { Router } from "express";
import { register, login, getUserById } from "../Controllers/auth.js";
import { authMiddleware } from "../Middleware/auth.js"; // Importar el middleware de autenticación

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *               adminPassword:
 *                 type: string
 *                 description: Contraseña de administrador (requerida si isAdmin es true)
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en la solicitud
 *       403:
 *         description: Contraseña de administrador incorrecta
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/user/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *     security:
 *       - bearerAuth: []
 */
router.get("/user/:id", authMiddleware, getUserById); // Proteger el endpoint con el middleware de autenticación

export default router;