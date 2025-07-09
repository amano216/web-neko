document.addEventListener('DOMContentLoaded', function() {
    // スムーススクロール
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // スクロールアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // 監視する要素を追加
    const animatedElements = document.querySelectorAll('.scroll-animation');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // パララックス効果
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = heroSection.querySelector('.hero-content');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }

    // 画像の遅延読み込み
    const images = document.querySelectorAll('img');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 300px 0px'
    };

    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => {
        if (!img.complete || img.naturalHeight === 0) {
            img.style.backgroundColor = '#f5f5f5';
        }
        imageObserver.observe(img);
    });

    // マウス追従エフェクト
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / 50;
            const y = (e.clientY - window.innerHeight / 2) / 50;
            heroContent.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
});

// ページロード時のアニメーション
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // ローディング画面がある場合は非表示に
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});