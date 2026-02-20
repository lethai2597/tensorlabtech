---
description: Chuyển đổi text thô (bài viết Facebook) thành bài viết MDX sinh động với charts, diagrams, callouts, code blocks, và ảnh minh họa
---

# Blog Writer Workflow

Agent chuyên chuyển đổi nội dung text thô (bài viết, bài chia sẻ trên Facebook) thành bài viết MDX sinh động cho blog TensorLab.

## Input

User cung cấp:
- Nội dung text thô (copy từ Facebook hoặc viết tay)
- (Optional) Slug mong muốn cho URL

## Workflow Steps

// turbo-all

### 1. Phân tích nội dung

Đọc kỹ nội dung, xác định:
- **Chủ đề chính** → title + description cho frontmatter
- **Cấu trúc** → chia thành các sections (H2, H3)
- **Tips/cảnh báo** → có thể dùng Callout
- **Code examples** → code fences với language
- **Cần ảnh minh họa** → dùng generate_image

### 2. Tạo frontmatter

```yaml
---
title: "[Tiêu đề hấp dẫn, ngắn gọn]"
date: "[YYYY-MM-DD]"
description: "[Mô tả 1-2 câu cho SEO và listing page]"
---
```

**Quy tắc:**
- `title`: Tối đa 70 ký tự, có hook
- `description`: Tối đa 160 ký tự
- `date`: Ngày hiện tại (format ISO)

### 3. Chuyển đổi nội dung thành MDX

**Nguyên tắc chuyển đổi:**

1. **Mở đầu** → Giữ nguyên giọng văn gốc, thêm Callout "Tóm tắt" nếu có
2. **Section lớn** → Dùng `## H2` cho mỗi phần chính
3. **Sub-section** → Dùng `### H3` cho mỗi phần con
4. **List dạng so sánh** → Dùng markdown table hoặc bullet list
5. **Quy trình tuần tự** → Dùng numbered list hoặc bullet list
6. **Số liệu/thống kê** → Dùng markdown table hoặc inline text
7. **Tips, cảnh báo, lưu ý** → Chuyển thành `<Callout />`
8. **Code examples** → Dùng code fences (\`\`\`language)
9. **Emoji** → KHÔNG dùng emoji trong headings và nội dung

### 4. Thêm rich components

**Các component có sẵn:**

```mdx
{/* Callout box */}
<Callout type="info|tip|warning|danger" title="Tiêu đề">
  Nội dung callout
</Callout>

{/* Ảnh có caption */}
<ImageWithCaption
  src="/blog/ten-anh.png"
  alt="Mô tả ảnh"
  caption="Caption hiển thị dưới ảnh"
/>
```

**Dùng markdown thuần cho dữ liệu:**
- Dữ liệu so sánh → dùng markdown table (`| Col1 | Col2 |`)
- Quy trình/flow → dùng numbered list hoặc nested bullet list
- Số liệu → dùng inline text hoặc markdown table

### 5. Lưu file MDX

Đặt file tại: `content/blog/[slug].mdx`

**Slug convention:**
- Lowercase, dùng dấu gạch ngang
- Không dùng dấu tiếng Việt
- Tóm tắt nội dung: `outsource-product-startup-bigcorp`

### 6. Verify

Kiểm tra:
- [ ] Frontmatter hợp lệ
- [ ] Tất cả components import đúng (MDX tự import)
- [ ] Không có lỗi cú pháp JSX
- [ ] Các content ngoặc nhọn `{` `}` được escape đúng
- [ ] File nằm đúng thư mục `content/blog/`

## Style Guide

- **Giọng văn**: Giữ nguyên giọng văn gốc của tác giả, thân thiện, gần gũi
- **Rich components**: Dùng Callout khi cần nhấn mạnh tips/cảnh báo, không lạm dụng
- **Markdown native**: Ưu tiên dùng markdown table, list, blockquote thay vì custom components
- **Spacing**: Dùng `---` giữa các sub-sections cùng level
- **Bold**: Dùng `**bold**` cho từ khóa quan trọng
- **Emoji**: KHÔNG dùng emoji — giữ phong cách chuyên nghiệp

## Example

Input: "So sánh React vs Vue..."
Output file: `content/blog/react-vs-vue.mdx`

## Dependencies

Các MDX components (`Callout`, `ImageWithCaption`) đã được cấu hình sẵn trong page `app/[locale]/blog/[slug]/page.tsx` — không cần import trong file MDX.
