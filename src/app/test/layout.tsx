interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="page-wrapper">{children}</div>
    </>
  );
}
