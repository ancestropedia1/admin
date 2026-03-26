"use client";

export default function QueryHistory({ ticket }) {

  const history = ticket?.history || [];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border">

      {/* HEADER */}
      <h3 className="text-2xl font-semibold border-b pb-3 mb-6">
        Query History
      </h3>

      <div className="relative">

        {/* VERTICAL LINE */}
        <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-gray-300"></div>

        <div className="space-y-8">

          {history.map((item, index) => (
            <div key={index} className="flex items-start gap-4">

              {/* ICON */}
              <div className="z-10">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                  ✓
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex-1 flex justify-between items-start">

                <div>
                  <p className="font-medium text-gray-800">
                    {item.action}
                  </p>

                  <p className="text-sm text-gray-500">
                    {ticket?.subject || "Support Ticket"}
                  </p>
                </div>

                {/* DATE */}
                <p className="text-sm text-gray-500 whitespace-nowrap">
                  {item.date
                    ? new Date(item.date).toDateString()
                    : "No date"}
                </p>

              </div>

            </div>
          ))}

          {/* RESOLUTION (LAST STEP) */}
          <div className="flex items-start gap-4">

            <div className="z-10">
              <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                -
              </div>
            </div>

            <div className="flex-1 flex justify-between items-start">

              <div>
                <p className="font-medium text-gray-800">
                  Resolution
                </p>

                <p className="text-sm text-gray-500">
                  {ticket?.adminComment || "No resolution is provided yet."}
                </p>
              </div>

              <p className="text-sm text-gray-500">
                {ticket?.status === "Resolved"
                  ? "Completed"
                  : "No update yet"}
              </p>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}