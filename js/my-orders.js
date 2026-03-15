/**
 * 我的订单页 JavaScript
 * My Orders Page Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initOrderTabs();
  initActionButtons();
});

/**
 * 订单 Tab 切换
 */
function initOrderTabs() {
  const tabItems = document.querySelectorAll('.tab-item');
  const orderCards = document.querySelectorAll('.order-card');

  tabItems.forEach(tab => {
    tab.addEventListener('click', () => {
      const status = tab.dataset.status;

      // 更新 tab 样式
      tabItems.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // 筛选订单卡片
      if (status === 'all') {
        orderCards.forEach(card => card.classList.add('active'));
      } else {
        orderCards.forEach(card => {
          card.classList.toggle('active', card.dataset.status === status);
        });
      }

      // 检查是否显示空状态
      const visibleCards = document.querySelectorAll('.order-card.active');
      const emptyState = document.querySelector('.empty-state');
      if (emptyState) {
        emptyState.style.display = visibleCards.length === 0 ? 'flex' : 'none';
      }
    });
  });

  // 默认显示所有订单
  const allTab = document.querySelector('.tab-item[data-status="all"]');
  if (allTab) {
    allTab.click();
  }
}

/**
 * 操作按钮点击处理
 */
function initActionButtons() {
  // 订单操作按钮
  const actionButtons = document.querySelectorAll('.order-actions .btn-action');

  actionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = btn.textContent.trim();
      const orderCard = btn.closest('.order-card');
      const orderStatus = orderCard?.dataset.status;

      switch (action) {
        case '去支付':
          showToast('跳转支付页面');
          // TODO: 实际跳转到支付页面
          break;
        case '取消订单':
          showToast('订单已取消');
          orderCard?.remove();
          break;
        case '提醒发货':
          showToast('已提醒卖家发货');
          break;
        case '申请退款':
          showToast('退款申请已提交');
          break;
        case '查看物流':
          showToast('查看物流详情');
          // TODO: 打开物流跟踪弹窗
          break;
        case '申请售后':
          showToast('售后申请页面');
          // TODO: 跳转到售后申请页面
          break;
        case '确认收货':
          showToast('确认收货成功');
          orderCard?.remove();
          break;
        case '再次购买':
          showToast('已加入购物车');
          break;
        case '去评价':
        case '追加评价':
          showToast('评价页面开发中');
          // TODO: 跳转到评价页面
          break;
        default:
          showToast(`操作：${action}`);
      }
    });
  });

  // 商城按钮
  const goMallBtn = document.querySelector('.btn-go-mall');
  if (goMallBtn) {
    goMallBtn.addEventListener('click', () => {
      window.location.href = '/html/mall.html';
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
