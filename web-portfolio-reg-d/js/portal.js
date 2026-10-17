document.addEventListener("DOMContentLoaded", () => {
    // Terminal Loading Step Simulation (Portfolio Theme)
    const terminalLogs = [
        { text: "Memuat aset portofolio kelas...", progress: 24, status: "MEMUAT DATA" },
        { text: "Menyinkronkan data galeri & UI/UX proyek...", progress: 58, status: "VERIFIKASI" },
        { text: "Mempersiapkan etalase karya TI Reg D BJM...", progress: 85, status: "PROSES REPO" },
        { text: "Sistem siap. Selamat datang di Portofolio Kami.", progress: 100, status: "TERSEDIA" }
    ];

    let currentStep = 0;
    const progressPercent = document.getElementById("progressPercent");
    const portalProgressBar = document.getElementById("portalProgressBar");
    const terminalStep = document.getElementById("terminalStep");
    const statusStateLabel = document.getElementById("statusStateLabel");
    const spinIcon = document.getElementById("spinIcon");
    const enterBtn = document.getElementById("enterPortalBtn");
    const skipBtn = document.getElementById("skipBtn");

    function advanceInitialization() {
        if (currentStep < terminalLogs.length) {
            const item = terminalLogs[currentStep];
            terminalStep.textContent = item.text;
            statusStateLabel.textContent = item.status;
            portalProgressBar.style.width = item.progress + "%";
            progressPercent.textContent = item.progress + "%";
            
            if (item.progress === 100) {
                spinIcon.classList.remove("animate-spin");
                spinIcon.textContent = "check_circle";
                spinIcon.classList.add("text-tertiary-fixed");
                enterBtn.classList.add("ring-4", "ring-tertiary-fixed/30");
            }
            
            currentStep++;
            setTimeout(advanceInitialization, currentStep === terminalLogs.length ? 1500 : 900);
        }
    }

    // Launch progress sequence after short entrance delay
    setTimeout(advanceInitialization, 400);

    // Audio Visualizer Toggle Logic
    let isAudioOn = true;
    const audioToggleBtn = document.getElementById("audioToggleBtn");
    const audioStateText = document.getElementById("audioStateText");
    const soundbars = document.querySelectorAll(".soundbar");

    audioToggleBtn.addEventListener("click", () => {
        isAudioOn = !isAudioOn;
        if (isAudioOn) {
            audioStateText.textContent = "Ambience: Aktif";
            soundbars.forEach(bar => bar.style.animationPlayState = "running");
            audioToggleBtn.classList.remove("opacity-60");
        } else {
            audioStateText.textContent = "Ambience: Senyap";
            soundbars.forEach(bar => {
                bar.style.animationPlayState = "paused";
                bar.style.height = "4px";
            });
            audioToggleBtn.classList.add("opacity-60");
        }
    });

   // Enter Portal Transition Logic
    function enterMainPortal() {
        const curtain = document.getElementById("transitionCurtain");
        curtain.classList.remove("pointer-events-none");
        curtain.classList.add("opacity-100");
        
        // KUNCI SCROLL PALING AMPUH (Untuk Desktop & Mobile)
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        
        // Arahkan ke file utama setelah animasi transisi berjalan (1 detik)
        setTimeout(() => {
            
            // PENTING: Pastikan file tujuan Anda benar bernama "home.html"
            // Jika namanya "index.php" atau "index.html", silakan ubah teks di bawah ini!
            window.location.href = "home.html";
            
        }, 1000);
    }

    // Assign event listeners
    enterBtn.addEventListener("click", enterMainPortal);
    skipBtn.addEventListener("click", enterMainPortal);
});