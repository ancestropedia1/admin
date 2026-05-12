export default function BlogPopupToast({ show, message }) {
  if (!show) return null;

  return (
    <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50">
      {message}
    </div>
  );
}