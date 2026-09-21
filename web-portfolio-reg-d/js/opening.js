document.addEventListener("DOMContentLoaded", () => {
    
    // Waktu tunggu sebelum layar memudar (4.5 detik / 4500ms)
    setTimeout(() => {
        
        // Memanggil animasi fadeOut dari CSS
        document.body.classList.add("fade-out-screen");
        
        // Memindahkan halaman setelah animasi fadeOut selesai berjalan
        setTimeout(() => {
            
            // PENTING: Arahkan ke file utama portofolio Anda. 
            // Jika namanya index.php, ubah teks di bawah ini menjadi 'index.php'
            window.location.href = 'home.html'; 
            
        }, 800); // 800ms adalah durasi animasi fade-out
        
    }, 4500); 

});