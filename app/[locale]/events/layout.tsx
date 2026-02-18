export default async function EventsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="pb-24">{children}</div>;
}