/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // "Branco Gelo" como background padrão ou cor utilitária
                background: '#F5F7FA', // Um branco frio levemente acinzentado/azulado
                ice: {
                    DEFAULT: '#F5F7FA',
                    50: '#FFFFFF',
                    100: '#F5F7FA', // Branco Gelo Base
                    200: '#E4E9F2',
                    300: '#CBD5E1',
                },
                foreground: 'hsl(var(--foreground))',
                border: 'hsl(var(--border))',
                // Nova Paleta "Verde Musgo"
                primary: {
                    DEFAULT: '#4A6741', // Verde Musgo Central
                    50: '#F2F7F2',      // Muito claro (bom para fundos de cards)
                    100: '#E1EBE1',     // Claro
                    200: '#C1D6C1',
                    300: '#9FBFA0',
                    400: '#7DA97E',
                    500: '#4A6741',     // COR PRINCIPAL (Botões, ícones ativos)
                    600: '#3B5234',     // Hover
                    700: '#2C3D27',
                    800: '#1D291A',
                    900: '#0F140D',     // Texto escuro / Rodapés
                }
            },
            animation: {
                'bounce-slow': 'bounce 2s infinite',
                'slide-in': 'slideIn 0.3s ease-out',
                'fade-in': 'fadeIn 0.5s ease-out',
            },
            keyframes: {
                slideIn: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}