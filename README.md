# Ninh Bình Itinerary v6

Landing page tĩnh cho lịch trình Ninh Bình 3 ngày 2 đêm, từ **10/10/2026 đến 12/10/2026**.

Website:

```text
https://nad27298.github.io/ninh-binh-trip/
```

## Điểm nổi bật của bản v6

- Cập nhật toàn bộ lịch trình mới 10–12/10/2026.
- Base chuyển sang **Khách sạn Hoa Lư, khu trung tâm Hoa Lư/Ninh Bình**.
- Hero cho biết ngay chuyến đi 3 ngày sẽ đi đâu.
- Phần **Journey at a glance** tóm tắt route của T7 / CN / T2.
- Phân biệt rõ:
  - Main stop
  - Optional
  - Food suggestion
  - Backup plan
- Destination Spotlight cập nhật các điểm chính:
  - Hang Múa
  - Tràng An
  - Bến An
  - Tuyệt Tình Cốc / Động Am Tiên
  - Bãi Sỏi Khê Cốc
  - Núi / Đỉnh Kỳ Lân
  - Phố cổ Hoa Lư / Chùa Cầu
  - Thung Ui
- Tam Cốc không nằm trong route chính; chỉ optional nếu dư thời gian và không đi thuyền.
- Hồ Đồng Chương chỉ là alternative, không nằm trong lịch chính.
- Nhà hàng hiển thị dưới dạng gợi ý, không coi là địa điểm đã chốt.
- Có các `select` để mỗi người tự chọn:
  - phương tiện Hà Nội ↔ Ninh Bình
  - nhà hàng ăn dê
  - bữa trưa Day 2
  - có đi Bãi Sỏi hay không
  - có săn bình minh Kỳ Lân hay không
- Lựa chọn được lưu bằng `localStorage` trên từng thiết bị.
- Timeline chi tiết, lọc theo ngày, checkbox, Google Maps, share và print.
- Gradient, glass effect và scroll reveal animation nhẹ.
- Responsive cho desktop và mobile.
- Có cache busting cho CSS / JavaScript để hạn chế trình duyệt giữ bản cũ.
- Không framework, không build step.

## Cấu trúc

```text
ninh-binh-trip/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── assets/
│   ├── favicon.svg
│   └── spots/   # legacy assets, hiện không bắt buộc
└── README.md
```

## Cache busting

Website hiện load CSS và JavaScript theo version:

```html
<link rel="stylesheet" href="css/styles.css?v=6" />
<script src="js/app.js?v=6"></script>
```

Khi có update lớn về CSS hoặc JavaScript, có thể tăng version:

```text
?v=7
?v=8
...
```

để trình duyệt ưu tiên tải file mới thay vì dùng cache cũ.

## Publish bằng GitHub Pages

1. Tạo hoặc mở repository GitHub.
2. Upload toàn bộ nội dung project lên root repo.
3. Vào **Settings → Pages**.
4. Chọn:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. Save và chờ GitHub deploy.

URL dạng:

```text
https://YOUR_USERNAME.github.io/TEN_REPO/
```

Repo hiện tại:

```text
https://github.com/nad27298/ninh-binh-trip
```

GitHub Pages:

```text
https://nad27298.github.io/ninh-binh-trip/
```

Nếu repo đã bật GitHub Pages thì mỗi lần sửa chỉ cần:

```text
Edit → Commit → Push
```

GitHub Pages sẽ tự deploy lại, không cần publish thủ công.

## Sửa nhanh trên GitHub

Có thể sửa trực tiếp bằng GitHub Web Editor mà không cần clone project.

Từ trang repo, bấm phím:

```text
.
```

hoặc mở:

```text
https://vscode.dev/github/nad27298/ninh-binh-trip
```

Sau khi sửa:

```text
Source Control
→ nhập commit message
→ Commit & Push
```

GitHub Pages sẽ tự cập nhật website.
