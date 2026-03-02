"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Select, App } from "antd";
import type { InputRef } from "antd";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";

const CONTACT_TYPES = ["product", "outsource", "other"] as const;
type ContactType = (typeof CONTACT_TYPES)[number];

type ContactFormValues = {
    name: string;
    email: string;
    type: ContactType;
    message: string;
};

type ContactFormProps = {
    /** Pre-select loại hợp tác từ query param */
    defaultType?: string;
    /** Pre-fill message */
    defaultMessage?: string;
};

export function ContactForm({ defaultType, defaultMessage }: ContactFormProps) {
    const t = useTranslations("landing.contactForm");
    const [form] = Form.useForm<ContactFormValues>();
    const [loading, setLoading] = useState(false);
    const { message } = App.useApp();
    const nameInputRef = useRef<InputRef>(null);

    useEffect(() => {
        // Auto-focus name field after a small delay for animations
        const timer = setTimeout(() => nameInputRef.current?.focus(), 400);
        return () => clearTimeout(timer);
    }, []);

    const initialType: ContactType = CONTACT_TYPES.includes(
        defaultType as ContactType,
    )
        ? (defaultType as ContactType)
        : "other";

    const typeOptions = CONTACT_TYPES.map((key) => ({
        value: key,
        label: t(`types.${key}`),
    }));

    const onFinish = async (values: ContactFormValues) => {
        setLoading(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!res.ok) throw new Error("Failed");

            form.resetFields();
            message.success({
                content: t("successTitle"),
                duration: 5,
                key: "contact-form",
            });
        } catch {
            message.error({
                content: t("errorTitle"),
                duration: 5,
                key: "contact-form",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            initialValues={{ type: initialType, message: defaultMessage }}
            className="space-y-1"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <Form.Item
                    name="name"
                    label={t("name")}
                    rules={[{ required: true, message: t("nameRequired") }]}
                >
                    <Input
                        ref={nameInputRef}
                        placeholder={t("namePlaceholder")}
                        size="large"
                        className="rounded-xl!"
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    label={t("email")}
                    rules={[
                        { required: true, message: t("emailRequired") },
                        { type: "email", message: t("emailInvalid") },
                    ]}
                >
                    <Input
                        placeholder={t("emailPlaceholder")}
                        size="large"
                        className="rounded-xl!"
                    />
                </Form.Item>
            </div>

            <Form.Item
                name="type"
                label={t("type")}
                rules={[{ required: true, message: t("typeRequired") }]}
            >
                <Select
                    options={typeOptions}
                    size="large"
                    className="rounded-xl!"
                />
            </Form.Item>

            <Form.Item
                name="message"
                label={t("message")}
                rules={[{ required: true, message: t("messageRequired") }]}
            >
                <Input.TextArea
                    placeholder={t("messagePlaceholder")}
                    rows={4}
                    className="rounded-xl!"
                    size="large"
                />
            </Form.Item>

            <Form.Item className="mb-0! text-center">
                <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                    icon={<Send className="size-4" />}
                    className="px-8! rounded-xl! font-semibold!"
                >
                    {loading ? t("sending") : t("submit")}
                </Button>
            </Form.Item>
        </Form>
    );
}
