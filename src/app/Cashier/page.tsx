'use client'

import Layout from '@/components/Layout'
import SelectComponent from '@/components/SelectComponent/SelectComponent'
import Table from '@/components/Table/Table'
import React, { useState, useEffect } from 'react'

const Cashier = () => {

    const [selectedTable, setSelectedTable] = useState('Pilih Nomor Meja');
    const [tableOptions, setTableOptions] = useState([]);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedTableToClear, setSelectedTableToClear] = useState('Pilih Nomor Meja');

    useEffect(() => {
        const storedOrders = localStorage.getItem('orders');
        if (storedOrders) {
            const orders = JSON.parse(storedOrders);
            const tableNumbers = Array.from(new Set(orders.map(order => order.tableNumber)));
            setTableOptions(tableNumbers);
        }
    }, []);

    const handleTableChange = (e: any) => {
        setSelectedTable(e.target.value);
        setSelectedTableToClear(e.target.value);
    };

    const handleGenerateReceipt = () => {
        const storedOrders = localStorage.getItem('orders');
        if (storedOrders) {
            const orders = JSON.parse(storedOrders);
            const selected = orders.filter((order:any) => order.tableNumber === selectedTable);
            setSelectedOrders(selected);
            const total = selected.reduce((acc:any, order:any) => acc + (order.price * order.selectedQuantity), 0);
            setTotalPrice(total);
        }
    };

    const handleClearTable = () => {
        const storedOrders = localStorage.getItem('orders');
        if (storedOrders) {
          const orders = JSON.parse(storedOrders);
          const ordersToKeep = orders.filter((order:any) => order.tableNumber !== selectedTableToClear);
          localStorage.setItem('orders', JSON.stringify(ordersToKeep));
          setSelectedOrders([]);
          setTotalPrice(0);
        }
      };

    const handleDeleteOrder = (id:any) => {
        const updatedOrders = selectedOrders.filter((order) => order.id !== id);
        setSelectedOrders(updatedOrders);
    };

    return (
        <Layout>
            <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Cashier Page</h1>
                <div className="mt-5">
                    <h3 className="mb-1">Pilih Nomor Meja</h3>
                    <div className="flex justify-between flex-wrap gap-3">
                        <div className="flex flex-row gap-3 flex-wrap">
                            <div className="w-full md:w-96">
                                <SelectComponent
                                    options={tableOptions}
                                    selectedOption={selectedTable}
                                    onOptionChange={handleTableChange}
                                    firstOption="Pilih Nomor Meja"
                                />
                            </div>
                            <div className="w-full md:w-auto">
                                <button onClick={handleGenerateReceipt} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 w-full md:w-64">Buat Struk</button>
                            </div>
                        </div>
                        <div className="w-full md:w-auto">
                            <button onClick={handleClearTable} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 w-full md:w-64">Kosongkan Meja</button>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <Table
                        showEditButton={true}
                        data={selectedOrders}
                        onDelete={handleDeleteOrder}
                        columns={[
                            { label: 'Pilihan Pesanan', field: 'selectedOption' },
                            { label: 'Jumlah Pesanan', field: 'selectedQuantity' },
                            { label: 'Harga', field: 'price' },
                        ]}
                    />
                    <p className="text-lg font-bold mt-3">Total Harga: {totalPrice}</p>
                </div>
            </div>
        </Layout>
    )
}

export default Cashier