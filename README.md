# 🚀 Instalasi
1. Clone repository
bash
git clone https://github.com/username/inventory-management.git
cd inventory-management
2. Install dependencies
bash
npm install
# atau
yarn install
3. Konfigurasi environment
Buat file .env.local:

env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_API_URL mengarah ke backend API (Node.js/Express/MySQL).

4. Jalankan development server
bash
npm run dev
Akses di: http://localhost:3001

# 🛠️ Alur Kerja
## Login

User masuk lewat /login dengan username & password.

Backend (/api/auth/login) mengembalikan session.

Header menampilkan nama user + tombol logout.

## Navigasi

Header: branding, navbar, profile (login/logout).

Sidebar: menu utama (Reports, Products, Transactions, Customers, Suppliers).

Main Container: konten halaman.

Footer: informasi hak cipta.

## Dashboard

Menampilkan total nilai inventory.

Menampilkan produk dengan stok rendah.

## Reports

Filter tanggal → mempengaruhi semua chart.

Monthly Sales: bar chart penjualan per bulan.

Group Sales: pie chart penjualan per kategori barang.

Top Products: horizontal bar chart 10 produk terlaris.

## Products

CRUD produk (nama, kategori, harga, stok).

Validasi input & notifikasi sukses/gagal.

## Transactions

Catat transaksi (penjualan/pembelian).

Update stok otomatis.

Customers & Suppliers

Manajemen data pelanggan & pemasok.

# ✨ Fitur Utama
## 🔐 Authentication: login/logout dengan session.

## 📊 Dashboard: ringkasan inventory & low stock alert.

## 📈 Reports: chart interaktif (monthly, group, top products).

## 📦 Products: CRUD produk dengan validasi.

## 💰 Transactions: pencatatan transaksi dengan update stok.

## 👥 Customers: manajemen pelanggan.

## 🏭 Suppliers: manajemen pemasok.

## 🎨 UI Modern: TailwindCSS, layout profesional (header, sidebar, main, footer).

## 📱 Responsive: mendukung desktop & mobile.

## 📂 Struktur Project (Frontend)

# Code
app/
 ├─ layout.tsx        # Root layout (header, sidebar, footer)
 ├─ login/            # Halaman login (layout terpisah)
 ├─ reports/          # Halaman laporan
 ├─ products/         # Halaman produk
 ├─ transactions/     # Halaman transaksi
 ├─ customers/        # Halaman pelanggan
 ├─ suppliers/        # Halaman pemasok
components/
 ├─ Header.tsx
 ├─ Sidebar.tsx
 ├─ Footer.tsx
 ├─ ChartCard.tsx
 └─ DateFilter.tsx
lib/
 └─ api.ts            # helper fetch API
# 📌 Catatan
Pastikan backend (localhost:3000) sudah jalan sebelum frontend (localhost:3001).
