// lib/types.ts
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
    quantity?: number;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'preparing' | 'ready' | 'delivered';
    createdAt: Date;
}