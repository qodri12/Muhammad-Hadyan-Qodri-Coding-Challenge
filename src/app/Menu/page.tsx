'use client'

import React, { useState, useEffect } from 'react'
import Layout from "@/components/Layout"
import Table from "@/components/Table/Table"
import InputForm from '@/components/InputForm/InputForm';

const columns = [
  { label: 'ID', field: 'id' },
  { label: 'Name', field: 'name' },
  { label: 'Harga', field: 'harga' }
];

export default function Menu() {

  const [data, setData] = useState([]);
  const [menu, setMenu] = useState('');
  const [harga, setHarga] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('myData');
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      const initialData = [
        { id: 494076, name: 'Kentang Goreng', harga: '15000' },
        { id: 996756, name: 'Ayam Kecap Manis', harga: '20000' },
        { id: 362342, name: 'Nasi Goreng Spesial', harga: '20000' },
      ];
      setData(initialData);
      saveToLocalStorage(initialData);
    }
  }, []);

  const saveToLocalStorage = (newData: any) => {
    localStorage.setItem('myData', JSON.stringify(newData));
  };

  const generateRandomID = () => {
    return Math.floor(100000 + Math.random() * 90000);
  };

  const handleAdd = () => {
    const newItem = { id: generateRandomID(), name: menu, harga: harga };
    const newData = [...data, newItem];

    setData(newData);
    saveToLocalStorage(newData);
    setMenu('');
    setHarga('');
  };

  const handleDelete = (id: any) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    saveToLocalStorage(newData);
  };

  return (
    <Layout>
      <h1 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">Data Menu</h1>
      <div className='mb-5 flex flex-row flex-wrap gap-2'>
        <div className="w-full md:w-96">
          <InputForm
            placeholder="Tambah Menu"
            value={menu}
            onChange={(e: any) => setMenu(e.target.value)}
          />
        </div>
        <div className="w-full md:w-96">
          <InputForm
            placeholder="Tambah Harga"
            value={harga}
            onChange={(e: any) => setHarga(e.target.value)}
          />
        </div>
        <button onClick={handleAdd} type="button" className="text-white bg-gray-800 w-full md:w-48 h-[53.5px] hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Tambah</button>
      </div>
      <Table columns={columns} data={data} showEditButton={true} onDelete={handleDelete} />
    </Layout>
  )
}
