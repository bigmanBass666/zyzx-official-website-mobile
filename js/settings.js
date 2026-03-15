/**
 * 设置页 JavaScript
 * Settings Page Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initSettingsItems();
  initCacheSize();
});

/**
 * 初始化设置项目点击事件
 */
function initSettingsItems() {
  const settingsItems = document.querySelectorAll('.settings-item');

  settingsItems.forEach(item => {
    item.addEventListener('click', () => {
      const action = item.dataset.action;

      switch (action) {
        case 'profile':
          showToast('个人资料页面开发中');
          break;
        case 'password':
          showToast('修改密码功能开发中');
          break;
        case 'about':
          showToast('关于我们');
          // TODO: 显示关于我们模态框或跳转
          break;
        case 'version':
          // 版本号已显示，无需操作
          break;
        case 'clear-cache':
          clearCache();
          break;
        case 'logout':
          performLogout();
          break;
        default:
          if (action) {
            showToast(`${action}功能开发中`);
          }
      }
    });
  });
}

/**
 * 初始化和显示缓存大小
 */
function initCacheSize() {
  const cacheSizeElement = document.getElementById('cacheSize');
  if (cacheSizeElement) {
    const size = estimateCacheSize();
    cacheSizeElement.textContent = size;
  }
}

/**
 * 估算 localStorage 缓存大小
 * @returns {string} 格式化的大小字符串
 */
function estimateCacheSize() {
  try {
    let totalSize = 0;
    const keys = Object.keys(localStorage);

    keys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        totalSize += value.length * 2; // UTF-16 字符
      }
    });

    totalSize += keys.length * 34; // 键名开销估算

    if (totalSize < 1024) {
      return `${totalSize} B`;
    } else if (totalSize < 1024 * 1024) {
      return `${(totalSize / 1024).toFixed(2)} KB`;
    } else {
      return `${(totalSize / (1024 * 1024)).toFixed(2)} MB`;
    }
  } catch (e) {
    console.error('Failed to estimate cache size:', e);
    return 'Unknown';
  }
}

/**
 * 清除缓存
 */
function clearCache() {
  const confirmClear = confirm('确定要清除所有缓存数据吗？\n（不会删除登录状态和订单数据）');

  if (!confirmClear) {
    return;
  }

  try {
    // 获取需要保留的键
    const preservedKeys = ['auth_token', 'user_data', 'orders', 'cart'];

    // 获取所有键并删除非保留键
    const keys = Object.keys(localStorage);
    let clearedCount = 0;

    keys.forEach(key => {
      if (!preservedKeys.includes(key)) {
        localStorage.removeItem(key);
        clearedCount++;
      }
    });

    // 更新显示的缓存大小
    const cacheSizeElement = document.getElementById('cacheSize');
    if (cacheSizeElement) {
      cacheSizeElement.textContent = '0 B';
    }

    showToast(`已清除 ${clearedCount} 项缓存数据`);
  } catch (e) {
    console.error('Failed to clear cache:', e);
    showToast('清除缓存失败');
  }
}

/**
 * 执行退出登录
 */
function performLogout() {
  const confirmLogout = confirm('确定要退出当前账号吗？');

  if (!confirmLogout) {
    return;
  }

  // 清除登录状态
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_data');

  showToast('已退出登录');

  // 延迟跳转到登录页
  setTimeout(() => {
    window.location.href = '/html/login.html';
  }, 1500);
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
