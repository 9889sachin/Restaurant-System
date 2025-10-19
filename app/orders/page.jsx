"use client";
import { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Plus, Minus, Trash2, Loader2 } from 'lucide-react';

export default function OrdersPage() {
    const { data: session, status } = useSession();
    const isAuthenticated = status === 'authenticated';
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const userEmailKey = session?.user?.email;

    useEffect(() => {
        if (status === 'loading') return;
        
        if (isAuthenticated && userEmailKey) {
            const userOrders = JSON.parse(localStorage.getItem(`orders_${userEmailKey}`)) || [];
            const initializedOrders = userOrders.map(item => ({
                ...item,
                quantity: item.quantity || 1
            }));
            
            setOrders(initializedOrders);
        } else {
            setOrders([]);
        }
        setLoading(false);
    }, [status, isAuthenticated, userEmailKey]);

    const totalPrice = useMemo(() => {
        return orders.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [orders]);

    const updateQuantity = (itemId, change) => {
        setOrders(prevOrders => {
            const updatedOrders = prevOrders.map(item => {
                if (item._id === itemId) {
                    const newQuantity = Math.max(1, item.quantity + change);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });

            localStorage.setItem(`orders_${userEmailKey}`, JSON.stringify(updatedOrders));
            return updatedOrders;
        });
    };

    const removeItem = (itemId) => {
        setOrders(prevOrders => {
            const updatedOrders = prevOrders.filter(item => item._id !== itemId);
            
            localStorage.setItem(`orders_${userEmailKey}`, JSON.stringify(updatedOrders));
            return updatedOrders;
        });
    };

    if (loading) {
        return <p className="text-center mt-10 text-xl flex justify-center items-center"><Loader2 className="w-5 h-5 mr-2 animate-spin text-orange-600"/> Loading your orders...</p>;
    }

    if (!isAuthenticated) 
        return <p className="text-center mt-10 text-xl font-medium text-orange-600">Please login to see your orders.</p>;

    if (orders.length === 0)
        return <p className="text-center mt-10 text-xl text-gray-600">Your order list is empty. Start ordering! 🍽️</p>;

    return (
        <div className="py-8 max-w-5xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
                Your Current Order Summary
            </h1>

            <div className="space-y-4">
                {orders.map((item) => (
                    <div key={item._id} className="flex justify-between items-center p-5 bg-white rounded-lg shadow-lg border-l-4 border-orange-500 transition hover:shadow-xl">
                        
                        <div className="flex-1 min-w-0 pr-4">
                            <h3 className="font-bold text-xl text-gray-800">{item.name}</h3>
                            <p className="text-gray-500 text-sm">{item.category}</p>
                        </div>

                        <div className="flex items-center space-x-2 mr-6 min-w-[120px]">
                            <button
                                onClick={() => updateQuantity(item._id, -1)}
                                disabled={item.quantity <= 1}
                                className="p-1 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-semibold text-lg w-6 text-center">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item._id, 1)}
                                className="p-1 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <p className="font-extrabold text-xl text-orange-600 min-w-[100px] text-right">
                                ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                            <button
                                onClick={() => removeItem(item._id)}
                                className="p-2 text-red-500 hover:bg-red-100 rounded-full transition"
                                title="Remove Item"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}

                <div className="flex justify-between items-center p-6 bg-orange-600 text-white rounded-lg shadow-2xl font-extrabold text-2xl mt-8">
                    <span>Grand Total</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}