import { Playfair_Display, Lato } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400","600","700"]
});

const lato = Lato({
  subsets:["latin"],
  weight:["400","700"]
});

export default function SupportHeader(){

return(
<div className="bg-[#F6F1E9] mt-10 border p-8 rounded-xl shadow-sm w-full">

<div className="flex justify-between items-center">

<div>
<h1 className={`${playfair.className} text-4xl font-bold`}>
Support Tickets
</h1>

<p className={`${lato.className} text-gray-600 mt-2`}>
Manage, track and resolve user queries efficiently
</p>
</div>

<div className="flex gap-4">

<button className="bg-white px-6 py-3 rounded-sm border">
KPI By Date
</button>

<button className="bg-[#265A46] text-white px-6 py-3 rounded-lg">
+ Create Ticket
</button>

</div>

</div>

</div>
);
}