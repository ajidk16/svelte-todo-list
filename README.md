## Setup Environment Variable (ENV)

Aplikasi ini membutuhkan environment variable untuk konfigurasi backend API.

1. **Buat file `.env` di root project**

	Contoh isi file `.env`:
	```env
	PUBLIC_BACKEND_URL=http://localhost:3000
	```
	Ganti `http://localhost:3000` dengan URL backend API yang sesuai.

2. **Restart server development** setelah mengubah file `.env`:
	```bash
	npm run dev
	```

> Variabel `PUBLIC_BACKEND_URL` digunakan untuk semua request API dari frontend ke backend.
# Svelte ToDo List

Aplikasi ToDo List modern berbasis SvelteKit untuk mengelola aktivitas dan tugas harian secara efisien.


## Petunjuk Penggunaan Lengkap

### 1. Instalasi

Clone repository ini dan install dependensi:

```bash
git clone <repo-url>
cd svelte-todo-list
npm install
```

### 2. Menjalankan Aplikasi

Jalankan server pengembangan:

```bash
npm run dev
```

Buka browser ke `http://localhost:5173`.

### 3. Login

Masukkan username dan password yang valid pada halaman login. Jika belum ada akun, pastikan backend sudah menyediakan endpoint pendaftaran atau gunakan akun yang sudah ada.

### 4. Navigasi Fitur

- **Dashboard**: Melihat statistik tugas dan aktivitas.
- **ToDo**: Menambah, mengedit, menghapus, dan memfilter tugas.
- **Kanban**: Visualisasi tugas dalam bentuk board kolom (drag & drop status).
- **Tag & Status**: Kelola tag dan status untuk mengelompokkan tugas.
- **Profil**: Lihat dan edit data profil pengguna.
- **Logout**: Keluar dari aplikasi dengan aman.

### 5. Struktur Folder Penting

- `src/routes/` : Semua halaman aplikasi (dashboard, todo, kanban, auth, dll)
- `src/lib/components/` : Komponen UI reusable (button, modal, data-table, dsb)
- `src/modules/` : Modul bisnis, seperti todo, tag, status
- `src/lib/utils/` : Utility/helper (API, dsb)
- `src/lib/store/` : Store Svelte untuk state management

### 6. Testing

Jalankan unit test:
```bash
npm run test:unit
```
Jalankan end-to-end test:
```bash
npm run test:e2e
```

### 7. Build untuk Produksi

```bash
npm run build
npm run preview
```
Aplikasi siap di-deploy ke platform seperti Vercel, Netlify, dsb.

## Fitur Unggulan

- **Manajemen ToDo**: Tambah, edit, hapus, dan filter tugas.
- **Dashboard**: Statistik tugas dan aktivitas pengguna.
- **Kanban Board**: Visualisasi tugas dalam bentuk kolom.
- **Manajemen Tag & Status**: Kustomisasi tag dan status tugas.
- **Profil Pengguna**: Lihat dan edit profil.
- **Autentikasi**: Sistem login dan logout.
- **UI Modern & Responsif**: Menggunakan TailwindCSS dan komponen Svelte custom.
- **Testing**: Unit test & e2e test (Vitest & Playwright).

---

> Untuk pengembangan lebih lanjut, silakan lihat struktur folder di `src/` dan sesuaikan kebutuhan Anda.
