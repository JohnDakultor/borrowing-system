"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut, Package, LayoutDashboard, Menu } from "lucide-react";
import "../globals.css";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-slate-900 text-white antialiased">
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Mobile Top Bar */}
          <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
            <div className="text-xl font-bold">Borrowly</div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
              <Menu />
            </Button>
          </div>

          {/* Sidebar */}
          <aside
            className={`${
              open ? "block" : "hidden"
            } md:block w-full md:w-64 bg-slate-800 border-r border-slate-700 p-6 space-y-4 md:space-y-6`}
          >
            <div className="text-2xl font-bold hidden md:block mb-10">Borrowly</div>

            <nav className="space-y-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700 transition"
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>

              <Link
                href="/inventory"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700 transition"
              >
                <Package size={18} />
                <span>Inventory</span>
              </Link>
            </nav>

            <div className="pt-6 border-t border-slate-700 mt-6">
              <Button
                variant="ghost"
                className="w-full flex justify-start gap-3 text-red-500 hover:bg-red-900/20"
              >
                <LogOut size={18} />
                Logout
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
