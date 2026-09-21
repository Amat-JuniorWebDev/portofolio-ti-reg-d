document.addEventListener("DOMContentLoaded", function() {

    const tabBtns = document.querySelectorAll('.day-btn');
    const jadwalDisplay = document.getElementById('jadwal-display');
    
    // Variabel penampung data dari JSON
    let dataJadwal = {}; 

    // ==========================================
    // 1. FETCH DATA DARI FILE JSON (DI FOLDER DATA)
    // ==========================================
    fetch('data/jadwal.json')
        .then(response => response.json())
        .then(data => {
            dataJadwal = data;
            
            // Opsional: Langsung render jadwal hari Senin saat web pertama kali dibuka
            // agar data dari JSON langsung menimpa data bawaan HTML
            renderJadwal('senin');
        })
        .catch(error => console.error('Gagal memuat data/jadwal.json:', error));

    // ==========================================
    // 2. LOGIKA TAB KLIK HARI & TRIGGER RENDER
    // ==========================================
    if (tabBtns.length > 0 && jadwalDisplay) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Hapus kelas aktif dari semua tombol
                tabBtns.forEach(b => b.classList.remove('active'));
                // Tambahkan kelas aktif ke tombol yang diklik
                this.classList.add('active');

                // Ambil data hari dari atribut HTML (misal: data-hari="senin")
                const hari = this.getAttribute('data-hari');

                // Berikan efek fade-out sebentar agar transisi perpindahan mulus
                jadwalDisplay.style.opacity = 0;
                
                setTimeout(() => {
                    // Panggil fungsi pembuat HTML
                    renderJadwal(hari);
                    // Berikan efek fade-in
                    jadwalDisplay.style.opacity = 1;
                }, 300);
            });
        });
    }

    // ==========================================
    // 3. FUNGSI UNTUK MERAKIT HTML DARI JSON
    // ==========================================
    function renderJadwal(hari) {
        // Mencegah error jika data JSON belum selesai dimuat saat user klik tab
        if (!dataJadwal || Object.keys(dataJadwal).length === 0) {
            jadwalDisplay.innerHTML = `<div class="jadwal-kosong"><p>Sedang memuat data...</p></div>`;
            return;
        }

        const matkulHariIni = dataJadwal[hari];
        let htmlContent = "";

        // Cek jika datanya kosong (seperti Jumat/Sabtu/Minggu)
        if (!matkulHariIni || matkulHariIni.length === 0) {
            let icon = hari === 'jumat' ? 'ph-moon-stars' : 'ph-coffee';
            let title = hari === 'jumat' ? 'Libur Akhir Pekan' : 'Tidak ada jadwal';
            let desc = hari === 'jumat' ? 'Waktunya istirahat atau mengerjakan tugas project.' : 'Hari ini dikhususkan untuk praktik dan belajar mandiri.';
            
            htmlContent = `
                <div class="jadwal-kosong">
                    <i class="ph-fill ${icon}"></i>
                    <h3>${title}</h3>
                    <p>${desc}</p>
                </div>
            `;
        } 
        // Jika ada jadwal, looping datanya untuk membuat card matkul
        else {
            matkulHariIni.forEach(item => {
                htmlContent += `
                    <div class="matkul-card">
                        <div class="mc-time"><i class="ph-bold ph-clock"></i> ${item.waktu}</div>
                        <div class="mc-info">
                            <h3>${item.matkul}</h3>
                            <div class="mc-details">
                                <span><i class="ph-fill ph-chalkboard-teacher"></i> ${item.dosen}</span>
                                <span><i class="ph-fill ph-map-pin"></i> ${item.ruang}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        // Tampilkan hasil rakitan HTML ke layar
        jadwalDisplay.innerHTML = htmlContent;
    }

    // ==========================================
    // 4. ANIMASI SCROLL REVEAL
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