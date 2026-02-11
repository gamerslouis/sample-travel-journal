請幫我生成一個單頁式的 Web App (HTML)，這是我 2025年去東京獨旅的旅行紀錄網頁


## 主要功能

+ 地圖：透過地圖顯示我去過的景點
+ 日記：以卡片條列的方式去呈現我所有去過的景點

+ 介面要求： 手機螢幕為主，需考慮 PWA。請參照提供的圖片。

+ 風格要求：日系極簡風，主色調以米白與淺灰為背景，搭配低彩度的暖色調色系，利用簡單的動畫效果

+ 資料：透過單一 yaml 檔案紀錄所有景點的資料，包含
    + 日期: 2025/12/13
    + 時間: 10:00
    + 名稱: 晴空塔
    + 位置: 淺草
    + 類型: 景點
    + 描述: 晴空塔是東京的標誌性景點之一，位於淺草寺附近。
    + 照片路徑: /images/1.jpg
    + 地圖座標

## 技術架構

+ 基礎架構 `bun init --react`
    + Bun 
    + Typescript
    + React
+ Tailwind CSS
+ Google Font (text and icon)
+ Map
    + MapLibre GL JS
    + React Map GL
    + OpenStreetMap (via Protomaps)
+ Code Styling
    + prettier
    + eslint