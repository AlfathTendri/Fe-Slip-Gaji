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

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-slate-900">Rekap Gaji - Tahun 2023</h3>
                        <p className="text-xs text-slate-500">Grafik per bulan (Januari - Desember)</p>
                    </div>
                </div>

                <div className="relative h-64 w-full overflow-x-auto pb-2">
                    {/* SVG Line Chart */}
                    <div className="h-full min-w-[800px]">
                        <svg className="h-full w-full" viewBox="0 0 800 300" preserveAspectRatio="none">
                            {/* Grid Lines */}
                            {[0, 1, 2, 3, 4].map((i) => (
                                <line
                                    key={i}
                                    x1="0"
                                    y1={i * 75}
                                    x2="800"
                                    y2={i * 75}
                                    stroke="#e2e8f0"
                                    strokeWidth="1"
                                    strokeDasharray="4 4"
                                />
                            ))}

                            {/* Chart Path: Generated for 12 points distributed 0 to 800 */}
                            <path
                                d="M0,300 L0,120 L73,90 L145,105 L218,60 L291,75 L364,45 L436,60 L509,90 L582,75 L655,45 L727,60 L800,30 L800,300 Z"
                                fill="url(#gradient)"
                                opacity="0.2"
                            />
                            <path
                                d="M0,120 L73,90 L145,105 L218,60 L291,75 L364,45 L436,60 L509,90 L582,75 L655,45 L727,60 L800,30"
                                fill="none"
                                stroke="#0ea5e9"
                                strokeWidth="3"
                            />

                            {/* Data Points */}
                            {[
                                { x: 0, y: 120, val: '60jt', label: 'Jan' },
                                { x: 73, y: 90, val: '70jt', label: 'Feb' },
                                { x: 145, y: 105, val: '65jt', label: 'Mar' },
                                { x: 218, y: 60, val: '80jt', label: 'Apr' },
                                { x: 291, y: 75, val: '75jt', label: 'Mei' },
                                { x: 364, y: 45, val: '85jt', label: 'Jun' },
                                { x: 436, y: 60, val: '80jt', label: 'Jul' },
                                { x: 509, y: 90, val: '70jt', label: 'Agu' },
                                { x: 582, y: 75, val: '75jt', label: 'Sep' },
                                { x: 655, y: 45, val: '85jt', label: 'Okt' },
                                { x: 727, y: 60, val: '80jt', label: 'Nov' },
                                { x: 800, y: 30, val: '90jt', label: 'Des' },
                            ].map((point, i) => (
                                <g key={i}>
                                    <circle
                                        cx={point.x}
                                        cy={point.y}
                                        r="4"
                                        fill="#fff"
                                        stroke="#0ea5e9"
                                        strokeWidth="2"
                                        className="cursor-pointer transition-all hover:r-6"
                                    />
                                    {/* Value Label */}
                                    <text
                                        x={point.x}
                                        y={point.y - 10}
                                        textAnchor="middle"
                                        className="fill-slate-600 text-[10px] font-medium"
                                    >
                                        {point.val}
                                    </text>
                                    {/* X-Axis Label */}
                                    <text
                                        x={point.x}
                                        y="290"
                                        textAnchor={i === 0 ? 'start' : i === 11 ? 'end' : 'middle'}
                                        className="fill-slate-400 text-[10px]"
                                    >
                                        {point.label}
                                    </text>
                                </g>
                            ))}

                            {/* Gradient Definition */}
                            <defs>
                                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#0ea5e9" />
                                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
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
