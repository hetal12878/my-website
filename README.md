AuraTown — Bộ source trang web đơn giản cho cộng đồng Minecraft

Cấu trúc:
- index.html — Trang chủ
- css/styles.css — Kiểu (styles)
- js/main.js — JS đơn giản (ví dụ số người chơi, cuộn mượt)
- assets/ — Logo, favicon, hình ảnh (thay bằng tài sản thật của bạn)

Cách dùng:
1. Mở [index.html](index.html) trên trình duyệt để xem trang.
2. Thay đổi thông tin IP, đường dẫn Discord và nội dung theo ý bạn.
3. Để hiển thị trạng thái máy chủ thật, thay phần `updatePlayers()` trong `js/main.js` bằng cuộc gọi tới API trạng thái máy chủ Minecraft.

Triển khai nhanh:
- Dùng GitHub Pages: đẩy repo lên GitHub và bật Pages từ nhánh `main`.
- Hoặc host trên bất kỳ dịch vụ tĩnh (Netlify, Vercel...)

Muốn tôi tùy biến thêm (logo, form đăng ký, tích hợp API trạng thái máy chủ, trang tài khoản, cửa hàng) không?

Hướng dẫn nhanh thay logo (bạn đã gửi file logo):

- Đặt file logo nguyên bản vào thư mục `assets` và đổi tên thành `logo.png`.
- Tạo favicon  PNG (đề xuất kích thước 64x64 hoặc 32x32) và đặt tên `favicon.png` trong `assets`.

Trên Windows (PowerShell), nếu bạn đã lưu file logo ở `C:\Users\Bạn\Downloads\logo.png`, chạy:

```powershell
Copy-Item -Path "C:\Users\Bạn\Downloads\logo.png" -Destination "assets\logo.png"
# Tạo favicon (có thể dùng công cụ ngoài để resize) hoặc sao chép cùng file:
Copy-Item -Path "C:\Users\Bạn\Downloads\logo.png" -Destination "assets\favicon.png"
```

Nếu muốn mình tự động chuyển đổi logo thành favicon và thêm các kích thước, upload file logo (PNG/SVG) vào thư mục `assets` hoặc gửi file tại đây, mình sẽ tạo hộ.

Hoặc tải trực tiếp từ URL bạn cung cấp (ví dụ Discord CDN) bằng PowerShell:

```powershell
Invoke-WebRequest -Uri "https://cdn.discordapp.com/attachments/1440527380262289549/1453119393960824934/FIANL.png?ex=694c4a65&is=694af8e5&hm=465750c5ce792d94e13d498b18bea6d9a533fcce7fe07f76081aaba357021c2c" -OutFile "assets\logo.png"
Invoke-WebRequest -Uri "https://cdn.discordapp.com/attachments/1440527380262289549/1453119393960824934/FIANL.png?ex=694c4a65&is=694af8e5&hm=465750c5ce792d94e13d498b18bea6d9a533fcce7fe07f76081aaba357021c2c" -OutFile "assets\favicon.png"
```

Lưu ý: URL CDN có thể hết hạn nếu chứa token tạm thời; nếu ảnh không tải được, hãy tải về thủ công và đặt vào `assets`.