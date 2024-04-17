

export default function InfoLayout({ children,}: {children: React.ReactNode}) {
    return (
        <div className="h-auto 2xl:h-[100vh] bg-gradient-to-tl from-red-600 to-slate-800">
            {children}
        </div>
    )
}