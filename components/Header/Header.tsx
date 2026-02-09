// components/Header/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, MapPin, Phone, User, ShoppingCart, Search, Leaf } from 'lucide-react';
import { useCart } from '@/components/CartProvider';
import CartSidebar from '@/components/CartSidebar/CartSidebar';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { getItemCount } = useCart();

    const navItems = [
        { label: 'Início', href: '/' },
        { label: 'Cardápio', href: '/produtos' },
        { label: 'Fitness', href: '/produtos?category=fitness' },
        { label: 'Low Carb', href: '/produtos?category=low-carb' },
        { label: 'Sobre', href: '/sobre' },
        { label: 'Contato', href: '/contato' },
    ];

    return (
        <>
            {/* Top Bar - Dark Green Background */}
            <div className="bg-primary-800 text-white text-sm">
                <div className="container mx-auto px-4 py-2">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
                        <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm">
                            <div className="flex items-center gap-2">
                                <MapPin size={14} className="text-primary-300" />
                                <span className="opacity-90">Av. Principal, 123 - Centro</span>
                            </div>
                            <div className="hidden md:flex items-center gap-2">
                                <Phone size={14} className="text-primary-300" />
                                <span className="opacity-90">(11) 99999-9999</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs md:text-sm">
                            <Link href="/admin" className="hover:text-primary-200 transition-colors flex items-center gap-1">
                                <User size={14} />
                                <span>Entrar</span>
                            </Link>
                            <span className="text-primary-600 hidden md:inline">•</span>
                            <span className="opacity-90">Aberto agora: 11h - 15h</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-200 group-hover:scale-105 transition-transform duration-300">
                                <Leaf size={20} fill="currentColor" className="text-primary-100" />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold text-gray-800 tracking-tight leading-none">
                                    Sabor<span className="text-primary-600">Vital</span>
                                </h1>
                                <p className="text-xs text-gray-500 font-medium tracking-wider uppercase">Marmitaria Saudável</p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="text-gray-600 hover:text-primary-600 font-medium transition-colors text-sm uppercase tracking-wide"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            {/* Search */}
                            <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
                                <Search size={18} className="text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar pratos..."
                                    className="bg-transparent ml-2 outline-none text-sm w-24 lg:w-32 placeholder:text-gray-400"
                                />
                            </div>

                            {/* Cart Button */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-3 hover:bg-primary-50 rounded-xl transition-colors group"
                            >
                                <ShoppingCart size={24} className="text-gray-600 group-hover:text-primary-600 transition-colors" />
                                {getItemCount() > 0 && (
                                    <span className="absolute top-1 right-1 bg-primary-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                                        {getItemCount()}
                                    </span>
                                )}
                            </button>

                            {/* Order Button */}
                            <button className="hidden md:block bg-primary-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-primary-700 shadow-lg shadow-primary-200 transition-all active:scale-95 text-sm">
                                Pedir Agora
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="lg:hidden border-t border-gray-100 py-4 animate-fade-in">
                            <div className="flex flex-col gap-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="px-4 py-3 hover:bg-primary-50 hover:text-primary-700 rounded-lg text-gray-600 font-medium transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <div className="px-4 py-2 mt-2">
                                    <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3">
                                        <Search size={18} className="text-gray-500" />
                                        <input
                                            type="text"
                                            placeholder="Buscar pratos..."
                                            className="bg-transparent ml-2 outline-none text-sm flex-1"
                                        />
                                    </div>
                                </div>
                                <div className="px-4 mt-2">
                                    <button className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold">
                                        Fazer Pedido
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Cart Sidebar */}
            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}