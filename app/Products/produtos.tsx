// app/produtos/page.tsx
'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';
import CategoryFilter from '@/components/CategoryFilter/CategoryFilter';
import { products } from '@/lib/data';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { Badge } from '@/components/UI/Badge';

export default function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('todos');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 100,
        vegetarian: false,
        spicy: false,
        popular: false,
        minRating: 0,
    });

    const categories = ['todos', 'hamburgueres', 'pizzas', 'bebidas', 'sobremesas', 'combos'];

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
        const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
        const matchesVegetarian = !filters.vegetarian || product.isVegetarian;
        const matchesSpicy = !filters.spicy || product.isSpicy;
        const matchesPopular = !filters.popular || product.isPopular;
        const matchesRating = product.rating >= filters.minRating;

        return matchesCategory && matchesPrice && matchesVegetarian && matchesSpicy && matchesPopular && matchesRating;
    });

    const handleFilterChange = (key: keyof typeof filters, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({
            minPrice: 0,
            maxPrice: 100,
            vegetarian: false,
            spicy: false,
            popular: false,
            minRating: 0,
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Nosso Cardápio</h1>
                <p className="text-gray-600 text-lg">
                    Descubra nossos deliciosos lanches, pizzas, bebidas e muito mais!
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <aside className={`
          lg:w-64 flex-shrink-0 lg:block
          ${showFilters ? 'block' : 'hidden'}
        `}>
                    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Filter size={20} />
                                Filtros
                            </h2>
                            <button
                                onClick={clearFilters}
                                className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                            >
                                Limpar tudo
                            </button>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Price Range */}
                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-900 mb-3">Preço</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>R$ {filters.minPrice}</span>
                                    <span>R$ {filters.maxPrice}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="5"
                                    value={filters.maxPrice}
                                    onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500"
                                />
                            </div>
                        </div>

                        {/* Dietary Filters */}
                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-900 mb-3">Preferências</h3>
                            <div className="space-y-2">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={filters.vegetarian}
                                        onChange={(e) => handleFilterChange('vegetarian', e.target.checked)}
                                        className="w-4 h-4 text-orange-500 rounded focus:ring-orange-400"
                                    />
                                    <span className="text-gray-700">Vegetariano</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={filters.spicy}
                                        onChange={(e) => handleFilterChange('spicy', e.target.checked)}
                                        className="w-4 h-4 text-orange-500 rounded focus:ring-orange-400"
                                    />
                                    <span className="text-gray-700">Picante</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={filters.popular}
                                        onChange={(e) => handleFilterChange('popular', e.target.checked)}
                                        className="w-4 h-4 text-orange-500 rounded focus:ring-orange-400"
                                    />
                                    <span className="text-gray-700">Mais vendidos</span>
                                </label>
                            </div>
                        </div>

                        {/* Rating Filter */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Avaliação mínima</h3>
                            <div className="flex gap-2">
                                {[0, 3, 4, 4.5].map((rating) => (
                                    <button
                                        key={rating}
                                        onClick={() => handleFilterChange('minRating', rating)}
                                        className={`flex-1 py-2 text-center rounded-lg border ${filters.minRating === rating
                                                ? 'border-orange-500 bg-orange-50 text-orange-600'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        {rating === 0 ? 'Todas' : `${rating}+`}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Top Bar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <CategoryFilter
                                    categories={categories}
                                    selectedCategory={selectedCategory}
                                    onSelectCategory={setSelectedCategory}
                                />
                            </div>
                            <p className="text-gray-600">
                                Mostrando <span className="font-semibold">{filteredProducts.length}</span> produtos
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Active Filters */}
                            <div className="flex flex-wrap gap-2">
                                {filters.vegetarian && <Badge variant="success">Vegetariano</Badge>}
                                {filters.spicy && <Badge variant="error">Picante</Badge>}
                                {filters.popular && <Badge variant="warning">Popular</Badge>}
                                {filters.maxPrice < 100 && (
                                    <Badge variant="info">Até R$ {filters.maxPrice}</Badge>
                                )}
                                {filters.minRating > 0 && (
                                    <Badge>{filters.minRating}+ estrelas</Badge>
                                )}
                            </div>

                            {/* Filter Toggle */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
                            >
                                <SlidersHorizontal size={20} />
                                Filtros
                            </button>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-gray-400 mb-4">
                                <Filter size={64} className="mx-auto" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Nenhum produto encontrado
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Tente ajustar os filtros para encontrar o que procura
                            </p>
                            <button
                                onClick={clearFilters}
                                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600"
                            >
                                Limpar filtros
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}