'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase/client'
import { Trash2, Edit2, Plus, X, Wallet, TrendingUp } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Input'

export default function Portfolio() {
    const [stocks, setStocks] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingStock, setEditingStock] = useState(null)
    const [formData, setFormData] = useState({ symbol: '', entry_price: '', note: '' })

    useEffect(() => {
        fetchStocks()
    }, [])

    const fetchStocks = async () => {
        setLoading(true)
        const { data, error } = await supabase.from('portfolio').select('*').order('symbol', { ascending: true })
        if (error) console.error('Error fetching portfolio:', error)
        else setStocks(data || [])
        setLoading(false)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.symbol || !formData.entry_price) return

        const stockData = {
            symbol: formData.symbol.toUpperCase(),
            entry_price: parseFloat(formData.entry_price),
            note: formData.note,
        }

        if (editingStock) {
            const { error } = await supabase.from('portfolio').update(stockData).eq('id', editingStock.id)
            if (error) console.error('Error updating stock:', error)
        } else {
            const { error } = await supabase.from('portfolio').insert([stockData])
            if (error) console.error('Error adding stock:', error)
        }

        closeModal()
        fetchStocks()
    }

    const deleteStock = async (id) => {
        if (!confirm('Are you sure you want to delete this stock?')) return
        const { error } = await supabase.from('portfolio').delete().eq('id', id)
        if (error) console.error('Error deleting stock:', error)
        else fetchStocks()
    }

    const openModal = (stock = null) => {
        if (stock) {
            setEditingStock(stock)
            setFormData({ symbol: stock.symbol, entry_price: stock.entry_price, note: stock.note || '' })
        } else {
            setEditingStock(null)
            setFormData({ symbol: '', entry_price: '', note: '' })
        }
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingStock(null)
        setFormData({ symbol: '', entry_price: '', note: '' })
    }

    // Calculate approximate portfolio stats (mockup since we don't have quantities)
    const totalStocks = stocks.length
    const avgEntry = stocks.reduce((acc, stock) => acc + stock.entry_price, 0) / (totalStocks || 1)

    return (
        <Card className="h-full border-white/5 bg-zinc-900/40 backdrop-blur-xl flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-white/5">
                <div>
                    <CardTitle className="flex items-center gap-2 text-emerald-400">
                        <Wallet size={24} /> My Portfolio
                    </CardTitle>
                    <div className="flex gap-4 mt-2 text-sm text-zinc-400">
                        <span>Stocks: <strong className="text-white">{totalStocks}</strong></span>
                        <span>Avg Entry: <strong className="text-white">฿{avgEntry.toFixed(2)}</strong></span>
                    </div>
                </div>
                <Button onClick={() => openModal()} className="gap-2 shadow-emerald-500/20">
                    <Plus size={18} /> Add Stock
                </Button>
            </CardHeader>

            <div className="flex-1 overflow-auto custom-scrollbar -mr-2 pr-2">
                {loading ? (
                    <div className="flex items-center justify-center h-48 text-zinc-500 animate-pulse">
                        Loading assets...
                    </div>
                ) : stocks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 text-zinc-500 border-2 border-dashed border-zinc-800 rounded-xl m-4">
                        <Wallet className="opacity-20 mb-2" size={48} />
                        <p>Your portfolio is empty.</p>
                        <Button variant="ghost" size="sm" onClick={() => openModal()} className="mt-2 text-emerald-500 hover:text-emerald-400">
                            Add your first stock
                        </Button>
                    </div>
                ) : (
                    <div className="w-full">
                        <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider border-b border-white/5 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-10">
                            <div className="col-span-3">Symbol</div>
                            <div className="col-span-3 text-right">Entry Price</div>
                            <div className="col-span-4">Note</div>
                            <div className="col-span-2 text-right">Actions</div>
                        </div>

                        <div className="space-y-1 p-2">
                            {stocks.map((stock) => (
                                <div
                                    key={stock.id}
                                    className="group grid grid-cols-12 gap-4 items-center px-4 py-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                                >
                                    <div className="col-span-3 font-semibold text-white flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                        {stock.symbol}
                                    </div>
                                    <div className="col-span-3 text-right font-mono text-zinc-300">
                                        ฿{stock.entry_price.toFixed(2)}
                                    </div>
                                    <div className="col-span-4 text-sm text-zinc-500 truncate pr-2 group-hover:text-zinc-400 transition-colors">
                                        {stock.note || '-'}
                                    </div>
                                    <div className="col-span-2 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-sky-400" onClick={() => openModal(stock)}>
                                            <Edit2 size={14} />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-red-400" onClick={() => deleteStock(stock.id)}>
                                            <Trash2 size={14} />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative scale-100 animate-in zoom-in-95 duration-200">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                {editingStock ? <Edit2 size={20} className="text-emerald-500" /> : <Plus size={20} className="text-emerald-500" />}
                                {editingStock ? 'Edit Position' : 'New Position'}
                            </h3>
                            <p className="text-zinc-500 text-sm mt-1">
                                {editingStock ? 'Update your entry details below.' : 'Add a new stock to your portfolio tracking.'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Stock Symbol</Label>
                                <Input
                                    type="text"
                                    name="symbol"
                                    value={formData.symbol}
                                    onChange={handleInputChange}
                                    placeholder="e.g. PTT.BK"
                                    className="uppercase font-mono"
                                    autoFocus
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Entry Price (THB)</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">฿</span>
                                    <Input
                                        type="number"
                                        name="entry_price"
                                        value={formData.entry_price}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        step="0.01"
                                        className="pl-8 font-mono"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Note (Optional)</Label>
                                <textarea
                                    name="note"
                                    value={formData.note}
                                    onChange={handleInputChange}
                                    placeholder="Strategy or reason for entry..."
                                    className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none h-24 transition-all"
                                />
                            </div>

                            <div className="pt-2 flex gap-3">
                                <Button type="button" variant="ghost" className="flex-1" onClick={closeModal}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary" className="flex-1">
                                    {editingStock ? 'Update Position' : 'Add Position'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Card>
    )
}
