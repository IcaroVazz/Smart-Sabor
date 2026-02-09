'use client';

import { useState } from 'react';
import { useCart } from '../../components/CartProvider';
import { Button } from '../../components/UI/Button';
import { Card } from '../../components/UI/Card';
import {
    CreditCard,
    Wallet,
    Smartphone,
    Truck,
    Clock,
    MapPin,
    CheckCircle,
    Lock
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function CheckoutPage() {
    const { cart, getTotal, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        complement: '',
        paymentMethod: 'credit',
        notes: '',
    });

    const paymentMethods = [
        { id: 'credit', label: 'Cartão de Crédito', icon: CreditCard },
        { id: 'debit', label: 'Cartão de Débito', icon: CreditCard },
        { id: 'pix', label: 'PIX', icon: Wallet },
        { id: 'cash', label: 'Dinheiro', icon: Wallet },
    ];

    const deliveryOptions = [
        { id: 'delivery', label: 'Entrega', time: '30-45 min', price: 5.00, icon: Truck },
        { id: 'pickup', label: 'Retirar', time: '15-20 min', price: 0, icon: MapPin },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (step === 1) {
            if (!formData.name || !formData.phone || !formData.address) {
                toast.error('Preencha todos os campos obrigatórios');
                return;
            }
            setStep(2);
        } else if (step === 2) {
            // Simulate payment processing
            toast.loading('Processando pagamento...');

            setTimeout(() => {
                toast.dismiss();
                setStep(3);
                clearCart();
                toast.success('Pedido realizado com sucesso!');
            }, 2000);
        }
    };

    if (cart.length === 0 && step !== 3) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="max-w-md mx-auto">
                    <div className="text-gray-400 mb-4">
                        <ShoppingCart size={64} className="mx-auto" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Carrinho vazio
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Adicione itens ao seu carrinho antes de finalizar o pedido.
                    </p>
                    <Button href="/" variant="primary">
                        Voltar ao cardápio
                    </Button>
                </div>
            </div>
        );
    }

    const total = getTotal() + (formData.paymentMethod === 'delivery' ? 5 : 0);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Progress Steps */}
            <div className="max-w-4xl mx-auto mb-12">
                <div className="flex items-center justify-between">
                    {['Informações', 'Pagamento', 'Confirmação'].map((label, index) => (
                        <div key={label} className="flex items-center">
                            <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-bold
                ${index + 1 <= step
                                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                                    : 'bg-gray-200 text-gray-400'
                                }
              `}>
                                {index + 1}
                            </div>
                            <div className="ml-3">
                                <div className="text-sm text-gray-500">Passo {index + 1}</div>
                                <div className="font-semibold">{label}</div>
                            </div>
                            {index < 2 && (
                                <div className={`
                  h-0.5 flex-1 mx-6
                  ${index + 1 < step ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gray-200'}
                `} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                {step === 3 ? (
                    /* Confirmation Step */
                    <Card className="text-center p-12">
                        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Pedido Confirmado!
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Seu pedido #{(Math.random() * 1000).toFixed(0)} foi recebido e está sendo preparado.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="p-6 bg-gray-50 rounded-xl">
                                <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                                <h3 className="font-bold text-gray-900 mb-2">Tempo estimado</h3>
                                <p className="text-gray-600">30-45 minutos</p>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-xl">
                                <Truck className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                                <h3 className="font-bold text-gray-900 mb-2">Status</h3>
                                <p className="text-gray-600">Em preparação</p>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-xl">
                                <Smartphone className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                                <h3 className="font-bold text-gray-900 mb-2">Acompanhar</h3>
                                <p className="text-gray-600">Você receberá atualizações por SMS</p>
                            </div>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <Button href="/" variant="outline">
                                Voltar ao início
                            </Button>
                            <Button href="/produtos" variant="primary">
                                Fazer novo pedido
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Form */}
                        <div className="lg:col-span-2 space-y-8">
                            {step === 1 ? (
                                /* Contact & Delivery Info */
                                <Card className="p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Informações de entrega
                                    </h2>

                                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nome completo *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Telefone *
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Endereço de entrega *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            placeholder="Rua, número, bairro"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Complemento
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.complement}
                                            onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                                            placeholder="Apartamento, bloco, referência"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Delivery Options */}
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-gray-900 mb-4">Tipo de entrega</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {deliveryOptions.map((option) => (
                                                <label
                                                    key={option.id}
                                                    className={`
                            border-2 rounded-xl p-4 cursor-pointer transition-all
                            ${formData.paymentMethod === option.id
                                                            ? 'border-orange-500 bg-orange-50'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                        }
                          `}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="delivery"
                                                        value={option.id}
                                                        checked={formData.paymentMethod === option.id}
                                                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                                        className="hidden"
                                                    />
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <option.icon className="text-gray-600" />
                                                            <div>
                                                                <div className="font-semibold">{option.label}</div>
                                                                <div className="text-sm text-gray-500">{option.time}</div>
                                                            </div>
                                                        </div>
                                                        <div className="font-bold">
                                                            {option.price > 0 ? `R$ ${option.price.toFixed(2)}` : 'Grátis'}
                                                        </div>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Observações do pedido
                                        </label>
                                        <textarea
                                            value={formData.notes}
                                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                            placeholder="Alguma observação especial? Sem cebola, ponto da carne, etc."
                                            rows={3}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                    </div>
                                </Card>
                            ) : (
                                /* Payment Step */
                                <Card className="p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                        Pagamento
                                    </h2>

                                    <div className="mb-8">
                                        <h3 className="font-semibold text-gray-900 mb-4">Método de pagamento</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {paymentMethods.map((method) => (
                                                <label
                                                    key={method.id}
                                                    className={`
                            border-2 rounded-xl p-4 cursor-pointer transition-all
                            ${formData.paymentMethod === method.id
                                                            ? 'border-orange-500 bg-orange-50'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                        }
                          `}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        value={method.id}
                                                        checked={formData.paymentMethod === method.id}
                                                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                                        className="hidden"
                                                    />
                                                    <div className="flex items-center gap-3">
                                                        <method.icon className="text-gray-600" />
                                                        <span className="font-medium">{method.label}</span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Credit Card Form (if selected) */}
                                    {formData.paymentMethod === 'credit' && (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Número do cartão
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="1234 5678 9012 3456"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                />
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Validade
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="MM/AA"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        CVV
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="123"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Nome no cartão
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Como está no cartão"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* PIX Info */}
                                    {formData.paymentMethod === 'pix' && (
                                        <div className="text-center p-6 bg-gray-50 rounded-xl">
                                            <div className="w-48 h-48 bg-gray-200 mx-auto mb-4 rounded-lg flex items-center justify-center">
                                                <div className="text-gray-400">QR Code PIX</div>
                                            </div>
                                            <p className="text-gray-600 mb-2">
                                                Escaneie o QR Code acima para pagar com PIX
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                O código será válido por 30 minutos
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 mt-6 text-sm text-gray-600">
                                        <Lock size={16} />
                                        <span>Pagamento 100% seguro - Seus dados estão protegidos</span>
                                    </div>
                                </Card>
                            )}
                        </div>

                        {/* Right Column - Order Summary */}
                        <div>
                            <Card className="sticky top-24">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Resumo do pedido</h3>

                                    <div className="space-y-4 mb-6">
                                        {cart.map((item) => (
                                            <div key={item.id} className="flex justify-between items-start">
                                                <div>
                                                    <div className="font-medium">{item.name}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {item.quantity}x R$ {item.price.toFixed(2)}
                                                    </div>
                                                </div>
                                                <div className="font-semibold">
                                                    R$ {(item.price * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-2 border-t border-b py-4">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal</span>
                                            <span>R$ {getTotal().toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Taxa de entrega</span>
                                            <span>R$ 5.00</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between text-xl font-bold mt-6 mb-8">
                                        <span>Total</span>
                                        <span className="text-orange-600">R$ {total.toFixed(2)}</span>
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        fullWidth
                                        className="mb-4"
                                    >
                                        {step === 1 ? 'Continuar para pagamento' : 'Finalizar pedido'}
                                    </Button>

                                    {step === 2 && (
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="w-full text-center text-gray-600 hover:text-gray-800 font-medium"
                                        >
                                            Voltar para informações
                                        </button>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}