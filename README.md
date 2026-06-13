<img width="2538" height="1294" alt="History Globe 预览图" src="https://github.com/user-attachments/assets/a04c0145-1674-48ee-b474-8efa80dd4c16" />

# History Globe

History Globe 是一个个人历史学习工具，用来查看同一时间段内，世界不同地区分别发生了什么。它用现代地图边界作为可点击入口，点击某个区域后，在右侧展示这个区域在当前时间段内的历史实体、重要事件、关键人物和相关背景。

当前产品定位不是严格的历史疆界模拟器。历史边界和现代边界不一致的问题，会放在右侧内容里的“当时归属”和边界说明中处理，而不是为每个时代重新绘制一套历史地图。

## 当前功能

- 左侧筛选栏：选择时间段、事件类型，并从区域列表中快速定位。
- 中间地球：自动旋转的 3D 地球，使用现代地图区域作为点击目标。
- 地图标签：中文区域名以覆盖层方式渲染，避免 3D 字体不支持中文导致乱码。
- 区域交互：点击或 hover 地图区域，聚焦对应地区的历史内容。
- 右侧内容区：展示区域简介、当时归属、重要事件、事件内关键人物、插图、跨区域联系和来源。
- 时间范围：从深时间/早期人类阶段一直延伸到 2026，历史时期会逐步填充更密集的卡片。

前端用户界面已经去掉“数据质检”入口；质检代码仍保留在项目里，用于后续数据整理和开发检查。

## 技术栈

- Vite + React + TypeScript
- Tailwind CSS
- react-globe.gl + Three.js
- Zustand
- 本地 JSON/TypeScript 数据
- SQLite 导入和构建脚本，方便后续迁移到数据库或服务端

## 本地运行

```bash
npm install
npm run dev
```

Vite 会输出本地访问地址，通常是 `http://127.0.0.1:5173/`。如果端口被占用，会使用其他端口。

构建生产版本：

```bash
npm run build
```

## 数据进度

当前应用由两部分数据组成：一部分是手写的地图区域示例数据，另一部分是整理生成的学习卡片数据。

- 第一轮粗导入：44 章已完成。
- 第二轮精读和富文本卡片整理：已完成到第 8 章。
- 下一章：第 9 章，`第九章 中世纪文明使欧亚大陆实现整体化`。
- 当前生成卡片数：357 张。
- 当前生成 SQLite 大小：约 1.0 MB。
- 当前生成 JSON 大小：约 732 KB。

第二轮精修数据放在 `data/curation/`。

`data/generated/`、`data/sources/` 和构建产物不会提交到 GitHub。仓库主要保留代码、数据结构、整理脚本、文档和已经清洗过的卡片数据，避免把生成文件或原始资料文本直接放进仓库。

## 项目结构

```text
src/
  components/layout/        页面布局和渲染保护
  features/globe/           3D 地球、地图区域、标签、hover/click 逻辑
  features/filters/         左侧筛选栏和数据概览
  features/content-panel/   右侧区域、事件和详情面板
  data/                     前端数据适配、学习卡片、地图国家名匹配
  stores/                   Zustand 状态管理
  types/                    TypeScript 类型

data/curation/              二轮精修后的学习卡片 JSON
database/schema.sql         SQLite 数据库结构
scripts/                    导入、合并、审计、构建脚本
docs/                       数据模型、来源策略、整理流程、进度记录
```

## 数据整理流程

常用流程：

```bash
npm run cards:build:v2
npm run db:import:cards -- ../../outputs/global-history-learning-cards-v2.json
npm run cards:audit
npm run build
```

整理规则：

- 地图点击目标使用现代国家或区域边界。
- 如果历史边界和现代边界不同，只在来源支持时填写 `territoryComparison`。
- 关键人物放进对应事件卡片，不作为独立全局人物列表展示。
- 前端不展示 S/A/B/C 这种重要性评级。
- 一张卡片尽量只绑定主要发生地，不因为文本里提到多个区域就铺到所有国家。

更多文档：

- [数据模型](docs/data-model.md)
- [数据来源策略](docs/data-sources.md)
- [整理流程](docs/curation-workflow.md)
- [当前进度](docs/progress.md)
