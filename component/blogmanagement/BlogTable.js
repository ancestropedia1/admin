import { Pencil, Eye, Trash2 } from "lucide-react";

export default function BlogTable({ blogs, onEdit, onDelete, onView }) {
  return (
    <div className="hidden md:flex gap-6">

      {/* LEFT - Blog titles */}
      <div className="bg-white rounded-xl p-4 shadow-sm w-[300px] min-h-[380px]">
        <div className="bg-[#C6C1C1] p-3 rounded-lg mb-4 text-center font-semibold">
          Blogs
        </div>
        <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
          {blogs.map((blog) => (
            <div key={blog._id} className="p-3 rounded-lg shadow-sm text-sm">
              {blog.title}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT - Author, date, actions */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-12 bg-[#C6C1C1] p-3 rounded-lg mb-4 font-semibold">
          <div className="col-span-5">Author</div>
          <div className="col-span-4">Date</div>
          <div className="col-span-3 text-right">Action</div>
        </div>

        <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="grid grid-cols-12 items-center bg-white p-4 rounded-lg"
            >
              <div className="col-span-5">{blog.author}</div>
              <div className="col-span-4">{blog.date}</div>

              <div className="col-span-3 flex justify-end gap-4">
                <Pencil
                  size={16}
                  onClick={() => onEdit(blog)}
                  className="cursor-pointer hover:text-blue-700"
                />
                <Eye
                  size={16}
                  onClick={() => onView(blog)}
                  className="cursor-pointer hover:text-gray-700"
                />
                <Trash2
                  size={16}
                  onClick={() => onDelete(blog)}
                  className="cursor-pointer hover:text-red-700"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}