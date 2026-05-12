"use client";

import { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axios.js";
import { Playfair_Display, Lato } from "next/font/google";

import BlogEditor     from "./BlogEditor";
import BlogFilters    from "./BlogFilters";
import BlogTable      from "./BlogTable";
import BlogMobileList from "./BlogMobileList";
import BlogViewPopup  from "./BlogViewPopup";
import BlogDeletePopup from "./BlogDeletePopup";
import BlogPopupToast from "./BlogPopupToast";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export default function BlogManagement() {
  const [blogList,       setBlogList]       = useState([]);
  const [showEditor,     setShowEditor]     = useState(false);
  const [editBlog,       setEditBlog]       = useState(null); // ✅ FIX: store full blog object not index
  const [viewBlog,       setViewBlog]       = useState(null);
  const [deleteTarget,   setDeleteTarget]   = useState(null); // ✅ FIX: store blog object not index
  const [showDeletePopup,setShowDeletePopup]= useState(false);
  const [popupMessage,   setPopupMessage]   = useState("");
  const [showPopup,      setShowPopup]      = useState(false);
  const [searchQuery,    setSearchQuery]    = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [showFeatured,   setShowFeatured]   = useState(false);
  const [postDate,       setPostDate]       = useState("");

  const showToast = (msg) => {
    setPopupMessage(msg);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);
  };

  const fetchBlogs = async () => {
    try {
      const res = await axiosInstance.get("/admin/blog/myBlogs");
      const blogsArray = res.data.data;
      if (!Array.isArray(blogsArray)) return;

      const formatted = blogsArray.map((blog) => ({
        _id:         blog._id,
        title:       blog.title,
        shortDesc:   blog.description?.slice(0, 100),
        author:      blog.author || "Admin",
        date:        blog.createdAt
                       ? new Date(blog.createdAt).toLocaleDateString()
                       : "",
        fullContent: blog.description,
        featured:    blog.featured || false,
        // ✅ FIX: was blog.image — correct field is imageUrl
        imageUrl:    blog.imageUrl || null,
      }));

      setBlogList(formatted);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEdit = (blog) => {
    // ✅ FIX: store full blog object for editing
    setEditBlog(blog);
    setShowEditor(true);
  };

  const handleDeleteClick = (blog) => {
    // ✅ FIX: store blog object not array index
    setDeleteTarget(blog);
    setShowDeletePopup(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget?._id) return;
    try {
      await axiosInstance.delete("/admin/blog/remove", {
        params: { blogId: deleteTarget._id },
      });
      await fetchBlogs();
      setShowDeletePopup(false);
      setDeleteTarget(null);
      showToast("Blog deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      showToast("Failed to delete blog");
    }
  };

  const handleEditorSuccess = async () => {
    await fetchBlogs();
    setShowEditor(false);
    setEditBlog(null);
    showToast(editBlog ? "Blog updated!" : "Blog created!");
  };

  const filteredBlogs = blogList.filter((b) => {
    const matchesAuthor   = selectedAuthor ? b.author === selectedAuthor : true;
    const matchesSearch   = !searchQuery ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFeatured = showFeatured ? b.featured === true : true;
    const matchesDate     = postDate
      ? b.date === new Date(postDate).toLocaleDateString()
      : true;
    return matchesAuthor && matchesSearch && matchesFeatured && matchesDate;
  });

  const allAuthors = Array.from(new Set(blogList.map((b) => b.author)));

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-[1200px] mx-auto p-4 sm:p-6 md:p-10">

        {/* HEADER */}
        <div className="bg-[#F6F1E9] border border-[#faead2] p-8 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className={`${playfair.className} text-4xl font-extrabold`}>
                Blog Management
              </h1>
              <p className={`${lato.className} text-base md:text-lg mt-3`}>
                Create and manage Ancestropedia blog posts.
              </p>
            </div>

            <button
              onClick={() => { setEditBlog(null); setShowEditor(true); }}
              className="bg-[#265A46] text-white px-8 py-3 rounded-xl shadow-md"
            >
              + Add Blog
            </button>
          </div>

          {/* EDITOR */}
          {showEditor && (
            <BlogEditor
              editBlog={editBlog}
              onSuccess={handleEditorSuccess}
              onCancel={() => { setShowEditor(false); setEditBlog(null); }}
              showToast={showToast}
            />
          )}
        </div>

        {/* FILTERS */}
        <BlogFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedAuthor={selectedAuthor}
          setSelectedAuthor={setSelectedAuthor}
          showFeatured={showFeatured}
          setShowFeatured={setShowFeatured}
          postDate={postDate}
          setPostDate={setPostDate}
          allAuthors={allAuthors}
        />

        {/* BLOG LIST */}
        <div className="mt-10 p-6 bg-[#F6F1E9] rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Active Blogs</h2>

          {/* DESKTOP */}
          <BlogTable
            blogs={filteredBlogs}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onView={setViewBlog}
          />

          {/* MOBILE */}
          <BlogMobileList
            blogs={filteredBlogs}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onView={setViewBlog}
          />
        </div>

        {/* MODALS & TOAST */}
        <BlogPopupToast show={showPopup} message={popupMessage} />

        <BlogDeletePopup
          show={showDeletePopup}
          blog={deleteTarget}
          onConfirm={handleDeleteConfirm}
          onCancel={() => { setShowDeletePopup(false); setDeleteTarget(null); }}
        />

        {viewBlog && (
          <BlogViewPopup
            blog={viewBlog}
            onClose={() => setViewBlog(null)}
          />
        )}
      </div>
    </div>
  );
}