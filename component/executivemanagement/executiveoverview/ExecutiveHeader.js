import ExecutiveTabs from "./ExecutiveTabs";

export default function ExecutiveHeader({ executive }) {
  return (
    <div>
      <div className="bg-[#F6F1E9] rounded-xl p-6 flex justify-between items-center border">
      <div className="flex gap-4 items-center">
        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
          {executive.fullName?.charAt(0)}
        </div>

        <div>
          <h2 className="text-xl font-bold">{executive.fullName}</h2>
          <div className="flex gap-2 mt-1">
            <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded">
              {executive.role || "Executive"}
            </span>
            <span
              className={`px-2 py-1 text-xs rounded ${
                executive.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {executive.isActive ? "Active" : "Disabled"}
            </span>
          </div>
        </div>
      </div>
    </div>
 <ExecutiveTabs/>
    </div>
      
  );
}

 
