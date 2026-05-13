# Panduan Deployment VendorX ERP (Untuk Pemula)

Karena saat ini kita membangun **tampilan depan (Frontend)** menggunakan React & Vite, langkah paling mudah untuk mengonlinekan aplikasi ini adalah menggunakan **Vercel** untuk hosting tampilan, dan **Supabase** untuk Database/Server. Semuanya gratis untuk pemula!

Berikut adalah panduan langkah demi langkahnya:

## Langkah 1: Ekspor Kode ke GitHub
Sebelum mengonlinekan, kita harus menyimpan kode ini ke akun GitHub Anda.
1. Di Google AI Studio (tempat Anda membaca ini), cari tombol **Export** (biasanya di kanan atas atau di menu pengaturan).
2. Pilih opsi **Export to GitHub**.
3. Anda akan diminta untuk login/otorisasi akun GitHub Anda.
4. Buat repository baru, misalnya beri nama `vendorx-erp`.
5. Selesai! Sekarang semua kode yang sudah kita buat ada di GitHub Anda.

## Langkah 2: Online-kan Tampilan dengan Vercel (Gratis)
Vercel adalah platform yang sangat mudah untuk mengonlinekan aplikasi berbasis React/Vite.
1. Buka [vercel.com](https://vercel.com/) di tab baru.
2. Klik **Sign Up** dan daftar menggunakan akun **GitHub** Anda.
3. Setelah masuk ke Dashboard Vercel, klik tombol **"Add New..."** lalu pilih **"Project"**.
4. Vercel akan otomatis menampilkan daftar repository GitHub Anda. Cari `vendorx-erp` dan klik tombol **"Import"**.
5. Di halaman konfigurasi yang muncul:
   - **Framework Preset**: Vercel akan otomatis mendeteksi ini sebagai "Vite". Biarkan saja.
   - **Root Directory**: Biarkan default.
   - **Build and Output Settings**: Biarkan default.
6. Klik tombol **"Deploy"**.
7. Tunggu sekitar 1-2 menit. Setelah selesai, layar akan menampilkan animasi konfeti 🎉 dan Anda akan mendapatkan **URL publik** (contoh: `https://vendorx-erp.vercel.app`) yang bisa diakses siapa saja!

## Langkah 3: Siapkan Database Asli dengan Supabase
Saat ini, tabel vendor dan invoice di aplikasi kita masih menggunakan **data bohongan (dummy data)** yang diketik di dalam kode. Agar aplikasi bisa benar-benar menyimpan data, kita butuh Database. **Supabase** adalah backend lengkap (database PostgreSQL + Autentikasi) yang gratis dan sangat cocok dipasangkan dengan Vercel.
1. Buka [supabase.com](https://supabase.com/) dan login menggunakan **GitHub**.
2. Klik **"New Project"**.
3. Pilih Organisasi (biasanya nama Anda), lalu beri nama project, misal: `VendorX Database`.
4. Buat **Database Password** yang kuat dan simpan baik-baik!
5. Pilih Region yang dekat dengan pengguna Anda (misal: **Singapore**).
6. Klik **"Create new project"**. Butuh beberapa menit sampai database siap.
7. Setelah siap, pergi ke menu **Project Settings > API**. Di sana Anda akan melihat `Project URL` dan `anon / public API Key`. Simpan kedua info ini, kita akan membutuhkannya nanti.

## Langkah 4: Menghubungkan Vercel dan Supabase (Tahap Berikutnya)
Agar aplikasi Vercel Anda bisa membaca dan menyimpan ke Database Supabase:
1. Kita harus mengubah kode aplikasi ini (di file `.env.example` dan menambah library `@supabase/supabase-js`).
2. Kode data *dummy* akan kita ganti dengan kode untuk "*fetch*" (mengambil) data dari Supabase.
3. Di Vercel, kita perlu memasukkan `Project URL` dan `API Key` Supabase ke menu **Settings > Environment Variables**, lalu lakukan Re-deploy.

---

### Apa yang harus Anda lakukan sekarang?
Fokus selesaikan **Langkah 1 & 2** terlebih dahulu. 
Ekspor kode ke GitHub, daftar Vercel, dan tekan *Deploy*. Jika sudah berhasil mendapatkan link Vercel-nya, beri tahu saya, dan kita akan mulai memprogram **Langkah 3 & 4** untuk menghubungkan database!
