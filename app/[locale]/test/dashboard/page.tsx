"use client";

import {
  Alert,
  Badge,
  Button,
  Dropdown,
  Empty,
  Input,
  List,
  Popconfirm,
  Progress,
  Result,
  Segmented,
  Select,
  Statistic,
  Table,
  Tag,
  Tabs,
  Timeline,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { MenuProps } from "antd";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Bell,
  BookOpen,
  Filter,
  HelpCircle,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShoppingCart,
  Trash2,
  Users,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo, useState } from "react";

const { Text } = Typography;

type OrderRow = {
  key: string;
  orderId: string;
  customer: string;
  date: string;
  status: "Paid" | "Pending" | "Refunded";
  total: number;
};

type ProductRow = {
  key: string;
  name: string;
  units: number;
  revenue: number;
  trend: "up" | "down";
};

function formatCurrencyVnd(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

function SectionCard({
  title,
  subtitle,
  icon,
  actions,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={["bg-surface border border-border rounded-3xl p-8", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-start justify-between gap-8 mb-8">
        <div className="flex items-start gap-4">
          {icon ? <div className="shrink-0">{icon}</div> : null}
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            {subtitle ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
        {actions ? (
          <div className="flex items-center gap-4">{actions}</div>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function IconBadge({
  children,
  tone = "primary",
}: {
  children: React.ReactNode;
  tone?: "primary" | "info" | "success" | "warning";
}) {
  const toneClass =
    tone === "success"
      ? "text-success"
      : tone === "info"
        ? "text-info"
        : tone === "warning"
          ? "text-warning"
          : "text-primary";

  return (
    <div
      className={[
        "size-12 rounded-2xl bg-border font-semibold",
        "flex items-center justify-center",
        toneClass,
      ].join(" ")}
    >
      <span className="text-[22px]" aria-hidden>
        {children}
      </span>
    </div>
  );
}

function SubCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={["rounded-2xl bg-background p-8", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

function TableFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className="bg-surface">{children}</div>
      {/* Micro spacing để viền đáy không “đè” nhau */}
      <div className="h-4" aria-hidden />
    </div>
  );
}

function StatusTag({ status }: { status: OrderRow["status"] }) {
  if (status === "Paid")
    return (
      <Tag bordered={false} color="green">
        Paid
      </Tag>
    );
  if (status === "Refunded")
    return (
      <Tag bordered={false} color="red">
        Refunded
      </Tag>
    );
  return (
    <Tag bordered={false} color="gold">
      Pending
    </Tag>
  );
}

function TrendTag({ trend }: { trend: ProductRow["trend"] }) {
  if (trend === "up") {
    return (
      <Tag bordered={false} icon={<ArrowUp />} color="green">
        Up
      </Tag>
    );
  }
  return (
    <Tag bordered={false} icon={<ArrowDown />} color="red">
      Down
    </Tag>
  );
}

export default function TestDashboardPage() {
  const [range, setRange] = useState<"14 ngày" | "30 ngày">("14 ngày");
  const [metricRange, setMetricRange] = useState<"This month" | "Last 30d">(
    "This month",
  );

  const salesData = useMemo(() => {
    const days = range === "14 ngày" ? 14 : 30;
    const start = new Date();
    start.setDate(start.getDate() - (days - 1));

    const result = Array.from({ length: days }).map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const label = `${d.getDate()}/${d.getMonth() + 1}`;
      const base = range === "14 ngày" ? 18_000_000 : 14_000_000;
      const weekday = d.getDay();
      const seasonalBoost = weekday === 0 || weekday === 6 ? 1.3 : 1;
      const noise = 0.82 + ((i * 37) % 19) / 30; // deterministic pseudo-noise
      const revenue = Math.round(base * seasonalBoost * noise);
      return { day: label, revenue };
    });

    return result;
  }, [range]);

  const orders: OrderRow[] = useMemo(
    () => [
      {
        key: "1",
        orderId: "#10294",
        customer: "Nguyễn An",
        date: "02/02/2026",
        status: "Paid",
        total: 1_290_000,
      },
      {
        key: "2",
        orderId: "#10293",
        customer: "Trần Minh",
        date: "02/02/2026",
        status: "Pending",
        total: 890_000,
      },
      {
        key: "3",
        orderId: "#10292",
        customer: "Phạm Huy",
        date: "01/02/2026",
        status: "Paid",
        total: 2_490_000,
      },
      {
        key: "4",
        orderId: "#10291",
        customer: "Lê Thu",
        date: "01/02/2026",
        status: "Refunded",
        total: 590_000,
      },
      {
        key: "5",
        orderId: "#10290",
        customer: "Võ Khánh",
        date: "31/01/2026",
        status: "Paid",
        total: 1_990_000,
      },
    ],
    [],
  );

  const topProducts: ProductRow[] = useMemo(
    () => [
      {
        key: "p1",
        name: "Starter Kit",
        units: 128,
        revenue: 25_600,
        trend: "up",
      },
      {
        key: "p2",
        name: "Pro Plan",
        units: 74,
        revenue: 22_200,
        trend: "up",
      },
      {
        key: "p3",
        name: "Addon Analytics",
        units: 52,
        revenue: 11_800,
        trend: "down",
      },
      {
        key: "p4",
        name: "Support Pack",
        units: 31,
        revenue: 6_900,
        trend: "down",
      },
    ],
    [],
  );

  const ordersColumns: ColumnsType<OrderRow> = useMemo(
    () => [
      {
        title: "Order",
        dataIndex: "orderId",
        key: "orderId",
        width: 120,
      },
      {
        title: "Customer",
        dataIndex: "customer",
        key: "customer",
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        width: 120,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 140,
        render: (_, row) => <StatusTag status={row.status} />,
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
        width: 160,
        align: "right",
        render: (_, row) => <Text strong>{formatCurrencyVnd(row.total)}</Text>,
      },
    ],
    [],
  );

  const productsColumns: ColumnsType<ProductRow> = useMemo(
    () => [
      { title: "Product", dataIndex: "name", key: "name" },
      {
        title: "Units",
        dataIndex: "units",
        key: "units",
        width: 100,
        align: "right",
      },
      {
        title: "Revenue",
        dataIndex: "revenue",
        key: "revenue",
        width: 160,
        align: "right",
        render: (_, row) => formatCurrencyVnd(row.revenue),
      },
      {
        title: "Trend",
        dataIndex: "trend",
        key: "trend",
        width: 110,
        render: (_, row) => <TrendTag trend={row.trend} />,
      },
    ],
    [],
  );

  const totalRevenue = useMemo(
    () => salesData.reduce((sum, d) => sum + d.revenue, 0),
    [salesData],
  );

  const customers = 12_480;
  const customersDelta = 8.4;
  const ordersCount = 1_924;
  const ordersDelta = -2.1;

  const activeUsers = 1_284;
  const activeUsersDelta = 6.2;
  const dau = 742;
  const wau = 2_910;

  const monthlyTarget = 720_000_000;
  const achieved = 512_000_000;
  const achievedPct = Math.round((achieved / monthlyTarget) * 100);

  const upcoming = useMemo(
    () => [
      {
        key: "s1",
        title: "Demo khách hàng (Enterprise)",
        time: "Hôm nay · 15:00",
        tag: (
          <Tag bordered={false} color="blue">
            Meeting
          </Tag>
        ),
      },
      {
        key: "s2",
        title: "Review roadmap tháng 2",
        time: "Ngày mai · 10:30",
        tag: (
          <Tag bordered={false} color="gold">
            Planning
          </Tag>
        ),
      },
      {
        key: "s3",
        title: "Gửi báo cáo tuần",
        time: "Thứ 6 · 17:00",
        tag: (
          <Tag bordered={false} color="green">
            Ops
          </Tag>
        ),
      },
      {
        key: "s4",
        title: "Bảo trì hệ thống (scheduled)",
        time: "CN · 02:00",
        tag: (
          <Tag bordered={false} color="red">
            Maintenance
          </Tag>
        ),
      },
    ],
    [],
  );

  const activities = useMemo(
    () => [
      {
        key: "a1",
        color: "green" as const,
        children: (
          <div>
            <div className="flex items-center justify-between gap-8">
              <Text strong>Payment confirmed</Text>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                2 phút trước
              </span>
            </div>
            <Text type="secondary">Order #10294 · 1.290.000₫</Text>
          </div>
        ),
      },
      {
        key: "a2",
        color: "blue" as const,
        children: (
          <div>
            <div className="flex items-center justify-between gap-8">
              <Text strong>New customer signup</Text>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                18 phút trước
              </span>
            </div>
            <Text type="secondary">Nguyễn An · via referral</Text>
          </div>
        ),
      },
      {
        key: "a3",
        color: "red" as const,
        children: (
          <div>
            <div className="flex items-center justify-between gap-8">
              <Text strong>Refund processed</Text>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                1 giờ trước
              </span>
            </div>
            <Text type="secondary">Order #10291 · 590.000₫</Text>
          </div>
        ),
      },
      {
        key: "a4",
        color: "gray" as const,
        children: (
          <div>
            <div className="flex items-center justify-between gap-8">
              <Text strong>Deploy completed</Text>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                Hôm qua
              </span>
            </div>
            <Text type="secondary">Release v0.1.0 · dashboard UI updates</Text>
          </div>
        ),
      },
    ],
    [],
  );

  const sectionMenuItems: MenuProps["items"] = useMemo(
    () => [
      { key: "refresh", label: "Refresh" },
      { key: "export", label: "Export" },
      { key: "settings", label: "Settings" },
    ],
    [],
  );

  return (
    <div className="container mx-auto px-8 py-8 space-y-8">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold">Test Dashboard</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Trang test UI dashboard (Ant Design + Tailwind) theo guideline dự án.
        </p>
      </header>

      {/* Desktop: 2 cột (2/1) — cột to: Quick Stats + nội dung chính; cột nhỏ: Alerts + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Stats — cột to */}
          <SectionCard
            title="Quick Stats"
            subtitle="Dãy metric nhanh (số + label)"
            actions={
              <Button
                icon={<RefreshCw />}
                aria-label="Refresh stats"
                size="small"
              >
                Refresh
              </Button>
            }
          >
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-border flex items-center justify-center text-primary">
                  <span className="text-[22px]" aria-hidden>
                    <Users />
                  </span>
                </div>
                <div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    Total users
                  </div>
                  <div className="text-2xl font-bold">24.5K</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-border flex items-center justify-center text-success">
                  <span className="text-[22px]" aria-hidden>
                    <ShoppingCart />
                  </span>
                </div>
                <div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    Conversions
                  </div>
                  <div className="text-2xl font-bold">1.2K</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  Uptime
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Tag bordered={false} color="blue">
                  Beta
                </Tag>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  Feature flag
                </span>
              </div>
            </div>
          </SectionCard>

          {/* List metric: Customers, Order */}
          <SectionCard
            title="Metrics"
            subtitle="Tổng quan nhanh về Customers & Orders"
            icon={
              <IconBadge tone="info">
                <Users />
              </IconBadge>
            }
            actions={
              <>
                <Segmented
                  value={metricRange}
                  onChange={(v) =>
                    setMetricRange(v as "This month" | "Last 30d")
                  }
                  options={["This month", "Last 30d"]}
                />
                <Button icon={<RefreshCw />} aria-label="Refresh metrics" />
              </>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SubCard className="h-full">
                <div className="flex items-center justify-between gap-8 mb-4">
                  <div className="flex items-center gap-4">
                    <IconBadge tone="primary">
                      <Users />
                    </IconBadge>
                    <div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">
                        Customers
                      </div>
                      <div className="text-2xl font-bold">{customers}</div>
                    </div>
                  </div>
                  <Tag bordered={false} color="blue">
                    {metricRange}
                  </Tag>
                </div>
                <div className="flex items-center justify-between gap-8 mt-4">
                  <Text type="secondary">So với tháng trước</Text>
                  <Tag bordered={false} icon={<ArrowUp />} color="green">
                    +{customersDelta}%
                  </Tag>
                </div>
              </SubCard>

              <SubCard className="h-full">
                <div className="flex items-center justify-between gap-8 mb-4">
                  <div className="flex items-center gap-4">
                    <IconBadge tone="warning">
                      <ShoppingCart />
                    </IconBadge>
                    <div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">
                        Orders
                      </div>
                      <div className="text-2xl font-bold">{ordersCount}</div>
                    </div>
                  </div>
                  <Tag bordered={false} color="blue">
                    {metricRange}
                  </Tag>
                </div>
                <div className="flex items-center justify-between gap-8 mt-4">
                  <Text type="secondary">So với tháng trước</Text>
                  <Tag bordered={false} icon={<ArrowDown />} color="red">
                    {ordersDelta}%
                  </Tag>
                </div>
              </SubCard>
            </div>
          </SectionCard>

          {/* Chart Monthly sale (doanh thu theo ngày) */}
          <SectionCard
            title="Monthly Sales"
            subtitle="Doanh thu theo ngày (mock data)"
            actions={
              <>
                <Segmented
                  value={range}
                  onChange={(v) => setRange(v as "14 ngày" | "30 ngày")}
                  options={["14 ngày", "30 ngày"]}
                />
                <Dropdown
                  menu={{ items: sectionMenuItems }}
                  trigger={["click"]}
                >
                  <Button icon={<MoreHorizontal />} aria-label="More actions" />
                </Dropdown>
              </>
            }
          >
            <div className="flex items-center justify-between gap-8 mb-8">
              <div className="space-y-4">
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  Total
                </div>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrencyVnd(totalRevenue)}
                </div>
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                Avg/day:{" "}
                <span className="text-foreground font-semibold">
                  {formatCurrencyVnd(
                    Math.round(totalRevenue / salesData.length),
                  )}
                </span>
              </div>
            </div>

            <div className="h-80 w-full rounded-2xl bg-background p-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient
                      id="salesGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--color-primary)"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-primary)"
                        stopOpacity={0.04}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                  <XAxis dataKey="day" tickMargin={8} />
                  <YAxis
                    tickMargin={8}
                    tickFormatter={(v) =>
                      `${Math.round(Number(v) / 1_000_000)}M`
                    }
                  />
                  <Tooltip
                    formatter={(value) =>
                      formatCurrencyVnd(Number(value ?? 0) || 0)
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-primary)"
                    fill="url(#salesGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          {/* Recent Orders */}
          <SectionCard
            title="Recent Orders"
            subtitle="Đơn hàng gần đây (AntD Table)"
            actions={
              <>
                <Button type="link">View all</Button>
              </>
            }
          >
            <TableFrame>
              <Table<OrderRow>
                size="middle"
                columns={ordersColumns}
                dataSource={orders}
                scroll={{ x: true }}
                showHeader={false}
                pagination={false}
              />
            </TableFrame>
          </SectionCard>
          {/* Activities */}
          <SectionCard
            title="Activities"
            subtitle="Các hoạt động gần đây (AntD Timeline)"
            actions={
              <>
                <Button type="link">See all</Button>
              </>
            }
            className="pb-0"
          >
            <Timeline items={activities} className="mb-0" />
          </SectionCard>

          {/* Top Products */}
          <SectionCard
            title="Top Products"
            subtitle="Sản phẩm dẫn đầu"
            actions={
              <>
                <Button type="link">View all</Button>
              </>
            }
          >
            <TableFrame>
              <Table<ProductRow>
                size="middle"
                columns={productsColumns}
                dataSource={topProducts}
                pagination={false}
                scroll={{ x: true }}
                showHeader={false}
              />
            </TableFrame>
          </SectionCard>

          {/* Tabs — AntD Tabs */}
          <SectionCard
            title="Tabs"
            subtitle="Chuyển nội dung theo tab (AntD Tabs)"
            actions={
              <Dropdown menu={{ items: sectionMenuItems }} trigger={["click"]}>
                <Button icon={<MoreHorizontal />} aria-label="More actions" />
              </Dropdown>
            }
          >
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Overview",
                  children: (
                    <div className="rounded-2xl bg-background p-8 space-y-4">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Nội dung tab Overview. Có thể đặt bảng, form hoặc chart
                        trong từng tab.
                      </p>
                      <div className="flex items-center gap-4">
                        <Tag bordered={false} color="blue">
                          Tab 1
                        </Tag>
                        <Text strong>Nội dung mẫu</Text>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "2",
                  label: "Details",
                  children: (
                    <div className="rounded-2xl bg-background p-8 space-y-4">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Tab Details — chi tiết hoặc cấu hình.
                      </p>
                    </div>
                  ),
                },
                {
                  key: "3",
                  label: "Settings",
                  children: (
                    <div className="rounded-2xl bg-background p-8 space-y-4">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Tab Settings — form cài đặt.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </SectionCard>

          {/* Filters & Form elements */}
          <SectionCard
            title="Filters & Form"
            subtitle="Input, Select và nút hành động"
            icon={
              <IconBadge tone="info">
                <Filter />
              </IconBadge>
            }
            actions={
              <>
                <Button type="primary">Apply</Button>
                <Button>Reset</Button>
              </>
            }
          >
            <div className="rounded-2xl bg-background p-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <label className="block text-sm text-zinc-500 dark:text-zinc-400">
                    Tìm kiếm
                  </label>
                  <Input
                    placeholder="Nhập từ khóa..."
                    prefix={<Search className="size-4" />}
                    allowClear
                  />
                </div>
                <div className="space-y-4">
                  <label className="block text-sm text-zinc-500 dark:text-zinc-400">
                    Trạng thái
                  </label>
                  <Select
                    placeholder="Chọn trạng thái"
                    className="w-full"
                    allowClear
                    options={[
                      { value: "all", label: "Tất cả" },
                      { value: "active", label: "Đang hoạt động" },
                      { value: "inactive", label: "Tạm dừng" },
                    ]}
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Input
                  placeholder="Filter theo tên"
                  style={{ maxWidth: 200 }}
                  allowClear
                />
                <Select
                  placeholder="Loại"
                  style={{ width: 160 }}
                  allowClear
                  options={[
                    { value: "a", label: "Loại A" },
                    { value: "b", label: "Loại B" },
                  ]}
                />
                <Button icon={<Filter />}>Lọc</Button>
              </div>
            </div>
          </SectionCard>

          {/* Empty & Error states */}
          <SectionCard
            title="Empty & Error States"
            subtitle="Result và Empty (AntD) dùng cho trạng thái không có dữ liệu / lỗi"
            actions={<Button type="link">Docs</Button>}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SubCard>
                <Result
                  status="info"
                  title="Chưa có dữ liệu"
                  subTitle="Thêm mục đầu tiên để bắt đầu."
                  extra={
                    <Button type="primary" icon={<Plus />}>
                      Thêm mới
                    </Button>
                  }
                />
              </SubCard>
              <SubCard>
                <Result
                  status="error"
                  title="Đã xảy ra lỗi"
                  subTitle="Không thể tải dữ liệu. Vui lòng thử lại."
                  extra={[
                    <Button type="primary" key="retry">
                      Thử lại
                    </Button>,
                    <Button key="back">Quay lại</Button>,
                  ]}
                />
              </SubCard>
            </div>
            <div className="mt-4 rounded-2xl bg-background p-8">
              <Empty
                description="Danh sách trống (Empty component)"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              >
                <Button type="primary" size="small">
                  Tạo mới
                </Button>
              </Empty>
            </div>
          </SectionCard>

          {/* Loading skeleton */}
          <SectionCard
            title="Loading Skeleton"
            subtitle="Tailwind skeleton match kích thước content thật"
            actions={
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                Demo tĩnh
              </span>
            }
          >
            <div className="space-y-4">
              <div className="rounded-2xl bg-background p-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl animate-pulse bg-border/60" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-32 animate-pulse rounded-lg bg-border/60" />
                    <div className="h-4 w-48 animate-pulse rounded-lg bg-border/60" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-16 animate-pulse rounded-2xl bg-border/60" />
                  <div className="h-16 animate-pulse rounded-2xl bg-border/60" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse rounded-lg bg-border/60" />
                  <div className="h-4 max-w-[90%] animate-pulse rounded-lg bg-border/60" />
                  <div className="h-4 max-w-[70%] animate-pulse rounded-lg bg-border/60" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-24 flex-1 animate-pulse rounded-2xl bg-border/60" />
                <div className="h-24 flex-1 animate-pulse rounded-2xl bg-border/60" />
                <div className="h-24 flex-1 animate-pulse rounded-2xl bg-border/60" />
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="lg:col-span-1 space-y-8">
          {/* Alerts & Notifications — cột nhỏ */}
          <SectionCard
            title="Alerts & Notifications"
            subtitle="Các loại Alert"
            icon={
              <IconBadge tone="warning">
                <Bell />
              </IconBadge>
            }
            actions={
              <Dropdown menu={{ items: sectionMenuItems }} trigger={["click"]}>
                <Button icon={<MoreHorizontal />} aria-label="More actions" />
              </Dropdown>
            }
          >
            <div className="space-y-4">
              <div>
                <Alert
                  type="info"
                  message="Thông báo info"
                  description="Dùng cho thông tin chung, cập nhật hệ thống hoặc hướng dẫn."
                  showIcon
                />
              </div>
              <div>
                <Alert type="success" message="Thành công" showIcon />
              </div>
              <div>
                <Alert
                  type="warning"
                  message="Cảnh báo"
                  description="Vui lòng kiểm tra lại trước khi tiếp tục."
                  showIcon
                />
              </div>
              <div>
                <Alert
                  type="error"
                  message="Lỗi"
                  description="Đã xảy ra lỗi. Bạn có thể thử lại hoặc liên hệ hỗ trợ."
                  showIcon
                />
              </div>
            </div>
          </SectionCard>

          {/* Quick Actions */}
          <SectionCard
            title="Quick Actions"
            subtitle="Hành động thường dùng"
            icon={
              <IconBadge tone="primary">
                <Zap />
              </IconBadge>
            }
          >
            <div className="space-y-4">
              <Button type="primary" block icon={<Plus />}>
                Tạo đơn mới
              </Button>
              <Button block icon={<ShoppingCart />}>
                Xuất báo cáo
              </Button>
              <Button block icon={<Settings />}>
                Cài đặt
              </Button>
            </div>
          </SectionCard>

          {/* Active Users statistic */}
          <SectionCard
            title="Active Users"
            subtitle="DAU/WAU và xu hướng truy cập"
            actions={
              <Dropdown menu={{ items: sectionMenuItems }} trigger={["click"]}>
                <Button icon={<MoreHorizontal />} aria-label="More actions" />
              </Dropdown>
            }
          >
            <div className="space-y-4">
              <SubCard>
                <div className="flex items-center justify-between gap-8 mb-4">
                  <Text strong className="text-success">
                    Now
                  </Text>
                  <Tag bordered={false} icon={<ArrowUp />} color="green">
                    +{activeUsersDelta}%
                  </Tag>
                </div>
                <Statistic value={activeUsers} />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      DAU
                    </div>
                    <Text strong>{dau.toLocaleString("vi-VN")}</Text>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      WAU
                    </div>
                    <Text strong>{wau.toLocaleString("vi-VN")}</Text>
                  </div>
                </div>
              </SubCard>

              <SubCard>
                <div className="flex items-center justify-between gap-8 mb-4">
                  <Text strong>Engagement</Text>
                  <Badge status="processing" text="Live" />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-8 mb-4">
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        Returning users
                      </span>
                      <Text strong className="text-info">
                        62%
                      </Text>
                    </div>
                    <Progress percent={62} showInfo={false} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-8 mb-4">
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        New users
                      </span>
                      <Text strong className="text-warning">
                        38%
                      </Text>
                    </div>
                    <Progress percent={38} showInfo={false} />
                  </div>
                </div>
              </SubCard>
            </div>
          </SectionCard>

          {/* Monthly Target */}
          <SectionCard
            title="Monthly Target"
            subtitle="Tiến độ mục tiêu doanh thu"
            actions={
              <Dropdown menu={{ items: sectionMenuItems }} trigger={["click"]}>
                <Button icon={<MoreHorizontal />} aria-label="More actions" />
              </Dropdown>
            }
          >
            <div className="space-y-4">
              <SubCard>
                <div className="flex items-center justify-between gap-8">
                  <div className="space-y-4">
                    <Text strong>Tháng 2</Text>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      Target: {formatCurrencyVnd(monthlyTarget)}
                    </div>
                  </div>
                  <Progress type="circle" percent={achievedPct} size={84} />
                </div>
              </SubCard>

              <SubCard>
                <div className="flex items-center justify-between gap-8">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    Achieved
                  </span>
                  <Text strong className="text-success">
                    {formatCurrencyVnd(achieved)}
                  </Text>
                </div>
                <div className="mt-4">
                  <Progress percent={achievedPct} />
                </div>
                <div className="flex items-center justify-between gap-8 mt-4">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    Remaining
                  </span>
                  <Text strong className="text-warning">
                    {formatCurrencyVnd(Math.max(0, monthlyTarget - achieved))}
                  </Text>
                </div>
              </SubCard>
            </div>
          </SectionCard>

          {/* System Status */}
          <SectionCard
            title="System Status"
            subtitle="Trạng thái dịch vụ"
            icon={
              <IconBadge tone="success">
                <Activity />
              </IconBadge>
            }
            actions={
              <Tag bordered={false} color="green">
                Healthy
              </Tag>
            }
          >
            <div className="space-y-4">
              <SubCard>
                <div className="flex items-center justify-between gap-8">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    Uptime
                  </span>
                  <Text strong className="text-success">
                    99.9%
                  </Text>
                </div>
                <div className="flex items-center justify-between gap-8 mt-4">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    Version
                  </span>
                  <Text strong>v1.0.0</Text>
                </div>
              </SubCard>
            </div>
          </SectionCard>

          {/* Upcoming Schedule */}
          <SectionCard
            title="Upcoming Schedule"
            subtitle="Lịch sắp tới (mock)"
            actions={
              <>
                <Button icon={<Plus />} aria-label="Add event">
                  Add
                </Button>
              </>
            }
          >
            <List
              itemLayout="horizontal"
              size="small"
              dataSource={upcoming}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <div className="flex items-start justify-between gap-8">
                        <div>
                          <Text strong>{item.title}</Text>
                          <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-4">
                            {item.time}
                          </div>
                        </div>
                        <div>{item.tag}</div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </SectionCard>

          {/* Help & Support */}
          <SectionCard
            title="Help & Support"
            subtitle="Tài liệu và hỗ trợ"
            icon={
              <IconBadge tone="info">
                <HelpCircle />
              </IconBadge>
            }
          >
            <div className="space-y-4">
              <Button
                block
                icon={<BookOpen />}
                type="link"
                className="p-0 h-auto"
              >
                Xem tài liệu API
              </Button>
              <Button block type="link" className="p-0 h-auto">
                Hướng dẫn sử dụng
              </Button>
              <div className="rounded-2xl bg-background p-4">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Cần hỗ trợ? Liên hệ support@example.com
                </p>
              </div>
            </div>
          </SectionCard>

          {/* Feedback — Popconfirm */}
          <SectionCard
            title="Feedback"
            subtitle="Popconfirm và hành động nguy hiểm"
            actions={
              <Dropdown menu={{ items: sectionMenuItems }} trigger={["click"]}>
                <Button icon={<MoreHorizontal />} aria-label="More actions" />
              </Dropdown>
            }
          >
            <div className="space-y-4">
              <SubCard>
                <div className="flex flex-wrap items-center gap-4">
                  <Popconfirm
                    title="Xóa mục này?"
                    description="Hành động không thể hoàn tác."
                    onConfirm={() => {}}
                    okText="Xóa"
                    cancelText="Hủy"
                    okButtonProps={{ danger: true }}
                  >
                    <Button danger icon={<Trash2 />}>
                      Xóa
                    </Button>
                  </Popconfirm>
                  <Button>Hủy</Button>
                  <Button type="primary">Lưu</Button>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4">
                  Dùng Popconfirm cho nút xóa hoặc thao tác không thể hoàn tác.
                </p>
              </SubCard>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
