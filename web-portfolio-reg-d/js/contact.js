document.addEventListener('DOMContentLoaded', () => {
    
    console.log('TI Reg D BJM System initialized - Contact Page.');

    // ==========================================
    // SCROLL REVEAL ANIMATION (Dioptimasi untuk Safari / Mobile)
    // ==========================================
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Memastikan animasi mulus tanpa flicker di Safari
                requestAnimationFrame(() => {
                    entry.target.classList.add('active');
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.05, // Memicu animasi lebih awal
        rootMargin: "0px 0px -30px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});