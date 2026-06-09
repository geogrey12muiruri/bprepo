import type { Metadata } from "next";
import { ADMIN_NAME } from "@/constants/contacts";

export const metadata: Metadata = {
  title: `Admin Dashboard | ${ADMIN_NAME}`,
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-neutral-950">
      <nav className="bg-neutral-900 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">Blue Pineapple</h1>
              <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded">Admin</span>
            </div>
            <div className="flex space-x-4">
              <a href="/admin/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white">Dashboard</a>
              <a href="/admin/partners" className="px-3 py-2 rounded-md text-sm font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white">Partners</a>
              <a href="/admin/experiences" className="px-3 py-2 rounded-md text-sm font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white">Experiences</a>
              <a href="/admin/availability" className="px-3 py-2 rounded-md text-sm font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white">Calendar</a>
              <a href="/admin/vouchers" className="px-3 py-2 rounded-md text-sm font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white">Vouchers</a>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-8 px-4">{children}</main>
    </div>
  );
}