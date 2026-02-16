const LabTab = () => (
  <div>
    <h3 className="font-bold mb-3">Assign Lab</h3>
    {["JRP Lab","Aakash Lab","DNA Lab"].map((l,i)=>(
      <div key={i} className="border p-2 rounded mb-2">{l}</div>
    ))}
    <button className="bg-green-700 text-white px-4 py-2 rounded">Assign</button>
  </div>
);

export default LabTab;
