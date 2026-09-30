import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AboutMe from "./pages/AboutMe";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Rute Publik: Halaman Login dapat diakses oleh siapa saja tanpa token */}
        <Route path="/login" element={<Login />} />

        {/* Halaman register */}
        <Route path="/register" element={<Register />} />

        {/* 2. Rute Terproteksi: Halaman Home (Dashboard) wajib dilindungi ProtectedRoute */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* 3. Rute Terproteksi: Halaman About Me juga wajib dilindungi ProtectedRoute */}
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutMe />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
