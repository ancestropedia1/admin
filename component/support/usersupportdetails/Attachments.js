"use client";

import { useState } from "react";
import { axiosInstance } from "@/config/axios";

export default function Attachments({ ticket, refresh }) {

  const attachments = ticket?.attachments || [];

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 PAGINATION STATE
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(attachments.length / itemsPerPage);

  const paginatedData = attachments.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // ✅ HANDLE FILE SELECT
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // ✅ HANDLE SAVE BUTTON
  const handleUpload = async () => {
    if (!selectedFile || !ticket?._id) {
      alert("❌ Select file first");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        setLoading(true);

        await axiosInstance.post(
          `/admin/tickets/${ticket._id}/attachment`,
          {
            image: reader.result,
            name: selectedFile.name,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        alert("✅ Uploaded");
        setSelectedFile(null);

        if (refresh) refresh();

      } catch (err) {
        console.error(err);
        alert("❌ Upload failed");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border grid md:grid-cols-2 gap-6">

      {/* ================= LEFT SIDE (UPLOAD) ================= */}
      <div className="space-y-4">

        <h3 className="text-xl font-semibold border-b pb-2">
          Upload Attachment
        </h3>

        <input
          type="file"
          onChange={handleFileChange}
          className="border rounded-lg p-2 bg-gray-50 w-full"
        />

        {selectedFile && (
          <p className="text-sm text-gray-600">
            Selected: {selectedFile.name}
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={!selectedFile || loading}
          className="bg-green-800 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>

      </div>

      {/* ================= RIGHT SIDE (ATTACHMENTS) ================= */}
      <div className="space-y-4">

        <h3 className="text-xl font-semibold border-b pb-2">
          Attachment file
        </h3>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {paginatedData.length === 0 && (
            <p className="text-gray-500 text-sm">
              No attachments yet
            </p>
          )}

          {paginatedData.map((file, i) => (
            <div
              key={i}
              className="bg-gray-50 p-3 rounded-lg shadow-sm border"
            >
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-32 object-cover rounded"
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

        {/* ================= PAGINATION ================= */}
        <div className="flex justify-center items-center gap-2 mt-4">

          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            {"<"}
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-green-800 text-white"
                  : "border"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            {">"}
          </button>

        </div>

      </div>

    </div>
  );
}