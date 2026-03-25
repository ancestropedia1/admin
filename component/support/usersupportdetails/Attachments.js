"use client";

import { axiosInstance } from "@/config/axios";

export default function Attachments({ ticket, refresh }) {
  const attachments = ticket?.attachments || [];

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file || !ticket?._id) {
      alert("❌ Ticket not loaded");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        await axiosInstance.post(
          `/admin/tickets/${ticket._id}/attachment`,
          {
            image: reader.result,
            name: file.name,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        alert("✅ File uploaded");
        if (refresh) refresh();

      } catch (err) {
        console.error("Upload error:", err.response?.data || err.message);
        alert(err.response?.data?.message || "❌ Upload failed");
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border space-y-6">

      {/* HEADER */}
      <div className="border-b pb-3">
        <h3 className="text-2xl font-semibold text-gray-800">
          Attachment file
        </h3>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {attachments.length === 0 && (
          <p className="text-gray-500 text-sm">
            No attachments yet
          </p>
        )}

        {attachments.map((file, i) => (
          <div
            key={i}
            className="bg-[#F9FAFB] rounded-xl shadow-sm border p-4 hover:shadow-md transition"
          >
            {/* IMAGE */}
            <div className="rounded-lg overflow-hidden border">
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-44 object-cover"
              />
            </div>

            {/* TITLE */}
            <p className="mt-3 font-medium text-gray-800">
              {file.name || "Payment related: Documents"}
            </p>

            {/* DATE */}
            <p className="text-sm text-gray-500">
              Upload On:{" "}
              {file.createdAt
                ? new Date(file.createdAt).toDateString()
                : "N/A"}
            </p>
          </div>
        ))}
      </div>

      {/* PAGINATION UI (STATIC LIKE FIGMA) */}
      <div className="flex justify-center items-center gap-2 mt-4">

        <button className="px-2 py-1 text-gray-600">
          {"<"}
        </button>

        <button className="px-3 py-1 bg-green-800 text-white rounded">
          1
        </button>

        <button className="px-3 py-1 border rounded text-gray-700">
          ...
        </button>

        <button className="px-3 py-1 border rounded text-gray-700">
          2
        </button>

        <button className="px-2 py-1 text-gray-600">
          {">"}
        </button>

      </div>

      {/* UPLOAD */}
      <div className="border-t pt-4 flex flex-col gap-2">

        <label className="text-sm text-gray-600 font-medium">
          Upload Attachment
        </label>

        <input
          type="file"
          onChange={handleUpload}
          className="border rounded-lg p-2 bg-gray-50"
        />
      </div>

    </div>
  );
}