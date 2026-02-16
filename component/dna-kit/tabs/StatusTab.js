const StatusTab = () => (
  <div className="grid grid-cols-2 gap-6">
    <div className="border p-4 rounded-xl">Timeline Here</div>

    <div className="bg-green-800 text-white p-4 rounded-xl">
      <h3 className="font-bold mb-2">Select Status</h3>
      {["Order Received","Kit Dispatched","Kit Delivered"].map((s,i)=>(
        <div key={i} className="bg-white text-black p-2 rounded mb-2">{s}</div>
      ))}
    </div>
  </div>
);

export default StatusTab;
