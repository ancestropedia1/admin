export default function VaultPlanAllocation() {
  const plans = [
    { title: "Standard Plan", storage: "5 GB",  tokens: "Up to 200 tokens", color: "bg-white" },
    { title: "Pro Plan",      storage: "10 GB", tokens: "200+ tokens",       color: "bg-[#FCEAC0]" },
    { title: "Free Plan",     storage: "1 GB",  tokens: "0–20 tokens",       color: "bg-[#D3E4FB]" },
  ];

  return (
    <div className="space-y-6">
      {["Public Plan Allocation", "Private Storage Plan Allocation"].map((title) => (
        <div
          key={title}
          className="bg-[#F6F1E9] p-5 rounded-md border-2 border-gray-300"
        >
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((plan) => (
              <div
                key={plan.title}
                className={`${plan.color} rounded-xl border border-gray-200 p-5 shadow-sm`}
              >
                <h3 className="font-semibold text-gray-800">{plan.title}</h3>
                <p className="text-sm text-gray-600 mt-1">Storage: {plan.storage}</p>
                <p className="text-sm text-gray-600">Tokens: {plan.tokens}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}