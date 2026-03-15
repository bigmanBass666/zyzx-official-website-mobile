/**
 * 社区页 JavaScript
 * Community Page Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabSwitch();
  initLikeButtons();
  initFollowButtons();
});

/**
 * Tab 切换功能
 */
function initTabSwitch() {
  const tabItems = document.querySelectorAll('.tab-item');
  const tabContents = document.querySelectorAll('.tab-content');

  tabItems.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;

      // 更新 tab 样式
      tabItems.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // 切换内容显示
      tabContents.forEach(content => {
        content.classList.toggle('active', content.id === `tab-${targetTab}`);
      });

      // 触发自定义事件
      document.dispatchEvent(new CustomEvent('tabchange', { detail: { tab: targetTab } }));
    });
  });
}

/**
 * 点赞按钮功能
 */
function initLikeButtons() {
  const likeBtns = document.querySelectorAll('.like-btn');

  likeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      const span = btn.querySelector('span');
      let count = parseInt(span.textContent) || 0;
      const isLiked = btn.classList.contains('liked');

      if (isLiked) {
        btn.classList.remove('liked');
        count--;
      } else {
        btn.classList.add('liked');
        count++;
        // 添加动画效果
        const icon = btn.querySelector('i');
        icon.style.transform = 'scale(1.3)';
        setTimeout(() => {
          icon.style.transform = 'scale(1)';
        }, 200);
      }

      span.textContent = count;
    });
  });
}

/**
 * 关注按钮功能
 */
function initFollowButtons() {
  const followBtns = document.querySelectorAll('.follow-btn');

  followBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      const isFollowed = btn.classList.contains('followed');

      if (isFollowed) {
        btn.classList.remove('followed');
        btn.textContent = '关注';
      } else {
        btn.classList.add('followed');
        btn.textContent = '已关注';
      }
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
