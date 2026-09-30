import heroIMG from "../assets/hero.png";
const AboutMe = () => {
  return (
    <main className="min-h-screen bg-base-200">
      {/* Hero */}
      <section className="border-b border-base-300 bg-base-100">
        <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-8 px-6 py-16 md:flex-row md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-primary">About Me</p>

            <h1 className="mt-2 text-4xl font-bold">Nama Kamu</h1>

            <p className="mt-3 text-lg text-base-content/70">
              Mahasiswa Teknik Informatika
            </p>

            <p className="mt-5 leading-7 text-base-content/70">
              Halo, saya sedang belajar pengembangan aplikasi web menggunakan
              ReactJS dan REST API. Saat ini saya sedang mempelajari frontend
              dan backend untuk membuat aplikasi web sederhana.
            </p>
          </div>

          <div className="avatar">
            <div className="w-40 rounded-full">
              <img src={heroIMG} alt="Foto Nama Kamu" />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Pendidikan */}
          <section className="card border border-base-300 bg-base-100">
            <div className="card-body">
              <h2 className="card-title">Pendidikan</h2>

              <div className="mt-3">
                <p className="font-semibold">Universitas / Sekolah Kamu</p>

                <p className="text-sm text-base-content/60">
                  Teknik Informatika
                </p>

                <p className="mt-1 text-sm text-base-content/60">
                  2023 - Sekarang
                </p>
              </div>
            </div>
          </section>

          {/* Hobby */}
          <section className="card border border-base-300 bg-base-100">
            <div className="card-body">
              <h2 className="card-title">Hobby</h2>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="badge badge-outline">Coding</span>

                <span className="badge badge-outline">Gaming</span>

                <span className="badge badge-outline">Musik</span>

                <span className="badge badge-outline">Membaca</span>
              </div>
            </div>
          </section>

          {/* Skill */}
          <section className="card border border-base-300 bg-base-100 md:col-span-2">
            <div className="card-body">
              <h2 className="card-title">Skill</h2>

              <p className="text-sm text-base-content/60">
                Teknologi yang sedang saya pelajari.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="badge badge-primary">ReactJS</span>

                <span className="badge badge-primary">JavaScript</span>

                <span className="badge badge-primary">Node.js</span>

                <span className="badge badge-primary">Express.js</span>

                <span className="badge badge-primary">MySQL</span>

                <span className="badge badge-primary">Tailwind CSS</span>

                <span className="badge badge-primary">REST API</span>
              </div>
            </div>
          </section>

          {/* Kontak */}
          <section className="card border border-base-300 bg-base-100 md:col-span-2">
            <div className="card-body">
              <h2 className="card-title">Kontak</h2>

              <div className="mt-3 space-y-2">
                <p>
                  <span className="font-medium">Email:</span> nama@email.com
                </p>

                <p>
                  <span className="font-medium">WhatsApp:</span> 08xxxxxxxxxx
                </p>

                <p>
                  <span className="font-medium">Instagram:</span> @username
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default AboutMe;
