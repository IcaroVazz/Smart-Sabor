'use client';

import { ChefHat, CookingPot, Dumbbell, Leaf, Wheat, GlassWater } from 'lucide-react';

interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
    'todas': <ChefHat size={20} />,
    'tradicionais': <CookingPot size={20} />, // Panela (Comida Caseira)
    'fitness': <Dumbbell size={20} />,        // Haltere (Foco em treino/dieta)
    'low carb': <Leaf size={20} />,           // Folha (Leve/Verde)
    'massas': <Wheat size={20} />,            // Trigo (Massas)
    'bebidas': <GlassWater size={20} />,      // Bebidas
};

export default function CategoryFilter({
    categories,
    selectedCategory,
    onSelectCategory,
}: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => {
                const isSelected = selectedCategory === category;

                return (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 border-2
              ${isSelected
                                ? 'bg-primary-600 border-primary-600 text-white shadow-lg scale-105' // Ativo: Verde Musgo Sólido
                                : 'bg-white border-transparent text-gray-500 hover:border-primary-200 hover:text-primary-600 hover:bg-primary-50' // Inativo: Branco e Cinza
                            }
            `}
                    >
                        {/* Renderiza o ícone se existir no mapa, senão usa um padrão */}
                        {categoryIcons[category] || <ChefHat size={20} />}

                        <span className="capitalize">
                            {category}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}