import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Fungsi untuk menangani proses logout pengguna
  function handleLogout() {
    // 1. Menghapus token autentikasi yang tersimpan di browser
    localStorage.removeItem("token");

    // 2. Mengarahkan paksa pengguna kembali ke halaman login
    // Opsi 'replace: true' digunakan agar user tidak bisa klik tombol 'back' di browser untuk kembali ke halaman sebelumnya
    navigate("/login", { replace: true });
  }

  return (
    <div className="navbar border-b border-base-200 bg-base-100 px-4">
      {/* Bagian Kiri: Logo atau Nama Aplikasi */}
      <div className="flex-1">
        <Link to="/" className="text-lg font-bold text-primary">
          AuthApp
        </Link>
      </div>

      {/* Bagian Kanan: Menu Navigasi & Tombol Aksi */}
      <div className="flex gap-2">
        <Link to="/" className="btn btn-ghost btn-sm">
          Home
        </Link>
        <Link to="/about" className="btn btn-ghost btn-sm">
          About Me
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="btn btn-primary btn-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
