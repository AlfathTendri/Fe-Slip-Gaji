import { DollarSign, Users, Award, Percent } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
    {
        title: "Total Gaji Bulan Ini",
        value: "Rp 920.000.000",
        description: "+2.2% dari bulan lalu",
        icon: DollarSign,
        color: "bg-blue-500",
        textColor: "text-white",
        descriptionColor: "text-blue-100",
    },
    {
        title: "Rata-rata Gaji",
        value: "Rp 7.666.667",
        description: "+2.2% dari bulan lalu",
        icon: Award,
        color: "bg-purple-500",
        textColor: "text-white",
        descriptionColor: "text-purple-100",
    },
    {
        title: "Total Karyawan",
        value: "120",
        description: "Karyawan Aktif",
        icon: Users,
        color: "bg-cyan-500",
        textColor: "text-white",
        descriptionColor: "text-cyan-100",
    },
    {
        title: "Total Potongan",
        value: "Rp 92.000.000",
        description: "10% dari total gaji",
        icon: Percent,
        color: "bg-red-600",
        textColor: "text-white",
        descriptionColor: "text-red-100",
    },
];

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Dashboard Payroll</h1>
                <p className="text-sm text-slate-500">
                    Overview statistik dan analisis payroll bulan ini
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className={cn(
                            "rounded-xl p-4 shadow-sm transition-all hover:shadow-md",
                            stat.color
                        )}
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <span className={cn("text-sm font-medium", stat.textColor)}>
                                {stat.title}
                            </span>
                            <div className="rounded-full bg-white/20 p-2">
                                <stat.icon className={cn("h-4 w-4", stat.textColor)} />
                            </div>
                        </div>
                        <div className={cn("text-2xl font-bold", stat.textColor)}>
                            {stat.value}
                        </div>
                        <p className={cn("mt-1 text-xs", stat.descriptionColor)}>
                            {stat.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Bar Chart Mockup */}
                <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
                    <h3 className="mb-6 text-sm font-semibold text-slate-900">
                        Pengeluaran Gaji Bulanan
                    </h3>
                    <div className="flex h-64 items-end justify-between gap-2">
                        {[60, 45, 75, 50, 65, 80].map((height, i) => (
                            <div key={i} className="group relative w-full h-full flex flex-col justify-end">
                                <div
                                    className="w-full rounded-t-sm bg-blue-500 transition-all hover:bg-blue-600"
                                    style={{ height: `${height}%` }}
                                ></div>
                                <span className="mt-2 text-center text-[10px] text-slate-400">
                                    {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Line Chart Mockup */}
                <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
                    <h3 className="mb-6 text-sm font-semibold text-slate-900">
                        Total Gaji Bulanan
                    </h3>
                    <div className="relative h-64 w-full">
                        {/* Simple SVG Line Chart */}
                        <svg className="h-full w-full" preserveAspectRatio="none">
                            <path
                                d="M0,180 C50,150 100,160 150,120 C200,90 250,110 300,80 C350,50 400,60 500,40"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="3"
                                vectorEffect="non-scaling-stroke"
                            />
                            <circle cx="0" cy="180" r="4" fill="#3b82f6" />
                            <circle cx="150" cy="120" r="4" fill="#3b82f6" />
                            <circle cx="300" cy="80" r="4" fill="#3b82f6" />
                            <circle cx="500" cy="40" r="4" fill="#3b82f6" />
                        </svg>
                        {/* Axis labels would go here */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-slate-400">
                            <span>Jan</span><span>Mar</span><span>Mei</span><span>Jun</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Composition Section */}
            <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
                <h3 className="mb-6 text-sm font-semibold text-slate-900">
                    Komposisi Pengeluaran
                </h3>
                <div className="space-y-6">
                    {[
                        { label: "Gaji Pokok", value: "Rp 650.000.000", percentage: 75, color: "bg-blue-500" },
                        { label: "Tunjangan", value: "Rp 150.000.000", percentage: 25, color: "bg-sky-400" },
                        { label: "Bonus", value: "Rp 80.000.000", percentage: 15, color: "bg-cyan-300" },
                    ].map((item, i) => (
                        <div key={i}>
                            <div className="mb-2 flex justify-between text-sm">
                                <span className="text-slate-600 font-medium">{item.label}</span>
                                <span className="font-bold text-slate-900">{item.value}</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className={cn("h-full rounded-full transition-all", item.color)}
                                    style={{ width: `${item.percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
