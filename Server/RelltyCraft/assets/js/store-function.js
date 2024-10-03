// Fungsi untuk membeli produk
function buy(storeTitle, price) {
    // Menyusun pesan untuk WhatsApp
    const message = `Hai! Saya ingin membeli ${storeTitle} seharga ${price}. Apakah ini bisa?`;
    
    // Meng-encode pesan untuk digunakan dalam URL
    const encodedMessage = encodeURIComponent(message);
    
    // Membuat URL untuk WhatsApp
    const whatsappUrl = `https://wa.me/62895602592430?text=${encodedMessage}`;

    // Mencetak pesan ke console untuk debug
    console.log(`Mengarahkan ke: ${whatsappUrl}`);

    // Memastikan pengguna mengkonfirmasi sebelum diarahkan
    if (confirm(`Apakah Anda yakin ingin menghubungi penjual untuk membeli ${storeTitle} seharga ${price}?`)) {
        window.open(whatsappUrl, '_blank'); // Arahkan ke WhatsApp
    } else {
        console.log('Pengguna membatalkan pembelian.'); // Mencetak log jika dibatalkan
    }
}
