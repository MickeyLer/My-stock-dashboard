
import Portfolio from '@/components/Portfolio'
import Watchlist from '@/components/Watchlist'
import { LayoutDashboard, Target, TrendingUp, DollarSign } from 'lucide-react'
import { Card } from '@/components/ui/Card'

export default function Home() {
  return (
    <main className="min-h-screen text-white p-4 md:p-8 lg:p-12 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">

        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <LayoutDashboard size={32} className="text-emerald-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white mb-1">
                Dashboard
              </h1>
              <p className="text-zinc-400 font-medium">Overview & Market Scanner</p>
            </div>
          </div>

          {/* Mock Stats/Quick Actions */}
          <div className="flex gap-4">
            <Card className="flex items-center gap-4 px-6 py-3 bg-zinc-900/50 border-white/5 !rounded-full !shadow-none">
              <div className="p-2 bg-sky-500/10 rounded-full text-sky-400">
                <Target size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase font-bold">Market Status</p>
                <p className="text-sm font-semibold text-white">OPEN</p>
              </div>
            </Card>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-[calc(100vh-200px)] min-h-[600px]">
          {/* Portfolio Section - Takes up more space on large screens */}
          <div className="xl:col-span-8 h-full">
            <Portfolio />
          </div>

          {/* Watchlist/Scanner Section - Sticky on large screens */}
          <div className="xl:col-span-4 h-full">
            <Watchlist />
          </div>
        </div>
      </div>
    </main>
  )
}
