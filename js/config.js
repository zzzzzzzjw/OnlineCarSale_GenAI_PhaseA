document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('heroCarousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');

  let currentIndex = 0;
  let autoSlideInterval;
  const totalSlides = slides.length;

  // 生成指示点
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll('.dot');

  function updateSlide() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
  }

  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    updateSlide();
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => goToSlide(currentIndex + 1), 3000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // ✅ 核心交互：鼠标移入自动滑，移出停止
  carousel.addEventListener('mouseenter', startAutoSlide);
  carousel.addEventListener('mouseleave', stopAutoSlide);

  // 箭头点击
  prevBtn.addEventListener('click', () => { goToSlide(currentIndex - 1); startAutoSlide(); });
  nextBtn.addEventListener('click', () => { goToSlide(currentIndex + 1); startAutoSlide(); });
});