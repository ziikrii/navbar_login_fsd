import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/authService";

// Data dummy/sample untuk keperluan tampilan tabel/list di dalam Home (jika dibutuhkan)
const sampleData = [
  { id: 1, materi: "React Component", status: "Selesai" },
  { id: 2, materi: "React Router", status: "Selesai" },
  { id: 3, materi: "JWT Authentication", status: "Dipahami" },
];

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");

      // 1. Jika token tidak ditemukan, langsung tendang user kembali ke halaman login
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        // 2. Mengambil data profil user dari backend menggunakan token yang ada
        const response = await getMe(token);
        setUser(response.data);
      } catch (error) {
        // 3. Jika token rusak/kedaluwarsa, hapus token lama dan arahkan ke login
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [navigate]);

  // Tampilan layar penuh saat loading verifikasi token sedang berjalan
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-base-200 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Card Selamat Datang */}
        <section className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h1 className="card-title text-2xl">Home Dashboard</h1>
            <p>
              Selamat datang,{" "}
              <strong className="text-primary">{user?.nama}</strong> (
              {user?.email})
            </p>
          </div>
        </section>

        {/* Card Progress Belajar (Menggunakan sampleData) */}
        <section className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title mb-4">Progress Belajar Anda</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Materi</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((item, index) => (
                    <tr key={item.id}>
                      <th>{index + 1}</th>
                      <td>{item.materi}</td>
                      <td>
                        <span
                          className={`badge ${item.status === "Selesai" ? "badge-success" : "badge-info"}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
