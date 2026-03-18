import Card from "../Cards";
import { Coins, Clock4, CheckCircle, XCircle } from "lucide-react";

export default function SupportStats(){

return(

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 p-2">

<Card icon={<Coins className="text-yellow-600"/>} value="120" label="Total Token Request"/>

<Card icon={<Clock4 className="text-orange-500"/>} value="45" label="Pending Requests"/>

<Card icon={<CheckCircle className="text-green-600"/>} value="68" label="Approved Request"/>

<Card icon={<XCircle className="text-red-500"/>} value="7" label="Declined Request"/>

</div>

);
}