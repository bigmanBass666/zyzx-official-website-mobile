/**
 * 商品详情页 JavaScript
 * Product Detail Page Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initImageGallery();
  initQuantitySelector();
  initSpecSelector();
  initActionBar();
});

/**
 * 图片轮播功能
 */
let currentSlide = 0;
let touchStartX = 0;
let touchEndX = 0;

function initImageGallery() {
  const track = document.getElementById('galleryTrack');
  const slides = document.querySelectorAll('.gallery-slide');
  const indicators = document.querySelectorAll('.indicator');

  if (!track || slides.length === 0) return;

  // 更新轮播位置和指示器
  function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    indicators.forEach((ind, idx) => {
      ind.classList.toggle('active', idx === currentSlide);
    });
  }

  // 下一张
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
  }

  // 上一张
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  // 触摸事件处理
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }, { passive: true });

  // 点击轮播区域暂停自动播放（如果有）
  track.addEventListener('click', () => {
    // 可以添加点击放大功能
  });
}

/**
 * 数量选择器
 */
function initQuantitySelector() {
  const minusBtn = document.querySelector('.qty-btn.minus');
  const plusBtn = document.querySelector('.qty-btn.plus');
  const input = document.querySelector('.qty-input');

  if (!minusBtn || !plusBtn || !input) return;

  let quantity = parseInt(input.value) || 1;
  const min = parseInt(input.min) || 1;
  const max = parseInt(input.max) || 99;

  function updateQuantity(newQty) {
    quantity = Math.max(min, Math.min(max, newQty));
    input.value = quantity;
    minusBtn.disabled = quantity <= min;
  }

  minusBtn.addEventListener('click', () => {
    updateQuantity(quantity - 1);
  });

  plusBtn.addEventListener('click', () => {
    updateQuantity(quantity + 1);
  });
}

/**
 * 规格选择
 */
function initSpecSelector() {
  const specOptions = document.querySelectorAll('.spec-option');

  specOptions.forEach(option => {
    option.addEventListener('click', () => {
      specOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');

      const specName = option.textContent;
      showToast(`已选择：${specName}`);

      // TODO: 根据规格更新价格
    });
  });
}

/**
 * 底部操作栏
 */
function initActionBar() {
  const backBtn = document.querySelector('.back-btn');
  const shareBtn = document.querySelector('.share-btn');
  const favoriteBtn = document.getElementById('favoriteBtn');
  const customerServiceBtn = document.getElementById('customerServiceBtn');
  const cartBtn = document.getElementById('cartBtn');
  const addCartBtn = document.querySelector('.btn-add-cart');
  const buyNowBtn = document.querySelector('.btn-buy-now');
  const claimBtn = document.querySelector('.btn-claim');

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.history.back();
    });
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      showToast('分享功能开发中');
    });
  }

  if (favoriteBtn) {
    let favorited = false;
    favoriteBtn.addEventListener('click', () => {
      favorited = !favorited;
      const icon = favoriteBtn.querySelector('i');

      if (favorited) {
        icon.classList.remove('icon-favorite');
        icon.classList.add('icon-favorite-filled');
        icon.style.color = 'var(--color-primary)';
        showToast('已收藏');
      } else {
        icon.classList.remove('icon-favorite-filled');
        icon.classList.add('icon-favorite');
        icon.style.color = '';
        showToast('取消收藏');
      }
    });
  }

  if (customerServiceBtn) {
    customerServiceBtn.addEventListener('click', () => {
      showToast('客服功能开发中');
    });
  }

  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      showToast('购物车功能开发中');
    });
  }

  if (addCartBtn) {
    addCartBtn.addEventListener('click', () => {
      const qty = document.querySelector('.qty-input')?.value || 1;
      showToast(`已添加 ${qty} 件商品到购物车`);
    });
  }

  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      const qty = document.querySelector('.qty-input')?.value || 1;
      showToast(`即将购买 ${qty} 件商品`);
    });
  }

  if (claimBtn) {
    claimBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('优惠券领取成功！');
      claimBtn.textContent = '已领取';
      claimBtn.disabled = true;
    });
  }
}

/**
 * 显示轻量toast提示
 * @param {string} message - 提示消息
 * @param {number} duration - 显示时长（毫秒）
 */
function showToast(message, duration = 1500) {
  // 移除已存在的toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  // 创建toast元素
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  // 添加样式
  toast.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 12px 24px;
    background: rgba(0, 0, 0, 0.75);
    color: white;
    border-radius: 8px;
    font-size: 14px;
    z-index: 9999;
    animation: toastFadeInOut ${duration}ms ease-in-out;
  `;

  // 添加动画样式
  const style = document.createElement('style');
  style.textContent = `
    @keyframes toastFadeInOut {
      0% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
      15% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      85% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toast);

  // 自动移除
  setTimeout(() => {
    toast.remove();
    style.remove();
  }, duration);
}
