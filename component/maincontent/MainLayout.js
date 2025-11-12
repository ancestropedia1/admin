import React from 'react'
import OverView from './dashboardcards/OverView'
import SystemAlert from './dashboardcards/SystemAlert'
import Executive from './dashboardcards/Executive'
import RecentAct from './dashboardcards/RecentAct'

const MainLayOut = () => {
  return (
    <div className="space-y-4">
    {/* Row 1 */}
    <div className="flex gap-10">
      <OverView className="flex-1" />
      <SystemAlert className="flex-1" />
    </div>

    {/* Row 2 */}
    <div className="flex gap-10">
      <Executive className="flex-1" />
      <RecentAct className="flex-1"/> 
    </div>
  </div>
    
    
  )
}

export default MainLayOut