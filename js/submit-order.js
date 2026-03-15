/**
 * 提交订单页 JavaScript
 * Submit Order Page Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initCouponClaims();
  initSubmitOrder();
});

/**
 * 优惠券领取
 */
function initCouponClaims() {
  const claimBtns = document.querySelectorAll('.btn-claim');

  claimBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const couponItem = btn.closest('.coupon-item');
      const couponName = couponItem?.querySelector('.coupon-name')?.textContent;

      btn.textContent = '已领取';
      btn.classList.remove('btn-claim');
      btn.classList.add('btn-claimed');
      btn.disabled = true;

      showToast(`成功领取「${couponName || '优惠券'}」`);

      // 更新价格明细
      updatePriceAfterCoupon();
    });
  });
}

/**
 * 更新优惠后价格
 */
function updatePriceAfterCoupon() {
  const claimedCoupons = document.querySelectorAll('.btn-claimed');
  let totalDiscount = 0;

  if (claimedCoupons.length > 0) {
    // 这里简化处理：假设每张优惠券都可用，实际应该根据订单金额判断
    totalDiscount = 20; // 新用户券20元
  }

  // 更新价格明细
  const discountElement = document.querySelector('.price-item.highlight .price-value');
  if (discountElement) {
    discountElement.textContent = `-¥${totalDiscount.toFixed(2)}`;
  }

  // 计算实付金额
  const originalTotal = 264.00; // 原始总价（从购物车传来）
  const shipping = 0; // 运费
  const finalTotal = originalTotal + shipping - totalDiscount;

  const finalPriceElement = document.querySelector('.price-item.total .price-value');
  if (finalPriceElement) {
    finalPriceElement.textContent = `¥${finalTotal.toFixed(2)}`;
  }

  // 更新底部提交栏显示
  const submitTotal = document.querySelector('.submit-bar .total-price');
  if (submitTotal) {
    submitTotal.textContent = `¥${finalTotal.toFixed(2)}`;
  }
}

/**
 * 提交订单
 */
function initSubmitOrder() {
  const submitBtn = document.getElementById('submitBtn');

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      // 验证订单信息
      if (!validateOrder()) {
        return;
      }

      // 显示加载状态
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="iconfont icon-loading"></i> 提交中...';

      // 模拟提交请求
      setTimeout(() => {
        // 生成订单号
        const orderId = generateOrderId();

        // 保存订单到 localStorage
        saveOrderToStorage(orderId);

        // 提交成功
        submitBtn.disabled = false;
        submitBtn.textContent = '提交订单';

        showToast('订单提交成功！');

        // 延迟跳转到订单详情或订单列表
        setTimeout(() => {
          // 这里跳转到订单详情页或订单列表
          // window.location.href = `/html/my-orders.html?orderId=${orderId}`;
          console.log('Order submitted:', orderId);
        }, 1500);
      }, 2000);
    });
  }
}

/**
 * 验证订单信息
 * @returns {boolean} 验证是否通过
 */
function validateOrder() {
  // TODO: 实际项目中需要验证地址、商品库存、价格等
  return true;
}

/**
 * 生成订单号
 * @returns {string} 订单号
 */
function generateOrderId() {
  const now = new Date();
  const timestamp = now.getTime();
  const random = Math.floor(Math.random() * 1000);
  return `${timestamp}${random}`.slice(-16);
}

/**
 * 保存订单到 localStorage
 * @param {string} orderId - 订单号
 */
function saveOrderToStorage(orderId) {
  // 从 localStorage 获取购物车商品并移除
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const purchasedItems = cart.filter(item => item.selected);

  // 创建订单对象
  const order = {
    id: orderId,
    status: 'unpaid',
    items: purchasedItems,
    total: 244.00,
    address: {
      name: '张三',
      phone: '138****5678',
      address: '广东省云浮市云城区xx路xx号xx小区xx栋xx室'
    },
    createdAt: new Date().toISOString()
  };

  // 保存到订单列表
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.unshift(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  // 清空购物车中已购买的商品
  const remainingItems = cart.filter(item => !item.selected);
  localStorage.setItem('cart', JSON.stringify(remainingItems));
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
