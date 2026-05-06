"use client";

import { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axios.js";

export default function BlogEditor({ editBlog, onSuccess, onCancel, showToast }) {
  const [title,       setTitle]       = useState("");
  const [content,     setContent]     = useState("");
  const [authorName,  setAuthorName]  = useState("");
  const [image,       setImage]       = useState(null);
  const [imagePreview,setImagePreview]= useState(null);
  const [loading,     setLoading]     = useState(false);

  // ✅ Pre-fill form when editing
  useEffect(() => {
    if (editBlog) {
      setTitle(editBlog.title       || "");
      setContent(editBlog.fullContent || "");
      setAuthorName(editBlog.author || "");
      setImagePreview(editBlog.imageUrl || null);
      setImage(null); // don't pre-load base64 for existing image
    } else {
      setTitle("");
      setContent("");
      setAuthorName("");
      setImage(null);
      setImagePreview(null);
    }
  }, [editBlog]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !authorName.trim()) {
      showToast("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      if (editBlog?._id) {
        // ✅ FIX: Actually call the edit API (was missing before)
        await axiosInstance.put("/admin/blog/update", {
          newTitle:       title,
          newDescription: content,
          newImage:       image || undefined,
        }, {
          params: { blogId: editBlog._id },
        });
      } else {
        await axiosInstance.post("/admin/blog/createBlog", {
          title,
          description: content,
          image,
          author: authorName,
        });
      }

      onSuccess();
    } catch (error) {
      console.error("Blog submit failed:", error.response?.data || error);
      showToast("Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <input
        type="text"
        placeholder="Enter Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border bg-white rounded-lg"
      />

      <textarea
        placeholder="Write your blog content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 border bg-white rounded-lg min-h-[200px]"
      />

      <div>
        <label className="font-semibold">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full mt-2"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-3 h-40 rounded-lg border object-cover"
          />
        )}
      </div>

      <input
        type="text"
        placeholder="Author Name"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        className="w-full bg-white p-3 border rounded-lg"
      />

      <div className="flex gap-3 mt-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#265A46] text-white px-6 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Saving..." : editBlog ? "Update Blog" : "Submit Blog"}
        </button>

        <button
          onClick={onCancel}
          className="px-4 bg-white py-2 rounded-lg border"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}