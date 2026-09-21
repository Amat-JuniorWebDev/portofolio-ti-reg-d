document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efek Scroll Reveal (Elemen muncul perlahan saat discroll)
    const revealElements = document.querySelectorAll('.reveal-item');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // 2. Fitur Filter Kategori Album Foto
    const filterButtons = document.querySelectorAll('.filter-btn');
    const albumCards = document.querySelectorAll('.album-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hapus class active dari semua tombol
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Tambahkan class active ke tombol yang diklik
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            albumCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });


    // 3. Fitur Lightbox Modal (Zoom Foto saat diklik)
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.modal-close');

    const imageWrappers = document.querySelectorAll('.album-img-wrapper');

    imageWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            const img = wrapper.querySelector('img');
            const cardInfo = wrapper.parentElement.querySelector('.album-info h3').innerText;

            modal.style.display = 'flex';
            modalImg.src = img.src;
            modalCaption.innerText = cardInfo;
        });
    });

    // Menutup Modal saat tombol silang (X) diklik
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Menutup Modal saat area gelap di luar gambar diklik
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

});