// lib/data.ts

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    reviews: number;
    isPopular: boolean;
    isVegetarian?: boolean;
    isSpicy?: boolean;
    calories?: number;
    prepTime?: number;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Feijoada Completa',
        description: 'A queridinha do Brasil. Feijão preto, carnes selecionadas, arroz branco soltinho, couve refogada e farofa caseira.',
        price: 32.90,
        image: '/images/marmita-feijoada.jpg',
        category: 'tradicionais',
        rating: 4.9,
        reviews: 120,
        isPopular: true,
        calories: 850,
        prepTime: 0,
    },
    {
        id: '2',
        name: 'Strogonoff de Frango',
        description: 'Cubos de frango macios, molho cremoso com champignon, arroz branco e batata palha crocante.',
        price: 26.90,
        image: '/images/marmita-strogonoff.jpg',
        category: 'tradicionais',
        rating: 4.8,
        reviews: 95,
        isPopular: true,
        calories: 680,
        prepTime: 0,
    },
    {
        id: '3',
        name: 'Bife Acebolado',
        description: 'Contra-filé grelhado com cebolas douradas, arroz, feijão carioca e purê de batata.',
        price: 29.90,
        image: '/images/marmita-bife.jpg',
        category: 'tradicionais',
        rating: 4.7,
        reviews: 80,
        isPopular: false,
        calories: 720,
        prepTime: 0,
    },

    {
        id: '4',
        name: 'Frango com Batata Doce',
        description: 'Filé de frango grelhado com ervas finas, acompanhado de batata doce assada e brócolis no vapor.',
        price: 24.90,
        image: '/images/fit-frango.jpg',
        category: 'fitness',
        rating: 4.9,
        reviews: 210,
        isPopular: true,
        calories: 350,
        prepTime: 0,
    },
    {
        id: '5',
        name: 'Patinho Moído com Mandioquinha',
        description: 'Carne moída magra (patinho) refogada com legumes, purê de mandioquinha e mix de folhas.',
        price: 25.90,
        image: '/images/fit-carne.jpg',
        category: 'fitness',
        rating: 4.6,
        reviews: 150,
        isPopular: true,
        calories: 410,
        prepTime: 0,
    },

    {
        id: '6',
        name: 'Tilápia com Legumes',
        description: 'Filé de tilápia grelhado ao molho de limão, acompanhado de mix de legumes na manteiga ghee.',
        price: 28.90,
        image: '/images/low-tilapia.jpg',
        category: 'low carb',
        rating: 4.8,
        reviews: 65,
        isPopular: false,
        calories: 290,
        prepTime: 0,
    },
    {
        id: '7',
        name: 'Escondidinho de Couve-Flor',
        description: 'Escondidinho feito com purê de couve-flor e recheio de frango desfiado temperado. Leve e delicioso.',
        price: 23.90,
        image: '/images/low-escondidinho.jpg',
        category: 'low carb',
        rating: 4.7,
        reviews: 88,
        isPopular: true,
        calories: 250,
        prepTime: 0,
    },

    {
        id: '8',
        name: 'Espaguete à Bolonhesa',
        description: 'Massa italiana grano duro com nosso molho de tomate caseiro e carne moída de primeira.',
        price: 22.90,
        image: '/images/massa-bolonhesa.jpg',
        category: 'massas',
        rating: 4.5,
        reviews: 110,
        isPopular: true,
        calories: 600,
        prepTime: 0,
    },
    {
        id: '9',
        name: 'Nhoque de Batata',
        description: 'Nhoque artesanal ao sugo com manjericão fresco e queijo parmesão ralado.',
        price: 24.90,
        image: '/images/massa-nhoque.jpg',
        category: 'massas',
        rating: 4.6,
        reviews: 72,
        isPopular: false,
        isVegetarian: true,
        calories: 550,
        prepTime: 0,
    },

    {
        id: '10',
        name: 'Suco Natural de Laranja',
        description: 'Garrafinha 500ml. Suco da fruta, sem adição de açúcar ou conservantes.',
        price: 10.90,
        image: '/images/suco-laranja.jpg',
        category: 'bebidas',
        rating: 4.9,
        reviews: 300,
        isPopular: true,
        isVegetarian: true,
        calories: 120,
    },
    {
        id: '11',
        name: 'Suco Detox Verde',
        description: 'Couve, limão, gengibre e maçã. Ideal para acompanhar as marmitas fitness.',
        price: 12.90,
        image: '/images/suco-detox.jpg',
        category: 'bebidas',
        rating: 4.7,
        reviews: 180,
        isPopular: true,
        isVegetarian: true,
        calories: 80,
    },
];