"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, UserCheck, Clock, AlertCircle, Calendar, Phone, Search, Calculator, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPeriod, setSelectedPeriod] = useState("Januari 2023");
    const [selectedDepartment, setSelectedDepartment] = useState("Semua Departemen");
    const [selectedStatus, setSelectedStatus] = useState("Semua Status");
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Mock Data
    const employees = [
        { name: "Jainudin Ambali", job: "Senior Developer", department: "Engineering", status: "Tetap", days: 22, over: 10, late: 0, leave: "0", alpha: "0 Hari", phone: "081234567890", email: "jainudin@example.com", joinDate: "12 Jan 2020" },
        { name: "Maryam Azizah", job: "Marketing Manager", department: "Marketing", status: "Tetap", days: 22, over: 0, late: 1, leave: "0", alpha: "0 Hari", phone: "081234567891", email: "maryam@example.com", joinDate: "15 Feb 2021" },
        { name: "Bambang Susilo", job: "Sales Executive", department: "Sales", status: "Kontrak", days: 21, over: 8, late: 1, leave: "0", alpha: "1 Hari", alphaColor: "text-red-500", phone: "081234567892", email: "bambang@example.com", joinDate: "20 Mar 2022" },
        { name: "Putri Susanti", job: "HR Specialist", department: "Human Resources", status: "Tetap", days: 20, over: 4, late: 2, leave: "2", alpha: "0 Hari", phone: "081234567893", email: "putri@example.com", joinDate: "10 Apr 2019" },
        { name: "Dede Sulaiman", job: "UI/UX Designer", department: "Design", status: "Probation", days: 22, over: 8, late: 0, leave: "0", alpha: "0 Hari", phone: "081234567894", email: "dede@example.com", joinDate: "01 May 2023" },
    ];

    const filteredEmployees = employees.filter(emp => {
        const matchSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchDept = selectedDepartment === "Semua Departemen" || emp.department === selectedDepartment;
        const matchStatus = selectedStatus === "Semua Status" || emp.status === selectedStatus;
        return matchSearch && matchDept && matchStatus;
    });

    const handleCloseModal = () => {
        setSelectedEmployee(null);
        setIsEditing(false);
    };

    return (
        <div className="space-y-6 relative">
            {/* Filters */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-500">Periode</label>
                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {["Januari 2023", "Februari 2023", "Maret 2023", "April 2023", "Mei 2023", "Juni 2023", "Juli 2023", "Agustus 2023", "September 2023", "Oktober 2023", "November 2023", "Desember 2023"].map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-500">Departemen</label>
                    <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {["Semua Departemen", "Engineering", "Marketing", "Human Resources", "Finance", "Sales", "Design"].map(d => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-500">Status Karyawan</label>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {["Semua Status", "Tetap", "Kontrak", "Probation"].map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                {
                    [
                        { label: "Total Karyawan", value: filteredEmployees.length.toString(), icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
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
                    ))
                }
            </div >

            {/* Search Bar */}
            < div className="flex justify-between items-center" >
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Cari karyawan..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div >

            {/* Table */}
            < div className="overflow-hidden rounded-lg border border-slate-200" >
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
                        {filteredEmployees.map((row, i) => (
                            <tr
                                key={i}
                                className="hover:bg-slate-50 cursor-pointer transition-colors"
                                onClick={() => { setSelectedEmployee(row); setIsEditing(false); }}
                            >
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
                {
                    filteredEmployees.length === 0 && (
                        <div className="p-8 text-center text-slate-500">
                            Tidak ada data karyawan yang ditemukan.
                        </div>
                    )
                }
            </div >

            {/* Profile Modal */}
            {
                selectedEmployee && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-opacity animate-in fade-in">
                        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                            <div className="bg-primary/5 p-6 border-b border-slate-100 relative">
                                <button
                                    onClick={handleCloseModal}
                                    className="absolute top-4 right-4 p-1 rounded-full hover:bg-black/5 text-slate-500 transition-colors"
                                >
                                    <div className="sr-only">Close</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-5 w-5"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                                        {selectedEmployee.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">{selectedEmployee.name}</h3>
                                        <p className="text-sm text-slate-500">{selectedEmployee.job}</p>
                                        <span className="mt-2 inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                            {selectedEmployee.department}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                {isEditing ? (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-slate-500">Nama Lengkap</label>
                                            <Input defaultValue={selectedEmployee.name} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-slate-500">Posisi</label>
                                            <Input defaultValue={selectedEmployee.job} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-slate-500">Departemen</label>
                                                <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" defaultValue={selectedEmployee.department}>
                                                    {["Engineering", "Marketing", "Human Resources", "Finance", "Sales", "Design"].map(d => (
                                                        <option key={d} value={d}>{d}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-slate-500">Status</label>
                                                <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" defaultValue={selectedEmployee.status}>
                                                    {["Tetap", "Kontrak", "Probation"].map(s => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-slate-500">Email</label>
                                            <Input defaultValue={selectedEmployee.email} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-slate-500">Telepon</label>
                                            <Input defaultValue={selectedEmployee.phone} />
                                        </div>
                                        <div className="flex gap-2 pt-2">
                                            <Button className="w-full bg-white text-slate-700 hover:bg-slate-50 border border-slate-200" variant="outline" onClick={() => setIsEditing(false)}>Batal</Button>
                                            <Button className="w-full" onClick={() => setIsEditing(false)}>Simpan Perubahan</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-slate-500">Status</p>
                                                <p className="font-medium text-slate-900">{selectedEmployee.status}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500">Bergabung Sejak</p>
                                                <p className="font-medium text-slate-900">{selectedEmployee.joinDate}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500">Email</p>
                                                <p className="font-medium text-slate-900 truncate">{selectedEmployee.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500">Telepon</p>
                                                <p className="font-medium text-slate-900">{selectedEmployee.phone}</p>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-slate-100">
                                            <h4 className="text-sm font-semibold text-slate-900 mb-3">Ringkasan Bulan Ini</h4>
                                            <div className="grid grid-cols-3 gap-2 text-center">
                                                <div className="bg-slate-50 rounded-lg p-2">
                                                    <p className="text-xs text-slate-500">Kehadiran</p>
                                                    <p className="font-bold text-green-600">{selectedEmployee.days} Hari</p>
                                                </div>
                                                <div className="bg-slate-50 rounded-lg p-2">
                                                    <p className="text-xs text-slate-500">Lembur</p>
                                                    <p className="font-bold text-blue-600">{selectedEmployee.over} Jam</p>
                                                </div>
                                                <div className="bg-slate-50 rounded-lg p-2">
                                                    <p className="text-xs text-slate-500">Terlambat</p>
                                                    <p className="font-bold text-orange-500">{selectedEmployee.late} Hari</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 pt-2">
                                            <Button className="w-full" onClick={() => setIsEditing(true)}>Edit Data</Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}



function GenerateView() {
    const [isCalculating, setIsCalculating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

    const employees = [
        { name: "Jainudin Ambali", role: "Senior Developer - Engineering", work: 22, late: 0, over: "10 Jam", leave: "0 Hari", alpha: "0 Hari", net: "Rp 14.420.000" },
        { name: "Maryam Azizah", role: "Marketing Manager - Marketing", work: 22, late: "1 Hari", over: "0 Jam", leave: "0 Hari", alpha: "0 Hari", net: "Rp 11.550.000" },
        { name: "Bambang Susilo", role: "Sales Executive - Sales", work: 21, late: "1 Hari", over: "8 Jam", leave: "0 Hari", alpha: "1 Hari", net: "Rp 8.500.000" },
        { name: "Putri Susanti", role: "HR Specialist - Human Resources", work: 20, late: "2 Hari", over: "4 Jam", leave: "2 Hari", alpha: "0 Hari", net: "Rp 9.200.000" },
        { name: "Dede Sulaiman", role: "UI/UX Designer - Design", work: 22, late: 0, over: "8 Jam", leave: "0 Hari", alpha: "0 Hari", net: "Rp 12.100.000" },
    ];

    const toggleSelectAll = () => {
        if (selectedEmployees.length === employees.length) {
            setSelectedEmployees([]);
        } else {
            setSelectedEmployees(employees.map((_, i) => i));
        }
    };

    const toggleEmployee = (index: number) => {
        if (selectedEmployees.includes(index)) {
            setSelectedEmployees(selectedEmployees.filter(i => i !== index));
        } else {
            setSelectedEmployees([...selectedEmployees, index]);
        }
    };

    const handleCalculate = () => {
        if (selectedEmployees.length === 0) return;

        setIsCalculating(true);
        setShowResults(false);
        setProgress(0);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsCalculating(false);
                    setShowResults(true);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4 border-b border-slate-100 pb-6">
                <div className="w-full md:w-1/4 space-y-2">
                    <label className="text-xs font-medium text-slate-500">Periode</label>
                    <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>Januari 2023</option>
                        <option>Juni 2023</option>
                        <option>Desember 2023</option>
                    </select>
                </div>
                <div className="flex-1 flex gap-4 w-full items-end">
                    <div className="flex-1 space-y-2">
                        <label className="text-xs font-medium text-slate-500">Departemen</label>
                        <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                            <option>Semua Departemen</option>
                            <option>Engineering</option>
                            <option>Marketing</option>
                            <option>Sales</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <Button
                            className="w-full gap-2 h-10"
                            onClick={handleCalculate}
                            disabled={isCalculating || selectedEmployees.length === 0}
                        >
                            <Calculator className="h-4 w-4" />
                            {isCalculating ? "Menghitung..." : "Hitung Payroll"}
                        </Button>
                    </div>
                </div>
            </div>

            {isCalculating && (
                <div className="space-y-2 py-4">
                    <div className="flex justify-between text-xs text-slate-500">
                        <span>Menghitung payroll...</span>
                        <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                </div>
            )}

            {showResults && (
                <div className="rounded-lg bg-green-50 p-4 text-green-700 border border-green-100 mb-4 flex justify-between items-center animate-in fade-in slide-in-from-top-2">
                    <div className="text-sm">
                        <span className="font-semibold">Ringkasan Payroll yang sudah dihitung</span>
                        <div className="mt-1 text-xs opacity-90">
                            Total Karyawan: {selectedEmployees.length} &nbsp; Total Gaji: Rp {(selectedEmployees.length * 12000000).toLocaleString('id-ID')} &nbsp; Total Potongan: <span className="text-red-500">Rp {(selectedEmployees.length * 500000).toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setShowResults(false)} className="h-8 bg-white hover:bg-green-100 border-green-200 text-green-700">
                            Reset
                        </Button>
                        <Button size="sm" className="h-8 bg-primary hover:bg-primary/90">
                            Generate Payroll
                        </Button>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input placeholder="Cari karyawan..." className="pl-9" />
                </div>
                <div className="flex items-center gap-2 cursor-pointer" onClick={toggleSelectAll}>
                    <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                        checked={selectedEmployees.length === employees.length && employees.length > 0}
                        onChange={() => { }} // Handle via div click
                    />
                    <span className="text-sm text-slate-600 user-select-none">Pilih Semua ({selectedEmployees.length}/{employees.length})</span>
                </div>
            </div>

            <div className="space-y-4">
                {employees.map((emp, i) => (
                    <div key={i} className={cn(
                        "flex items-start gap-4 rounded-xl border p-4 transition-all",
                        selectedEmployees.includes(i) ? "border-primary/50 bg-blue-50/10" : "border-slate-200 hover:border-slate-300"
                    )}>
                        <div className="pt-1">
                            <input
                                type="checkbox"
                                checked={selectedEmployees.includes(i)}
                                onChange={() => toggleEmployee(i)}
                                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="mb-4 flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-slate-900">{emp.name}</h3>
                                    <p className="text-xs text-slate-500">{emp.role}</p>
                                </div>
                                {showResults && selectedEmployees.includes(i) && (
                                    <div className="flex gap-2">
                                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Dihitung</span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                            <FileText className="h-4 w-4 text-slate-400" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
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
                                {showResults && selectedEmployees.includes(i) && (
                                    <div className="col-span-2 md:col-span-1 border-t md:border-t-0 md:border-l pt-2 md:pt-0 md:pl-4 border-slate-100 mt-2 md:mt-0">
                                        <p className="text-[10px] text-slate-500">Gaji Bersih</p>
                                        <p className="font-bold text-green-600">{emp.net}</p>
                                    </div>
                                )}
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
