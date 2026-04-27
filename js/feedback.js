/**
 * 意见反馈页 JavaScript
 * Feedback Page Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initFeedbackForm();
});

/**
 * 初始化反馈表单
 */
function initFeedbackForm() {
  const feedbackText = document.getElementById('feedbackText');
  const currentCount = document.getElementById('currentCount');
  const phoneInput = document.getElementById('phoneInput');
  const tagBtns = document.querySelectorAll('.tag-btn');
  const submitBtn = document.getElementById('submitBtn');
  const uploadArea = document.getElementById('uploadArea');
  const previewArea = document.getElementById('previewArea');

  let selectedType = 'bug';
  let uploadedImages = [];

  // 文本输入监听 - 更新字数统计和提交按钮状态
  if (feedbackText) {
    feedbackText.addEventListener('input', () => {
      const count = feedbackText.value.length;
      if (currentCount) {
        currentCount.textContent = count;
      }
      updateSubmitState();
    });
  }

  // 手机号输入监听
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      updateSubmitState();
    });
  }

  // 标签选择
  tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tagBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedType = btn.dataset.type;
    });
  });

  // 图片上传（简化版 - 仅提示功能）
  if (uploadArea) {
    uploadArea.addEventListener('click', () => {
      if (uploadedImages.length >= 3) {
        showToast('最多上传3张截图');
        return;
      }

      // TODO: 实际项目中应使用文件选择器
      showToast('图片上传功能需接入后端API');

      // 模拟添加图片（实际应使用 <input type="file">）
      // const fileInput = document.createElement('input');
      // fileInput.type = 'file';
      // fileInput.accept = 'image/*';
      // fileInput.multiple = true;
      // fileInput.onchange = handleFileSelect;
      // fileInput.click();
    });
  }

  // 提交按钮
  if (submitBtn) {
    submitBtn.addEventListener('click', async () => {
      if (!validateForm()) {
        return;
      }

      // 显示加载状态
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="iconfont icon-loading"></i> 提交中...';

      try {
        // 收集表单数据
        const feedbackData = {
          content: feedbackText.value.trim(),
          phone: phoneInput.value.trim(),
          type: selectedType,
          images: uploadedImages,
          timestamp: new Date().toISOString()
        };

        // 模拟提交到服务器
        await submitFeedback(feedbackData);

        // 提交成功
        showToast('反馈提交成功，感谢您的意见！');

        // 清空表单
        resetForm();

        // 延迟返回或显示成功页面
        setTimeout(() => {
          // window.history.back();
        }, 1500);
      } catch (error) {
        console.error('Submit feedback failed:', error);
        showToast('提交失败，请稍后重试');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '提交反馈';
        updateSubmitState();
      }
    });
  }
}

/**
 * 验证表单
 * @returns {boolean} 是否有效
 */
function validateForm() {
  const feedbackText = document.getElementById('feedbackText');
  const phoneInput = document.getElementById('phoneInput');

  if (!feedbackText.value.trim()) {
    showToast('请输入反馈内容');
    feedbackText.focus();
    return false;
  }

  if (feedbackText.value.trim().length < 10) {
    showToast('反馈内容至少10个字符');
    feedbackText.focus();
    return false;
  }

  const phone = phoneInput.value.trim();
  if (phone && !/^1[3-9]\d{9}$/.test(phone)) {
    showToast('请输入正确的手机号');
    phoneInput.focus();
    return false;
  }

  return true;
}

/**
 * 更新提交按钮状态
 */
function updateSubmitState() {
  const feedbackText = document.getElementById('feedbackText');
  const phoneInput = document.getElementById('phoneInput');
  const submitBtn = document.getElementById('submitBtn');

  if (!submitBtn) return;

  const hasContent = feedbackText.value.trim().length > 0;
  const phoneValid = phoneInput.value.trim() === '' || /^1[3-9]\d{9}$/.test(phoneInput.value.trim());

  submitBtn.disabled = !(hasContent && phoneValid);
}

/**
 * 提交反馈到服务器（模拟）
 * @param {Object} data - 反馈数据
 */
async function submitFeedback(data) {
  // 保存到 localStorage（离线保存）
  const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
  feedbacks.unshift({
    ...data,
    id: Date.now()
  });
  localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

  // TODO: 实际应该调用后端 API
  // const response = await fetch('/api/feedback', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data)
  // });
  // if (!response.ok) throw new Error('Network error');

  return Promise.resolve();
}

/**
 * 重置表单
 */
function resetForm() {
  const feedbackText = document.getElementById('feedbackText');
  const phoneInput = document.getElementById('phoneInput');
  const currentCount = document.getElementById('currentCount');

  if (feedbackText) feedbackText.value = '';
  if (phoneInput) phoneInput.value = '';
  if (currentCount) currentCount.textContent = '0';

  // 重置标签选择
  const tagBtns = document.querySelectorAll('.tag-btn');
  tagBtns.forEach((btn, idx) => {
    btn.classList.toggle('active', idx === 0);
  });
}

/**
 * 处理文件选择（占位）
 */
function handleFileSelect(event) {
  const files = event.target.files;
  // TODO: 实现文件上传逻辑
  showToast('图片上传功能需后端支持');
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
