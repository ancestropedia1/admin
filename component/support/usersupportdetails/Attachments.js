"use client";

import { axiosInstance } from "@/config/axios";

export default function Attachments({ ticket, refresh }) {

  const attachments = ticket?.attachments || [];

  // 🔥 Upload (matches your backend)
  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file || !ticket?._id) {
      alert("❌ Ticket not loaded");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        console.log("Uploading to:", `/admin/tickets/${ticket._id}/attachment`);

        await axiosInstance.post(
          `/admin/tickets/${ticket._id}/attachment`,
          {
            image: reader.result, // ✅ base64
            name: file.name,
          }
        );

        alert("✅ File uploaded");

        if (refresh) refresh();

      } catch (err) {
        console.error("Upload error:", err.response?.data || err.message);
        alert("❌ Upload failed");
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border space-y-5">

      {/* HEADER */}
      <h3 className="text-lg font-semibold border-b pb-2">
        Attachment file
      </h3>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-6">

        {attachments.length === 0 && (
          <p className="text-sm text-gray-500">
            No attachments yet
          </p>
        )}

        {attachments.map((file, i) => (
          <div key={i} className="bg-gray-50 p-3 rounded-lg shadow-sm">

            <img
              src={file.url}
              alt={file.name}
              className="w-full h-40 object-cover rounded-lg"
            />

            <p className="mt-2 text-sm font-medium">
              {file.name}
            </p>

            <p className="text-xs text-gray-500">
              {new Date(file.createdAt).toDateString()}
            </p>
          </div>
        ))}

      </div>

      {/* UPLOAD */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">
          Upload Attachment
        </label>

        <input
          type="file"
          onChange={handleUpload}
          className="border p-2 rounded"
        />
      </div>

    </div>
  );
}