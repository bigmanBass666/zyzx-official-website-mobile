/**
 * 个人中心页 JavaScript
 * Mine Page Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initUserInfo();
  initOrderTypes();
  initFunctionItems();
  initLogout();
});

/**
 * 初始化用户信息
 */
function initUserInfo() {
  const userAvatar = document.getElementById('userAvatar');
  const userName = document.getElementById('userName');
  const vipBanner = document.querySelector('.vip-banner');

  // 从 localStorage 获取用户信息
  const token = localStorage.getItem('auth_token');
  const userData = localStorage.getItem('user_data');

  if (token && userData) {
    try {
      const user = JSON.parse(userData);
      userName.textContent = user.nickname || user.username || '用户';
      if (user.avatar) {
        userAvatar.src = user.avatar;
      }
      // TODO: 检查会员状态，显示会员标识
    } catch (e) {
      console.error('Failed to parse user data:', e);
    }
  } else {
    // 未登录状态
    userName.textContent = '点击登录';
    userAvatar.src = '/img/avatar/default-avatar.png';

    // 为VIP横幅添加点击跳转登录
    if (vipBanner) {
      vipBanner.addEventListener('click', () => {
        window.location.href = '/html/login.html';
      });
    }

    // 为头像添加点击登录
    if (userAvatar) {
      userAvatar.addEventListener('click', () => {
        window.location.href = '/html/login.html';
      });
    }
  }

  // 模拟一些统计数据
  updateUserStats();
}

/**
 * 更新用户统计数据
 */
function updateUserStats() {
  const favoritesCount = localStorage.getItem('favorites_count') || Math.floor(Math.random() * 20);
  const followingCount = localStorage.getItem('following_count') || Math.floor(Math.random() * 15);
  const historyCount = localStorage.getItem('history_count') || Math.floor(Math.random() * 50);

  const stats = document.querySelector('.user-stats');
  if (stats) {
    const values = stats.querySelectorAll('.stat-value');
    if (values.length >= 3) {
      values[0].textContent = favoritesCount;
      values[1].textContent = followingCount;
      values[2].textContent = historyCount;
    }
  }
}

/**
 * 初始化订单类型点击
 */
function initOrderTypes() {
  const orderTypes = document.querySelectorAll('.order-type-item');

  orderTypes.forEach(type => {
    type.addEventListener('click', () => {
      const status = type.dataset.status;
      showToast(`查看${type.querySelector('.type-name').textContent}订单`);

      // TODO: 实际跳转到订单列表页，并传递状态参数
      // window.location.href = `/html/my-orders.html?status=${status}`;
    });
  });
}

/**
 * 初始化功能项目点击
 */
function initFunctionItems() {
  const functionItems = document.querySelectorAll('.function-item');

  functionItems.forEach(item => {
    item.addEventListener('click', () => {
      const action = item.dataset.action;

      // 检查登录状态
      const token = localStorage.getItem('auth_token');
      if (!token && ['medical-records', 'health-voucher', 'favorites', 'doctors', 'health-file'].includes(action)) {
        showToast('请先登录');
        setTimeout(() => {
          window.location.href = '/html/login.html';
        }, 1000);
        return;
      }

      const actionNames = {
        'medical-records': '我的就诊记录',
        'health-voucher': '健康券',
        'favorites': '我的收藏',
        'doctors': '关注医生',
        'health-file': '健康档案',
        'customer-service': '在线客服',
        'about': '关于我们',
        'settings': '设置'
      };

      const name = actionNames[action] || action;

      // 根据 action 跳转到不同页面
      const pageMap = {
        'medical-records': '/html/medical-records.html',
        'health-voucher': '/html/health-voucher.html',
        'favorites': '/html/favorites.html',
        'doctors': '/html/my-doctors.html',
        'health-file': '/html/health-file.html',
        'customer-service': '/html/customer-service.html',
        'about': '/html/about.html',
        'settings': '/html/settings.html'
      };

      if (pageMap[action]) {
        // TODO: 实际页面存在后启用跳转
        // window.location.href = pageMap[action];
        showToast(`${name}功能开发中`);
      } else {
        showToast(`${name}功能开发中`);
      }
    });
  });
}

/**
 * 初始化退出登录
 */
function initLogout() {
  const logoutBtn = document.getElementById('logoutBtn');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // 清除登录状态
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');

      showToast('已退出登录');

      // 延迟跳转到登录页
      setTimeout(() => {
        window.location.href = '/html/login.html';
      }, 1500);
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
