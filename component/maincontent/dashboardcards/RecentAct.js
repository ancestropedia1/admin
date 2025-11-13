import React from 'react'

const RecentAct = () => {
  const executives = [
    { name: "Amit Singh", role: "Customer Support Manager", task: "Customer Queries", percent: "78%" },
    { name: "Gaurav Kushwaha", role: "Business Process Manager", task: "Wall Art Order Handling", percent: "98%" },
    { name: "Rahul Kanaujia", role: "Business Process Manager", task: "DNA Order Handling", percent: "23%" },
    { name: "Sanket Sharma", role: "Operations Manager", task: "Operations", percent: "83%" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#E6E6E6] w-full h-auto">
      <div className='border-b border-gray-200 p-4 sm:p-6'>
        <h3 className="text-lg font-semibold">Executive Performance</h3>
      </div>
      <div className="p-4 sm:p-6 overflow-x-auto">
        <div className="min-w-full" style={{ minWidth: '500px' }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="text-left py-2 px-2 sm:px-4">Executive</th>
                <th className="text-left py-2 px-2 sm:px-4">Task Assigned</th>
                <th className="text-right py-2 px-2 sm:px-4">Task Completed</th>
              </tr>
            </thead>
            <tbody>
              {executives.map((exe, i) => (
                <tr key={i} className="border-b last:border-none">
                  <td className="py-3 px-2 sm:px-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={`https://i.pravatar.cc/40?img=${i + 5}`} 
                        className="w-8 h-8 rounded-full" 
                        alt={exe.name}
                      />
                      <div className="min-w-0">
                        <div className="font-medium text-sm truncate">{exe.name}</div>
                        <div className="text-xs text-gray-500 truncate">{exe.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-sm">{exe.task}</td>
                  <td className="py-3 px-2 sm:px-4 text-right font-semibold text-green-600 text-sm">{exe.percent}</td>
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