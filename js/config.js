/**
 * 首页核心交互逻辑
 * 严格遵循原生JS规范，无框架依赖
 */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCarousel();
});

/** 移动端导航切换 */
function initNavbar() {
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // 点击菜单外部自动关闭
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navLinks.classList.contains('open')) {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/** 轮播图逻辑（严格按需求：悬停启动，移出暂停） */
function initCarousel() {
  const carousel = document.getElementById('heroCarousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');

  let currentIndex = 0;
  let autoSlideInterval;
  const slideCount = slides.length;
  const SLIDE_DURATION = 4000; // 每张停留4秒

  // 动态生成指示点
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `跳转至第 ${i + 1} 张`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.dot');

  function updateSlide() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
  }

  function goToSlide(index) {
    currentIndex = index < 0 ? slideCount - 1 : index >= slideCount ? 0 : index;
    updateSlide();
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => goToSlide(currentIndex + 1), SLIDE_DURATION);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // 事件绑定
  prevBtn.addEventListener('click', () => { goToSlide(currentIndex - 1); startAutoSlide(); });
  nextBtn.addEventListener('click', () => { goToSlide(currentIndex + 1); startAutoSlide(); });

  // 🎯 核心交互：鼠标移入开始自动轮播，移出暂停（完全匹配需求）
  carousel.addEventListener('mouseenter', startAutoSlide);
  carousel.addEventListener('mouseleave', stopAutoSlide);

  // 移动端触摸滑动支持
  let touchStartX = 0;
  carousel.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; stopAutoSlide(); }, { passive: true });
  carousel.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) diff < 0 ? goToSlide(currentIndex + 1) : goToSlide(currentIndex - 1);
    startAutoSlide();
  }, { passive: true });
}