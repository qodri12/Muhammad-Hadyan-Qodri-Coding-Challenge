import React from 'react'
import { BiText } from 'react-icons/bi'

const InputForm = ({ placeholder, value, onChange }: any) => {
    return (
        <div>
            <form className='md:w-96 w-full'>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Add</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <BiText />
                    </div>
                    <input type="text"
                        id="default-search"
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={placeholder}
                        required
                        value={value}
                        onChange={onChange}
                    />
                </div>
            </form>
        </div>
    )
}

export default InputForm