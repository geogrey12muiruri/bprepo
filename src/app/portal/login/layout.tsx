import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Portal Login",
};

export default function PortalAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This layout is specifically for /portal/login - no header/footer
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900">
      {children}
    </div>
  );
}