"use client";
import { useState, useRef } from "react";
import React from "react";
import { Lato, Playfair_Display } from "next/font/google";
import {
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  Search,
  CalendarDays,
  Eye,
} from "lucide-react";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((m) => m.Editor),
  { ssr: false }
);

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const BlogManagement = () => {
  const [showEditor, setShowEditor] = useState(false);
  const editorRef = useRef(null);

  const [authorName, setAuthorName] = useState("");

  const [showAuthorFilter, setShowAuthorFilter] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [postDate, setPostDate] = useState("");
  const [showDateInput, setShowDateInput] = useState(false);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [showFeatured, setShowFeatured] = useState(false);

  const [viewBlog, setViewBlog] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const showPopupMessage = (msg) => {
    setPopupMessage(msg);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);
  };

  const [blogList, setBlogList] = useState([
    {
      title:
        "Unlocking the Secrets: Understanding Hereditary Traits and Genetic Inheritance",
      author: "Dr. Anant Narayan",
      date: "Kanpur",
      fullContent:
        "Unlocking the Secrets: Understanding Hereditary Traits and Genetic Inheritance",
      featured: false,
    },
    {
      title:
        "Exploring Ancestral Trails: How DNA Analysis Illuminates Migration Footprints",
      author: "Dr. Rajesh Chaudhary",
      date: "Female",
      fullContent:
        "Exploring Ancestral Trails: How DNA Analysis Illuminates Migration Footprints",
      featured: false,
    },
    {
      title:
        "Family Tree Connection: Exploring the Bonds of Kinship and Heritage",
      author: "Balram Chaurasia",
      date: "Lucknow",
      fullContent:
        "Family Tree Connection: Exploring the Bonds of Kinship and Heritage",
      featured: false,
    },
    {
      title: "A Canvas of Kin: Crafting Family Tree Wall Art",
      author: "Anuj Bharti",
      date: "Gorakhpur",
      fullContent: "A Canvas of Kin: Crafting Family Tree Wall Art",
      featured: false,
    },
  ]);

  const openEditor = () => {
    setShowEditor(true);
    setEditIndex(null);
    editorRef.current?.setContent("");
  };

  const submitBlog = () => {
    const content = editorRef.current?.getContent();

    if (!content) {
      showPopupMessage("Please write something in the editor.");
      return;
    }

    if (!authorName.trim()) {
      showPopupMessage("Please enter author name.");
      return;
    }

    if (editIndex !== null) {
      setBlogList((prev) => {
        const updated = [...prev];
        updated[editIndex] = {
          ...updated[editIndex],
          title: content.replace(/<[^>]+>/g, "").slice(0, 60),
          date: postDate || updated[editIndex].date,
          author: authorName,
          fullContent: content,
        };
        return updated;
      });

      showPopupMessage("Blog Updated Successfully!");
      setEditIndex(null);
      setShowEditor(false);
      setAuthorName("");
      return;
    }

    setBlogList((prev) => [
      ...prev,
      {
        title: content.replace(/<[^>]+>/g, "").slice(0, 60),
        author: authorName,
        date: postDate || new Date().toLocaleDateString(),
        fullContent: content,
        featured: false,
      },
    ]);

    showPopupMessage("Blog Added Successfully!");
    setShowEditor(false);
    editorRef.current?.setContent("");
    setAuthorName("");
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setShowDeletePopup(true);
  };

  const filteredBlogs = blogList.filter((b) => {
    const matchesAuthor = selectedAuthor ? b.author === selectedAuthor : true;
    const matchesSearch = searchQuery
      ? b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesFeatured = showFeatured ? b.featured === true : true;
    return matchesAuthor && matchesSearch && matchesFeatured;
  });

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-[1200px] mx-auto p-4 sm:p-6 md:p-10">
        {/* ---------------------------------- HEADER ---------------------------------- */}
        <div className="bg-[#F6F1E9] border mt-1 border-[#faead2] p-8 rounded-xl shadow-sm w-full min-h-[208px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <h1
                className={`${playfair.className} text-4xl font-extrabold text-gray-800`}
              >
                Blog Management
              </h1>

              <p
                className={`${lato.className} text-base md:text-lg text-gray-600 mt-3 max-w-lg`}
              >
                Craft compelling Ancestropedia blog posts, refine existing
                content, and efficiently oversee all blog-related activities.
              </p>
            </div>

            <button
              onClick={openEditor}
              className="bg-[#265A46] text-white px-8 md:px-10 py-3 rounded-xl hover:bg-green-700 transition font-semibold shadow-md"
            >
              + Add Blog
            </button>
          </div>

          {showEditor && (
            <div className="mt-6">
              <Editor
                apiKey="x0o6bi86noch9cea3qdiijyvunopbtkxq4snsexlo60x1qkn"
                onInit={(_, editor) => (editorRef.current = editor)}
                init={{
                  height: 400,
                  menubar: true,
                  resize: false,
                }}
              />

              <input
                type="text"
                placeholder="Enter Author Name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full mt-3 p-3 border border-gray-400 rounded-lg"
              />

              <div className="flex gap-3 items-center mt-3">
                <input
                  type="text"
                  placeholder="Post Date (optional)"
                  value={postDate}
                  onChange={(e) => setPostDate(e.target.value)}
                  className="p-2 border rounded w-40"
                />
                <button
                  onClick={submitBlog}
                  className="bg-black text-white px-6 py-2 rounded-lg shadow-md"
                >
                  Submit Blog
                </button>
                <button
                  onClick={() => {
                    setShowEditor(false);
                    setEditIndex(null);
                    editorRef.current?.setContent("");
                    setAuthorName("");
                  }}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ----------------------------- RESPONSIVE FILTERS ----------------------------- */}
        <div className="bg-[#F6F1E9] border border-gray-300 p-4 rounded-xl shadow mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {/* Date Filter */}
            <div className="relative">
              <button
                onClick={() => setShowDateInput(!showDateInput)}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm text-sm"
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
                  className="absolute mt-2 left-0 border p-2 rounded-lg bg-white shadow-md w-full z-20"
                />
              )}
            </div>

            {/* Author Filter */}
            <div className="relative">
              <button
                onClick={() => setShowAuthorFilter(!showAuthorFilter)}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm text-sm"
              >
                {selectedAuthor || "By Author"}
                <ChevronDown
                  size={18}
                  className={`${showAuthorFilter ? "rotate-180" : ""}`}
                />
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

            {/* Featured */}
            <button
              onClick={() => setShowFeatured(!showFeatured)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm text-sm ${
                showFeatured ? "bg-[#265A46] text-white" : "bg-white"
              }`}
            >
              Featured
              <ChevronDown
                size={18}
                className={`${showFeatured ? "rotate-180 text-white" : ""}`}
              />
            </button>
          </div>

          {/* Search */}
          <div className="flex bg-white rounded-lg px-3 py-2 shadow-sm w-full md:w-1/3">
            <Search className="text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search blog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ml-2 outline-none text-sm"
            />
          </div>
        </div>

        {/* ------------------------- ACTIVE BLOGS SECTION ------------------------- */}
        <div className="mt-10 p-6 bg-[#F6F1E9] rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Active Blogs
          </h2>

          {/* Desktop */}
          <div className="hidden md:flex gap-6 items-start">
            <div className="bg-white rounded-xl p-4 shadow-sm w-[300px] min-h-[380px]">
              <div className="bg-[#C6C1C1] text-gray-700 font-semibold p-3 rounded-lg mb-4 text-center">
                Blogs
              </div>

              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
                {filteredBlogs.map((blog, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg text-gray-800 shadow-sm text-sm"
                  >
                    {blog.title}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 flex-1 min-h-[380px]">
              <div className="grid grid-cols-12 font-semibold text-gray-700 bg-[#C6C1C1] p-3 rounded-lg mb-4">
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
                          editorRef.current?.setContent(blog.fullContent);
                          setAuthorName(blog.author);
                          setPostDate(blog.date);
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

          {/* Mobile */}
          <div className="md:hidden space-y-4">
            {filteredBlogs.map((blog, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow-sm border border-[#E5DCC5]"
              >
                <div className="grid grid-cols-1 gap-2">
                  <div className="bg-[#D6CFBF] p-2 rounded-md text-sm font-semibold text-gray-700 mb-3">
                    Blogs
                  </div>

                  <div className="font-semibold mb-2 text-sm">
                    {blog.title}
                  </div>

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
                          editorRef.current?.setContent(blog.fullContent);
                          setAuthorName(blog.author);
                          setPostDate(blog.date);
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
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success popup */}
        {showPopup && (
          <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50">
            {popupMessage}
          </div>
        )}

        {/* Delete Confirmation */}
        {showDeletePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80">
              <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>

              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this blog?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeletePopup(false)}
                  className="px-4 py-2 rounded-md bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    setBlogList((prev) =>
                      prev.filter((_, i) => i !== deleteIndex)
                    );
                    setShowDeletePopup(false);
                    showPopupMessage("Blog Deleted Successfully!");
                    setDeleteIndex(null);
                  }}
                  className="px-4 py-2 rounded-md bg-red-600 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Blog Popup */}
        {viewBlog && (
          <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 w-[90%] md:w-[600px] max-h-[80vh] overflow-y-auto rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-2">{viewBlog.title}</h2>
              <p className="text-gray-600 mb-4">By {viewBlog.author}</p>

              <div
                dangerouslySetInnerHTML={{ __html: viewBlog.fullContent }}
                className="prose"
              ></div>

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
