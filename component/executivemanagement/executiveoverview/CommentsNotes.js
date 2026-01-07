export default function CommentsNotes() {
  return (
    <div className="bg-white rounded-xl mt-8 border p-6">
      <h4 className="font-semibold mb-3">Comments & Notes</h4>

      <textarea
        placeholder="Add notes about this executive performance..."
        className="w-full border rounded p-3"
        rows={4}
      />

      <button className="mt-3 bg-[#265A46] text-white px-4 py-2 rounded">
        + Add Comment
      </button>

      <div className="mt-5 border-t pt-4 text-sm">
        <p className="font-medium">Divyanshu Bansal (Admin)</p>
        <p className="text-gray-600">
          Excellent performance this month. Consistently delivered quality
          work.
        </p>
        <p className="text-xs text-gray-400 mt-1">21st Oct 2024</p>
      </div>
    </div>
  );
}
