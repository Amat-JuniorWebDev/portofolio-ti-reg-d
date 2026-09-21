document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // ANIMASI SCROLL REVEAL
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal-item');
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => scrollObserver.observe(el));

});