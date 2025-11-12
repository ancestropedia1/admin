import React from 'react'
import DashBoardHeader from '../dashboard/DashBoardHeader.js'
import SideBar from '../dashboard/SideBar.js'
import MainLayOut from '../maincontent/MainLayout.js'


const LayOutShell = () => {
  return (
    <div className="flex flex-col h-screen">
      <DashBoardHeader/>
      <div className="flex flex-1 pt-16 no-underline">
        <SideBar/>
        <main className="flex-1 bg-[#F3FFF9]">
         <MainLayOut/>
        </main>
        
      </div>
    </div>
  )
}

export default LayOutShell