import Link from "next/link";
import { ArrowLeft, Printer, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PayslipPage({ params }: { params: { id: string } }) {
    return (
        <div className="mx-auto max-w-3xl space-y-6">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
                <Link
                    href="/payroll"
                    className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali
                </Link>
                <Button className="gap-2 w-auto">
                    <Printer className="h-4 w-4" />
                    Cetak Slip Gaji
                </Button>
            </div>

            {/* Slip Gaji Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                {/* Slip Header */}
                <div className="mb-8 flex items-start justify-between border-b border-slate-100 pb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">SLIP GAJI</h1>
                        <p className="text-sm text-slate-500">Periode: Juni 2023</p>
                    </div>
                    <div className="text-right">
                        <div className="mb-1 flex items-center justify-end gap-2 text-primary">
                            <Wallet className="h-5 w-5" />
                            <span className="font-bold">Sistem Gaji Digital</span>
                        </div>
                        <p className="text-xs text-slate-400">Jl. Sudirman No. 123, Jakarta</p>
                        <p className="text-xs text-slate-400">Tlp: (021) 1234-5678</p>
                    </div>
                </div>

                {/* Employee Info */}
                <div className="mb-8 grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
                    <div className="grid grid-cols-[100px_1fr] gap-4">
                        <span className="text-slate-500">Email</span>
                        <span className="font-medium text-slate-900">: jainudin@gmail.com</span>

                        <span className="text-slate-500">Nama</span>
                        <span className="font-medium text-slate-900">: Jainudin Ambali</span>

                        <span className="text-slate-500">Posisi</span>
                        <span className="font-medium text-slate-900">: Senior Developer</span>
                    </div>
                    <div className="grid grid-cols-[140px_1fr] gap-4">
                        <span className="text-slate-500">Departemen</span>
                        <span className="font-medium text-slate-900">: Engineering</span>

                        <span className="text-slate-500">Tanggal Bergabung</span>
                        <span className="font-medium text-slate-900">: 15 Januari 2020</span>

                        <span className="text-slate-500">Rekening Bank</span>
                        <span className="font-medium text-slate-900">: BCA - 12345678910</span>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Income */}
                    <div>
                        <div className="mb-4 rounded-lg bg-green-50 px-4 py-2 text-center text-sm font-bold text-green-600">
                            PENDAPATAN
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-600">Gaji Pokok</span>
                                <span className="font-medium text-slate-900">Rp 12.000.000</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Tunjangan</span>
                                <span className="font-medium text-slate-900">Rp 2.000.000</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Lembur (10 Jam)</span>
                                <span className="font-medium text-slate-900">Rp 500.000</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Bonus</span>
                                <span className="font-medium text-slate-900">Rp 1.000.000</span>
                            </div>
                            <div className="mt-4 flex justify-between border-t border-dashed border-slate-200 pt-3">
                                <span className="font-bold text-slate-900">Total Pendapatan</span>
                                <span className="font-bold text-slate-900">Rp 15.500.000</span>
                            </div>
                        </div>
                    </div>

                    {/* Deductions */}
                    <div>
                        <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-center text-sm font-bold text-red-600">
                            POTONGAN
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-600">Potongan Tetap</span>
                                <span className="font-medium text-slate-900">- Rp 0</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Potongan Terlambat</span>
                                <span className="font-medium text-slate-900">- Rp 0</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Potongan Lainnya</span>
                                <span className="font-medium text-slate-900">- Rp 1.080.000</span>
                            </div>
                            <div className="mt-4 pt-3 opacity-0">
                                {/* Spacer to align totals */}
                                <span>Spacer</span>
                            </div>
                            <div className="flex justify-between border-t border-dashed border-slate-200 pt-3">
                                <span className="font-bold text-slate-900">Total Potongan</span>
                                <span className="font-bold text-red-500">- Rp 1.080.000</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Net Salary */}
                <div className="mb-12 rounded-xl bg-blue-50 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-blue-600">GAJI BERSIH</p>
                            <p className="text-2xl font-bold text-slate-900">Rp 14.420.000</p>
                        </div>
                        <p className="max-w-[200px] text-right text-xs text-blue-600/70">
                            Sudah termasuk semua tunjangan dan potongan yang berlaku.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-end justify-between pt-8 text-xs text-slate-400">
                    <div className="max-w-[300px]">
                        <p>Slip gaji ini diterbitkan secara otomatis oleh sistem dan tidak memerlukan tanda tangan basah.</p>
                    </div>
                    <div className="text-right">
                        <p className="mb-12">Jakarta, 30 Juni 2023</p>
                        <p className="font-bold text-slate-900">HR Manager</p>
                        <p>PT Indonesia Emas</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
