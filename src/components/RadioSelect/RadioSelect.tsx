import React from 'react'

const RadioSelect = ({ counts, onTableNumberChange, tableNumber }: any) => {

    const mejaItems = [];

    const handleRadioChange = (mejaId: any) => {
        onTableNumberChange(mejaId);
    };

    for (let i = 1; i <= counts; i++) {
        const mejaId = `meja-${i}`;
        mejaItems.push(
            <li key={mejaId}>
                <input type="radio" id={mejaId} name="meja" value={mejaId} className="hidden peer" required onChange={() => handleRadioChange(mejaId)} checked={tableNumber === mejaId} />
                <label htmlFor={mejaId} className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="block">
                        <div className="w-full text-lg font-semibold">Meja {i}</div>
                    </div>
                    <svg className="w-5 h-5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </label>
            </li>
        );
    }

    return (
        <div>
            <ul className="grid w-full gap-6 md:grid-cols-2">
                {mejaItems}
            </ul>
        </div>
    )
}

export default RadioSelect