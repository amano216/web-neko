// 設定値の定数化 - マジックナンバーを排除
const CONFIG = {
    SCROLL_ANIMATION_THRESHOLD: 0.1,
    SCROLL_ANIMATION_MARGIN: '0px 0px -100px 0px',
    PARALLAX_FACTOR: 0.3, // 視差効果の強さ（0.3 = 30%の速度で追従）
    MOUSE_FOLLOW_SENSITIVITY: 50, // マウス追従の感度（大きいほど動きが小さい）
    LOADER_FADE_DURATION: 500, // ローダーのフェードアウト時間（ミリ秒）
    IMAGE_LAZY_LOAD_MARGIN: '0px 0px 300px 0px' // 画像の先読み範囲
};

// スムーススクロール機能
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', handleAnchorClick);
    });
}

function handleAnchorClick(event) {
    event.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// スクロールアニメーション機能
function initScrollAnimations() {
    const observerOptions = {
        threshold: CONFIG.SCROLL_ANIMATION_THRESHOLD,
        rootMargin: CONFIG.SCROLL_ANIMATION_MARGIN
    };

    const animationObserver = new IntersectionObserver(handleScrollAnimation, observerOptions);
    const animatedElements = document.querySelectorAll('.scroll-animation');
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}

function handleScrollAnimation(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 要素が表示領域に入ったらアニメーションクラスを追加
            entry.target.classList.add('active');
        }
    });
}

// パララックス効果
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const heroContent = heroSection.querySelector('.hero-content');
    if (!heroContent) return;
    
    // スクロール時の視差効果を最適化のためthrottleで制御
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollDistance = window.pageYOffset;
                const parallaxDistance = scrollDistance * CONFIG.PARALLAX_FACTOR;
                heroContent.style.transform = `translateY(${parallaxDistance}px)`;
                ticking = false;
            });
            ticking = true;
        }
    });
}

// 画像の遅延読み込み
function initLazyLoadImages() {
    const imageOptions = {
        threshold: 0,
        rootMargin: CONFIG.IMAGE_LAZY_LOAD_MARGIN
    };

    const imageObserver = new IntersectionObserver(handleImageIntersection, imageOptions);
    const images = document.querySelectorAll('img');
    
    images.forEach(image => {
        // 画像が未読み込みまたはエラーの場合、背景色を設定
        if (!image.complete || image.naturalHeight === 0) {
            image.style.backgroundColor = '#f5f5f5';
        }
        imageObserver.observe(image);
    });
}

function handleImageIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const image = entry.target;
            
            // data-src属性がある場合は遅延読み込みを実行
            if (image.dataset.src) {
                image.src = image.dataset.src;
                image.removeAttribute('data-src');
            }
            
            image.classList.add('loaded');
            observer.unobserve(image);
        }
    });
}

// マウス追従エフェクト
function initMouseFollowEffect() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;
    
    // パフォーマンス最適化のためthrottleで制御
    let mouseThrottle = false;
    
    document.addEventListener('mousemove', (event) => {
        if (!mouseThrottle) {
            window.requestAnimationFrame(() => {
                const windowCenterX = window.innerWidth / 2;
                const windowCenterY = window.innerHeight / 2;
                
                // マウス位置から画面中心への相対位置を計算
                const offsetX = (event.clientX - windowCenterX) / CONFIG.MOUSE_FOLLOW_SENSITIVITY;
                const offsetY = (event.clientY - windowCenterY) / CONFIG.MOUSE_FOLLOW_SENSITIVITY;
                
                heroContent.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                mouseThrottle = false;
            });
            mouseThrottle = true;
        }
    });
}

// ページロード完了時の処理
function handlePageLoad() {
    document.body.classList.add('loaded');
    
    // ローディング画面が存在する場合のフェードアウト処理
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, CONFIG.LOADER_FADE_DURATION);
    }
}

// 初期化処理
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initScrollAnimations();
    initParallaxEffect();
    initLazyLoadImages();
    initMouseFollowEffect();
});

window.addEventListener('load', handlePageLoad);