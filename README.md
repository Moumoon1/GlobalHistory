<img width="2538" height="1294" alt="e144a9d912d92f08bde1eb3487240f5b" src="https://github.com/user-attachments/assets/a04c0145-1674-48ee-b474-8efa80dd4c16" />
# History Globe

一个用于浏览同一时间段世界各地历史格局的桌面端 Web MVP。

## 技术栈

- Vite + React + TypeScript
- Tailwind CSS
- react-globe.gl + Three.js
- Zustand
- 静态 TypeScript 数据，后续可替换为 JSON、API 或数据库

## 运行

```bash
npm install
npm run dev
```

## 当前范围

- 左侧筛选栏：时间段、事件类型、现代区域列表
- 中间卡通地球：自动旋转、现代地图区域着色、点击选中
- 右侧内容区：现代区域简介、当时归属、重要事件、关键人物、跨区域联系、插图、来源
- 时间段结构：1500-1550 到 2000-2026

## 数据模型

当前版本使用静态 TypeScript 数据，但结构已经按后续 JSON/API/数据库迁移来设计：

- 现代地图区域作为点击入口
- 每个区域在每个时间段有一份历史档案
- 档案包含当时归属、重要事件、关键人物、跨区域联系、来源和图片

详见 [docs/data-model.md](docs/data-model.md)。

## 后续扩展路径

当前数据层集中在 `src/data`，UI 层集中在 `src/features`。后续可以逐步替换为：

- 静态 JSON/GeoJSON 文件
- Node API
- SQLite/Postgres 数据库
- 在线内容编辑器
- 自动导入 Wikidata/Wikipedia 候选数据
