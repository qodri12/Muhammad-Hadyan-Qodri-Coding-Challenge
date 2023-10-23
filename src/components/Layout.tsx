import React from 'react'
import Sidebar from './Sidebar/Sidebar'


const Layout = ({children}:any) => {
  return (
    <div className="w-full">
        <Sidebar/>
        <div className="bg-slate-200 h-screen flex-1 p-5 ml-[85px] overflow-y-auto">
            {children}
        </div>
    </div>
  )
}

export default Layout