// Periksa jika sessionStorage sudah memiliki pengunjung tercatat
let visitorCount = sessionStorage.getItem('visitorCount');

// Jika belum ada data di sessionStorage, anggap ini adalah pengunjung pertama
if (!visitorCount) {
  visitorCount = 1;  // Inisialisasi dengan 1
  sessionStorage.setItem('visitorCount', visitorCount);  // Simpan ke sessionStorage
} else {
  // Jika sudah ada, konversi nilai dari string ke integer
  visitorCount = parseInt(visitorCount);
}

// Tampilkan jumlah pengunjung di halaman
document.getElementById('visitorCount').innerText = visitorCount;

// Tombol Reset untuk menghapus jumlah pengunjung (di satu sesi)
document.getElementById('resetButton').addEventListener('click', function() {
  sessionStorage.removeItem('visitorCount');  // Hapus item dari sessionStorage
  alert('Visitor count has been reset for this session.');
  location.reload();  // Reload halaman untuk melihat hasilnya
});
