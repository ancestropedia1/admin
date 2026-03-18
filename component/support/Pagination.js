import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
page,
setPage,
totalPages,
tickets,
rowsPerPage
}){

return(

<div className="border-t p-4 flex justify-between items-center">

<p className="text-gray-600 text-sm">

Showing {(page-1)*rowsPerPage+1}–
{Math.min(page*rowsPerPage,tickets.length)}
of {tickets.length}

</p>

<div className="flex gap-2">

<button
disabled={page===1}
onClick={()=>setPage(page-1)}
className="p-2 border rounded-md"
>
<ChevronLeft size={16}/>
</button>

{[...Array(totalPages)].map((_,i)=>(
<button
key={i}
onClick={()=>setPage(i+1)}
className={`px-3 py-1 border rounded-md ${
page===i+1
? "bg-green-700 text-white"
: "bg-white"
}`}
>
{i+1}
</button>
))}

<button
disabled={page===totalPages}
onClick={()=>setPage(page+1)}
className="p-2 border rounded-md"
>
<ChevronRight size={16}/>
</button>

</div>

</div>

);
}