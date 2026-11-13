# GDM. — 平面設計風格博物館

以繁體中文介紹平面設計風格的靜態網站。使用 HTML、CSS、原生 JavaScript、JSON，無需安裝套件或建置。

## 網站內容

- 首頁：精選展覽與四大展區。
- 展覽：分類篩選、中文／英文／特徵搜尋。
- 風格介紹：以 `pages/style.html?id=bauhaus` 載入共用模板。
- 年表：依資料的 `startYear` 排序。
- 關於：收錄原則、來源與圖像授權。

首期完整收錄包浩斯、裝飾藝術、新藝術、孟菲斯。`AGENTS.md` 中列出的其他風格為後續擴充方向；數位與未來展區尚在策展中。

## 本機瀏覽

已安裝 Node.js 時，在根目錄執行 `node scripts/serve.cjs`，開啟 `http://127.0.0.1:8000`。伺服器只使用 Node.js 內建模組，無需安裝套件。請使用 HTTP 網址；直接點開 HTML 的 `file://` 模式會受到瀏覽器 JSON 讀取限制。

## GitHub Pages

將檔案提交並推送至 GitHub 後，在 Repository → Settings → Pages 選擇 **Deploy from a branch**、`main` 與 `/ (root)`，儲存後等待 GitHub 完成部署。預期網址為 `https://jiayi-lai.github.io/Taica_W9/`，實際狀態以 GitHub Pages 顯示為準。

所有資源均採相對路徑或以模組位置計算基底，支援專案子目錄部署。`.nojekyll` 避免額外 Jekyll 處理。

## 如何新增內容

1. 先閱讀根目錄 `AGENTS.md`。
2. 在 `data/styles.json` 新增符合規範的資料，選擇 `data/categories.json` 既有分類。
3. 放置圖片到 `assets/images/<id>/`，記錄替代文字、作者與授權。原創示意與歷史原作需明確區分。
4. 填入可靠來源；`startYear` 用於排序，約略年代請在 `period` 與正文說明。
5. `relatedStyles` 是本站使用的相關風格 ID 陣列，`imageCredit` 為圖片說明；兩者皆為選填。
6. 展覽、詳細頁與年表會自動讀取資料；首頁自動呈現第 2–4 筆展覽，新增展覽後請同步調整首頁靜態展覽總數與策展文案。
7. 檢查分類、搜尋、詳細頁、來源連結與手機呈現。

## 圖像與內容

SVG 為本站原創風格練習，非歷史原作，以 CC BY 4.0 分享。歷史內容參考各展覽所列博物館來源；來源機構作品之權利依各館規定。
