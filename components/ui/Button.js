import { cn } from './Card'

export function Button({ className, variant = "primary", size = "default", children, ...props }) {
    const variants = {
        primary: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] border-transparent",
        secondary: "bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-100 border border-white/10 hover:border-white/20",
        ghost: "bg-transparent hover:bg-white/5 text-zinc-400 hover:text-white border-transparent",
        destructive: "bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 hover:border-red-500/50",
    }

    const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-lg",
        icon: "h-10 w-10 p-2 flex items-center justify-center",
    }

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 border",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
