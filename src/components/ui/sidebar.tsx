"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  Package,
  LayoutDashboard,
  Menu,
  HelpingHand,
} from "lucide-react";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });
    router.push("/");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-900 text-white">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="text-xl font-bold">Borrowing System</div>
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
        <div className="text-2xl font-bold hidden md:block mb-10">Borrowing System</div>

        <nav className="space-y-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700 transition"
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/dashboard/inventory"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700 transition"
          >
            <Package size={18} />
            <span>Inventory</span>
          </Link>

          <Link
            href="/dashboard/borrow"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700 transition"
          >
            <HelpingHand size={18} />
            <span>Borrow and Return</span>
          </Link>
        </nav>

        <div className="pt-6 border-t border-slate-700 mt-6">
          <Button
            variant="ghost"
            className="w-full flex justify-start gap-3 text-red-500 hover:bg-red-900/20"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
    </div>
  );
}
