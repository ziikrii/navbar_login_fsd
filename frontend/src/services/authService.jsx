import axios from "axios";

// 1. Membuat instance Axios dengan konfigurasi dasar URL backend
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Fungsi Service untuk mengirim data Login ke backend
export async function login(data) {
  // Melakukan request POST ke http://localhost:3000/api/auth/login
  const response = await api.post("/auth/login", data);
  return response.data;
}

// Fungsi Service untuk mengirim data Register ke backend
export async function register(data) {
  // Mengirim request POST ke http://localhost:3000/api/auth/register
  const response = await api.post("/auth/register", data);

  return response.data;
}

// 3. Fungsi Service untuk mengambil profil data user yang sedang aktif
export async function getMe(token) {
  // Melakukan request GET ke http://localhost:3000/api/auth/me dengan menyertakan token JWT di header
  const response = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
