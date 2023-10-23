'use client'

import React from 'react';

const Table = ({ columns, data, showEditButton, onDelete }: any) => {

    const handleDelete = (id: any) => {
        onDelete(id);
    };

    if (!columns || !data) {
        return null;
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {columns.map((column: any, index: any) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                {column.label}
                            </th>
                        ))}
                        {showEditButton && <th scope="col" className="px-6 py-3 flex justify-center">Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row: any, rowIndex: any) => (
                        <tr
                            key={rowIndex}
                            className={
                                rowIndex % 2 === 0
                                    ? 'bg-white border-b dark:bg-gray-900 dark:border-gray-700'
                                    : 'border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
                            }
                        >
                            {columns.map((column: any, columnIndex: any) => (
                                <td key={columnIndex} className="px-6 py-4">
                                    {row[column.field]}
                                </td>
                            ))}
                            {showEditButton && (
                                <td className="px-6 py-4 flex justify-center">
                                    <a href="#" onClick={() => handleDelete(row.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Hapus</a>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
