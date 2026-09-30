import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";

const ProtectedRoute = ({ children }) => {
  // 1. Mengambil token dari localStorage untuk mengecek apakah user sudah login
  const token = localStorage.getItem("token");

  // 2. Jika token tidak ada, arahkan paksa user kembali ke halaman login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 3. Jika token ada, tampilkan Navbar global dan halaman anak (children) yang dituju
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default ProtectedRoute;
