document.addEventListener("DOMContentLoaded", () => {
    
    // Waktu tunggu sebelum layar opening memudar (4.5 detik / 4500ms)
    setTimeout(() => {
        
        // Memanggil animasi fadeOut dari CSS
        document.body.classList.add("fade-out-screen");
        
        // Memindahkan halaman setelah animasi fadeOut selesai berjalan
        setTimeout(() => {
            
            // PENTING: Karena ini adalah halaman opening sebelum portal,
            // maka kita arahkan pengunjung ke portal.html terlebih dahulu.
            // Nanti dari portal.html barulah diarahkan ke home.html
            window.location.href = 'portal.html'; 
            
        }, 800); // 800ms adalah durasi animasi fade-out sesuai di CSS
        
    }, 4500); 

});