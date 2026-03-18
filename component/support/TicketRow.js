export default function TicketRow({ticket}){

return(

<tr className="border-b hover:bg-gray-50">

<td className="p-5">#{ticket.ticketId}</td>

<td className="p-5">

<div className="flex gap-3">

<img
src={ticket.avatar}
className="w-10 h-10 rounded-full"
/>

<div>

<p className="font-medium">{ticket.name}</p>

<p className="text-xs text-gray-500">
ID-{ticket.userId}
</p>

</div>

</div>

</td>

<td className="p-5">{ticket.category}</td>

<td className="p-5">

<span className={
ticket.status==="Open"
? "text-orange-500"
: ticket.status==="In Progress"
? "text-blue-500"
: "text-green-600"
}>

{ticket.status}

</span>

</td>

<td className="p-5">{ticket.date}</td>

<td className="p-5 flex gap-2">

<button className="px-3 py-1 bg-[#C5FFCD] text-[#1D7A48] rounded-md text-xs">
Resolve
</button>

<button className="px-3 py-1 bg-[#E6D8FF] text-[#6B47DC] rounded-md text-xs">
Assign
</button>

</td>

</tr>

);
}