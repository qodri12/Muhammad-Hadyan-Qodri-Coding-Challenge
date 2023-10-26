'use client'

import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react'

type OrdersByTableType = {
    [key: string]: any[];
};

const Kitchen = () => {

    const [ordersByTable, setOrdersByTable] = useState<OrdersByTableType>({});

    useEffect(() => {
        const storedOrders = localStorage.getItem('orders');
        if (storedOrders) {
            const orders = JSON.parse(storedOrders);
            const groupedOrders = orders.reduce((acc: any, order: any) => {
                if (!acc[order.tableNumber]) {
                    acc[order.tableNumber] = [];
                }
                acc[order.tableNumber].push(order);
                return acc;
            }, {});
            setOrdersByTable(groupedOrders);
        }
    }, []);

    return (
        <Layout>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Status Pesanan</h1>
            {Object.keys(ordersByTable).map((mejaId) => (
                <div key={mejaId} className="mb-3">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">{mejaId}</h2>
                    <ul>
                        {ordersByTable[mejaId].map((order: any, index: any) => (
                            <li key={index} className="mb-2">
                                <p>Pilihan Pesanan: {order.selectedOption}</p>
                                <p>Jumlah Pesanan: {order.selectedQuantity}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </Layout>
    )
}

export default Kitchen