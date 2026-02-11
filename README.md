# 旅行日記 — 個人旅行記錄網站

一個極簡風格的單頁式 PWA，用來記錄個人旅行中的每一個足跡。支援日記卡片瀏覽與互動式地圖檢視，所有資料集中在一個 YAML 設定檔中管理。

## ✨ 功能特色

- **雙視圖切換**：日記卡片時間軸 + 互動式足跡地圖
- **PWA 支援**：可安裝至手機桌面
- **單一設定檔**：所有網站設定與景點資料集中在 `src/data/config.yaml`
- **深色模式**：自動偵測系統設定
- **響應式設計**：行動裝置優先

## 🛠️ 技術堆疊

| 類別 | 技術 |
|------|------|
| 執行環境 / 套件管理 | [Bun](https://bun.sh/) |
| 建置工具 | [Vite](https://vitejs.dev/) |
| 前端框架 | [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| 樣式 | [Tailwind CSS v4](https://tailwindcss.com/) |
| 地圖 | [MapLibre GL JS](https://maplibre.org/) + [React Map GL](https://visgl.github.io/react-map-gl/) |
| 動畫 | [Framer Motion](https://www.framer.com/motion/) |
| 圖示 | [Lucide React](https://lucide.dev/) |

## 📂 專案結構

```
.
├── public/                  # 靜態資源（PWA manifest、圖示）
│   └── img/                 # 景點照片
├── src/
│   ├── components/          # React 元件
│   │   ├── Journal/         # 日記視圖（卡片、列表）
│   │   ├── Layout/          # 版面配置（TabBar）
│   │   ├── Map/             # 地圖視圖
│   │   └── Shared/          # 共用元件
│   ├── data/
│   │   └── config.yaml      # ⭐ 集中設定檔（網站設定 + 景點資料）
│   ├── utils/
│   │   └── dataLoader.ts    # 設定檔載入器
│   ├── App.tsx              # 主應用程式元件
│   └── index.css            # 全域樣式
├── scripts/
│   └── ssg.tsx              # 靜態網頁預渲染腳本
├── index.html               # 入口頁面
└── vite.config.ts           # Vite 設定
```

## 🚀 快速開始

### 前置需求

- [Bun](https://bun.sh/)（v1.0 以上）

```bash
# macOS / Linux 安裝 Bun
curl -fsSL https://bun.sh/install | bash
```

### 安裝與啟動

```bash
# 1. 複製專案
git clone <你的 repo 網址>
cd <專案資料夾>

# 2. 安裝依賴
bun install

# 3. 啟動開發伺服器
bun dev
```

瀏覽器開啟 `http://localhost:5173` 即可預覽。

### 建置正式版本

```bash
bun run build
```

產出的靜態檔案會在 `dist/` 資料夾中，可直接部署到任何靜態網站託管服務。

## ⚙️ 設定檔說明

所有可自訂的設定都集中在 **`src/data/config.yaml`**，分為四個區塊：

### `site` — 網站基本設定

```yaml
site:
  title: "2025 Tokyo - Louis' Travel Diary"   # 網站標題（同步修改 index.html 和 public/manifest.json）
  subtitle: "My Journal"                       # 日記頁面副標題
  journalTitle: "旅行日記"                      # 日記頁面主標題
  journalDescription: "記錄旅行的時光。"         # 日記頁面描述文字（支援 \n 換行）
  mapTitle: "足跡地圖"                           # 地圖頁面標題
  ogImage: "/img/1.jpeg"                        # Open Graph 預覽圖片
  url: "https://your-site.com"                  # 網站網址
  themeColor: "#d09b75"                         # 主題色
```

> **注意**：`title` 變更後，請同步手動更新 `index.html` 中的 `<title>` 和 `<meta og:title>` 標籤，以及 `public/manifest.json` 中的 `name` 欄位。

### `author` — 作者與 Footer 設定

```yaml
author:
  name: "Your Name"                             # 顯示於 Footer 的作者名稱
  github: "https://github.com/yourname"         # GitHub 連結
  blog: "https://your-blog.com/"                # 個人網站連結
  copyrightStartYear: 2026                      # 版權起始年份
```

### `map` — 地圖預設視角

```yaml
map:
  center: [139.75, 35.68]                       # 預設中心點 [經度, 緯度]
  zoom: 11                                      # 預設縮放等級
```

### `spots` — 景點資料

```yaml
spots:
  - date: "2025-12-16"                          # 日期
    time: "13:43"                               # 時間
    name: "景點名稱"                             # 名稱
    location: "區域"                             # 所在區域
    icon: "camera"                              # 圖示名稱（Lucide icon）
    description: "描述文字"                      # 說明
    image: "/img/1.jpeg"                        # 照片路徑（放在 public/img/）
    coordinates: [35.68, 139.75]                # 選填，座標 [緯度, 經度]
    link: "https://maps.app.goo.gl/..."         # 選填，外部連結
```

+ 可以到 https://lucide.dev/icons/ 查看可用的 icon
+ 座標可以直接在 google map 上按右鍵取得

#### 新增景點步驟

1. 將照片放入 `public/img/` 資料夾
2. 在 `config.yaml` 的 `spots` 區塊新增一筆資料
3. 儲存後開發伺服器會自動熱更新

## 📄 授權

### Articles and Images
All the files inside `public/` directory are licensed under CC BY 4.0.

### Codes
Files not mentioned in previous paragraphs are licensed under MIT License.