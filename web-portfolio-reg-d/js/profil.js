document.addEventListener('DOMContentLoaded', () => {
    
    // Log inisialisasi sistem
    console.log('TI Reg D BJM System initialized - Profil Page.');

    // ==========================================
    // SCROLL REVEAL ANIMATION (Dioptimasi untuk Safari / Mobile)
    // ==========================================
    
    // Mengambil semua elemen yang memiliki class 'scroll-reveal'
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Jika elemen sudah masuk ke dalam layar
            if (entry.isIntersecting) {
                // PERBAIKAN: Gunakan requestAnimationFrame agar animasi tidak berkedip di iPhone/Safari
                requestAnimationFrame(() => {
                    entry.target.classList.add('active');
                });
                // Hentikan pemantauan elemen ini
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        // PERBAIKAN: threshold diturunkan ke 0.05 agar animasi memicu sedikit lebih awal
        threshold: 0.05, 
        // PERBAIKAN: margin disesuaikan agar elemen tidak telat muncul saat scroll cepat
        rootMargin: "0px 0px -30px 0px" 
    });

    // Terapkan observer ke semua elemen
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});