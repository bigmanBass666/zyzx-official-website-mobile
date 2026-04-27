# 中医智行 - 移动端官网

> 掌上的中医智慧，随时随地的健康服务

## 项目简介

中医智行移动端官网是专为移动设备优化的前端项目，为用户提供便捷的中医健康服务入口。项目采用原生 HTML/CSS/JavaScript 构建，使用 Vite 作为构建工具，确保最佳的加载性能和开发体验。

**在线访问**: [m-zyzx.netlify.app](https://m-zyzx.netlify.app/)

## 技术架构

### 核心技术栈

| 技术 | 说明 |
|------|------|
| **HTML5 + CSS3** | 语义化标签与现代化 CSS |
| **JavaScript (ES6+)** | 原生 JavaScript，模块化开发 |
| **Vite** | 下一代前端构建工具，快速热更新 |
| **iconfont** | 字体图标库 |
| **Lenis** | 平滑滚动库 |
| **Driver.js** | 用户引导/新手导览库 |

### 项目特色

- **原生开发**: 无框架依赖，轻量高效
- **移动优先**: 针对移动端屏幕和使用习惯优化
- **组件化**: 页面模块化，便于维护
- **设计系统**: 统一的 CSS 变量和设计规范

## 页面结构

### 1. 首页 (index.html)

#### 顶部定位栏
- 显示当前城市（默认：云浮）
- 顶部 Logo
- 城市切换下拉菜单

#### 搜索区域
- 搜索输入框
- 搜索图标
- 消息图标

#### 工具网格
8 个主要功能入口：

| 图标 | 名称 | 功能 |
|------|------|------|
| ![智能问诊](img/tool/znwz.png) | 智能问诊 | AI 辅助病情分析 |
| ![健康咨询](img/tool/jkzx.png) | 健康咨询 | 专业健康问题解答 |
| ![智能配方](img/tool/znpf.png) | 智能配方 | 中药配方建议 |
| ![智能识别](img/tool/znsb.png) | 智能识别 | 药材/处方识别 |
| ![药方检测](img/tool/yfjc.png) | 药方检测 | 处方合理性分析 |
| ![健康自测](img/tool/jkzc.png) | 健康自测 | 自我健康评估 |
| ![心理健康](img/tool/xljk.png) | 心理健康 | 心理状态评估 |
| ![睡眠助手](img/tool/smzs.png) | 睡眠助手 | 睡眠质量改善 |

#### 预约卡片
- 预约挂号
- 线下预约
- 专家讲解

#### 推荐医生
滚动展示医生信息卡片：
- 医生头像
- 姓名、职称、科室
- 评分和接诊次数
- 擅长领域简介
- 咨询/预约按钮

#### 热门问题
- 分类标签（育儿、养生、问诊、保健、减肥）
- 问题列表
  - 问题标题
  - 问题摘要
  - 点赞/收藏数
  - "我也要提问"入口

#### 底部导航 (TabBar)
固定在底部的 5 个主要入口：

| 图标 | 名称 | 路径 |
|------|------|------|
| ![首页](img/tabbar/home.png) | 首页 | /index.html |
| ![商城](img/tabbar/mall.png) | 商城 | /html/mall.html |
| ![健康](img/tabbar/healthy.png) | 健康 | /html/healthy.html |
| ![社区](img/tabbar/community.png) | 社区 | /html/community.html |
| ![我的](img/tabbar/mine.png) | 我的 | /html/mine.html |

### 2. 其他页面

| 页面 | 路径 | 说明 |
|------|------|------|
| 商城 | html/mall.html | 商品展示与购买 |
| 健康 | html/healthy.html | 健康资讯与服务 |
| 社区 | html/community.html | 用户社区互动 |
| 我的 | html/mine.html | 个人中心 |

## 目录结构

```
zyzx_official_website_mobile/
├── index.html                      # 首页
├── package.json                    # 项目配置
├── vite.config.js                  # Vite 配置
├── dist/                           # 构建输出目录
│   └── (生产环境资源)
├── css/                           # 样式目录
│   ├── main.css                    # 主样式文件
│   ├── main.css.map               # Source Map
│   ├── index.css                   # 首页样式
│   └── index.css.map
├── js/                            # 脚本目录
│   ├── main.js                     # 主入口文件
│   └── components/                 # 组件脚本
│       └── image-handler.js        # 图片处理组件
├── img/                            # 图片资源
│   ├── logo_white.png              # Logo
│   ├── tool/                       # 工具图标
│   ├── appointment/                # 预约卡片素材
│   ├── recommend-doctor/           # 医生图片
│   ├── question/                   # 问答相关图片
│   ├── tabbar/                     # 底部导航图标
│   └── ...
├── html/                           # 子页面
│   ├── mall.html                   # 商城页
│   ├── healthy.html                # 健康页
│   ├── community.html              # 社区页
│   └── mine.html                   # 个人页
├── iconfont/                       # 字体图标
│   └── iconfont.css
├── bootstrap-5.3.0-alpha1-dist/    # Bootstrap 库(备用)
├── feature_list.json               # 特性清单
├── PROJECT_CONSTRAINTS.md          # 项目约束文档
└── 中医智行 - 用户端.sketch         # 设计源文件
```

## 开发命令

### 安装依赖

```bash
npm install
```

### 开发预览

```bash
npm run dev
```

启动 Vite 开发服务器，支持热模块替换（HMR）。

### 构建生产版本

```bash
npm run build
```

构建产物输出到 `dist/` 目录。

### 预览生产构建

```bash
npm run preview
```

在本地预览生产构建效果。

### 运行测试

```bash
npm run test
```

## 设计规范

### CSS 变量

项目使用 CSS 变量统一管理设计值：

```css
:root {
  --primary-color: #xxx;
  --text-color: #xxx;
  --bg-color: #xxx;
  /* ... */
}
```

### 响应式断点

| 断点 | 设备类型 |
|------|----------|
| < 390px | 小屏手机 |
| 390px - 414px | 普通手机 |
| 415px+ | 大屏手机/平板 |

### 字体图标

使用 iconfont 字体图标库，图标通过 class `iconfont icon-xxx` 调用。

## 第三方库

### Lenis - 平滑滚动

```javascript
// 引入
<script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js"></script>

// 使用
const lenis = new Lenis()
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
```

### Driver.js - 用户引导

```javascript
// 引入
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/driver.js/0.9.8/driver.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/driver.js/0.9.8/driver.min.js"></script>

// 使用
const driver = new Driver({
  // 配置选项
})
driver.defineSteps([...])
driver.start()
```

## 图片处理

项目包含图片增强处理模块 `js/components/image-handler.js`，用于：

- 图片懒加载
- 错误处理
- 占位图切换

使用 `data-enhance` 属性标记需要增强处理的图片：

```html
<img src="xxx.jpg" data-enhance alt="描述">
```

## 与 PC 端的关系

| 特性 | PC 端 | 移动端 |
|------|-------|--------|
| 构建工具 | 原生（无） | Vite |
| 响应式策略 | 跳转 | 自适应 |
| 导航 | 顶部导航栏 | 底部 TabBar |
| 主要入口 | 8 工具 + 8 分类 | 8 工具网格 |
| 布局 | 多列卡片 | 单列卡片 |

## 浏览器兼容性

- iOS Safari 14+
- Chrome for Android 90+
- 微信内置浏览器
- 其他主流移动浏览器

## 项目约束

详细的项目约束和开发规范请参考 [PROJECT_CONSTRAINTS.md](PROJECT_CONSTRAINTS.md)。

## 版权信息

```
copyright © M&T developed by Jason Liu
```

## 联系方式

- **作者**: Jason Liu
- **Gitee**: [paeonia-lactiflora](https://gitee.com/paeonia-lactiflora)

---

**声明**: 本项目为学习和演示项目，部分资源来自互联网，仅供学习参考使用。
