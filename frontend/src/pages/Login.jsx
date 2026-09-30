import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Menangani perubahan input form secara dinamis
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Menangani pengiriman form (Submit) ke backend via Axios
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const response = await login(form);
      // Menyimpan token JWT yang didapat ke dalam localStorage browser
      localStorage.setItem("token", response.token);

      // Mengarahkan pengguna ke halaman utama (Dashboard)
      navigate("/", { replace: true });
    } catch (error) {
      // Menangkap pesan error dari backend atau menampilkan pesan fallback
      setError(
        error.response?.data?.message ||
          "Login gagal. Periksa kembali data Anda.",
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
            Login
          </h1>

          {/* Menampilkan pesan error jika proses login gagal */}
          {error && (
            <div className="alert alert-error mt-4 shadow-sm text-sm">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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

            {/* Tombol Submit dengan kondisi Loading */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full text-white"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Masuk"
                )}
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm">
            Belum punya akun?{" "}
            <Link to="/register" className="link link-primary">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
