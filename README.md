# JASMINOR — starter katalog mini

Starter situs statis yang bisa diedit di VS Code. Tidak memakai Linktree, framework, paket npm tambahan, atau skrip iklan. Isi saat ini masih berupa contoh; ganti dengan materi JASMINOR yang benar sebelum dibagikan.

## Buka dan jalankan di komputer

1. Buka folder `jasminor-starter` di VS Code.
2. Buka terminal di VS Code, lalu jalankan:

   ```bash
   npm start
   ```

3. Buka `http://localhost:3000` di browser. Hentikan server dengan `Ctrl+C` di terminal.

Tidak perlu menjalankan `npm install`; server preview memakai Node.js bawaan.

## Bagian yang paling sering diedit

- `site-data.js` — nama brand, judul, teks, tautan toko, nomor WhatsApp, dan daftar produk.
- `styles.css` — warna, ukuran, jarak, dan tampilan versi ponsel.
- `index.html` — susunan bagian halaman.
- `assets/` — simpan foto utama dan foto produk di sini.

Untuk produk, ubah `name`, `description`, `price`, dan `detail` di `site-data.js`. Untuk memasang foto, salin fotonya ke folder `assets`, lalu isi `image`, misalnya `"assets/parfum-01.jpg"`. Ubah `isExample` menjadi `false` agar label “CONTOH” hilang. Tombol di setiap produk menghubungi nomor `whatsappNumber` melalui WhatsApp. Isi `lunaPosUrl` dengan tautan toko Luna POS yang lengkap (diawali `https://`) untuk tombol toko. Tautan marketplace tidak diterima.

## Terbitkan gratis lewat GitHub Pages

GitHub Pages menerbitkan berkas HTML, CSS, dan JavaScript dari repositori. Proyek ini sudah memakai tautan relatif sehingga bisa dipublikasikan sebagai situs repositori tanpa proses build. Domain bawaan GitHub Pages tidak perlu dibeli; akun GitHub tetap diperlukan untuk mengunggah dan menerbitkan situs. Panduan resmi: [Quickstart GitHub Pages](https://docs.github.com/en/pages/quickstart) dan [tentang GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

1. Buat repositori GitHub baru, misalnya `jasminor-katalog`, dan pilih visibilitas **Public** untuk jalur gratis yang sederhana.
2. Dari terminal VS Code di folder ini, jalankan perintah berikut. Ganti `USERNAME` dan `REPO` dengan nama akun dan repositorimu:

   ```bash
   git init
   git add .
   git commit -m "Add JASMINOR catalog site"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```

3. Di repositori GitHub, buka **Settings → Pages**. Pada **Build and deployment**, pilih **Deploy from a branch**, lalu pilih branch `main` dan folder `/(root)`, kemudian simpan.
4. Alamat situs akan muncul di halaman Pages. Biasanya formatnya `https://USERNAME.github.io/REPO/`. Jika ingin alamat tanpa nama repositori, buat repositori bernama persis `USERNAME.github.io`; alamatnya `https://USERNAME.github.io/`.
5. Tunggu proses publikasi selesai. Dokumentasi GitHub menyebut pembaruan dapat memerlukan hingga sekitar 10 menit.

Domain tersebut gratis dan tidak menambahkan halaman Linktree. Namun, repo publik berarti kode sumber dapat dilihat orang lain. Jangan masukkan kata sandi, API key, data pelanggan, atau informasi rahasia ke file situs.

## Catatan

- Isi halaman, harga, foto, dan URL Luna POS masih contoh/placeholder. Isi dan periksa semuanya sebelum dipublikasikan.
- Situs ini adalah katalog statis: semua tombol produk dan toko menuju satu tautan Luna POS, tetapi checkout, database, dan pengelolaan stok tetap ditangani di Luna POS.
- File `server.js` hanya untuk preview di komputer sendiri; GitHub Pages menyajikan berkas statis langsung.

\n## Pemesanan WhatsApp berdasarkan ukuran botol

Tombol pada setiap kartu ukuran sekarang membuka WhatsApp dengan pesan yang sudah terisi:
- ukuran botol yang dipilih;
- harga ukuran tersebut;
- keterangan bahwa aroma dipilih melalui WhatsApp;
- tautan langsung ke foto botol pada website.

Catatan: tautan `wa.me` tidak dapat mengirim foto sebagai lampiran otomatis. Untuk mengirim file foto langsung ke chat, diperlukan WhatsApp Business Cloud API dan backend/webhook. Tautan foto yang disertakan di pesan ini adalah alternatif sementara.
