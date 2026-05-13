import React, { useState } from 'react';
import { Building2, User, Upload, ArrowRight, CheckCircle2, FileText, AlertCircle, Eye } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export function VendorRegistration() {
  const navigate = useNavigate();
  const [vendorType, setVendorType] = useState<'badan_usaha' | 'perorangan' | null>(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Identifier
    npwp: '',
    nib: '',
    nik: '',
    statusPkp: 'Non-PKP',
    
    // Nama & Tipe
    namaVendor: '',
    klasifikasi: 'PT',
    flagPersonal: false,
    flagExEmployee: false,
    flagPrincipal: false,

    // Alamat
    kodePos: '',
    kota: '',
    provinsi: '',
    negara: 'Indonesia',

    // Kontak
    email: '',
    telepon: '',
    namaPic: '',
    emailPic: '',
    teleponPic: '',

    // Finansial
    namaBank: '',
    nomorRekening: '',
    namaPemilikRekening: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/vendors');
      }, 3000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Registrasi Berhasil</h2>
        <p className="text-gray-500 mt-2 text-center max-w-md">
          Data registrasi Anda telah kami terima dan akan melalui proses review. Anda akan dialihkan kembali ke halaman utama.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Registrasi Vendor Baru</h1>
          <p className="text-sm text-gray-500">Silakan lengkapi data sesuai panduan standar master data vendor.</p>
        </div>
        <button 
          onClick={() => navigate('/vendors/guidelines')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md text-sm font-medium transition-colors border border-blue-200"
        >
          <FileText className="w-4 h-4" />
          Baca Panduan Registrasi
        </button>
      </div>

      {!vendorType && (
        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          <button
            onClick={() => setVendorType('badan_usaha')}
            className="flex flex-col items-center p-8 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Badan Usaha</h3>
            <p className="text-sm text-gray-500 text-center">
              Untuk vendor berupa PT, CV, Firma, atau entitas bisnis resmi lainnya.
            </p>
          </button>

          <button
            onClick={() => setVendorType('perorangan')}
            className="flex flex-col items-center p-8 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <User className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Perorangan (Individu)</h3>
            <p className="text-sm text-gray-500 text-center">
              Untuk vendor independen atau profesional yang beroperasi atas nama pribadi.
            </p>
          </button>
        </div>
      )}

      {vendorType && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="font-semibold text-gray-700">
              Formulir Data {vendorType === 'badan_usaha' ? 'Badan Usaha' : 'Perorangan'}
            </h2>
            <div className="flex items-center gap-2">
              <span className={cn("w-3 h-3 rounded-full", step >= 1 ? "bg-blue-600" : "bg-gray-300")} />
              <span className={cn("w-3 h-3 rounded-full", step >= 2 ? "bg-blue-600" : "bg-gray-300")} />
              <span className={cn("w-3 h-3 rounded-full", step >= 3 ? "bg-blue-600" : "bg-gray-300")} />
              <span className={cn("w-3 h-3 rounded-full", step >= 4 ? "bg-blue-600" : "bg-gray-300")} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Informasi Utama & Identifier</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {vendorType === 'badan_usaha' ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">NPWP Perusahaan <span className="text-red-500">*</span></label>
                        <input type="text" required name="npwp" value={formData.npwp} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="16 Digit Tanpa Spasi/Simbol" />
                        <p className="text-xs text-gray-500 mt-1">Wajib menggunakan NPWP Badan Usaha, bukan NPWP Direksi/Pribadi.</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">NIB (Nomor Induk Berusaha) <span className="text-red-500">*</span></label>
                        <input type="text" required name="nib" value={formData.nib} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="Nomor NIB" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status PKP <span className="text-red-500">*</span></label>
                        <select name="statusPkp" value={formData.statusPkp} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm">
                          <option>PKP</option>
                          <option>Non-PKP</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Klasifikasi Badan Usaha <span className="text-red-500">*</span></label>
                        <select name="klasifikasi" value={formData.klasifikasi} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm">
                          <option>PT</option>
                          <option>CV</option>
                          <option>Firma</option>
                          <option>Koperasi</option>
                          <option>Yayasan</option>
                          <option>Lainnya</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">NIK (Nomor Induk Kependudukan) <span className="text-red-500">*</span></label>
                        <input type="text" required name="nik" value={formData.nik} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="16 Digit Sesuai KTP" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">NPWP Pribadi (Opsional)</label>
                        <input type="text" name="npwp" value={formData.npwp} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder="Jika ada" />
                        <p className="text-xs text-gray-500 mt-1">Jika tidak memiliki NPWP, gunakan NIK sebagai identifier utama.</p>
                      </div>
                    </>
                  )}
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Vendor <span className="text-red-500">*</span></label>
                    <input type="text" required name="namaVendor" value={formData.namaVendor} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm uppercase" placeholder={vendorType === 'badan_usaha' ? "Ditulis format KAPITAL tanpa PT/CV (Contoh: TRAKINDO UTAMA)" : "Sesuai nama KTP huruf KAPITAL"} />
                  </div>
                </div>

                <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 flex gap-4 flex-wrap">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="flagExEmployee" checked={formData.flagExEmployee} onChange={handleInputChange} className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm font-medium text-gray-700">Flag Ex-Employee (Mantan Karyawan)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="flagPrincipal" checked={formData.flagPrincipal} onChange={handleInputChange} className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm font-medium text-gray-700">Flag Principal</span>
                  </label>
                  {vendorType === 'badan_usaha' && (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" name="flagPersonal" checked={formData.flagPersonal} onChange={handleInputChange} className="rounded text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm font-medium text-gray-700">Flag Personal Vendor (Personalia di Badan Usaha)</span>
                    </label>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Informasi Alamat & Kontak</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Negara <span className="text-red-500">*</span></label>
                    <input type="text" required name="negara" value={formData.negara} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi <span className="text-red-500">*</span></label>
                    <input type="text" required name="provinsi" value={formData.provinsi} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kota <span className="text-red-500">*</span></label>
                    <input type="text" required name="kota" value={formData.kota} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos (Opsional)</label>
                    <input type="text" name="kodePos" value={formData.kodePos} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" />
                  </div>
                </div>

                <h4 className="font-semibold text-gray-800 pt-4">Informasi Kontak {vendorType === 'badan_usaha' ? 'Perusahaan' : 'Pribadi'}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                    <input type="email" required name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telepon <span className="text-red-500">*</span></label>
                    <input type="tel" required name="telepon" value={formData.telepon} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" />
                  </div>
                </div>

                {vendorType === 'badan_usaha' && (
                  <>
                    <h4 className="font-semibold text-gray-800 pt-4">Data Person In Charge (PIC)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama PIC <span className="text-red-500">*</span></label>
                        <input type="text" required name="namaPic" value={formData.namaPic} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email PIC <span className="text-red-500">*</span></label>
                        <input type="email" required name="emailPic" value={formData.emailPic} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Telepon/HP PIC <span className="text-red-500">*</span></label>
                        <input type="tel" required name="teleponPic" value={formData.teleponPic} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Informasi Finansial & Dokumen Pendukung</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Bank <span className="text-red-500">*</span></label>
                    <input type="text" required name="namaBank" value={formData.namaBank} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Rekening <span className="text-red-500">*</span></label>
                    <input type="text" required name="nomorRekening" value={formData.nomorRekening} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pemilik Rekening <span className="text-red-500">*</span></label>
                    <input type="text" required name="namaPemilikRekening" value={formData.namaPemilikRekening} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm" placeholder={vendorType === 'badan_usaha' ? "Harus sesuai nama legal perusahaan" : "Harus sesuai nama di KTP"} />
                    <div className="mt-2 text-xs text-orange-700 bg-orange-50 p-2 rounded flex gap-2 items-start border border-orange-200">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <p>
                        Jika nama rekening berbeda dengan nama vendor (misal: pembayaran dialihkuasakan, atau aset atas nama orang lain), maka <strong>wajib melampirkan Surat Kuasa valid</strong> di form dokumen di bawah.
                      </p>
                    </div>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-800 pt-4">Unggah Dokumen Wajib</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {vendorType === 'badan_usaha' ? (
                    <>
                      <div className="border border-dashed border-gray-300 p-4 rounded-lg flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
                        <Upload className="w-5 h-5 text-gray-400 mb-2" />
                        <span className="text-sm font-medium text-gray-700">Scan NPWP Perusahaan</span>
                      </div>
                      <div className="border border-dashed border-gray-300 p-4 rounded-lg flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
                        <Upload className="w-5 h-5 text-gray-400 mb-2" />
                        <span className="text-sm font-medium text-gray-700">KTP Direksi / Penanggung Jawab</span>
                      </div>
                      <div className="border border-dashed border-gray-300 p-4 rounded-lg flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
                        <Upload className="w-5 h-5 text-gray-400 mb-2" />
                        <span className="text-sm font-medium text-gray-700">Akta Pendirian & Perubahan</span>
                      </div>
                      <div className="border border-dashed border-gray-300 p-4 rounded-lg flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
                        <Upload className="w-5 h-5 text-gray-400 mb-2" />
                        <span className="text-sm font-medium text-gray-700">Scan NIB / Surat PKP</span>
                      </div>
                    </>
                  ) : (
                     <>
                      <div className="border border-dashed border-gray-300 p-4 rounded-lg flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
                        <Upload className="w-5 h-5 text-gray-400 mb-2" />
                        <span className="text-sm font-medium text-gray-700">Scan KTP Asli</span>
                      </div>
                      <div className="border border-dashed border-gray-300 p-4 rounded-lg flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
                        <Upload className="w-5 h-5 text-gray-400 mb-2" />
                        <span className="text-sm font-medium text-gray-700">NPWP Pribadi / Surat Non-PKP</span>
                      </div>
                     </>
                  )}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Pratinjau Data (Preview)</h3>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-sm space-y-4">
                   <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                     <div>
                       <p className="text-gray-500">Tipe Vendor</p>
                       <p className="font-semibold text-gray-800">{vendorType === 'badan_usaha' ? 'Badan Usaha' : 'Perorangan'}</p>
                     </div>
                     <div>
                       <p className="text-gray-500">Nama Vendor</p>
                       <p className="font-semibold text-gray-800 uppercase">{formData.namaVendor}</p>
                     </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                     {vendorType === 'badan_usaha' ? (
                        <>
                          <div><p className="text-gray-500">NPWP Perusahaan</p><p className="font-medium">{formData.npwp || '-'}</p></div>
                          <div><p className="text-gray-500">NIB</p><p className="font-medium">{formData.nib || '-'}</p></div>
                          <div><p className="text-gray-500">Status PKP</p><p className="font-medium">{formData.statusPkp}</p></div>
                          <div><p className="text-gray-500">Klasifikasi</p><p className="font-medium">{formData.klasifikasi}</p></div>
                        </>
                     ) : (
                        <>
                          <div><p className="text-gray-500">NIK (Nomor Induk Kependudukan)</p><p className="font-medium">{formData.nik || '-'}</p></div>
                          <div><p className="text-gray-500">NPWP Pribadi</p><p className="font-medium">{formData.npwp || '-'}</p></div>
                        </>
                     )}
                   </div>

                   <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                      <div className="col-span-2">
                        <p className="text-gray-500">Flags / Penanda</p>
                        <ul className="list-disc list-inside font-medium text-gray-800 mt-1">
                          {formData.flagExEmployee && <li>Mantan Karyawan</li>}
                          {formData.flagPrincipal && <li>Principal</li>}
                          {formData.flagPersonal && vendorType === 'badan_usaha' && <li>Personal Vendor</li>}
                          {!formData.flagExEmployee && !formData.flagPrincipal && (!formData.flagPersonal || vendorType !== 'badan_usaha') && <li>-</li>}
                        </ul>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                      <div><p className="text-gray-500">Alamat</p><p className="font-medium">{formData.kota}, {formData.provinsi}, {formData.negara} {formData.kodePos}</p></div>
                      <div><p className="text-gray-500">Kontak (Pribadi/Perusahaan)</p><p className="font-medium">{formData.email} <br/> {formData.telepon}</p></div>
                      
                      {vendorType === 'badan_usaha' && (
                        <>
                          <div><p className="text-gray-500">PIC Name</p><p className="font-medium">{formData.namaPic}</p></div>
                          <div><p className="text-gray-500">PIC Contact</p><p className="font-medium">{formData.emailPic} <br/> {formData.teleponPic}</p></div>
                        </>
                      )}
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div><p className="text-gray-500">Bank / Nomor Rekening</p><p className="font-medium">{formData.namaBank} - {formData.nomorRekening}</p></div>
                      <div><p className="text-gray-500">Atas Nama Rekening</p><p className="font-medium">{formData.namaPemilikRekening}</p></div>
                   </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between bg-gray-50 p-4 rounded-lg">
              <button 
                type="button" 
                onClick={() => {
                  if (step > 1) {
                    setStep(step - 1);
                  } else {
                    setVendorType(null); // Reset
                  }
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {step === 1 ? 'Kembali Pilih Tipe' : 'Sebelumnya'}
              </button>
              
              {step < 4 ? (
                <button 
                  type="button" 
                  onClick={() => setStep(step + 1)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  {step === 3 ? 'Pratinjau Data' : 'Selanjutnya'} <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? 'Mengirim Data...' : 'Kirim & Daftarkan Vendor'}
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
