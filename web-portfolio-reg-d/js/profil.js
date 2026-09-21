document.addEventListener('DOMContentLoaded', () => {
    
    // Fungsi untuk membuat efek elemen muncul perlahan saat di-scroll
    const revealElements = document.querySelectorAll('.reveal-item');

    // Menggunakan Intersection Observer (Sangat ringan untuk performa web)
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Jika elemen sudah masuk ke dalam layar monitor/HP
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Hentikan pemantauan elemen ini agar tidak mengulang animasi terus menerus
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Animasi dimulai saat 15% bagian elemen terlihat
        rootMargin: "0px 0px -50px 0px"
    });

    // Terapkan observer ke semua elemen yang memiliki class .reveal-item
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});