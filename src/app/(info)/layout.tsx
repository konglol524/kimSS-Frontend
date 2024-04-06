

export default function InfoLayout({ children,}: {children: React.ReactNode}) {
    return (
        <div className="h-[350vh] md:h-[250vh] bg-gradient-to-tl from-red-600 to-slate-800">
            {children}
        </div>
    )
}