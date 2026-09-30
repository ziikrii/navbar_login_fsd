import { DataTypes } from "sequelize";
import db from "../config/database.js";

// Mendefinisikan model 'User' yang merepresentasikan tabel 'users' di database
const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Nilai akan bertambah otomatis secara berurutan
      primaryKey: true, // Menjadikan kolom ini sebagai primary key unik
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false, // Kolom wajib diisi (tidak boleh kosong/null)
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Memastikan tidak ada email yang kembar di database
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users", // Memaksa Sequelize menggunakan nama tabel tepat "users"
    timestamps: true, // Otomatis membuat kolom createdAt & updatedAt (opsional, bawaan Sequelize)
  },
);

// Mengekspor model User agar bisa digunakan pada Controller
export default User;
