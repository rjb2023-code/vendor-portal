import React from 'react';
import { BookOpen, CheckCircle, Info, ShieldCheck, User, Building2 } from 'lucide-react';

export function VendorGuidelines() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-[#1e293b] px-8 py-10 text-white">
        <h1 className="text-3xl font-bold mb-3">Buku Panduan Pendaftaran Vendor</h1>
        <p className="text-slate-300 text-lg max-w-2xl">
          Standar Operasional (SOP) Penetapan Daftar Isian Data Minimum (Mandatory Fields) untuk Data Master Vendor di Lingkungan Perusahaan.
        </p>
      </div>

      <div className="p-8 space-y-12 text-gray-700">
        
        {/* Section 1 */}
        <section>
          <div className="flex items-center gap-3 border-b pb-2 mb-4 border-gray-200">
            <Info className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">1. Pendahuluan & Tujuan</h2>
          </div>
          <p className="leading-relaxed">
            Dokumen ini bertujuan untuk menetapkan standar terkait informasi minimum yang wajib ada untuk setiap data master vendor di grup perusahaan. Tujuannya adalah untuk memastikan data vendor yang akurat, lengkap, dan seragam di seluruh entitas, guna meningkatkan efektivitas dan efisiensi proses bisnis Procurement secara menyeluruh, mendukung pengambilan keputusan strategis terhadap proses pendaftaran vendor, serta memastikan kepatuhan terhadap Standard Operating Procedure (SOP) yang berlaku.
          </p>
          <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-2">Ruang Lingkup</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
              <li>Panduan ini berlaku sebagai acuan utama bagi seluruh unit bisnis.</li>
              <li>Berfokus pada penetapan daftar isian data minimum yang wajib (minimum mandatory fields).</li>
              <li>Mencakup pendaftaran vendor berbadan usaha (PT, CV, dll.) maupun vendor perorangan.</li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <div className="flex items-center gap-3 border-b pb-2 mb-4 border-gray-200">
            <ShieldCheck className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">2. Prosedur Vendor Badan Usaha</h2>
          </div>
          <p className="mb-4">Informasi dan dokumen minimum yang wajib dilengkapi oleh entitas bisnis sah (PT, CV, Firma, dll).</p>
          
          <div className="overflow-x-auto text-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-800">
                  <th className="p-3 border">Kategori Data</th>
                  <th className="p-3 border">Nama Field</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Panduan Pengisian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-3 border font-semibold" rowSpan={3}>Identifier Utama</td>
                  <td className="p-3 border">NPWP Perusahaan</td>
                  <td className="p-3 border text-center font-bold text-orange-600">Wajib</td>
                  <td className="p-3 border">Wajib format 16 digit tanpa simbol/spasi. Tidak boleh NPWP Pribadi.</td>
                </tr>
                <tr>
                  <td className="p-3 border">Status PKP / Non-PKP</td>
                  <td className="p-3 border text-center font-bold text-orange-600">Wajib</td>
                  <td className="p-3 border">Menentukan status kewajiban pajak vendor.</td>
                </tr>
                <tr>
                  <td className="p-3 border">NIB</td>
                  <td className="p-3 border text-center font-bold text-orange-600">Wajib</td>
                  <td className="p-3 border">Untuk menunjukkan legalitas badan usaha.</td>
                </tr>
                <tr>
                  <td className="p-3 border font-semibold" rowSpan={2}>Nama & Tipe</td>
                  <td className="p-3 border">Nama Vendor</td>
                  <td className="p-3 border text-center font-bold text-orange-600">Wajib</td>
                  <td className="p-3 border">Format KAPITAL tanpa menyertakan bentuk usaha. Contoh: TRAKINDO UTAMA.</td>
                </tr>
                <tr>
                  <td className="p-3 border">Flags (Personal, Ex-Emp, dll)</td>
                  <td className="p-3 border text-center font-bold text-orange-600">Wajib</td>
                  <td className="p-3 border">Berikan penanda sesuai status hubungan.</td>
                </tr>
                <tr>
                  <td className="p-3 border font-semibold">Kontak</td>
                  <td className="p-3 border">Info Kontak & PIC</td>
                  <td className="p-3 border text-center font-bold text-orange-600">Wajib</td>
                  <td className="p-3 border">Alamat, Kota, Provinsi, Negara. Serta email, nomor telp perusahaan & PIC.</td>
                </tr>
                <tr>
                  <td className="p-3 border font-semibold" rowSpan={2}>Finansial & Dokumen</td>
                  <td className="p-3 border">Nama & Nomor Rekening</td>
                  <td className="p-3 border text-center font-bold text-orange-600">Wajib</td>
                  <td className="p-3 border"><strong>Harus sesuai dengan nama legal Badan Usaha.</strong></td>
                </tr>
                <tr>
                  <td className="p-3 border">Pemenuhan Dokumen</td>
                  <td className="p-3 border text-center font-bold text-orange-600">Wajib</td>
                  <td className="p-3 border">Scan NPWP, KTP Direksi, Akta Pendirian, Surat PKP & NIB.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <div className="flex items-center gap-3 border-b pb-2 mb-4 border-gray-200">
            <User className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">3. Prosedur Vendor Perorangan</h2>
          </div>
          <p className="mb-4">Informasi dan dokumen minimum yang wajib dilengkapi oleh individu/perorangan.</p>
          
          <div className="overflow-x-auto text-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-800">
                  <th className="p-3 border">Kategori Data</th>
                  <th className="p-3 border">Nama Field</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Panduan Pengisian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-3 border font-semibold" rowSpan={2}>Identifier Utama</td>
                  <td className="p-3 border">NIK (No Kependudukan)</td>
                  <td className="p-3 border text-center font-bold text-orange-600">Wajib</td>
                  <td className="p-3 border">Menggunakan NIK KTP sebagai identifier tunggal/utama.</td>
                </tr>
                <tr>
                  <td className="p-3 border">NPWP Pribadi</td>
                  <td className="p-3 border text-center text-gray-500">Opsional</td>
                  <td className="p-3 border">Jika tidak ada, dikosongkan. Namun wajib lampirkan Surat Non-PKP.</td>
                </tr>
                <tr>
                  <td className="p-3 border font-semibold">Nama & Detail</td>
                  <td className="p-3 border">Nama Vendor</td>
                  <td className="p-3 border text-center font-bold text-orange-600">Wajib</td>
                  <td className="p-3 border">Sesuai nama KTP. Ditulis format KAPITAL. Pengisian alamat dan kontak sama dengan badan usaha bedanya menggunakan data pribadi.</td>
                </tr>
                <tr>
                  <td className="p-3 border font-semibold">Finansial & Dokumen</td>
                  <td className="p-3 border">Rekening Pencairan</td>
                  <td className="p-3 border text-center font-bold text-orange-600">Wajib</td>
                  <td className="p-3 border">Nama rekening <strong>harus sesuai dengan nama KTP</strong>.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
            <h3 className="text-lg font-bold text-yellow-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-yellow-600" />
              Catatan Penting Pengecualian Pembayaran
            </h3>
            <div className="space-y-4 text-sm text-yellow-800">
              <p>
                <strong>1. Pembayaran Dialihkuasakan:</strong> Jika nama pemilik rekening bank berbeda dengan nama vendor di KTP (misal, ditujukan ke anak, istri, atau pihak kuasa), maka <strong>wajib melampirkan Surat Kuasa yang valid</strong>. Surat eksplisit memberikan kuasa penerimaan pembayaran.
              </p>
              <p>
                <strong>2. Aset Atas Nama Orang Lain:</strong> Untuk sewa rumah/mess di mana objek transaksi atas nama pihak lain, vendor wajib melampirkan <strong>Surat Kuasa operasional</strong> dari pemilik aset yang sah.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
