# Panduan Deployment VendorX ERP dengan PostgreSQL Asli

Bagus sekali! Karena Anda ingin menggunakan database **PostgreSQL** yang sesungguhnya (bukan Supabase yang merupakan Database-as-a-Service), aplikasi ini perlu memiliki sebuah **Backend Server (Node.js/Express)** untuk menghubungkan tampilan ke database dengan aman.

Jangan khawatir, saya baru saja mengubah konfigurasi aplikasi ini secara otomatis. Sekarang aplikasi Anda sudah disiapkan sebagai aplikasi "Full-Stack" yang siap terhubung dengan PostgreSQL. 

Berikut ini adalah panduan lengkap dari awal memindahkan kode ke GitHub hingga siap di-online-kan (Hosting) secara gratis menggunakan **Render.com**.

---

## Langkah 1: Ekspor Kode ke GitHub
Sebelum mengonlinekan, kita harus menyimpan kode ini ke akun GitHub Anda.
1. Di layar Google AI Studio Anda, cari tombol **Export** di menu pengaturan atau pojok kanan atas.
2. Temukan opsi **Export to GitHub**.
3. Jika diminta, silakan *log in* dan berikan otorisasi ke akun GitHub Anda.
4. Buat repository baru, misalnya beri nama `vendorx-erp`.
5. Semua file (termasuk config Server & Vite) sudah masuk ke akun GitHub Anda.

---

## Langkah 2: Buat Database PostgreSQL Gratis di Render
Render.com menawarkan server dan database PostgreSQL yang gratis dan sangat gampang di-set up untuk pemula.
1. Buka [Render.com](https://render.com/) di tab baru dan daftar/login dengan **GitHub**.
2. Setelah masuk ke *Dashboard*, klik tombol **New +** dan pilih **PostgreSQL**.
3. Isi namanya, misal: `vendorx-db`.
4. Bagian Region, pilih salah satu (misalnya Singapore). 
5. Biarkan *PostgreSQL Version* di setting default (biasanya 15 atau 16) dan Instace Type di ukuran **Free**.
6. Klik **Create PostgreSQL**. 
7. Hanya butuh beberapa menit hingga status database Anda menjadi **Available**. 
8. Di halaman detail database tersebut, *scroll* ke bawah dan cari tulisan **External Database URL** (Bentuknya seperti: `postgres://user:password@host...`). Salin (copy) link ini. Kita akan memerlukannya di tahap selanjutnya.

---

## Langkah 3: Online-kan Aplikasi + Server di Render
Setelah langkah 2, kini Anda kembali ke menu utama Render (Dashboard).
1. Klik **New +** dan pilih **Web Service**.
2. Anda akan disuruh memilih proyek dari GitHub. Silakan cari `vendorx-erp` dan hubungkan (Connect).
3. Di halaman pengaturan proyek:
   - **Name**: Isi sesuai keinginan (misal: `vendorx-pro`).
   - **Environment**: Pilih `Node`.
   - **Build Command**: Ketik `npm install && npm run build` (Artinya komputer Render akan menginstall library yang dikasih dan menggabungkan kodenya jadi 1).
   - **Start Command**: Ketik `npm run start` (Artinya Render akan menyalakan file server).
4. *Scroll* ke bawah dan klik tombol **Advanced** (Atau perhatikan tombol **Environment Variables**).
5. Klik **Add Environment Variable**. 
   - Pada kolom `Key`, ketik: `DATABASE_URL`
   - Pada kolom `Value`, **tempel (paste)** link yang Anda salin dari Database di Langkah 2.
6. Anda bebas menggunakan Plan **Free** lalu klik **Create Web Service**.
7. Sekarang bersabarlah menunggu 3-5 menit sampai proses "Build" selesai dan status menjadi *Live*.

---

## Langkah 4: Tinjau dan Tambahkan Tabel ke Database (Jika perlu)
Aplikasi Anda sudah memiliki rancangan antarmuka (UI). Namun, karena file server sudah saya siapkan dan berhasil terkoneksi, *database* aslinya masih **kosong belum ada tabelnya**.

Untuk membuat aplikasinya mengalir (bisa ditambah vendor asli), Anda punya 2 pilihan selanjutnya:
1. Hubungi saya di chat ini: *"Database saya sudah jadi, tolong bantu saya membuat kode di aplikasi ini untuk menyimpan data ke database (membuat query SQL)."*
2. Dan saya akan me-remix aplikasinya untuk memberikan logika "Insert/Update/Select" di dalam `server.ts` agar tabel Anda aktif merekam data secara *real-time*.

Semangat menyelesaikan Langkah 1 s.d. 3! Jika sudah mendapat link dari Render, bagikan kepada saya.
