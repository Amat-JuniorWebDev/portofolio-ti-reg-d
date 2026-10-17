document.addEventListener('DOMContentLoaded', () => {

    // =======================================================
    // 1. EFEK SCROLL REVEAL (Animasi Muncul Perlahan)
    // =======================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.classList.add('active');
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: "0px 0px -30px 0px", 
        threshold: 0.05
    });
    revealElements.forEach(el => revealObserver.observe(el));


    // =======================================================
    // 2. FETCH DATA JSON & RENDER JADWAL
    // =======================================================
    let scheduleDatabase = {};
    const wrapper = document.getElementById("schedule-wrapper");
    const container = document.getElementById("cards-container");
    const tabButtons = document.querySelectorAll(".tab-btn");

    // Ambil data jadwal dari file data/jadwal.json
    fetch('data/jadwal.json')
        .then(response => {
            if (!response.ok) throw new Error("Gagal mengambil jadwal.json");
            return response.json();
        })
        .then(data => {
            scheduleDatabase = data;
            renderDaySchedule("senin"); // Muat hari Senin sebagai default awal
        })
        .catch(error => {
            console.error("Error:", error);
            container.innerHTML = `
                <div class="col-span-full p-8 text-center bg-surface-card rounded-xl border border-error/20">
                    <span class="material-symbols-outlined text-[48px] text-error mb-2">error</span>
                    <p class="text-body-lg text-on-surface-variant font-medium">Gagal memuat jadwal. Pastikan Anda menjalankan web via Live Server / Localhost.</p>
                </div>
            `;
        });

    // Fungsi Render Card Berdasarkan Hari
    function renderDaySchedule(dayKey) {
        // Efek Fade-out
        wrapper.classList.remove("opacity-100");
        wrapper.classList.add("opacity-0");

        setTimeout(() => {
            const scheduleList = scheduleDatabase[dayKey] || [];
            container.innerHTML = "";

            if (scheduleList.length === 0) {
                container.innerHTML = `
                    <div class="col-span-full p-8 text-center bg-surface-card rounded-xl border border-border-subtle shadow-sm">
                        <span class="material-symbols-outlined text-[48px] text-outline mb-2">event_busy</span>
                        <p class="text-lg text-on-surface-variant font-medium font-headline-md">Tidak ada perkuliahan</p>
                        <p class="text-sm text-outline mt-1">Gunakan waktu ini untuk mengerjakan tugas atau beristirahat.</p>
                    </div>
                `;
            } else {
                scheduleList.forEach((item, index) => {
                    const animationDelay = index * 100;
                    
                    // PENYESUAIAN BUG UNDEFINED:
                    // Jika data tidak ada di JSON, kita berikan nilai default agar desain tidak rusak!
                    const ruangan = item.ruang || "Ruang 4"; 
                    const dosen = item.dosen || "Dosen Belum Ditentukan";
                    const matkul = item.matkul || "Mata Kuliah";
                    const waktu = item.waktu || "00.00 - 00.00";
                    
                    // Ikon default elegan untuk menutupi bug "UNDEFINED"
                    const icon = "menu_book"; 
                    const badge = "Mata Kuliah Reguler"; 
                    const badgeColor = "bg-tertiary-fixed/15 text-tertiary-fixed border-tertiary-fixed/30";

                    const cardHTML = `
                        <div class="group relative overflow-hidden rounded-xl bg-surface-card border border-border-subtle p-6 transition-all duration-300 hover:border-tertiary-fixed hover:shadow-lg flex flex-col justify-between" style="animation: fadeSlideUp 0.4s ease forwards ${animationDelay}ms; opacity: 0;">
                            <!-- Top Accent Stripe -->
                            <div class="absolute top-0 left-0 right-0 h-[3px] bg-secondary-container group-hover:bg-tertiary-fixed transition-colors"></div>
                            
                            <div>
                                <!-- Header: Waktu & Badge -->
                                <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                                    <div class="inline-flex items-center gap-1.5 text-secondary font-semibold font-headline-md text-sm">
                                        <span class="material-symbols-outlined text-[18px]">schedule</span>
                                        <span>${waktu} WITA</span>
                                    </div>
                                    <span class="text-[11px] px-3 py-1 rounded-full border ${badgeColor} font-semibold tracking-wide">
                                        ${badge}
                                    </span>
                                </div>

                                <!-- Mata Kuliah Title -->
                                <div class="flex items-start gap-3 mb-6">
                                    <div class="w-11 h-11 rounded-lg bg-surface-container flex-shrink-0 flex items-center justify-center text-primary-container mt-0.5">
                                        <span class="material-symbols-outlined text-[22px]">${icon}</span>
                                    </div>
                                    <div>
                                        <h3 class="font-headline-md text-lg font-bold text-text-tinta group-hover:text-primary-container transition-colors leading-snug">
                                            ${matkul}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            <!-- Footer Detail: Dosen & Ruangan -->
                            <div class="pt-4 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-on-surface-variant">
                                <div class="flex items-center gap-2">
                                    <span class="material-symbols-outlined text-[18px] text-outline">co_present</span>
                                    <span class="truncate font-medium text-text-tinta">${dosen}</span>
                                </div>
                                <div class="flex items-center gap-2 sm:justify-end">
                                    <span class="material-symbols-outlined text-[18px] text-outline">location_on</span>
                                    <span class="font-medium text-text-tinta">${ruangan}</span>
                                </div>
                            </div>
                        </div>
                    `;
                    container.insertAdjacentHTML("beforeend", cardHTML);
                });
            }

            wrapper.classList.remove("opacity-0");
            wrapper.classList.add("opacity-100");
        }, 200); 
    }

    // =======================================================
    // 3. TAB NAVIGATION HANDLER
    // =======================================================
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => {
                b.className = "tab-btn px-6 py-3 rounded-lg font-headline-md text-sm font-semibold transition-all duration-200 flex items-center gap-2 bg-surface-card text-on-surface-variant hover:text-text-tinta border border-border-subtle hover:border-tertiary-fixed";
                const icon = b.querySelector(".material-symbols-outlined");
                if (icon) icon.className = "material-symbols-outlined text-[18px]";
            });

            btn.className = "tab-btn px-6 py-3 rounded-lg font-headline-md text-sm font-semibold transition-all duration-200 flex items-center gap-2 bg-primary-container text-surface-kertas shadow-sm ring-1 ring-primary-container";
            const icon = btn.querySelector(".material-symbols-outlined");
            if (icon) icon.className = "material-symbols-outlined text-[18px] text-secondary-container";

            const day = btn.getAttribute("data-day");
            renderDaySchedule(day);
        });
    });
});