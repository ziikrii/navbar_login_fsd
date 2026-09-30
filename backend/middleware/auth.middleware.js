import jwt from "jsonwebtoken";

// Secret key untuk memverifikasi JWT (Sama seperti di controller, di production wajib di file .env)
const JWT_SECRET = "belajar-react-jwt-rahasia";

export const authMiddleware = (req, res, next) => {
  // 1. Mengambil string token dari header request 'Authorization'
  const authHeader = req.headers.authorization;

  // 2. Validasi format: Memastikan header ada dan diawali dengan kata "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Token tidak tersedia atau format salah",
    });
  }

  // 3. Memisahkan kata "Bearer" dengan string token aslinya menggunakan spasi
  const token = authHeader.split(" ")[1];

  try {
    // 4. Memverifikasi keaslian token menggunakan secret key
    const decoded = jwt.verify(token, JWT_SECRET);

    // 5. Menyimpan data hasil dekripsi token (seperti id user) ke dalam properti 'req.user'
    req.user = decoded;

    // 6. Melanjutkan alur eksekusi ke fungsi controller berikutnya
    next();
  } catch (error) {
    // Menolak akses jika token palsu, dimodifikasi, atau masa berlakunya (1 jam) sudah habis
    return res.status(401).json({
      message: "Token tidak valid atau sudah kedaluwarsa",
    });
  }
};
