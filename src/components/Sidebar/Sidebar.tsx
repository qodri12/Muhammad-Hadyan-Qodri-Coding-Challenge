'use client'

import classNames from 'classnames'
import React, { useMemo, useState } from 'react'
import { SiPhpmyadmin } from 'react-icons/si'
import { AiOutlineDoubleLeft } from 'react-icons/ai'
import { BiRestaurant, BiSolidCartAlt } from 'react-icons/bi'
import { GrUnorderedList } from 'react-icons/gr'
import { BsCashCoin } from 'react-icons/bs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
    { id: 1, label: "Menu", icon: <GrUnorderedList size={28} />, link: '/Menu' },
    { id: 2, label: "Order", icon: <BiSolidCartAlt size={28} />, link: '/Order' },
    { id: 3, label: "Kitchen", icon: <BiRestaurant size={28} />, link: '/Kitchen' },
    { id: 4, label: "Cashier", icon: <BsCashCoin size={28} />, link: '/Cashier' }
]

const Sidebar = () => {

    const [toggleCollapse, setToggleCollapse] = useState(true);
    const [isCollapsible, setIsCollapsible] = useState(false);

    const pathname = usePathname()
    

    const activeMenu = useMemo(
        () => menuItems.find((menu:any) => menu.link === pathname),
        [pathname]
    );

    const wrapperClasses = classNames(
        "h-screen px-4 pt-8 pb-4 bg-white flex justify-between flex-col",
        {
            ['w-[330px]']: !toggleCollapse,
            ['w-[85px]']: toggleCollapse,
        }
    );

    const collapseIconClasses = classNames(
        "p-3 rounded bg-gray-200 absolute right-0",
        {
            "rotate-180": toggleCollapse,
        }
    )

    const getNavItemClasses = (menu: any) => {
        return classNames(
            "flex items-center mt-1 cursor-pointer hover:bg-gray-200 rounded w-full overflow-hidden whitespace-nowrap",
            {
                ["bg-gray-100"]: activeMenu?.id === menu.id,
            }
        );
    };

    const onMouseOver = () => {
        setIsCollapsible(!isCollapsible);
    };

    const handleSidebarToggle = () => {
        setToggleCollapse(!toggleCollapse);
    };

    return (
        <div
            className={wrapperClasses}
            onMouseEnter={onMouseOver}
            onMouseLeave={onMouseOver}
            style={{ 
                transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s",
                position: "fixed",
                zIndex: 1000,
        }}
        >
            <div className="flex flex-col">
                <div className="flex items-center justify-between relative">
                    <div className="flex item-center pl-1 gap-4">
                        <SiPhpmyadmin size={45} />
                        <span className={classNames('mt-2 text-lg font-medium text-black', {
                            hidden: toggleCollapse,
                        })}>
                            Sistem Restoran
                        </span>
                    </div>
                    {isCollapsible && (
                        <button
                            className={collapseIconClasses}
                            onClick={handleSidebarToggle}
                        >
                            <AiOutlineDoubleLeft size={24} />
                        </button>
                    )}
                </div>
                <div className="flex flex-col items-start mt-24">
                    {menuItems.map(({ icon: Icon, ...menu }: any) => {
                        const classes = getNavItemClasses(menu);
                        return (
                            <div key={menu.id} className={classes}>
                                <Link href={menu.link}>
                                    <div className="flex py-4 px-3 items-center w-full h-full">
                                        <div style={{ width: "2.5rem" }}>
                                            {Icon}
                                        </div>
                                        {!toggleCollapse && (
                                            <span
                                                className={classNames(
                                                    "text-md font-medium text-black"
                                                )}
                                            >
                                                {menu.label}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Sidebar