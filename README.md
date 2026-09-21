# Ninh Bình Itinerary v4

Landing page tĩnh cho lịch trình Ninh Bình 3 ngày 2 đêm.

## Điểm nổi bật của bản v4

- Hero cho biết ngay chuyến đi 3 ngày sẽ đi đâu.
- Phần "Journey at a glance" tóm tắt route của T7 / CN / T2.
- Spotlight dùng layout cố định bằng CSS Grid Areas nên không bị lệch.
- Ảnh thật từ Wikimedia Commons.
- Gradient, glass effect và scroll reveal animation nhẹ.
- Responsive cho desktop và mobile.
- Timeline chi tiết, lọc theo ngày, checkbox, Google Maps, share và print.
- Không framework, không build step.

## Cấu trúc

```text
ninh-binh-itinerary-v4/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── assets/
│   ├── favicon.svg
│   └── spots/   # giữ lại từ bản cũ, không còn bắt buộc
└── README.md
```

## Publish bằng GitHub Pages

1. Tạo hoặc mở repository GitHub.
2. Upload toàn bộ nội dung bên trong folder này lên root repo.
3. Vào **Settings → Pages**.
4. Chọn:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. Save và chờ GitHub deploy.

URL sẽ dạng:

```text
https://YOUR_USERNAME.github.io/TEN_REPO/
```

Nếu repo cũ đã bật GitHub Pages, chỉ cần upload/commit đè file mới là được.
