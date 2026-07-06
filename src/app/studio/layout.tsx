export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div style={{ margin: 0, minHeight: "100vh" }}>{children}</div>;
}
