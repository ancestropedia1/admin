import { CalendarDays, ChevronDown, Search } from "lucide-react";

export default function SupportFilters(){

return(

<div className="bg-[#F6F1E9] border p-4 rounded-md shadow mt-4 flex justify-between">

<div className="flex gap-2">

<button className="flex gap-2 bg-white px-4 py-2 rounded-md">
By Date <CalendarDays size={18}/>
</button>

<button className="flex bg-white px-4 py-2 rounded-md">
By Status <ChevronDown size={18}/>
</button>

<button className="flex bg-white px-4 py-2 rounded-md">
By Category <ChevronDown size={18}/>
</button>

</div>

<div className="flex bg-white rounded-md px-3 py-2 w-1/3">

<Search className="text-gray-500"/>

<input
placeholder="Search ticket..."
className="w-full ml-2 outline-none"
/>

</div>

</div>

);
}