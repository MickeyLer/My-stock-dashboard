'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase/client'
import { Star, TrendingUp, Search } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const SET50_STOCKS = [
    'ADVANC', 'AOT', 'AWC', 'BBL', 'BDMS', 'BEM', 'BGRIM', 'BH', 'BTS', 'CBG',
    'CPALL', 'CPF', 'CPN', 'CRC', 'DELTA', 'EA', 'EGCO', 'GLOBAL', 'GPSC', 'GULF',
    'HMPRO', 'INTUCH', 'IRPC', 'IVL', 'KBANK', 'KCE', 'KTB', 'KTC', 'LH', 'MINT',
    'MTC', 'OR', 'OSP', 'PTT', 'PTTEP', 'PTTGC', 'RATCH', 'SAWAD', 'SCB', 'SCC',
    'SCGP', 'TISCO', 'TOP', 'TRUE', 'TTB', 'TU', 'WHA'
]

export default function Watchlist() {
    const [favorites, setFavorites] = useState(new Set())
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('ALL') // ALL, FAVORITES
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        fetchFavorites()
    }, [])

    const fetchFavorites = async () => {
        setLoading(true)
        const { data, error } = await supabase.from('watchlist').select('symbol')
        if (error) {
            console.error('Error fetching favorites:', error)
        } else {
            const favSet = new Set(data.map(item => item.symbol))
            setFavorites(favSet)
        }
        setLoading(false)
    }

    const toggleFavorite = async (symbol) => {
        const isFav = favorites.has(symbol)
        let newFavs = new Set(favorites)

        if (isFav) {
            newFavs.delete(symbol)
            const { error } = await supabase.from('watchlist').delete().eq('symbol', symbol)
            if (error) console.error('Error removing favorite:', error)
        } else {
            newFavs.add(symbol)
            const { error } = await supabase.from('watchlist').insert([{ symbol }])
            if (error) console.error('Error adding favorite:', error)
        }
        setFavorites(newFavs)
    }

    const filteredStocks = SET50_STOCKS.filter(stock => {
        const matchesSearch = stock.toLowerCase().includes(searchQuery.toLowerCase())
        if (filter === 'FAVORITES') return favorites.has(stock) && matchesSearch
        return matchesSearch
    })

    return (
        <Card className="h-full flex flex-col border-white/5 bg-zinc-900/40 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                    <CardTitle className="flex items-center gap-2 text-sky-400">
                        <TrendingUp size={20} /> Morning Scout
                    </CardTitle>
                    <p className="text-zinc-500 text-xs mt-1">SET50 & Candidates</p>
                </div>
                <div className="flex gap-2 bg-zinc-900/50 p-1 rounded-lg border border-white/5">
                    <button
                        onClick={() => setFilter('ALL')}
                        className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${filter === 'ALL' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('FAVORITES')}
                        className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${filter === 'FAVORITES' ? 'bg-amber-500/10 text-amber-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Favorites
                    </button>
                </div>
            </CardHeader>

            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                <Input
                    placeholder="Search symbol..."
                    className="pl-9 bg-black/20 border-white/5 focus:bg-black/40"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar -mr-2">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 pb-2">
                    {filteredStocks.map(stock => (
                        <div
                            key={stock}
                            onClick={() => toggleFavorite(stock)}
                            className="group relative flex flex-col justify-between p-3 rounded-xl bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 border border-white/5 hover:border-sky-500/30 hover:shadow-[0_0_15px_-5px_rgba(14,165,233,0.3)] transition-all duration-300 cursor-pointer overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex justify-between items-start z-10">
                                <div className="w-8 h-8 rounded-lg bg-zinc-800/80 flex items-center justify-center text-xs font-bold text-zinc-400 group-hover:text-white group-hover:bg-sky-500 transition-colors duration-300">
                                    {stock.substring(0, 1)}
                                </div>
                                <Star
                                    size={16}
                                    className={`transition-all duration-300 ${favorites.has(stock) ? 'text-amber-400 fill-amber-400 scale-110' : 'text-zinc-700 group-hover:text-zinc-500'}`}
                                />
                            </div>

                            <div className="mt-3 z-10">
                                <h3 className="text-sm font-bold text-zinc-200 group-hover:text-sky-400 transition-colors">{stock}</h3>
                                <span className="text-[10px] text-zinc-600 uppercase tracking-wider">SET50</span>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredStocks.length === 0 && (
                    <div className="text-center py-12 flex flex-col items-center justify-center text-zinc-600">
                        <div className="w-12 h-12 rounded-full bg-zinc-900/50 flex items-center justify-center mb-3">
                            <Star className="opacity-20" size={24} />
                        </div>
                        <p className="text-sm">No stocks found.</p>
                    </div>
                )}
            </div>
        </Card>
    )
}
