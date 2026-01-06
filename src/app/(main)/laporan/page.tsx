import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Laporan & Analitik</h1>
                    <p className="text-sm text-slate-500">
                        Analisis rekap gaji, pengeluaran dan potongan keuangan
                    </p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Laporan
                </Button>
            </div>

            {/* Main Bar Chart */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-6 text-sm font-semibold text-slate-900">Rekap Gaji Per Bulan</h3>
                <div className="flex h-64 items-end justify-between gap-4 px-4">
                    {[
                        { label: 'Jan', val: 60 }, { label: 'Feb', val: 70 }, { label: 'Mar', val: 65 },
                        { label: 'Apr', val: 80 }, { label: 'Mei', val: 75 }, { label: 'Jun', val: 85 }
                    ].map((item, i) => (
                        <div key={i} className="group relative w-full">
                            {/* Tooltip mockup */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                Rp {item.val}.000.000
                            </div>
                            <div
                                className="w-full rounded-t-lg bg-primary transition-all hover:bg-sky-600"
                                style={{ height: `${item.val}%` }}
                            ></div>
                            <span className="mt-4 block text-center text-xs text-slate-400">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Potongan Pie Chart */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-6 text-sm font-semibold text-slate-900">Distribusi Potongan</h3>
                    <div className="flex items-center gap-8">
                        {/* CSS Conic Gradient Pie Chart */}
                        <div
                            className="h-40 w-40 rounded-full"
                            style={{
                                background: `conic-gradient(
                            #ef4444 0% 45%,      /* Pajak - Red */
                            #f97316 45% 70%,     /* BPJS Kes - Orange */
                            #22c55e 70% 90%,     /* BPJS Ket - Green */
                            #3b82f6 90% 100%     /* Lain - Blue */
                        )`
                            }}
                        ></div>

                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                <span className="text-slate-500">Pajak PPh 21</span>
                                <span className="ml-auto font-medium text-slate-900">Rp 6.500.000</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                                <span className="text-slate-500">BPJS Kesehatan</span>
                                <span className="ml-auto font-medium text-slate-900">Rp 3.500.000</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                <span className="text-slate-500">BPJS Ketenagakerjaan</span>
                                <span className="ml-auto font-medium text-slate-900">Rp 2.000.000</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                                <span className="text-slate-500">Potongan Lain</span>
                                <span className="ml-auto font-medium text-slate-900">Rp 1.500.000</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pengeluaran Pie Chart */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-6 text-sm font-semibold text-slate-900">Distribusi Pengeluaran</h3>
                    <div className="flex items-center gap-8">
                        {/* CSS Conic Gradient Pie Chart */}
                        <div
                            className="h-40 w-40 rounded-full"
                            style={{
                                background: `conic-gradient(
                            #0ea5e9 0% 75%,      /* Gaji Pokok - Sky */
                            #a855f7 75% 85%,     /* Lembur - Purple */
                            #22d3ee 85% 100%     /* Tunjangan - Cyan */
                        )`
                            }}
                        ></div>

                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-sky-500"></div>
                                <span className="text-slate-500">Gaji Pokok</span>
                                <span className="ml-auto font-medium text-slate-900">Rp 800.000.000</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                                <span className="text-slate-500">Lembur</span>
                                <span className="ml-auto font-medium text-slate-900">Rp 50.000.000</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-cyan-400"></div>
                                <span className="text-slate-500">Tunjangan</span>
                                <span className="ml-auto font-medium text-slate-900">Rp 100.000.000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
