"use client";

import {
  Alert,
  AutoComplete,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Calendar,
  Card,
  Carousel,
  Cascader,
  Checkbox,
  Collapse,
  ColorPicker,
  DatePicker,
  Descriptions,
  Drawer,
  Dropdown,
  Empty,
  Image,
  Input,
  InputNumber,
  List,
  Menu,
  Mentions,
  message,
  Modal,
  notification,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  Rate,
  Result,
  Select,
  Segmented,
  Skeleton,
  Slider,
  Space,
  Spin,
  Statistic,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  Timeline,
  TimePicker,
  Tooltip,
  Transfer,
  Tree,
  TreeSelect,
  Upload,
} from "antd";
import type { MenuProps } from "antd";
import { Inbox, Search, Smile, User } from "lucide-react";
import { useState } from "react";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

function ComponentBlock({
  name,
  children,
  compact,
}: {
  name: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "" : "mb-8"}>
      <p className="text-sm font-medium text-foreground mb-4">{name}</p>
      <div>{children}</div>
    </div>
  );
}

const gridSmall =
  "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8";

export default function TestComponentsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const breadcrumbItems = [
    { title: "Home" },
    { title: "Test" },
    { title: "Components" },
  ];

  const menuItems: MenuProps["items"] = [
    { key: "1", label: "Item 1" },
    { key: "2", label: "Item 2" },
    { key: "3", label: "Item 3" },
  ];

  const dropdownMenu: MenuProps["items"] = [
    { key: "1", label: "Action 1" },
    { key: "2", label: "Action 2" },
  ];

  const cascaderOptions = [
    {
      value: "zhejiang",
      label: "Zhejiang",
      children: [{ value: "hangzhou", label: "Hangzhou" }],
    },
  ];

  const tableColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
  ];
  const tableData = [
    { key: "1", name: "Alice", age: 32 },
    { key: "2", name: "Bob", age: 42 },
  ];

  const treeData = [
    {
      title: "Node 1",
      key: "1",
      value: "1",
      children: [
        { title: "Child 1-1", key: "1-1", value: "1-1" },
        { title: "Child 1-2", key: "1-2", value: "1-2" },
      ],
    },
  ];

  const transferDataSource = Array.from({ length: 10 }).map((_, i) => ({
    key: i.toString(),
    title: `Item ${i + 1}`,
  }));

  const sectionClassName =
    "bg-surface border border-border rounded-3xl p-8";

  return (
    <div className="container mx-auto px-8 py-8 space-y-8">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold text-foreground">
          Ant Design Components Showcase
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Trang xem tổng thể UI khi custom theme / design system.
        </p>
      </header>

      {/* Anchor */}
      <section
        className={sectionClassName}
        aria-label="Điều hướng nhanh"
      >
        <div className="flex items-start justify-between gap-8 mb-8">
          <div className="flex items-start gap-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Nhảy tới:
            </p>
          </div>
          <div className="flex items-center gap-4" />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#general"
            className="text-primary hover:underline text-sm"
          >
            General
          </a>
          <span
            className="w-px h-4 bg-border"
            aria-hidden
          />
          <a
            href="#data-entry"
            className="text-primary hover:underline text-sm"
          >
            Data Entry
          </a>
          <span
            className="w-px h-4 bg-border"
            aria-hidden
          />
          <a
            href="#navigation"
            className="text-primary hover:underline text-sm"
          >
            Navigation
          </a>
          <span
            className="w-px h-4 bg-border"
            aria-hidden
          />
          <a
            href="#data-display"
            className="text-primary hover:underline text-sm"
          >
            Data Display
          </a>
          <span
            className="w-px h-4 bg-border"
            aria-hidden
          />
          <a
            href="#feedback"
            className="text-primary hover:underline text-sm"
          >
            Feedback
          </a>
        </div>
      </section>

      {/* General */}
      <section id="general" className={sectionClassName}>
        <div className="flex items-start justify-between gap-8 mb-8">
          <div className="flex items-start gap-4">
            <h2 className="text-2xl font-bold text-foreground">
              General
            </h2>
          </div>
          <div className="flex items-center gap-4" />
        </div>
        <div className={gridSmall}>
          <div className="col-span-2 md:col-span-3 lg:col-span-4">
            <ComponentBlock name="Button" compact>
              <Space wrap>
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="link">Link</Button>
                <Button danger>Danger</Button>
                <Button
                  type="primary"
                  icon={<Search className="size-4" />}
                >
                  Icon + Text
                </Button>
                <Button type="primary" loading>
                  Loading
                </Button>
                <Button disabled>Disabled</Button>
                <Button
                  type="primary"
                  icon={<Search className="size-4" />}
                  aria-label="Search"
                />
              </Space>
            </ComponentBlock>
          </div>
        </div>
      </section>

      {/* Data Entry */}
      <section id="data-entry" className={sectionClassName}>
        <div className="flex items-start justify-between gap-8 mb-8">
          <div className="flex items-start gap-4">
            <h2 className="text-2xl font-bold text-foreground">
              Data Entry
            </h2>
          </div>
          <div className="flex items-center gap-4" />
        </div>
        <div className={gridSmall}>
          <ComponentBlock name="AutoComplete" compact>
            <AutoComplete
              className="w-full"
              options={[{ value: "Option 1" }, { value: "Option 2" }]}
              placeholder="Type here…"
            />
          </ComponentBlock>
          <ComponentBlock name="Cascader" compact>
            <Cascader
              options={cascaderOptions}
              placeholder="Select…"
              className="w-full"
            />
          </ComponentBlock>
          <ComponentBlock name="Checkbox" compact>
            <Space>
              <Checkbox>Checkbox</Checkbox>
              <Checkbox defaultChecked>Checked</Checkbox>
            </Space>
          </ComponentBlock>
          <ComponentBlock name="ColorPicker" compact>
            <ColorPicker />
          </ComponentBlock>
          <ComponentBlock name="DatePicker" compact>
            <Space>
              <DatePicker />
              <RangePicker />
            </Space>
          </ComponentBlock>
          <ComponentBlock name="InputNumber" compact>
            <InputNumber
              min={1}
              max={10}
              defaultValue={3}
              className="w-full"
            />
          </ComponentBlock>
          <ComponentBlock name="Radio" compact>
            <Radio.Group defaultValue="a">
              <Radio value="a">A</Radio>
              <Radio value="b">B</Radio>
            </Radio.Group>
          </ComponentBlock>
          <ComponentBlock name="Rate" compact>
            <Rate defaultValue={3} />
          </ComponentBlock>
          <ComponentBlock name="Select" compact>
            <Select
              className="w-full"
              placeholder="Select…"
              options={[
                { value: "1", label: "Option 1" },
                { value: "2", label: "Option 2" },
              ]}
            />
          </ComponentBlock>
          <ComponentBlock name="Switch" compact>
            <Space>
              <Switch defaultChecked />
              <Switch />
            </Space>
          </ComponentBlock>
          <ComponentBlock name="TimePicker" compact>
            <TimePicker />
          </ComponentBlock>
          <ComponentBlock name="TreeSelect" compact>
            <TreeSelect
              className="w-full"
              treeData={treeData}
              placeholder="Select…"
            />
          </ComponentBlock>
        </div>
        <ComponentBlock name="Input">
          <Space direction="vertical" className="w-[280px]">
            <Input placeholder="Input…" />
            <Input placeholder="Password…" type="password" />
            <TextArea placeholder="TextArea…" rows={2} />
          </Space>
        </ComponentBlock>
        <ComponentBlock name="Slider">
          <Slider defaultValue={30} />
        </ComponentBlock>
        <ComponentBlock name="Mentions">
          <Mentions
            className="w-full"
            options={[
              { value: "user1", label: "User 1" },
              { value: "user2", label: "User 2" },
            ]}
            placeholder="Mention @user…"
          />
        </ComponentBlock>
        <ComponentBlock name="Transfer">
          <Transfer
            dataSource={transferDataSource}
            titles={["Source", "Target"]}
            render={(item) => item.title}
          />
        </ComponentBlock>
        <ComponentBlock name="Upload">
          <Upload.Dragger>
            <p className="ant-upload-drag-icon" aria-hidden>
              <Inbox className="size-4" />
            </p>
            <p className="ant-upload-text">
              Click or drag file to upload
            </p>
          </Upload.Dragger>
        </ComponentBlock>
      </section>

      {/* Navigation */}
      <section id="navigation" className={sectionClassName}>
        <div className="flex items-start justify-between gap-8 mb-8">
          <div className="flex items-start gap-4">
            <h2 className="text-2xl font-bold text-foreground">
              Navigation
            </h2>
          </div>
          <div className="flex items-center gap-4" />
        </div>
        <div className={gridSmall}>
          <ComponentBlock name="Breadcrumb" compact>
            <Breadcrumb items={breadcrumbItems} />
          </ComponentBlock>
          <ComponentBlock name="Dropdown" compact>
            <Dropdown
              menu={{ items: dropdownMenu }}
              placement="bottomLeft"
            >
              <Button>Dropdown</Button>
            </Dropdown>
          </ComponentBlock>
          <ComponentBlock name="Pagination" compact>
            <Pagination defaultCurrent={1} total={50} />
          </ComponentBlock>
        </div>
        <ComponentBlock name="Menu">
          <Menu
            className="w-64"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={menuItems}
          />
        </ComponentBlock>
        <ComponentBlock name="Steps">
          <Steps
            current={1}
            items={[
              { title: "Finished", description: "Step 1" },
              { title: "In Progress", description: "Step 2" },
              { title: "Waiting", description: "Step 3" },
            ]}
          />
        </ComponentBlock>
        <ComponentBlock name="Tabs">
          <Tabs
            defaultActiveKey="1"
            items={[
              { key: "1", label: "Tab 1", children: "Content 1" },
              { key: "2", label: "Tab 2", children: "Content 2" },
            ]}
          />
        </ComponentBlock>
      </section>

      {/* Data Display */}
      <section id="data-display" className={sectionClassName}>
        <div className="flex items-start justify-between gap-8 mb-8">
          <div className="flex items-start gap-4">
            <h2 className="text-2xl font-bold text-foreground">
              Data Display
            </h2>
          </div>
          <div className="flex items-center gap-4" />
        </div>
        <div className={gridSmall}>
          <ComponentBlock name="Avatar" compact>
            <Space>
              <Avatar icon={<User className="size-4" />} />
              <Avatar>U</Avatar>
              <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
            </Space>
          </ComponentBlock>
          <ComponentBlock name="Badge" compact>
            <Space size="large">
              <Badge count={5}>
                <Avatar shape="square" size="large" />
              </Badge>
              <Badge dot>
                <Avatar shape="square" size="large" />
              </Badge>
            </Space>
          </ComponentBlock>
          <ComponentBlock name="Card" compact>
            <Card title="Card title" className="w-full">
              <p>Card content</p>
            </Card>
          </ComponentBlock>
          <ComponentBlock name="Empty" compact>
            <Empty />
          </ComponentBlock>
          <ComponentBlock name="Image" compact>
            <Image
              width={80}
              height={60}
              src="https://unionsquare.vn/wp-content/uploads/2022/05/union_square_Home_m.jpg"
              alt="demo"
              loading="lazy"
            />
          </ComponentBlock>
          <ComponentBlock name="Popover" compact>
            <Popover content="Popover content" title="Title">
              <Button>Hover me</Button>
            </Popover>
          </ComponentBlock>
          <ComponentBlock name="Segmented" compact>
            <Segmented options={["Daily", "Weekly", "Monthly"]} />
          </ComponentBlock>
          <ComponentBlock name="Statistic" compact>
            <Statistic title="Total" value={112893} />
          </ComponentBlock>
          <ComponentBlock name="Tag" compact>
            <Space wrap>
              <Tag bordered={false}>Tag 1</Tag>
              <Tag color="blue" bordered={false}>
                Blue
              </Tag>
              <Tag color="green" bordered={false}>
                Green
              </Tag>
            </Space>
          </ComponentBlock>
          <ComponentBlock name="Tooltip" compact>
            <Tooltip title="Tooltip text">
              <Button>Hover me</Button>
            </Tooltip>
          </ComponentBlock>
        </div>
        <ComponentBlock name="Calendar">
          <Calendar fullscreen={false} />
        </ComponentBlock>
        <ComponentBlock name="Carousel">
          <Carousel className="max-w-[400px]">
            <div className="h-20 leading-[80px] text-center rounded-2xl bg-background border border-border">
              Slide 1
            </div>
            <div className="h-20 leading-[80px] text-center rounded-2xl bg-background border border-border">
              Slide 2
            </div>
            <div className="h-20 leading-[80px] text-center rounded-2xl bg-background border border-border">
              Slide 3
            </div>
          </Carousel>
        </ComponentBlock>
        <ComponentBlock name="Collapse">
          <Collapse
            items={[
              {
                key: "1",
                label: "Panel 1",
                children: "Content 1",
              },
              {
                key: "2",
                label: "Panel 2",
                children: "Content 2",
              },
            ]}
          />
        </ComponentBlock>
        <ComponentBlock name="Descriptions">
          <Descriptions column={1} size="small">
            <Descriptions.Item label="Label 1">
              Value 1
            </Descriptions.Item>
            <Descriptions.Item label="Label 2">
              Value 2
            </Descriptions.Item>
          </Descriptions>
        </ComponentBlock>
        <ComponentBlock name="List">
          <List
            size="small"
            dataSource={["Item 1", "Item 2", "Item 3"]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </ComponentBlock>
        <ComponentBlock name="Table">
          <div className="rounded-2xl border border-border overflow-hidden">
            <Table
              columns={tableColumns}
              dataSource={tableData}
              pagination={false}
              size="small"
            />
          </div>
        </ComponentBlock>
        <ComponentBlock name="Timeline">
          <Timeline
            items={[
              { children: "Created" },
              { children: "In progress" },
              { children: "Done" },
            ]}
          />
        </ComponentBlock>
        <ComponentBlock name="Tree">
          <Tree
            defaultExpandAll
            treeData={treeData}
            className="bg-transparent"
          />
        </ComponentBlock>
      </section>

      {/* Feedback */}
      <section id="feedback" className={sectionClassName}>
        <div className="flex items-start justify-between gap-8 mb-8">
          <div className="flex items-start gap-4">
            <h2 className="text-2xl font-bold text-foreground">
              Feedback
            </h2>
          </div>
          <div className="flex items-center gap-4" />
        </div>
        <div className={gridSmall}>
          <ComponentBlock name="Drawer" compact>
            <Button onClick={() => setDrawerOpen(true)}>
              Open Drawer
            </Button>
            <Drawer
              title="Drawer title"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <p>Drawer content</p>
            </Drawer>
          </ComponentBlock>
          <ComponentBlock name="Message" compact>
            <Button
              onClick={() => message.success("Message demo")}
            >
              Xem demo Message
            </Button>
          </ComponentBlock>
          <ComponentBlock name="Modal" compact>
            <Button onClick={() => setModalOpen(true)}>
              Open Modal
            </Button>
            <Modal
              title="Modal title"
              open={modalOpen}
              onOk={() => setModalOpen(false)}
              onCancel={() => setModalOpen(false)}
            >
              <p>Modal content</p>
            </Modal>
          </ComponentBlock>
          <ComponentBlock name="Notification" compact>
            <Button
              onClick={() =>
                notification.info({
                  message: "Notification",
                  description: "Demo notification",
                })
              }
            >
              Xem demo Notification
            </Button>
          </ComponentBlock>
          <ComponentBlock name="Popconfirm" compact>
            <Popconfirm
              title="Delete?"
              description="Are you sure?"
              onConfirm={() => message.success("Confirmed")}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </ComponentBlock>
          <ComponentBlock name="Spin" compact>
            <Spin size="large">
              <div className="min-h-12 rounded-2xl bg-border/60" />
            </Spin>
          </ComponentBlock>
        </div>
        <ComponentBlock name="Alert">
          <Space direction="vertical" className="w-full">
            <Alert message="Info" type="info" showIcon />
            <Alert message="Success" type="success" showIcon />
            <Alert message="Warning" type="warning" showIcon />
            <Alert message="Error" type="error" showIcon />
          </Space>
        </ComponentBlock>
        <ComponentBlock name="Progress">
          <Space direction="vertical" className="w-full">
            <Progress percent={30} />
            <Progress percent={70} status="active" />
            <Progress type="circle" percent={75} />
          </Space>
        </ComponentBlock>
        <ComponentBlock name="Result">
          <Result
            icon={<Smile className="size-4" aria-hidden />}
            title="Result title"
            subTitle="Result subtitle"
            extra={<Button type="primary">Back</Button>}
          />
        </ComponentBlock>
        <ComponentBlock name="Skeleton">
          <Skeleton active />
        </ComponentBlock>
      </section>
    </div>
  );
}
