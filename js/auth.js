// 登录页面逻辑

export function initLogin() {
  const form = document.getElementById('login-form');
  const account = document.getElementById('account');
  const password = document.getElementById('password');
  const agree = document.getElementById('agree');

  // 表单提交
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // 验证协议勾选
    if (!agree.checked) {
      alert('请阅读并同意用户隐私政策');
      return;
    }

    // 简单验证
    if (!account.value.trim()) {
      alert('请输入账号');
      account.focus();
      return;
    }

    if (!password.value.trim()) {
      alert('请输入密码');
      password.focus();
      return;
    }

    // 模拟登录请求
    // TODO: 实际的登录 API 调用
    console.log('登录信息:', {
      account: account.value,
      password: '***'
    });

    // 保存登录状态
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userAccount', account.value);

    // 跳转到首页
    window.location.href = '/index.html';
  });
}

// 自动执行初始化
if (document.currentScript) {
  initLogin();
}