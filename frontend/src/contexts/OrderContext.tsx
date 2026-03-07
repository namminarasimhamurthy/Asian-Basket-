import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, OrderItem, Address } from '@/types';
import { useAuth } from './AuthContext';

interface OrderContextType {
    orders: Order[];
    isLoading: boolean;
    createOrder: (items: OrderItem[], totalAmount: number, address: Address, paymentId?: string, notes?: string) => Order;
    getOrderById: (id: string) => Order | undefined;
    updateOrderStatus: (id: string, status: Order['status']) => void;
    updatePaymentStatus: (id: string, status: Order['paymentStatus'], paymentId?: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const ORDERS_KEY = 'fow_orders';

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load orders from localStorage
    useEffect(() => {
        const savedOrders = localStorage.getItem(ORDERS_KEY);
        if (savedOrders) {
            try {
                const allOrders: Order[] = JSON.parse(savedOrders);
                // Filter orders for current user
                if (user) {
                    setOrders(allOrders.filter(order => order.userId === user.id));
                } else {
                    setOrders([]);
                }
            } catch (e) {
                console.error('Error loading orders:', e);
            }
        }
        setIsLoading(false);
    }, [user]);

    // Save orders to localStorage
    const saveOrders = (newOrders: Order[]) => {
        const savedOrders = localStorage.getItem(ORDERS_KEY);
        let allOrders: Order[] = savedOrders ? JSON.parse(savedOrders) : [];

        // Remove current user's orders and add new ones
        if (user) {
            allOrders = allOrders.filter(order => order.userId !== user.id);
            allOrders = [...allOrders, ...newOrders];
        }

        localStorage.setItem(ORDERS_KEY, JSON.stringify(allOrders));
    };

    const createOrder = (
        items: OrderItem[],
        totalAmount: number,
        address: Address,
        paymentId?: string,
        notes?: string
    ): Order => {
        if (!user) {
            throw new Error('User must be logged in to create an order');
        }

        const now = new Date().toISOString();
        const newOrder: Order = {
            id: `ORD-${Date.now()}`,
            userId: user.id,
            items,
            totalAmount,
            status: 'confirmed',
            paymentStatus: paymentId ? 'paid' : 'pending',
            paymentId,
            deliveryAddress: address,
            orderNotes: notes,
            createdAt: now,
            updatedAt: now,
        };

        const updatedOrders = [newOrder, ...orders];
        setOrders(updatedOrders);
        saveOrders(updatedOrders);

        return newOrder;
    };

    const getOrderById = (id: string): Order | undefined => {
        return orders.find(order => order.id === id);
    };

    const updateOrderStatus = (id: string, status: Order['status']) => {
        const updatedOrders = orders.map(order => {
            if (order.id === id) {
                return { ...order, status, updatedAt: new Date().toISOString() };
            }
            return order;
        });
        setOrders(updatedOrders);
        saveOrders(updatedOrders);
    };

    const updatePaymentStatus = (id: string, status: Order['paymentStatus'], paymentId?: string) => {
        const updatedOrders = orders.map(order => {
            if (order.id === id) {
                return {
                    ...order,
                    paymentStatus: status,
                    paymentId: paymentId || order.paymentId,
                    updatedAt: new Date().toISOString(),
                };
            }
            return order;
        });
        setOrders(updatedOrders);
        saveOrders(updatedOrders);
    };

    return (
        <OrderContext.Provider
            value={{
                orders,
                isLoading,
                createOrder,
                getOrderById,
                updateOrderStatus,
                updatePaymentStatus,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within OrderProvider');
    }
    return context;
};
