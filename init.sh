#!/bin/bash
# 启动中医智行移动端官网开发服务器
# Complete All 模式自动循环时无需干预

cd "$(dirname "$0")"

# 检查 Node.js 是否可用
if ! command -v node &> /dev/null; then
  echo "错误: 需要 Node.js 环境，请先安装 Node.js"
  exit 1
fi

# 检查是否安装了依赖
if [ ! -d "node_modules" ]; then
  echo "正在安装依赖..."
  npm init -y
  npm install vite --save-dev
fi

# 启动开发服务器（后台运行）
PORT=${1:-5173}
npx vite --port $PORT &

# 等待服务器启动
sleep 3

# 检查端口是否可用
if curl -s http://localhost:$PORT > /dev/null 2>&1; then
  echo "Dev server started on http://localhost:$PORT"
  exit 0
else
  echo "警告: 服务器可能在启动中，稍后访问 http://localhost:$PORT"
  exit 0
fi