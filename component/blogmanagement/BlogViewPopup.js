export default function BlogViewPopup({ blog, onClose }) {
  if (!blog) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-[90%] md:w-[600px] max-h-[80vh] overflow-y-auto rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>

        {blog.imageUrl && (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full rounded-lg mb-4 object-cover"
          />
        )}

        <p className="text-gray-600 mb-4">By {blog.author}</p>
        <p className="mb-4 leading-7">{blog.fullContent}</p>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-black text-white rounded-xl"
        >
          Close
        </button>
      </div>
    </div>
  );
}