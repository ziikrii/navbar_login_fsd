import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Secret key untuk JWT (Pada production, wajib dipindahkan ke file .env)
const JWT_SECRET = "belajar-react-jwt-rahasia";

// ==========================================
// 0. CONTROLLER REGISTER
// ==========================================
export const register = async (req, res) => {
  try {
    // 1. Mengambil data dari body request
    const { nama, email, password } = req.body;

    // 2. Validasi field wajib
    if (!nama || !email || !password) {
      return res.status(400).json({
        message: "Nama, email, dan password wajib diisi",
      });
    }

    // 3. Mengecek apakah email sudah digunakan
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email sudah digunakan",
      });
    }

    // 4. Mengubah password menjadi hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Membuat user baru dan menyimpannya ke database
    const user = await User.create({
      nama,
      email,
      password: hashedPassword,
    });

    // 6. Mengirim response berhasil
    return res.status(201).json({
      message: "Registrasi berhasil",
      data: {
        id: user.id,
        nama: user.nama,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

// ==========================================
// 1. CONTROLLER LOGIN
// ==========================================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input: Memastikan email dan password telah diisi oleh user
    if (!email || !password) {
      return res.status(400).json({
        message: "Email dan password wajib diisi",
      });
    }

    // Mencari user di database berdasarkan email yang diinputkan
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        message: "Email atau password salah",
      });
    }

    // Membandingkan password input (plain text) dengan password di database (hashing bcrypt)
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Email atau password salah",
      });
    }

    // Membuat token JWT yang berisi payload 'id' user dengan masa kedaluwarsa 1 jam
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    // Mengembalikan respons sukses beserta token dan data user (tanpa password)
    return res.status(200).json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

// ==========================================
// 2. CONTROLLER GET ME (AMBIL DATA USER AKTIF)
// ==========================================
export const getMe = async (req, res) => {
  try {
    // Mengambil data user berdasarkan id yang disuntikkan oleh authMiddleware (req.user.id)
    // Menggunakan opsi 'attributes' agar kolom password tidak ikut terambil demi keamanan
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "nama", "email"],
    });

    // Validasi jika user ternyata sudah dihapus atau tidak ditemukan di database
    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    // Mengembalikan data user yang sedang login saat ini
    return res.status(200).json({ data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};
