import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Menangani perubahan input
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Menangani submit form
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // Mengirim data register ke backend
      await register(form);

      // Menampilkan pesan berhasil
      setSuccess("Registrasi berhasil. Mengarahkan ke halaman login...");

      // Menunggu sebentar supaya user bisa membaca pesan
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    } catch (error) {
      // Mengambil pesan error dari backend
      setError(
        error.response?.data?.message || "Registrasi gagal. Silakan coba lagi.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-base-200 p-6">
      <div className="card w-full max-w-md bg-base-100 shadow-md">
        <div className="card-body">
          <h1 className="card-title justify-center text-2xl font-bold">
            Register
          </h1>

          {/* Pesan error */}
          {error && (
            <div className="alert alert-error mt-4 shadow-sm text-sm">
              <span>{error}</span>
            </div>
          )}

          {/* Pesan berhasil */}
          {success && (
            <div className="alert alert-success mt-4 shadow-sm text-sm">
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Input Nama */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Nama</span>
              </label>

              <input
                type="text"
                name="nama"
                placeholder="Masukkan nama"
                className="input input-bordered w-full"
                value={form.nama}
                onChange={handleChange}
                required
              />
            </div>

            {/* Input Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>

              <input
                type="email"
                name="email"
                placeholder="contoh@email.com"
                className="input input-bordered w-full"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Input Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>

              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Tombol Register */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full text-white"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Daftar"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
