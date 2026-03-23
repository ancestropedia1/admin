export default function Attachments() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">

      <h3 className="font-semibold mb-3">
        Attachments
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <img src="https://picsum.photos/200" className="rounded" />
        <img src="https://picsum.photos/201" className="rounded" />
      </div>

    </div>
  );
}