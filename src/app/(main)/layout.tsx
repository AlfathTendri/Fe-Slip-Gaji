import { Sidebar } from "@/components/Sidebar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="ml-64 min-h-screen flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
