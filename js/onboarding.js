// 引导页逻辑

export function initOnboarding() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const skipBtn = document.getElementById('skip-btn');
  const startBtn = document.getElementById('start-btn');

  let currentIndex = 0;
  const totalSlides = slides.length;

  // 显示对应页面
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    // 最后一页显示开始按钮，隐藏跳过按钮
    if (index === totalSlides - 1) {
      startBtn.style.display = 'block';
      skipBtn.style.display = 'none';
    } else {
      startBtn.style.display = 'none';
      skipBtn.style.display = 'block';
    }
  }

  // 下一张
  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      showSlide(currentIndex);
    }
  }

  // 上一张
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      showSlide(currentIndex);
    }
  }

  // 滑动支持
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  // 事件绑定
  skipBtn.addEventListener('click', () => {
    window.location.href = '/html/login.html';
  });

  startBtn.addEventListener('click', () => {
    // 保存已看过引导
    localStorage.setItem('onboardingCompleted', 'true');
    window.location.href = '/html/login.html';
  });

  // 点击指示器跳转
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  // 初始化显示
  showSlide(0);
}

// 自动执行初始化
if (document.currentScript) {
  initOnboarding();
}