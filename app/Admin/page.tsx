// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/UI/Button';
import { Card } from '@/components/UI/Card';
import { Badge } from '@/components/UI/Badge';
import {
    Package,
    TrendingUp,
    Users,
    DollarSign,
    Clock,
    CheckCircle,
    XCircle,
    Filter,
    Search,
    MoreVertical,
    Edit,
    Trash2
} from 'lucide-react';

interface Order {
    id: string;
    customer: string;
    items: string[];
    total: number;
    status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
    createdAt: Date;
}

export default function AdminPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [stats, setStats] = useState({
        totalSales: 0,
        pendingOrders: 0,
        todayOrders: 0,
        avgOrderValue: 0,
    });
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        // Mock data
        const mockOrders: Order[] = [
            { id: '1001', customer: 'João Silva', items: ['Mega Burger Supreme', 'Coca-Cola'], total: 36.90, status: 'pending', createdAt: new Date() },
            { id: '1002', customer: 'Maria Santos', items: ['Pizza Pepperoni Grande'], total: 49.90, status: 'preparing', createdAt: new Date() },
            { id: '1003', customer: 'Pedro Costa', items: ['Combo Família'], total: 68.90, status: 'ready', createdAt: new Date() },
            { id: '1004', customer: 'Ana Oliveira', items: ['Burrito Picante', 'Suco Natural'], total: 35.80, status: 'delivered', createdAt: new Date() },
            { id: '1005', customer: 'Carlos Lima', items: ['2x Mega Burger', 'Batata Frita'], total: 62.80, status: 'cancelled', createdAt: new Date() },
        ];

        setOrders(mockOrders);

        setStats({
            totalSales: 1245.60,
            pendingOrders: 2,
            todayOrders: 8,
            avgOrderValue: 45.20,
        });
    }, []);

    const getStatusColor = (status: Order['status']) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            preparing: 'bg-blue-100 text-blue-800',
            ready: 'bg-green-100 text-green-800',
            delivered: 'bg-gray-100 text-gray-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return colors[status];
    };

    const getStatusIcon = (status: Order['status']) => {
        const icons = {
            pending: Clock,
            preparing: Clock,
            ready: CheckCircle,
            delivered: CheckCircle,
            cancelled: XCircle,
        };
        return icons[status];
    };

    const filteredOrders = activeTab === 'all'
        ? orders
        : orders.filter(order => order.status === activeTab);

    const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
        setOrders(prev => prev.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
                        <p className="text-gray-600">Gerencie pedidos, produtos e relatórios</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar pedidos..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>
                        <Button variant="primary">
                            Novo Produto
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Vendas Totais</p>
                                    <p className="text-2xl font-bold text-gray-900">R$ {stats.totalSales.toFixed(2)}</p>
                                </div>
                                <div className="p-3 bg-orange-100 rounded-lg">
                                    <DollarSign className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                            <div className="flex items-center gap-1 mt-2">
                                <TrendingUp className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-green-600">+12.5%</span>
                                <span className="text-sm text-gray-500 ml-2">desde ontem</span>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Pedidos Pendentes</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <Clock className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                            <div className="mt-2">
                                <span className="text-sm text-gray-500">Aguardando preparo</span>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Pedidos Hoje</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.todayOrders}</p>
                                </div>
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <Package className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                            <div className="mt-2">
                                <span className="text-sm text-gray-500">Total de pedidos hoje</span>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Ticket Médio</p>
                                    <p className="text-2xl font-bold text-gray-900">R$ {stats.avgOrderValue.toFixed(2)}</p>
                                </div>
                                <div className="p-3 bg-purple-100 rounded-lg">
                                    <Users className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                            <div className="mt-2">
                                <span className="text-sm text-gray-500">Valor médio por pedido</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Orders Table */}
                <Card className="mb-8">
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Pedidos Recentes</h2>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Filter size={18} className="text-gray-500" />
                                    <select
                                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        value={activeTab}
                                        onChange={(e) => setActiveTab(e.target.value)}
                                    >
                                        <option value="all">Todos os pedidos</option>
                                        <option value="pending">Pendentes</option>
                                        <option value="preparing">Em preparo</option>
                                        <option value="ready">Prontos</option>
                                        <option value="delivered">Entregues</option>
                                        <option value="cancelled">Cancelados</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">ID</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Cliente</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Itens</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Total</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Data</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order) => {
                                        const StatusIcon = getStatusIcon(order.status);
                                        return (
                                            <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="py-4 px-4">
                                                    <span className="font-mono text-gray-900">#{order.id}</span>
                                                </td>
                                                <td className="py-4 px-4 font-medium">{order.customer}</td>
                                                <td className="py-4 px-4">
                                                    <div className="text-sm text-gray-600">
                                                        {order.items.slice(0, 2).join(', ')}
                                                        {order.items.length > 2 && ` +${order.items.length - 2} mais`}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 font-bold text-gray-900">
                                                    R$ {order.total.toFixed(2)}
                                                </td>
                                                <td className="py-4 px-4">
                                                    <Badge className={getStatusColor(order.status)}>
                                                        <StatusIcon size={12} className="mr-1" />
                                                        {order.status === 'pending' && 'Pendente'}
                                                        {order.status === 'preparing' && 'Em preparo'}
                                                        {order.status === 'ready' && 'Pronto'}
                                                        {order.status === 'delivered' && 'Entregue'}
                                                        {order.status === 'cancelled' && 'Cancelado'}
                                                    </Badge>
                                                </td>
                                                <td className="py-4 px-4 text-sm text-gray-600">
                                                    {order.createdAt.toLocaleDateString('pt-BR')}
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-2">
                                                        {order.status === 'pending' && (
                                                            <button
                                                                onClick={() => updateOrderStatus(order.id, 'preparing')}
                                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                                                title="Iniciar preparo"
                                                            >
                                                                <Clock size={16} />
                                                            </button>
                                                        )}
                                                        {order.status === 'preparing' && (
                                                            <button
                                                                onClick={() => updateOrderStatus(order.id, 'ready')}
                                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                                                                title="Marcar como pronto"
                                                            >
                                                                <CheckCircle size={16} />
                                                            </button>
                                                        )}
                                                        <button
                                                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                                            title="Editar"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                            title="Cancelar"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {filteredOrders.length === 0 && (
                            <div className="text-center py-12">
                                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">Nenhum pedido encontrado</p>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Products Section */}
                <Card>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Produtos</h2>
                            <Button variant="primary" size="sm">
                                <Plus size={16} className="mr-2" />
                                Adicionar Produto
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Product cards would go here */}
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-orange-300 transition-colors cursor-pointer">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Plus className="text-gray-400" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Adicionar novo produto</h3>
                                <p className="text-sm text-gray-500">Clique para criar um novo item no cardápio</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}