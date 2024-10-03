// removeExtension.js
function removeFileExtension() {
    let currentURL = window.location.href;

    // Pola untuk mencocokkan ekstensi dan kata 'index'
    let regex = /\/(index)?(\.(html|htm|php|asp|jsp|txt|css|js|json))?$/;

    // Jika URL memiliki ekstensi atau kata 'index', hapus dari URL
    if (regex.test(currentURL)) {
        let newURL = currentURL.replace(regex, ''); // Menghapus 'index' dan ekstensi
        history.replaceState(null, '', newURL); // Ganti URL tanpa memuat ulang
    }
}
// Panggil fungsi removeHTMLFileExtension() setelah halaman dimuat
window.onload = function() {
    removeFileExtension();
};