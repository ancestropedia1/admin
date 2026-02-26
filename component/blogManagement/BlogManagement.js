"use client";
import { useState, useRef,useEffect } from "react";
import React from "react";
import { Lato, Playfair_Display } from "next/font/google";
import {
  Pencil,
  Trash2,
  ChevronDown,
  Search,
  CalendarDays,
  Eye,
} from "lucide-react";
import { axiosInstance } from "../../config/axios.js";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const BlogManagement = () => {
  const [showEditor, setShowEditor] = useState(false);

  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [postDate, setPostDate] = useState("");

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const [showAuthorFilter, setShowAuthorFilter] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFeatured, setShowFeatured] = useState(false);

  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [showDateInput, setShowDateInput] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [viewBlog, setViewBlog] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const showPopupMessage = (msg) => {
    setPopupMessage(msg);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);
  };

  const [blogList, setBlogList] = useState([]);

  // ✅ FIXED HERE (useEffect added + correct route)
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axiosInstance.get("/admin/blog/myBlogs");

      const formattedBlogs = res.data.blogs.map((blog) => ({
        title: blog.title,
        shortDesc: blog.description?.slice(0, 100),
        author: blog.author || "Admin",
        date: blog.createdAt?.split("T")[0],
        fullContent: blog.description,
        featured: blog.featured || false,
        image: blog.image,
      }));

      setBlogList(formattedBlogs);
    } catch (error) {
      console.log("Error fetching blogs:", error);
    }
  };

  const openEditor = () => {
    setShowEditor(true);
    setEditIndex(null);
    setTitle("");
    setShortDesc("");
    setContent("");
    setAuthorName("");
    setPostDate("");
    setImage(null);
    setImagePreview(null);
  };

  const submitBlog = async () => {
    if (!title.trim() || !content.trim() || !authorName.trim()) {
      showPopupMessage("Please fill all fields.");
      return;
    }

    try {
      await axiosInstance.post("/admin/blog/createBlog", {
        title: title,
        description: content,
        image: image,
        author: authorName,
      });

      showPopupMessage("Blog created successfully!");
      setShowEditor(false);

      fetchBlogs(); // refresh list

    } catch (error) {
      console.error("❌ Blog create failed:", error.response?.data || error);
      showPopupMessage("Failed to create blog");
    }
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setShowDeletePopup(true);
  };

  const filteredBlogs = blogList.filter((b) => {
    const matchesAuthor = selectedAuthor ? b.author === selectedAuthor : true;
    const matchesSearch =
      searchQuery.length === 0 ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFeatured = showFeatured ? b.featured === true : true;

    return matchesAuthor && matchesSearch && matchesFeatured;
  });
  return (
    <div className="w-full min-h-screen">
      <div className="max-w-[1200px] mx-auto p-4 sm:p-6 md:p-10">
        {/* HEADER */}
        <div className="bg-[#F6F1E9] border mt-1 border-[#faead2] p-8 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <h1 className={`${playfair.className} text-4xl font-extrabold`}>
                Blog Management
              </h1>
              <p className={`${lato.className} text-base md:text-lg mt-3`}>
                Create and manage Ancestropedia blog posts.
              </p>
            </div>

            <button
              onClick={openEditor}
              className="bg-[#265A46] text-white px-8 py-3 rounded-xl shadow-md"
            >
              + Add Blog
            </button>
          </div>

          {/* EDITOR */}
          {showEditor && (
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
              ></textarea>

              <div>
                <label className="font-semibold">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full mt-2 "
                />

                {imagePreview && (
                  <img
                    src={imagePreview}
                    className="mt-3 h-40  rounded-lg border"
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

              <div className="flex gap-3 items-center mt-3">
                <input
                  type="text"
                  placeholder="Post Date (optional)"
                  value={postDate}
                  onChange={(e) => setPostDate(e.target.value)}
                  className="p-2 bg-white border rounded w-40"
                />

                <button
                  onClick={submitBlog}
                  className="bg-gray-400 text-white px-6 py-2 rounded-lg"
                >
                  Submit Blog
                </button>

                <button
                  onClick={() => setShowEditor(false)}
                  className="px-4 bg-white py-2 rounded-lg border"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FILTERS */}
        <div className="bg-[#F6F1E9] border p-4 rounded-xl shadow mt-6 flex flex-col md:flex-row justify-between gap-4">

          <div className="flex flex-wrap gap-3">
            {/* DATE FILTER */}
            <div className="relative">
              <button
                onClick={() => setShowDateInput(!showDateInput)}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm"
              >
                {postDate || "By Date"}
                <CalendarDays size={18} />
              </button>

              {showDateInput && (
                <input
                  type="date"
                  onChange={(e) => {
                    setPostDate(e.target.value);
                    setShowDateInput(false);
                  }}
                  className="absolute mt-2 left-0 border p-2 rounded-lg bg-white shadow-md z-20"
                />
              )}
            </div>

            {/* AUTHOR FILTER */}
            <div className="relative">
              <button
                onClick={() => setShowAuthorFilter(!showAuthorFilter)}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm"
              >
                {selectedAuthor || "By Author"}
                <ChevronDown size={18} />
              </button>

              {showAuthorFilter && (
                <div className="absolute mt-2 bg-white border rounded-xl shadow-md z-20 w-40">
                  <div
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedAuthor(null);
                      setShowAuthorFilter(false);
                    }}
                  >
                    All Authors
                  </div>

                  {Array.from(new Set(blogList.map((b) => b.author))).map(
                    (author, i) => (
                      <div
                        key={i}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedAuthor(author);
                          setShowAuthorFilter(false);
                        }}
                      >
                        {author}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* FEATURED */}
            <button
              onClick={() => setShowFeatured(!showFeatured)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm ${
                showFeatured ? "bg-[#265A46] text-white" : "bg-white"
              }`}
            >
              Featured
              <ChevronDown size={18} />
            </button>
          </div>

          {/* SEARCH */}
          <div className="flex bg-white rounded-lg px-4 py-3 shadow-sm w-full md:w-1/3">
            <Search className="text-gray-500 mt-1" size={18} />
            <input
              type="text"
              placeholder="Search blog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ml-2 outline-none"
            />
          </div>
        </div>

        {/* ACTIVE BLOG LIST */}
        <div className="mt-10 p-6 bg-[#F6F1E9] rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Active Blogs</h2>

          {/* DESKTOP TABLE */}
          <div className="hidden md:flex gap-6">
            <div className="bg-white rounded-xl p-4 shadow-sm w-[300px] min-h-[380px]">
              <div className="bg-[#C6C1C1] p-3 rounded-lg mb-4 text-center font-semibold">
                Blogs
              </div>

              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
                {filteredBlogs.map((blog, index) => (
                  <div key={index} className="p-3 rounded-lg shadow-sm text-sm">
                    {blog.title}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 p-4">
              <div className="grid grid-cols-12 bg-[#C6C1C1] p-3 rounded-lg mb-4 font-semibold">
                <div className="col-span-5">Author</div>
                <div className="col-span-4">Date</div>
                <div className="col-span-3 text-right">Action</div>
              </div>

              <div className="space-y-3">
                {filteredBlogs.map((blog, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 items-center bg-white p-4 rounded-lg"
                  >
                    <div className="col-span-5">{blog.author}</div>
                    <div className="col-span-4">{blog.date}</div>

                    <div className="col-span-3 flex justify-end gap-4">
                      <Pencil
                        onClick={() => {
                          setEditIndex(index);
                          setShowEditor(true);
                          setTitle(blog.title);
                          setShortDesc(blog.shortDesc);
                          setContent(blog.fullContent);
                          setAuthorName(blog.author);
                          setPostDate(blog.date);
                          setImage(blog.image);
                          setImagePreview(blog.image);
                        }}
                        className="cursor-pointer hover:text-blue-700"
                      />
                      <Eye
                        onClick={() => setViewBlog(blog)}
                        className="cursor-pointer hover:text-gray-700"
                      />
                      <Trash2
                        onClick={() => handleDelete(index)}
                        className="cursor-pointer hover:text-red-700"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MOBILE */}
          <div className="md:hidden space-y-4 mt-6">
            {filteredBlogs.map((blog, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow-sm border"
              >
                <div className="font-semibold mb-2 text-sm">{blog.title}</div>

                <div className="flex justify-between items-center text-sm">
                  <div>
                    <div className="font-medium">{blog.author}</div>
                    <div className="text-xs">{blog.date}</div>
                  </div>

                  <div className="flex gap-3">
                    <Pencil
                      onClick={() => {
                        setEditIndex(index);
                        setShowEditor(true);
                        setTitle(blog.title);
                        setShortDesc(blog.shortDesc);
                        setContent(blog.fullContent);
                        setAuthorName(blog.author);
                        setPostDate(blog.date);
                        setImage(blog.image);
                        setImagePreview(blog.image);
                      }}
                      className="cursor-pointer"
                    />
                    <Eye
                      onClick={() => setViewBlog(blog)}
                      className="cursor-pointer"
                    />
                    <Trash2
                      onClick={() => handleDelete(index)}
                      className="cursor-pointer text-red-700"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* POPUPS */}
        {showPopup && (
          <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50">
            {popupMessage}
          </div>
        )}

        {showDeletePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-80">
              <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
              <p className="mb-6">Are you sure you want to delete this blog?</p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeletePopup(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    setBlogList((prev) =>
                      prev.filter((_, i) => i !== deleteIndex)
                    );
                    setShowDeletePopup(false);
                    setDeleteIndex(null);
                    showPopupMessage("Blog Deleted Successfully!");
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW BLOG POPUP */}
        {viewBlog && (
          <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 w-[90%] md:w-[600px] max-h-[80vh] overflow-y-auto rounded-xl shadow-lg">

              <h2 className="text-xl font-bold mb-2">{viewBlog.title}</h2>

              {viewBlog.image && (
                <img
                  src={viewBlog.image}
                  className="w-full rounded-lg mb-4"
                />
              )}

              <p className="text-gray-600 mb-4">By {viewBlog.author}</p>
              <p className="mb-4">{viewBlog.fullContent}</p>

              <button
                onClick={() => setViewBlog(null)}
                className="mt-4 px-4 py-2 bg-black text-white rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;

 