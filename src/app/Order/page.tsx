'use client'

import Layout from '@/components/Layout'
import RadioSelect from '@/components/RadioSelect/RadioSelect'
import SelectComponent from '@/components/SelectComponent/SelectComponent'
import React, { useState, useEffect } from 'react'

type OrderType = {
  tableNumber: string;
  selectedOption: string;
  selectedQuantity: string;
  price: number;
};

type MenuPrices = Record<string, number>;

const Order = () => {

  const [selectedOption, setSelectedOption] = useState('Pilih pesanan');
  const [selectedQuantity, setSelectedQuantity] = useState('Pilih jumlah');
  const [options, setOptions] = useState<string[]>([]);
  const quantities = [1, 2, 3, 4, 5];
  const [tableNumber, setTableNumber] = useState('');
  const [orderDetails, setOrderDetails] = useState<OrderType | null>(null);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [menuPrices, setMenuPrices] = useState<MenuPrices>({});


  useEffect(() => {
    const storedData = localStorage.getItem('myData');
    if (storedData) {
      const parsedData: any[] = JSON.parse(storedData);
      const uniqueOptions = Array.from(new Set(parsedData.map((item:any) => item.name)));
      setOptions(uniqueOptions);
      const menuPrices: MenuPrices = {};
      parsedData.forEach((item) => {
        menuPrices[item.name] = item.harga;
      });
      setMenuPrices(menuPrices);
    }
  }, []);

  const handleOptionChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  const handleQuantityChange = (e: any) => {
    setSelectedQuantity(e.target.value);
  };

  const handleTableNumberChange = (mejaId: any) => {
    setTableNumber(mejaId);
  };

  const handleOrderButtonClick = () => {
    const order: OrderType = {
      tableNumber,
      selectedOption,
      selectedQuantity,
      price: menuPrices[selectedOption],
    };

    setOrders([...orders, order]);
    localStorage.setItem('orders', JSON.stringify([...orders, order]));

    setTableNumber('');
    setSelectedOption('Pilih pesanan');
    setSelectedQuantity('Pilih jumlah');
    setOrderDetails(order);
  };

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  return (
    <Layout>
      <h1 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">Pilih Pesanan dan Untuk Meja Berapa ?</h1>
      <RadioSelect counts={4} onTableNumberChange={handleTableNumberChange} tableNumber={tableNumber} />
      <div className="mt-5 flex flex-row gap-3 flex-wrap w-full">
        <div className="w-full md:w-96">
          <h3 className="mb-1">Pilih Pesanan</h3>
          <SelectComponent options={options} selectedOption={selectedOption} onOptionChange={handleOptionChange} firstOption="Pilih Pesanan" />
        </div>
        <div className="w-full md:w-96">
          <h3 className="mb-1">Jumlah Pesanan</h3>
          <SelectComponent options={quantities} selectedOption={selectedQuantity} onOptionChange={handleQuantityChange} firstOption="Pilih Jumlah" />
        </div>
      </div>
      <div className="mt-5">
        <button onClick={handleOrderButtonClick} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Pesan</button>
      </div>
      <div className="mt-5">
        <h1 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Detail Pesanan</h1>
        {orders.length > 0 && (
          <ul>
            {orders.map((order, index) => (
              <li className="mb-3" key={index}>
                <p className="font-bold">Nomor Meja: {order.tableNumber}</p>
                <p>Pilihan Pesanan: {order.selectedOption}</p>
                <p>Jumlah Pesanan: {order.selectedQuantity}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  )
}

export default Order;