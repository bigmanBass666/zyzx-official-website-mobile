/**
 * 健康页面交互逻辑
 * Healthy Page Interactions
 */

// === 健康分类 Tabs 切换 ===
function initHealthTabs() {
  const tabList = document.querySelector('.tab-list');
  if (!tabList) return;

  const tabs = tabList.querySelectorAll('.tab-item');
  const newsItems = document.querySelectorAll('.news-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // 移除所有激活状态
      tabs.forEach(t => t.classList.remove('active'));
      // 激活当前 tab
      tab.classList.add('active');

      const category = tab.dataset.category;

      // 过滤资讯列表
      newsItems.forEach(item => {
        const itemCategory = item.dataset.category;
        if (category === '全部' || itemCategory === category) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// === 健康讲堂展开/收起 ===
function initLectureCard() {
  const lectureHeader = document.getElementById('lectureHeader');
  const lectureBody = document.getElementById('lectureBody');
  const lectureArrow = document.getElementById('lectureArrow');

  if (!lectureHeader || !lectureBody || !lectureArrow) return;

  let isExpanded = false;

  lectureHeader.addEventListener('click', () => {
    isExpanded = !isExpanded;

    if (isExpanded) {
      lectureBody.style.display = 'block';
      lectureArrow.classList.add('expanded');
    } else {
      lectureBody.style.display = 'none';
      lectureArrow.classList.remove('expanded');
    }
  });
}

// === 健康问答卡片点击 ===
function initQACard() {
  const qaCard = document.querySelector('.qa-card');
  if (!qaCard) return;

  qaCard.addEventListener('click', () => {
    // 可以跳转到问答页面或弹出咨询窗口
    console.log('健康问答点击');
    // TODO: 实现问答功能
  });
}

// === 页面初始化 ===
document.addEventListener('DOMContentLoaded', () => {
  initHealthTabs();
  initLectureCard();
  initQACard();

  console.log('健康页面加载完成');
});
