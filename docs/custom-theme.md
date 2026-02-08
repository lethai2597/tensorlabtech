# Custom theme (màu)

Tài liệu này nói theo **nghiệp vụ**: muốn đổi cái gì thì sửa những file nào.

---

## Đổi màu primary

Màu chính của app (nút primary, link, accent). Cần sửa **2 file** để Tailwind và Ant Design đồng bộ.

| File | Chỗ sửa |
|------|---------|
| `app/globals.css` | Trong block `@theme inline` → `--color-primary: #ea580c;` (đổi sang hex bạn muốn). |
| `lib/theme.ts` | Trong `antdThemeConfig.token` → `colorPrimary` và `colorInfo` (cùng hex với trên). |

---

## Đổi font chữ

Font dùng cho toàn app (body, Tailwind, component Ant Design). Cần sửa **3 file**.

| File | Chỗ sửa |
|------|---------|
| `app/layout.tsx` | Import font từ `next/font/google` (hoặc font khác), tạo biến CSS (ví dụ `--font-be-vietnam-pro`). Gắn biến đó vào `<body className={...}>` (ví dụ `${beVietnamPro.variable}`). |
| `app/globals.css` | Trong `@theme inline` → `--font-sans` và `--font-mono` (dùng `var(--tên-biến-font)` đã định nghĩa ở layout). Trong `body` → `font-family` dùng cùng biến đó. |
| `lib/theme.ts` | Trong `antdThemeConfig.token` → `fontFamily: "var(--tên-biến-font), sans-serif"`. |

---

## Đổi nền / chữ / viền (light & dark)

Nền trang, màu chữ chính, nền block (card, panel), màu viền. Chỉ sửa **1 file**.

| File | Chỗ sửa |
|------|---------|
| `app/globals.css` | **Light:** trong `:root` → `--background`, `--foreground`, `--surface`, `--border`. **Dark:** trong `.dark` → cùng bộ biến trên (giá trị khác cho dark). |

---

## Đổi màu semantic (success, error, warning, info)

Màu trạng thái: thành công, lỗi, cảnh báo, thông tin. Chỉ sửa **1 file**.

| File | Chỗ sửa |
|------|---------|
| `app/globals.css` | **Light:** trong `:root` → `--success`, `--error`, `--warning`, `--info`. **Dark:** trong `.dark` → cùng bốn biến (thường tone sáng hơn cho dark). |

---

## Đổi nền component Ant Design khi dark

Nền modal, dropdown, card,… của Ant Design trong chế độ dark. Chỉ sửa **1 file**.

| File | Chỗ sửa |
|------|---------|
| `lib/theme.ts` | Trong `antdDarkTokenOverrides` → `colorBgContainer` (và thêm token khác như `colorBorder`, `colorText` nếu cần). |

---

## Đổi kích thước / bo góc form (Ant Design)

Chiều cao nút, input, bo góc control. Chỉ sửa **1 file**.

| File | Chỗ sửa |
|------|---------|
| `lib/theme.ts` | Trong `antdThemeConfig.token` → `borderRadius`, `controlHeight`, `controlHeightSM`, `controlHeightLG`, `sizeUnit`. |

---

Sau khi sửa, chạy lại dev server và kiểm tra cả light và dark.
