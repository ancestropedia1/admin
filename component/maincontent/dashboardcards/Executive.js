import React from 'react'

const RecentAct = () => {
    const activities = [
    { name: "Ajeet Pawar", action: "created 5 new account", role: "Executive", time: "2 minutes ago" },
    { name: "Rohit Mishra", action: "updated Rajesh Verma’s DOB", role: "Executive", time: "5 minutes ago" },
    { name: "Anand Kumar", action: "Recommended Change on Kushwaha Tree", role: "User", time: "18 minutes ago" },
    { name: "Akasha Singh", action: "assigned for Data updation", role: "Assigned by Amit", time: "12 minutes ago" },
  ];

  const executives = [
    { name: "Amit Singh", role: "Customer Support Manager", task: "Customer Queries", percent: "78%" },
    { name: "Gaurav Kushwaha", role: "Business Process Manager", task: "Wall Art Order Handling", percent: "98%" },
    { name: "Rahul Kanaujia", role: "Business Process Manager", task: "DNA Order Handling", percent: "23%" },
    { name: "Sanket Sharma", role: "Operations Manager", task: "Operations", percent: "83%" },
  ];

  return (
  <div className=" gap-8 w-[703px] h-[269px] ml-5  ">
            {/* Executive Performance */}
            <div className="bg-white rounded-2xl  shadow-md border border-[#E6E6E6]">
              <div className='border-b border-gray-200'>
                <h3 className="text-lg font-semibold mb-4">Executive Performance</h3>
                </div>
              <div className=" p-6 overflow-x-auto">
                <table className="w-full text-sm mt-5">
                  <thead>
                    <tr className="text-gray-500 border-b">
                      <th className="text-left py-2">Executive</th>
                      <th className="text-left py-2">Task Assigned</th>
                      <th className="text-right py-2">Task Completed</th>
                    </tr>
                  </thead>
                  <tbody className=''>
                    {executives.map((exe, i) => (
                      <tr key={i} className="border-b last:border-none">
                        <td className="py-3 flex items-center gap-3">
                          <img src={`https://i.pravatar.cc/40?img=${i + 5}`} className="w-8 h-8 rounded-full" />
                          <div>
                            <div className="font-medium">{exe.name}</div>
                            <div className="text-xs text-gray-500">{exe.role}</div>
                          </div>
                        </td>
                        <td className="py-3">{exe.task}</td>
                        <td className="py-3 text-right font-semibold text-green-600">{exe.percent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
             </div>
         
  )
}
 
export default RecentAct