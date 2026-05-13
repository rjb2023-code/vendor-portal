import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());
  app.use(cors());

  // Inisialisasi koneksi PostgreSQL (Akan error jika DATABASE_URL kosong, makanya di-try-catch nanti saat dipanggil)
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Jika menggunakan Render/Heroku biasanya butuh SSL
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
  });

  // ========== API ROUTES ==========
  
  // 0. INIT DB - Jalankan rute ini SEKALI saja di browser (/api/init-db) untuk membuat tabel
  app.get("/api/init-db", async (req, res) => {
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: "DATABASE_URL belum disetup" });
    }
    
    try {
      // Buat Tabel Vendors
      await pool.query(`
        CREATE TABLE IF NOT EXISTS vendors (
          id VARCHAR(50) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          category VARCHAR(100),
          tier VARCHAR(50),
          status VARCHAR(50),
          compliance VARCHAR(50),
          risk VARCHAR(50),
          spend VARCHAR(50)
        );
      `);

      // Cek apakah tabel kosong. Jika kosong, kita isi data awal
      const checkData = await pool.query("SELECT count(*) FROM vendors");
      if (parseInt(checkData.rows[0].count) === 0) {
        await pool.query(`
          INSERT INTO vendors (id, name, category, tier, status, compliance, risk, spend) VALUES 
          ('V-10042', 'Acme Corp Global', 'IT Hardware', 'Strategic', 'Active', 'Verified', 'Low', '$1.2M'),
          ('V-10043', 'Nexus Logistics', 'Transport', 'Operational', 'Suspended', 'Audit Req', 'Medium', '$450K'),
          ('V-10044', 'Titan Manufacturing', 'Raw Materials', 'Strategic', 'Active', 'Verified', 'Low', '$4.5M'),
          ('V-10045', 'CloudNet Secure', 'Software', 'Tactical', 'Blacklisted', 'Failed', 'High', '$12K')
        `);
      }
      
      res.json({ message: "Database berhasil diinisialisasi! Tabel 'vendors' siap digunakan." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Gagal membuat tabel" });
    }
  });

  // 1. Get All Vendors
  app.get("/api/vendors", async (req, res) => {
    try {
      if (!process.env.DATABASE_URL) {
        return res.status(503).json({ error: "DATABASE_URL kosong" });
      }
      const result = await pool.query("SELECT * FROM vendors ORDER BY id ASC");
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // 2. Tambah Vendor Baru
  app.post("/api/vendors", async (req, res) => {
    try {
      const { name, category, tier } = req.body;
      const id = 'V-' + Math.floor(10000 + Math.random() * 90000); // Random ID V-XXXXX
      const status = 'Pending';
      const compliance = 'Pending';
      const risk = '-';
      const spend = '$0';
      
      await pool.query(
        "INSERT INTO vendors (id, name, category, tier, status, compliance, risk, spend) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [id, name, category, tier, status, compliance, risk, spend]
      );
      
      res.json({ success: true, message: "Vendor berhasil ditambahkan", data: { id, name, category, tier, status, compliance, risk, spend } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Gagal menambah vendor" });
    }
  });

  // 3. Update Status Vendor (Activate, Suspend, Blacklist)
  app.put("/api/vendors/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status, compliance, risk } = req.body;
      
      await pool.query(
        "UPDATE vendors SET status = $1, compliance = $2, risk = $3 WHERE id = $4",
        [status, compliance, risk, id]
      );
      
      res.json({ success: true, message: "Status vendor diperbarui" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Gagal mengupdate vendor" });
    }
  });

  // 4. Health Check
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
