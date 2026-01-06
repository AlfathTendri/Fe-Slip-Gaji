import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Payroll Management",
    description: "Payroll Management System",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-slate-50">{children}</body>
        </html>
    );
}
