document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 1. EFEK KETIK & HAPUS OTOMATIS (FIXED)
    // ==========================================
    const subtitleEl = document.querySelector(".hero-text .subtitle");
    
    if (subtitleEl) {
        // Daftar kata langsung didefinisikan di sini agar aman dan tidak kosong
        const words = [
            "Mahasiswa/Mahasiswi Teknik Informatika",
            "Kolaborasi, Inovasi, dan Solidaritas"
        ];
        
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        // Berikan efek transisi halus di awal
        subtitleEl.style.opacity = "0";
        subtitleEl.style.transition = "opacity 0.5s ease";

        // Munculkan teks bersamaan dengan elemen hero lainnya
        setTimeout(() => {
            subtitleEl.style.opacity = "1";
            typeEffect();
        }, 800);

        function typeEffect() {
            let currentWord = words[wordIndex];
            
            if (isDeleting) {
                subtitleEl.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // Lebih cepat saat menghapus teks
            } else {
                subtitleEl.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100; // Kecepatan normal saat mengetik
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingSpeed = 2000; // Jeda waktu saat teks tampil penuh
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500; // Jeda sebelum mengetik kalimat berikutnya
            }

            setTimeout(typeEffect, typingSpeed);
        }
    }


    // ==========================================
    // 2. ANIMASI SCROLL REVEAL (SAAT USER SCROLL)
    // ==========================================
    const sectionsToAnimate = document.querySelectorAll('.section-title, .section-subtitle, .profil-grid, .portfolio-grid, .tree-container, .jadwal-glass-wrapper');
    
    sectionsToAnimate.forEach(el => {
        el.classList.add('scroll-reveal');
    });

    const observerOptions = {
        root: null,
        threshold: 0.15 
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        scrollObserver.observe(el);
    });


    // ==========================================
    // 3. LOGIKA TAB JADWAL PERKULIAHAN
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const jadwalContent = document.getElementById('jadwal-content');

    const dataJadwal = {
        senin: `
            <div class="j-row"><div class="j-time">08:00 - 10:30</div><div class="j-info"><strong>Pemrograman Web Lanjut</strong><span>Lab Komputer 1 • Bpk. Hendra, M.Kom</span></div></div>
            <div class="j-row"><div class="j-time">13:00 - 15:30</div><div class="j-info"><strong>Jaringan Komputer Dasar</strong><span>Ruang Teori 4 • Ibu Ratna, S.T</span></div></div>
        `,
        selasa: `
            <div class="j-row"><div class="j-time">09:00 - 11:30</div><div class="j-info"><strong>Sistem Basis Data</strong><span>Ruang Teori 2 • Bpk. Wahyu, M.T</span></div></div>
        `,
        rabu: `
            <div class="j-row"><div class="j-time">10:00 - 12:30</div><div class="j-info"><strong>Kecerdasan Buatan</strong><span>Lab Komputer 3 • Ibu Sari, M.Sc</span></div></div>
        `,
        kamis: `<div class="j-row"><div class="j-time">-</div><div class="j-info"><strong>Tidak ada jadwal kuliah</strong><span>Praktik Mandiri / Belajar Mandiri</span></div></div>`,
        jumat: `<div class="j-row"><div class="j-time">-</div><div class="j-info"><strong>Tidak ada jadwal kuliah</strong><span>Libur / Kegiatan Bebas</span></div></div>`
    };

    if (tabBtns.length > 0 && jadwalContent) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const hari = this.getAttribute('data-hari');

                jadwalContent.style.opacity = 0.3;
                setTimeout(() => {
                    jadwalContent.innerHTML = dataJadwal[hari] || `<div class="j-row"><div class="j-time">-</div><div class="j-info"><strong>Jadwal Kosong</strong></div></div>`;
                    jadwalContent.style.opacity = 1;
                }, 150);
            });
        });
    }

});