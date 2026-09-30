import { Sequelize } from "sequelize";

// Membuat koneksi ke database MySQL menggunakan Sequelize
const db = new Sequelize("react_login", "root", "", {
  host: "localhost", // Alamat server database tempat MySQL berjalan
  dialect: "mysql", // Jenis sistem manajemen database (RDBMS) yang digunakan
  logging: false, // Mematikan log query SQL di terminal agar konsol lebih bersih
});

// Mengekspor instance database agar bisa digunakan di file backend lainnya
export default db;
