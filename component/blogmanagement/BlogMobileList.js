import { Pencil, Eye, Trash2 } from "lucide-react";

export default function BlogMobileList({ blogs, onEdit, onDelete, onView }) {
  return (
    <div className="md:hidden space-y-4 mt-6">
      {blogs.map((blog) => (
        <div key={blog._id} className="bg-white rounded-xl p-4 shadow-sm border">
          <div className="font-semibold mb-2 text-sm">{blog.title}</div>

          <div className="flex justify-between items-center text-sm">
            <div>
              <div className="font-medium">{blog.author}</div>
              <div className="text-xs">{blog.date}</div>
            </div>

            <div className="flex gap-3">
              <Pencil size={16} onClick={() => onEdit(blog)} className="cursor-pointer" />
              <Eye    size={16} onClick={() => onView(blog)} className="cursor-pointer" />
              <Trash2 size={16} onClick={() => onDelete(blog)} className="cursor-pointer text-red-700" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}