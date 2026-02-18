"use client";

import { Download, Eye } from "lucide-react";

const ReportTab = ({ order }) => {
  // assuming backend saves documents in order.documents[]
  const reportDoc =
    order.documents?.find((doc) => doc.type === "report") || null;

  return (
    <div className="space-y-6">
      {/* ================= ORDER INFO ================= */}
      <div className="border rounded-xl p-6 bg-white">
        <h3 className="text-lg font-semibold mb-4">Order Status Timeline</h3>

        <div className="grid grid-cols-2 gap-y-4 text-sm">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-medium">
              {order.personalDetails?.firstName}{" "}
              {order.personalDetails?.lastName}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Report Type</p>
            <p className="font-medium">Full Ancestry Analysis</p>
          </div>

          <div>
            <p className="text-gray-500">User ID</p>
            <p>{order.userId}</p>
          </div>

          <div>
            <p className="text-gray-500">Uploaded On</p>
            <p>
              {reportDoc?.uploadedAt
                ? new Date(reportDoc.uploadedAt).toDateString()
                : "Not Uploaded"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Sample ID</p>
            <p>{order.sampleId || "—"}</p>
          </div>

          <div>
            <p className="text-gray-500">Uploaded On</p>
            <p>
              {reportDoc?.uploadedAt
                ? new Date(reportDoc.uploadedAt).toDateString()
                : "Not Uploaded"}
            </p>
          </div>
        </div>
      </div>

      {/* ================= DNA REPORT BOX ================= */}
      <div className="border rounded-xl p-6 bg-white">
        <h3 className="font-semibold mb-4">DNA Report</h3>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#F6F1E9] border rounded-md p-4">
            <p className="font-semibold">Ancestral Regions</p>
            <p className="text-sm text-gray-500">
              South & Central Asia
            </p>
          </div>

          <div className="bg-[#F6F1E9] border rounded-md p-4">
            <p className="font-semibold">Genetic Matches</p>
            <p className="text-sm text-gray-500">
              42 relatives found
            </p>
          </div>

          <div className="bg-[#F6F1E9] border rounded-md p-4">
            <p className="font-semibold">Migration Era</p>
            <p className="text-sm text-gray-500">
              1200 BCE – 1500 CE
            </p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 mt-6">
          <a
            href={reportDoc?.fileUrl || "#"}
            target="_blank"
            className="flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-100"
          >
            <Download size={16} />
            Download PDF
          </a>

          <a
            href={reportDoc?.fileUrl || "#"}
            target="_blank"
            className="flex items-center gap-2 bg-[#265A46] text-white px-4 py-2 rounded-md hover:bg-green-800"
          >
            <Eye size={16} />
            View Full Report
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReportTab;
