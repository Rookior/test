#!/bin/bash
set -e
# 1. 兼容老项目
export NODE_OPTIONS=--openssl-legacy-provider
# 🔥 强制关闭所有编译检查（关键）
#export DISABLE_ESLINT_PLUGIN=true
#export ESLINT_NO_DEV_ERRORS=true
#export VUE_CLI_SERVICE_NO_ERRORS=true
# 还原正确的 package.json（echarts 4.9.0）
#git checkout -- package.json
# 2. 国内镜像
#npm config set registry https://registry.npmmirror.com
# 2. 这里的项目前缀获取逻辑 (假设你的 RUN_SCRIPT 是 build:LNFX)
# 我们把 build: 后面的名字取出来
PROJECT_NAME=$(echo ${RUN_SCRIPT} | cut -d':' -f2)
# ==========================================
# 🔥 核心：安装时 跳过二进制编译（解决 mozjpeg 报错！）
# 以后加新包也能正常装，同时不炸图片压缩
# ==========================================
install_deps() {
  # --- 1. 仅清理旧的构建产物 ---
  # --- 1. 仅清理当前项目的构建产物与历史记录 ---
  echo "正在清理当前项目 ${PROJECT_NAME} 的旧产物..."
  rm -rf dist  # 清理通用 dist 目录
  # 🔥 核心修改：只清理当前项目前缀的历史目录和压缩包
  # 假设 PROJECT_NAME 是 LNFX，则只会匹配 70LNFX_dist20260420 等
  rm -rf "70${PROJECT_NAME}_dist"* # 清理旧的压缩包（也建议加上前缀，防止误删其他项目压缩包）
  rm -f "70${PROJECT_NAME}_dist"*.zip
  #rm -rf 70*_dist* # 清理历史文件夹
  #rm -f *.zip       # 清理旧压缩包
  # 1. 彻底删除可能导致冲突的旧缓存和目录
  #rm -rf node_modules
  #rm -rf package-lock.json
  #rm -rf .cache
  #rm -rf node_modules/.cache
  # 2. 清理 npm 全局缓存（防止损坏的包反复被调用）
  #npm cache clean -f
  # 3. 重新设置镜像源
  npm config set registry https://registry.npmmirror.com
  echo "正在安装依赖..."
  # 4. 关键：移除 --ignore-scripts！
  # 如果是因为某个特定包（如 mozjpeg）报错，我们应该针对性解决，而不是全局跳过脚本。
  # 使用 --legacy-peer-deps 处理 Vue2/3 依赖冲突问题
  npm install --legacy-peer-deps --no-audit --no-fund --no-progress
  # 5. 特殊处理 node-sass (如果你的项目还在用它)
  # 很多时候 node-sass 需要手动触发一次 rebuild 才能在 Linux 环境跑通
  if [ -d "node_modules/node-sass" ]; then
    echo "检测到 node-sass，尝试重新构建二进制文件..."
    npm rebuild node-sass
  fi
}
# 每次都执行（新加包能装上）
install_deps
# ====================== 构建逻辑 ======================
# 1. 这里的 DATE 必须和 Node 脚本里的 formattedDate 逻辑完全一致
DATE=$(date +%Y%m%d)
# 3. 这里的目录名必须和你的 setup.js 逻辑完全同步：70 + 项目名 + _dist + 日期
DIR_NAME="70${PROJECT_NAME}_dist${DATE}"
echo "====================================="
echo "🚀 预期构建目录: ${DIR_NAME}"
echo "====================================="
echo "====================================="
echo "🚀 开始构建：npm run ${RUN_SCRIPT}"
echo "====================================="
# 在 echo "🚀 预期构建目录: ${DIR_NAME}" 下方加入
if [ -z "${PROJECT_NAME}" ]; then
    echo "❌ 错误：无法从 RUN_SCRIPT (${RUN_SCRIPT}) 中提取项目名称！"
    exit 1
fi
# 4. 构建逻辑
npm run ${RUN_SCRIPT}
# 5. 【关键修复】打包逻辑
# 不再写死 if/else，直接根据上面生成的 DIR_NAME 去找
if [ -d "${DIR_NAME}" ]; then
    echo "✅ 找到目录 ${DIR_NAME}，开始压缩..."
    # rm -f *.zip
    zip -r "${DIR_NAME}.zip" "${DIR_NAME}"
    echo "✅ 成功生成压缩包: ${DIR_NAME}.zip"
else
    # 容错：打印当前目录下的所有文件夹，方便调试
    echo "❌ 错误：未找到目录 ${DIR_NAME}"
    echo "当前目录下存在的目录有："
    ls -d */
    exit 1
fi