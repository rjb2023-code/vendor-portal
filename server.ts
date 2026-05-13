import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(cors());

  // Inisialisasi koneksi PostgreSQL (Akan error jika DATABASE_URL kosong, makanya di-try-catch nanti saat dipanggil)
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Jika menggunakan Render/Heroku biasanya butuh SSL
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
  });

  // ========== API ROUTES ==========
  
  // 1. Contoh Get All Vendors
  app.get("/api/vendors", async (req, res) => {
    try {
      if (!process.env.DATABASE_URL) {
        return res.json({ message: "Anda belum memasukkan DATABASE_URL di Environment Variables server Anda." });
      }
      
      // Jika Anda punya tabel bernama 'vendors', ini kuerinya:
      const result = await pool.query("SELECT * FROM vendors ORDER BY id DESC");
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // 2. Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Server API is running!" });
  });

  // ================================

  // Vite middleware for development (Wajib agar Tampilan & Server bisa jalan bersamaan)
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Mode Production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0" as any, () => {
    console.log(`Server & Frontend berjalan di http://localhost:${PORT}`);
  });
}

startServer();
