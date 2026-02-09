'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '../../lib/types';
import { Star, Plus, Minus } from 'lucide-react';
import { useCart } from '../CartProvider';
import { toast } from 'react-hot-toast';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
        toast.success(`${quantity}x ${product.name} adicionado ao carrinho!`);
        setQuantity(1);
    };

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            {/* Product Image */}
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.isPopular && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Mais Vendido
                    </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <button className="text-gray-600 hover:text-orange-500">
                        <Star size={20} fill="currentColor" />
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                    <span className="text-2xl font-bold text-orange-500">
                        R$ {product.price.toFixed(2)}
                    </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={16}
                            className={i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                        />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                </div>

                {/* Category Badge */}
                <div className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full mb-4">
                    {product.category}
                </div>

                {/* Quantity Selector & Add to Cart */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-semibold">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                        >
                            <Plus size={16} />
                        </button>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all font-semibold"
                    >
                        <Plus size={20} />
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
}