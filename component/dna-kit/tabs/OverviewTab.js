const OverviewTab = () => (
  <div className="grid grid-cols-2 gap-6">
    <div className="border p-4 rounded-xl">
      <h3 className="font-bold mb-2">Timeline</h3>
      <p>Order Placed</p>
      <p>Kit Shipped</p>
      <p>Sample Received</p>
    </div>

    <div className="border p-4 rounded-xl">
      <h3 className="font-bold mb-2">Summary</h3>
      <p>Customer: John Doe</p>
      <p>Total: ₹2031</p>
      <p>Lab: Aakash Genetic Lab</p>
    </div>
  </div>
);

export default OverviewTab;
