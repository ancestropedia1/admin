import React from 'react'
 const activities = [
    { name: "Ajeet Pawar", action: "created 5 new account", role: "Executive", time: "2 minutes ago" },
    { name: "Rohit Mishra", action: "updated Rajesh Verma’s DOB", role: "Executive", time: "5 minutes ago" },
    { name: "Anand Kumar", action: "Recommended Change on Kushwaha Tree", role: "User", time: "18 minutes ago" },
    { name: "Akasha Singh", action: "assigned for Data updation", role: "Assigned by Amit", time: "12 minutes ago" },
  ];
  
const RecentAct = () => {
  return (
    <div>
           <div className="bg-white rounded-2xl p-6 space-y-4 shadow-md border border-b border-[#E6E6E6]" style={{width:'378px', height:'531px'}}>
              <h3 className="text-lg font-semibold border-b border-gray-600 py-4">Recent Activities</h3>
              {activities.map((act, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl">
                  <img src={`https://i.pravatar.cc/40?img=${i + 10}`} className=" rounded-full" />
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold">{act.name}</span> {act.action}
                    </p>
                    <p className="text-xs text-gray-500">
                      {act.role} • {act.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

  )
}

export default RecentAct