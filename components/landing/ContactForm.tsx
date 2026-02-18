"use client";

import { useState } from "react";
import { Button, Form, Input, Select, App } from "antd";
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
};

export function ContactForm({ defaultType }: ContactFormProps) {
    const t = useTranslations("landing.contactForm");
    const [form] = Form.useForm<ContactFormValues>();
    const [loading, setLoading] = useState(false);
    const { message } = App.useApp();

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

            message.success(t("successTitle"));
            form.resetFields();
        } catch {
            message.error(t("errorTitle"));
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
            initialValues={{ type: initialType }}
            className="space-y-1"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <Form.Item
                    name="name"
                    label={t("name")}
                    rules={[{ required: true, message: t("nameRequired") }]}
                >
                    <Input
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
