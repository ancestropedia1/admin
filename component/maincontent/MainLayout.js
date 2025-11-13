import React from 'react'
import OverView from './dashboardcards/OverView'
import SystemAlert from './dashboardcards/SystemAlert'
import Executive from './dashboardcards/Executive'
import RecentAct from './dashboardcards/RecentAct'

const MainLayOut = () => {
  return (
    <div className="space-y-4 p-2 sm:p-4">
      
      {/* -----------------------------------------------------------------
         TOP SECTION: Overview (2/3) and System Alerts (1/3)
         - Mobile: Stacked (flex-col)
         - Large: Side-by-side (lg:flex-row)
         ----------------------------------------------------------------- */}
      <div className="flex flex-col lg:flex-row gap-4 lg:h-[452px] lg:gap-6">
        
        {/* Item 1: Overview - Takes 2/3 width on large screens */}
        <div className="min-w-0 lg:w-2/3">
          <OverView />
        </div>
        
        {/* Item 2: System Alert - Takes 1/3 width on large screens */}
        <div className="min-w-0 lg:w-1/3">
          <SystemAlert />
        </div>
        
      </div>
      
      {/* -----------------------------------------------------------------
         BOTTOM SECTION: Recent Activities (2/3) and Executive (1/3)
         - Mobile: Stacked (flex-col)
         - Large: Side-by-side (lg:flex-row)
         ----------------------------------------------------------------- */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        
        {/* Item 4: Recent Activities - Takes 2/3 width on large screens */}
        <div className="min-w-0 lg:w-2/3">
          <RecentAct />
        </div>

        {/* Item 3: Executive - Takes 1/3 width on large screens */}
        <div className="min-w-0 lg:w-1/3">
          <Executive />
        </div>
        
      </div>
      
    </div>
  )
}

export default MainLayOut