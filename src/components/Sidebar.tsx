"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wallet, BarChart3, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    {
        title: "Dashboard Payroll",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Payroll",
        href: "/payroll",
        icon: Wallet,
    },
    {
        title: "Laporan",
        href: "/laporan", // naming as per screenshots (Laporan)
        icon: BarChart3,
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white">
            <div className="flex h-full flex-col px-4 py-6">
                {/* Logo */}
                <div className="mb-8 flex items-center gap-3 px-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                        <Wallet className="h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-slate-900">Payroll Management</h1>
                        <p className="text-[10px] text-slate-500">PT Indonesia Emas</p>
                    </div>
                </div>

                {/* Menu */}
                <div className="flex-1 space-y-1">
                    <p className="mb-2 px-2 text-xs font-medium text-slate-400">Payroll</p>
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-sky-50 text-primary"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-slate-400")} />
                                {item.title}
                            </Link>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="mt-auto border-t border-slate-100 pt-4">
                    <div className="mb-4 flex items-center gap-3 px-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                            <span className="text-xs font-bold">AD</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-900">Admin User</p>
                            <p className="text-[10px] text-slate-500">admin@gmail.com</p>
                        </div>
                    </div>

                    <button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-red-500 hover:bg-red-50">
                        <LogOut className="h-4 w-4" />
                        Keluar
                    </button>
                </div>
            </div>
        </aside>
    );
}
