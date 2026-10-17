document.addEventListener('DOMContentLoaded', () => {
    
    // =======================================================
    // 1. EFEK SCROLL REVEAL (Animasi Muncul Perlahan yang Dioptimasi)
    // =======================================================
    const revealElements = document.querySelectorAll('.scroll-reveal, .reveal-item');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // requestAnimationFrame memastikan animasi dirender mulus oleh browser tanpa kedipan
                requestAnimationFrame(() => {
                    entry.target.classList.add('active');
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Memicu animasi sedikit lebih awal sebelum elemen benar-benar masuk layar
        rootMargin: "0px 0px -30px 0px", 
        threshold: 0.05
    });

    // Jalankan observer pada semua elemen yang memiliki class scroll-reveal
    revealElements.forEach(el => revealObserver.observe(el));


    // =======================================================
    // 2. FITUR FILTER KATEGORI ALBUM FOTO (Transisi Lebih Halus)
    // =======================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Hanya jalankan jika elemen filter dan galeri ada di halaman tersebut
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Hapus gaya aktif dari semua tombol
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-primary-container', 'text-white', 'shadow-sm');
                    btn.classList.add('bg-white', 'text-on-surface-variant', 'border', 'border-border-subtle');
                });

                // Tambahkan gaya aktif ke tombol yang diklik
                button.classList.add('bg-primary-container', 'text-white', 'shadow-sm');
                button.classList.remove('bg-white', 'text-on-surface-variant', 'border', 'border-border-subtle');

                const filterValue = button.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'flex';
                        // Jeda sangat tipis agar browser merender perubahan display:flex terlebih dahulu
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.95)';
                        // Hilangkan elemen sepenuhnya setelah animasi CSS selesai (300ms)
                        setTimeout(() => {
                            if (item.style.opacity === '0') {
                                item.style.display = 'none';
                            }
                        }, 300);
                    }
                });
            });
        });
    }


    // =======================================================
    // 3. FITUR LIGHTBOX MODAL (Zoom Foto & Tampil Detail)
    // =======================================================
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalBadge = document.getElementById('modal-badge');
    const modalDateText = document.getElementById('modal-date-text');
    const closeModal = document.getElementById('close-modal');

    function openModalWithData(triggerEl) {
        if (!modal) return;
        
        const card = triggerEl.closest('.gallery-item');
        
        // Memasukkan data dari atribut gambar ke dalam Modal
        if (modalImg) modalImg.src = triggerEl.src || '';
        if (modalTitle) modalTitle.textContent = triggerEl.getAttribute('data-title') || (card ? card.querySelector('h3').innerText : 'Dokumentasi');
        if (modalDesc) modalDesc.textContent = triggerEl.getAttribute('data-desc') || '';
        if (modalBadge) modalBadge.textContent = triggerEl.getAttribute('data-category-name') || 'Momen';
        if (modalDateText) modalDateText.textContent = triggerEl.getAttribute('data-date') || '-';

        // Tampilkan modal dan kunci scroll latar belakang
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden'; 
    }

    // Trigger klik langsung dari gambar galeri
    document.querySelectorAll('.gallery-trigger').forEach(img => {
        img.addEventListener('click', () => openModalWithData(img));
    });

    // Trigger klik dari tombol "Lihat Penuh"
    document.querySelectorAll('.detail-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.gallery-item');
            if (card) {
                const img = card.querySelector('.gallery-trigger');
                if (img) openModalWithData(img);
            }
        });
    });

    // Fungsi Menutup Modal
    function closeLightbox() {
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = ''; // Buka kembali scroll halaman
        }
    }

    // Menutup Modal saat tombol silang (X) diklik
    if (closeModal) {
        closeModal.addEventListener('click', closeLightbox);
    }

    // Menutup Modal saat area gelap (backdrop) di luar gambar diklik
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeLightbox();
            }
        });
    }

    // Menutup Modal dengan tombol ESC (Keyboard) pada PC/Laptop
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeLightbox();
        }
    });

});