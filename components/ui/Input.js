import { cn } from './Card'

export function Input({ className, ...props }) {
    return (
        <input
            className={cn(
                "flex h-10 w-full rounded-lg border border-white/10 bg-zinc-900/50 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        />
    )
}

export function Label({ className, children, ...props }) {
    return (
        <label
            className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-400", className)}
            {...props}
        >
            {children}
        </label>
    )
}
