export default function BlogDeletePopup({ show, blog, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="bg-white p-6 rounded-xl w-80">
        <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
        <p className="mb-2 text-sm text-gray-600">
          Are you sure you want to delete:
        </p>
        <p className="font-medium mb-6">"{blog?.title}"</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}