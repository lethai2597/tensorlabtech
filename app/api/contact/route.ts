import { NextResponse } from "next/server";

const TYPE_LABELS: Record<string, string> = {
    product: "Hợp tác Product",
    outsource: "Thuê Outsource",
    other: "Khác",
};

type ContactBody = {
    type?: string;
    name: string;
    email: string;
    message: string;
};

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as ContactBody;

        // ---------- validation ----------
        const { type, name, email, message } = body;

        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return NextResponse.json(
                { error: "Vui lòng điền đầy đủ thông tin." },
                { status: 400 },
            );
        }

        // ---------- build Telegram message ----------
        const typeLabel = type ? (TYPE_LABELS[type] ?? type) : "—";

        const text = [
            `📩 *Liên hệ mới từ TensorLab*`,
            ``,
            `📋 *Loại hợp tác:* ${typeLabel}`,
            `👤 *Tên:* ${name}`,
            `📧 *Email:* ${email}`,
            ``,
            `💬 *Nội dung:*`,
            message,
            ``,
            `🕐 _${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}_`,
        ].join("\n");

        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!token || !chatId) {
            console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
            return NextResponse.json(
                { error: "Server configuration error." },
                { status: 500 },
            );
        }

        // ---------- send to Telegram ----------
        const tgRes = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: chatId,
                    text,
                    parse_mode: "Markdown",
                }),
            },
        );

        if (!tgRes.ok) {
            const tgError = await tgRes.text();
            console.error("Telegram API error:", tgError);
            return NextResponse.json(
                { error: "Không thể gửi tin nhắn." },
                { status: 502 },
            );
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Contact API error:", err);
        return NextResponse.json(
            { error: "Đã xảy ra lỗi, vui lòng thử lại." },
            { status: 500 },
        );
    }
}
