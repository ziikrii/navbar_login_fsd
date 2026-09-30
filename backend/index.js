import express from "express";
import cors from "cors";
import db from "./config/database.js";
import authRoute from "./routes/authRoute.js";

const app = express();
const PORT = 3000;

// 1. Middleware CORS: Mengizinkan frontend (misal: React + Vite di port 5173) mengakses API ini
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// 2. Middleware JSON Parser: Membaca data berformat JSON yang dikirim dari frontend (req.body)
app.use(express.json());

// 3. Base Route: Endpoint sederhana untuk mengecek apakah API berjalan
app.get("/", (req, res) => {
  res.json({ message: "API Login JWT aktif" });
});

// 4. Grouping Routes: Mengarahkan semua request bertema autentikasi ke authRoute
// Contoh endpoint akhir: http://localhost:3000/api/auth/login
app.use("/api/auth", authRoute);

// 5. Fungsi Sinkronisasi Database dan Inisialisasi Server
const startServer = async () => {
  try {
    // Menguji apakah koneksi ke MySQL berhasil
    await db.authenticate();
    console.log("Database terkoneksi dengan sukses.");

    // Sinkronisasi model Sequelize dengan tabel di database (membuat tabel jika belum ada)
    await db.sync();

    // Menjalankan server Node.js pada port yang ditentukan
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Gagal menjalankan server:", error);
  }
};

// Menjalankan fungsi server
startServer();
