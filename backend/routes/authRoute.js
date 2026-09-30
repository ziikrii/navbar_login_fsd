import express from "express";
import { login, getMe, register } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

// Membuat instance Router dari Express
const router = express.Router();

// 0. Register
router.post("/register", register);

// 1. Rute Publik (Public Route): Bisa diakses tanpa token/login
router.post("/login", login);

// 2. Rute Terproteksi (Protected Route): Wajib melewati authMiddleware untuk verifikasi token JWT
// Jika token valid, alur akan diteruskan untuk mengeksekusi controller 'getMe'
router.get("/me", authMiddleware, getMe);

// Mengekspor router agar bisa digunakan di index.js
export default router;
