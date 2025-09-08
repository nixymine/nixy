document.addEventListener('DOMContentLoaded', function() {

    // === ELEMEN-ELEMEN PENTING ===
    const copyrightSpan = document.getElementById('copyright-year');
    const themeToggleButton = document.getElementById('theme-toggle');
    
    // === FUNGSI COPYRIGHT TAHUN OTOMATIS ===
    if (copyrightSpan) {
        copyrightSpan.textContent = new Date().getFullYear();
    }

    // === FUNGSI UNTUK DARK MODE ===
    if (themeToggleButton) {
        const themeIcon = themeToggleButton.querySelector('i');
        let currentTheme = localStorage.getItem('theme') || 'light';

        const applyTheme = (theme) => {
            // Menambahkan atau menghapus class 'dark-mode' dari body
            document.body.classList.toggle('dark-mode', theme === 'dark');
            
            // Menggunakan toggle untuk ikon agar lebih aman dan anti-gagal
            // Ini memastikan ikon matahari HANYA ada saat mode gelap, dan ikon bulan HANYA ada saat mode terang
            if (themeIcon) {
                themeIcon.classList.toggle('fa-sun', theme === 'dark');
                themeIcon.classList.toggle('fa-moon', theme !== 'dark');
            }
        };
        
        // Terapkan tema saat halaman pertama kali dimuat
        applyTheme(currentTheme);

        // Tambahkan event listener untuk tombol
        themeToggleButton.addEventListener('click', () => {
            currentTheme = (currentTheme === 'light') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
            applyTheme(currentTheme);
        });
    }

    // === FUNGSI UNTUK TOMBOL SHARE ===
    const articleTitleElement = document.querySelector('.article-header h1');
    if (articleTitleElement) {
        const pageUrl = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(articleTitleElement.textContent.trim());

        const shareLinks = {
            whatsapp: document.getElementById('share-whatsapp'),
            telegram: document.getElementById('share-telegram'),
            facebook: document.getElementById('share-facebook'),
            twitter: document.getElementById('share-twitter')
        };

        if (shareLinks.whatsapp) {
            shareLinks.whatsapp.href = `https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}`;
        }
        if (shareLinks.telegram) {
            shareLinks.telegram.href = `https://t.me/share/url?url=${pageUrl}&text=${pageTitle}`;
        }
        if (shareLinks.facebook) {
            shareLinks.facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
        }
        if (shareLinks.twitter) {
            shareLinks.twitter.href = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
        }
    }
});