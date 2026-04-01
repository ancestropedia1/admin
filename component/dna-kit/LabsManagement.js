"use client";
import { useState } from "react";

const LabsManagement = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    contactPerson: "",
    phone: "",
    email: "",
    category: "",
    dnaPrice: "",
    createdAt: "",
  });

  const [labs, setLabs] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  /* ADD / UPDATE */
  const handleSubmit = () => {
    if (!form.name) return alert("Lab name required");

    if (editIndex !== null) {
      const updated = [...labs];
      updated[editIndex] = {
        ...form,
        status: updated[editIndex].status,
      };
      setLabs(updated);
      setEditIndex(null);
    } else {
      setLabs((prev) => [
        ...prev,
        {
          ...form,
          status: "active",
          createdAt: form.createdAt || new Date(),
        },
      ]);
    }

    setForm({
      name: "",
      address: "",
      contactPerson: "",
      phone: "",
      email: "",
      category: "",
      dnaPrice: "",
      createdAt: "",
    });
  };

  /* HOLD / UNHOLD */
  const toggleStatus = (index) => {
    const updated = [...labs];
    updated[index].status =
      updated[index].status === "active" ? "hold" : "active";
    setLabs(updated);
  };

  /* EDIT */
  const handleEdit = (index) => {
    const lab = labs[index];
    setForm({
      ...lab,
      createdAt: lab.createdAt,
    });
    setEditIndex(index);
  };

  return (
    <div className="mt-6 space-y-6">

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl border shadow">
        <h2 className="text-xl font-semibold mb-4">
          {editIndex !== null ? "Edit Lab" : "Add Lab"}
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            placeholder="Lab Name"
            className="border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Contact Person"
            className="border p-2 rounded"
            value={form.contactPerson}
            onChange={(e) =>
              setForm({ ...form, contactPerson: e.target.value })
            }
          />

          <input
            placeholder="Phone Number"
            className="border p-2 rounded"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          {/* EMAIL */}
          <input
            placeholder="Email"
            type="email"
            className="border p-2 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* CATEGORY */}
          <select
            className="border p-2 rounded"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="">Select Category</option>
            <option value="DNA">DNA</option>
            <option value="Blood Test">Blood Test</option>
            <option value="Pathology">Pathology</option>
          </select>

          <input
            placeholder="DNA Price"
            type="number"
            className="border p-2 rounded"
            value={form.dnaPrice}
            onChange={(e) =>
              setForm({ ...form, dnaPrice: e.target.value })
            }
          />

          <input
            type="date"
            className="border p-2 rounded"
            value={
              form.createdAt
                ? new Date(form.createdAt).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              setForm({ ...form, createdAt: e.target.value })
            }
          />

          <input
            placeholder="Address"
            className="border p-2 rounded col-span-2"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-[#265A46] text-white px-6 py-2 rounded"
        >
          {editIndex !== null ? "Update Lab" : "Add Lab"}
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-xl border shadow">
        <h2 className="text-xl font-semibold mb-4">Labs List</h2>

        {labs.length === 0 ? (
          <p>No labs added yet</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th>Lab</th>
                <th>Email</th>
                <th>Category</th>
                <th>Phone</th>
                <th>Price</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {labs.map((lab, i) => (
                <tr key={i} className="border-t text-center">
                  <td>{lab.name}</td>
                  <td>{lab.email}</td>
                  <td>{lab.category}</td>
                  <td>{lab.phone}</td>
                  <td>₹ {lab.dnaPrice}</td>
                  <td>
                    {new Date(lab.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    {lab.status === "hold" ? "On Hold" : "Active"}
                  </td>

                  <td className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(i)}
                      className="bg-blue-200 px-2 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => toggleStatus(i)}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      {lab.status === "hold" ? "Unhold" : "Hold"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LabsManagement;