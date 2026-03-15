/**
 * 商城首页 JavaScript
 * Mall Homepage Interactions
 */

// 分类导航点击处理
document.addEventListener('DOMContentLoaded', () => {
  initCategoryNavigation();
  initProductCards();
  initPremiumCards();
});

/**
 * 初始化分类导航点击事件
 */
function initCategoryNavigation() {
  const categoryItems = document.querySelectorAll('.category-item');

  categoryItems.forEach(item => {
    item.addEventListener('click', () => {
      const categoryName = item.querySelector('p').textContent;

      // 显示轻量toast反馈
      showToast(`进入${categoryName}分类`);

      //  TODO: 实际跳转到分类页或加载对应商品
      // window.location.href = `/html/category.html?name=${encodeURIComponent(categoryName)}`;
    });
  });
}

/**
 * 初始化商品卡片点击事件
 */
function initProductCards() {
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    card.addEventListener('click', () => {
      const productName = card.querySelector('.product-name').textContent;

      // 显示轻量toast反馈
      showToast(`查看商品：${productName}`);

      // TODO: 实际跳转到商品详情页
      // window.location.href = `/html/product-detail.html?name=${encodeURIComponent(productName)}`;
    });
  });
}

/**
 * 初始化优选药材卡片点击事件
 */
function initPremiumCards() {
  const premiumCards = document.querySelectorAll('.premium-card');

  premiumCards.forEach(card => {
    card.addEventListener('click', () => {
      const premiumName = card.querySelector('.premium-name').textContent;

      // 显示轻量toast反馈
      showToast(`查看优选：${premiumName}`);

      // TODO: 实际跳转到商品详情页
      // window.location.href = `/html/product-detail.html?name=${encodeURIComponent(premiumName)}`;
    });
  });
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

/**
 * 搜索框交互
 */
const searchInput = document.querySelector('.search-input');
if (searchInput) {
  searchInput.addEventListener('focus', () => {
    showToast('搜索功能开发中');
  });
}
