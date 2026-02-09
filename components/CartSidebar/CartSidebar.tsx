'use client';

import { X, ShoppingBag, Trash2, Plus, Minus, Utensils } from 'lucide-react';
import { useCart } from '../CartProvider';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
    const { cart, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = () => {
        setIsCheckingOut(true);
        // Simula processamento
        setTimeout(() => {
            clearCart();
            setIsCheckingOut(false);
            onClose();
        }, 2000);
    };

    return (
        <>
            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: isOpen ? 0 : '100%' }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-full md:w-96 bg-white z-50 shadow-2xl overflow-y-auto border-l border-gray-100"
            >
                {/* Header */}
                <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-gray-100 p-6 z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Ícone Verde Musgo */}
                            <ShoppingBag className="text-primary-600" size={24} />
                            <h2 className="text-2xl font-bold text-gray-800">Seu Pedido</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <p className="text-primary-600 font-medium mt-2 text-sm">
                        {cart.length} {cart.length === 1 ? 'marmita selecionada' : 'marmitas selecionadas'}
                    </p>
                </div>

                {/* Cart Items */}
                <div className="p-6 min-h-[50vh]">
                    {cart.length === 0 ? (
                        <div className="text-center py-12 flex flex-col items-center justify-center h-full">
                            <div className="bg-gray-50 p-6 rounded-full mb-4">
                                <Utensils size={48} className="text-gray-300" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Sua sacola está vazia
                            </h3>
                            <p className="text-gray-500 max-w-[200px] mx-auto">
                                Que tal escolher uma opção saudável para o seu almoço?
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-6 text-primary-600 font-semibold hover:text-primary-700 hover:underline"
                            >
                                Ver Cardápio
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    className="flex gap-4"
                                >
                                    {/* Imagem do Produto */}
                                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-gray-100">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Detalhes */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="font-semibold text-gray-800 leading-tight">{item.name}</h4>
                                            <p className="text-sm text-gray-500 mt-1">R$ {item.price.toFixed(2)}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            {/* Controles de Quantidade */}
                                            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 rounded-md hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-primary-600"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-4 text-center text-sm font-semibold text-gray-700">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 rounded-md hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-primary-600"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            {/* Preço Total do Item e Lixeira */}
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-primary-700 text-sm">
                                                    R$ {(item.price * item.quantity).toFixed(2)}
                                                </span>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                    title="Remover item"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>R$ {getTotal().toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between text-gray-600">
                                <span>Taxa de Entrega</span>
                                <span className="text-primary-600 font-medium">Grátis</span>
                            </div>

                            <div className="flex justify-between text-xl font-bold pt-4 border-t border-dashed border-gray-200">
                                <span className="text-gray-800">Total</span>
                                {/* Cor Principal para o preço final */}
                                <span className="text-primary-700">
                                    R$ {getTotal().toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                            className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary-200 flex items-center justify-center gap-2"
                        >
                            {isCheckingOut ? (
                                <>
                                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                    Enviando Pedido...
                                </>
                            ) : (
                                'Finalizar Pedido'
                            )}
                        </button>

                        <button
                            onClick={clearCart}
                            className="w-full mt-3 py-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
                        >
                            Esvaziar sacola
                        </button>
                    </div>
                )}
            </motion.div>
        </>
    );
}