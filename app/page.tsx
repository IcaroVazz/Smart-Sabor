'use client';

import { useState } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import CategoryFilter from '../components/CategoryFilter/CategoryFilter';
import CartSidebar from '../components/CartSidebar/CartSidebar';
import { products } from '../lib/data';
import { ShoppingCart, Search, Utensils } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = ['todas', 'tradicionais', 'fitness', 'low carb', 'massas', 'bebidas'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'todas' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    // Mudei o fundo para bg-background (que definimos como branco gelo)
    <div className="min-h-screen bg-background text-gray-800 pb-20">

      {/* Container principal */}
      <div className="container mx-auto px-4 py-8">

        {/* Hero Section */}
        <div className="mb-12 text-center">
          {/* Ícone agora usa primary-500 (Verde Musgo) */}
          <div className="flex justify-center mb-4 text-primary-500">
            <Utensils size={48} />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            O Verdadeiro <span className="text-primary-600">Sabor Caseiro</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Comida de verdade, feita com carinho e ingredientes frescos.
            Do nosso fogão direto para a sua mesa.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar feijoada, frango grelhado, strogonoff..."
                // AQUI: Troquei border-orange e ring-orange por border-primary e ring-primary
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all bg-white shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              <p className="text-xl">Nenhuma marmita encontrada com esses critérios.</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        // AQUI: Botão flutuante agora é verde musgo (primary-600)
        className="fixed bottom-8 right-8 bg-primary-600 text-white p-4 rounded-full shadow-2xl hover:bg-primary-700 transition-all hover:scale-105 z-50 flex items-center gap-2 group border-4 border-white"
      >
        <ShoppingCart size={24} className="group-hover:animate-bounce" />
        <span className="font-semibold hidden md:inline">Meu Pedido</span>

        {/* Contador do carrinho: texto verde em fundo branco */}
        <span className="bg-white text-primary-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-sm">
          3
        </span>
      </button>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}