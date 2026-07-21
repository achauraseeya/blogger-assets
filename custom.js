/**
 * custom.js - Interactive Client Logic hosted on GitHub Pages
 * Powers all smart actions dynamically on your Blogger Site.
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Blogger dynamic features initialized successfully!');

  // 1. PREMIUM DARK MODE MODULE
  const themeToggle = document.getElementById('dark-mode-toggle');
  if (themeToggle) {
    const applyTheme = (theme) => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    };

    // Set initial theme state
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    // Click handler
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(currentTheme);
    });
  }

  // 2. READING PROGRESS BAR INDICATOR
  const progressBar = document.getElementById('reading-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  // 3. ELEVATOR BACK TO TOP CONTROLLER
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. INSTANT SEARCH & CARD FILTER ALGORITHM
  const searchInput = document.getElementById('post-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const postCards = document.querySelectorAll('.post-card');

      postCards.forEach(card => {
        const title = card.querySelector('.post-title')?.textContent?.toLowerCase() || '';
        const snippet = card.querySelector('.post-snippet')?.textContent?.toLowerCase() || '';

        if (title.includes(query) || snippet.includes(query)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // 5. ANNOUNCEMENT BANNER DISMISS ENGINE
  const banner = document.getElementById('notice-banner');
  const closeBannerBtn = document.getElementById('close-banner');
  if (banner && closeBannerBtn) {
    // Check if dismissed in session
    if (sessionStorage.getItem('notice_dismissed') === 'true') {
      banner.style.display = 'none';
    }

    closeBannerBtn.addEventListener('click', () => {
      banner.style.display = 'none';
      sessionStorage.setItem('notice_dismissed', 'true');
    });
  }

  // 6. ENGAGEMENT NEWSLETTER DIALOG MANAGER
  const newsletterModal = document.getElementById('newsletter-modal');
  const openModalBtns = document.querySelectorAll('#trigger-newsletter');
  const closeModalBtn = document.getElementById('close-newsletter');

  if (newsletterModal) {
    const showModal = () => {
      newsletterModal.classList.remove('opacity-0', 'pointer-events-none');
      newsletterModal.classList.add('opacity-100');
    };

    const hideModal = () => {
      newsletterModal.classList.add('opacity-0', 'pointer-events-none');
      newsletterModal.classList.remove('opacity-100');
    };

    openModalBtns.forEach(btn => btn.addEventListener('click', showModal));
    if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);

    // Show after 10 seconds of active browsing once per session
    if (!sessionStorage.getItem('newsletter_shown')) {
      setTimeout(() => {
        showModal();
        sessionStorage.setItem('newsletter_shown', 'true');
      }, 10000);
    }

    // Dismiss on click background
    newsletterModal.addEventListener('click', (e) => {
      if (e.target === newsletterModal) {
        hideModal();
      }
    });
  }
});
