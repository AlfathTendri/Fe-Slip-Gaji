"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
    const [role, setRole] = useState<"admin" | "employee">("admin");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-[450px] rounded-2xl bg-white p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-slate-900">Buat Akun</h1>
                </div>

                {/* Role Tabs */}
                <div className="mb-8 flex border-b border-slate-100">
                    <button
                        onClick={() => setRole("admin")}
                        className={cn(
                            "flex-1 pb-3 text-sm font-medium transition-all",
                            role === "admin"
                                ? "border-b-2 border-primary text-primary"
                                : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        Sebagai Admin
                    </button>
                    <button
                        onClick={() => setRole("employee")}
                        className={cn(
                            "flex-1 pb-3 text-sm font-medium transition-all",
                            role === "employee"
                                ? "border-b-2 border-primary text-primary"
                                : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        Sebagai Karyawan
                    </button>
                </div>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            type="text"
                            placeholder="Masukkan nama lengkap"
                        />
                    </div>
                    <div className="space-y-2">
                        <Input
                            type="email"
                            placeholder="Email address"
                        />
                    </div>
                    <div className="relative space-y-2">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>

                    <Button type="submit" className="w-full">
                        Buat Akun
                    </Button>

                    <div className="mt-4 text-center text-xs text-slate-400">
                        <Link href="/login" className="hover:text-primary hover:underline">
                            Masuk
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
