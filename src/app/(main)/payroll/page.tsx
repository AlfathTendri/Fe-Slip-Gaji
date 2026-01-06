"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, UserCheck, Clock, AlertCircle, Calendar, Phone, Search, Calculator, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function PayrollPage() {
    const [activeTab, setActiveTab] = useState<"attendance" | "generate" | "list">("attendance");

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Payroll</h1>
                <p className="text-sm text-slate-500">
                    Buat payroll berdasarkan data kehadiran karyawan
                </p>
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1">
                {[
                    { id: "attendance", label: "Daftar Absensi" },
                    { id: "generate", label: "Generate Payroll" },
                    { id: "list", label: "Daftar Payroll" },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                            "rounded-lg py-2.5 text-sm font-medium transition-all",
                            activeTab === tab.id
                                ? "bg-primary text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-200"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                {activeTab === "attendance" && <AttendanceView />}
                {activeTab === "generate" && <GenerateView />}
                {activeTab === "list" && <PayrollListView />}
            </div>
        </div>
    );
}

function AttendanceView() {
    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-500">Bulan</label>
                    <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>Juni</option>
                        <option>Juli</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-500">Tahun</label>
                    <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>2023</option>
                        <option>2024</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-500">Departemen</label>
                    <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>Semua Departemen</option>
                        <option>Engineering</option>
                    </select>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                {[
                    { label: "Total Karyawan", value: "5", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
                    { label: "Total Hadir", value: "107", icon: UserCheck, color: "text-green-500", bg: "bg-green-50" },
                    { label: "Total Lembur", value: "28 Jam", icon: Clock, color: "text-purple-500", bg: "bg-purple-50" },
                    { label: "Total Tanpa Ket.", value: "1", icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
                    { label: "Izin Cuti", value: "2", icon: Calendar, color: "text-orange-500", bg: "bg-orange-50" },
                ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border border-slate-100 p-3">
                        <div className={cn("rounded-lg p-2", stat.bg)}>
                            <stat.icon className={cn("h-5 w-5", stat.color)} />
                        </div>
                        <div>
                            <p className="text-[10px] font-medium text-slate-500">{stat.label}</p>
                            <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-lg border border-slate-200">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500">
                        <tr>
                            <th className="px-4 py-3 font-medium">Nama Karyawan</th>
                            <th className="px-4 py-3 font-medium">Posisi</th>
                            <th className="px-4 py-3 font-medium text-center">Hari Kerja</th>
                            <th className="px-4 py-3 font-medium text-center">Lembur (Jam)</th>
                            <th className="px-4 py-3 font-medium text-center">Terlambat (hari)</th>
                            <th className="px-4 py-3 font-medium text-center">Izin (Hari)</th>
                            <th className="px-4 py-3 font-medium text-center">Tanpa Keterangan</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {[
                            { name: "Jainudin Ambali", job: "Senior Developer", days: 22, over: 10, late: 0, leave: "0", alpha: "0 Hari" },
                            { name: "Maryam Azizah", job: "Marketing Manager", days: 22, over: 0, late: 1, leave: "0", alpha: "0 Hari" },
                            { name: "Bambang Susilo", job: "Sales Executive", days: 21, over: 8, late: 1, leave: "0", alpha: "1 Hari", alphaColor: "text-red-500" },
                            { name: "Putri Susanti", job: "HR Specialist", days: 20, over: 4, late: 2, leave: "2", alpha: "0 Hari" },
                            { name: "Dede Sulaiman", job: "UI/UX Designer", days: 22, over: 8, late: 0, leave: "0", alpha: "0 Hari" },
                        ].map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50">
                                <td className="px-4 py-3 font-medium text-slate-900">{row.name}</td>
                                <td className="px-4 py-3 text-slate-500">{row.job}</td>
                                <td className="px-4 py-3 text-center text-slate-900">{row.days}</td>
                                <td className="px-4 py-3 text-center text-purple-600 font-medium">{row.over}</td>
                                <td className="px-4 py-3 text-center text-slate-900">{row.late}</td>
                                <td className="px-4 py-3 text-center text-orange-500">{row.leave}</td>
                                <td className={cn("px-4 py-3 text-center", row.alphaColor || "text-green-500")}>{row.alpha}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function GenerateView() {
    return (
        <div className="space-y-6">
            <div className="flex items-end gap-4 border-b border-slate-100 pb-6">
                <div className="flex-1 space-y-2">
                    <label className="text-xs font-medium text-slate-500">Bulan</label>
                    <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                        <option>Juni</option>
                    </select>
                </div>
                <div className="flex-1 space-y-2">
                    <label className="text-xs font-medium text-slate-500">Tahun</label>
                    <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                        <option>2023</option>
                    </select>
                </div>
                <Button className="gap-2">
                    <Calculator className="h-4 w-4" />
                    Hitung Payroll
                </Button>
            </div>

            <div className="flex items-center justify-between">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input placeholder="Cari karyawan..." className="pl-9" />
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
                    <span className="text-sm text-slate-600">Pilih Semua (2/5)</span>
                </div>
            </div>

            <div className="space-y-4">
                {[
                    { name: "Jainudin Ambali", role: "Senior Developer - Engineering", work: 22, late: 0, over: "10 Jam", leave: "0 Hari", alpha: "0 Hari" },
                    { name: "Maryam Azizah", role: "Marketing Manager - Marketing", work: 22, late: "1 Hari", over: "0 Jam", leave: "0 Hari", alpha: "0 Hari" },
                ].map((emp, i) => (
                    <div key={i} className="flex items-start gap-4 rounded-xl border border-slate-200 p-4 transition-all hover:border-primary/50">
                        <input type="checkbox" checked readOnly className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
                        <div className="flex-1">
                            <div className="mb-4">
                                <h3 className="font-semibold text-slate-900">{emp.name}</h3>
                                <p className="text-xs text-slate-500">{emp.role}</p>
                            </div>
                            <div className="grid grid-cols-5 gap-4 text-sm">
                                <div>
                                    <p className="text-[10px] text-slate-500">Hari Kerja</p>
                                    <p className="font-medium text-slate-900">{emp.work}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500">Terlambat</p>
                                    <p className="font-medium text-orange-500">{emp.late}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500">Lembur</p>
                                    <p className="font-medium text-blue-500">{emp.over}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500">Izin/Cuti</p>
                                    <p className="font-medium text-slate-900">{emp.leave}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500">Tanpa Keterangan</p>
                                    <p className="font-medium text-red-500">{emp.alpha}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function PayrollListView() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Daftar Payroll Bulan Juni 2023</h3>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input placeholder="Cari karyawan..." className="pl-9" />
                </div>
            </div>

            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                    <tr>
                        <th className="px-4 py-3 font-medium">Nama Karyawan</th>
                        <th className="px-4 py-3 font-medium">Posisi</th>
                        <th className="px-4 py-3 font-medium">Gaji Pokok</th>
                        <th className="px-4 py-3 font-medium text-green-600">Gaji Bersih</th>
                        <th className="px-4 py-3 font-medium text-center">Status</th>
                        <th className="px-4 py-3 font-medium text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {[
                        { name: "Jainudin Ambali", role: "Senior Developer", basic: "Rp 12.000.000", net: "Rp 14.420.000" },
                        { name: "Maryam Azizah", role: "Marketing Manager", basic: "Rp 10.000.000", net: "Rp 11.550.000" },
                    ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-medium text-slate-900">{row.name}</td>
                            <td className="px-4 py-3 text-slate-500">{row.role}</td>
                            <td className="px-4 py-3 text-slate-900">{row.basic}</td>
                            <td className="px-4 py-3 font-bold text-green-600">{row.net}</td>
                            <td className="px-4 py-3 text-center">
                                <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-600">
                                    Dibayar
                                </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                                <div className="flex justify-center gap-2">
                                    <Link href="/payroll/slip/1" className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-primary">
                                        <FileText className="h-4 w-4" />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
