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

## MVP 范围

- 左侧筛选栏：时间段、事件类型、区域类型
- 中间卡通地球：自动旋转、历史区域块、区域标签、点击选中
- 右侧内容区：区域简介、重要事件、关键人物、插图、来源
- 时间段结构：1500-1550 到 2000-2026

## 后续扩展路径

当前数据层集中在 `src/data`，UI 层集中在 `src/features`。后续可以逐步替换为：

- 静态 JSON/GeoJSON 文件
- Node API
- SQLite/Postgres 数据库
- 在线内容编辑器
- 自动导入 Wikidata/Wikipedia 候选数据
