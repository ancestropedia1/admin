"use client";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axios";

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
  const [editId, setEditId] = useState(null);

  /* FETCH */
  const fetchLabs = async () => {
    try {
      const res = await axiosInstance.get("/api/labs");
      setLabs(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLabs();
  }, []);

  /* SUBMIT */
  const handleSubmit = async () => {
    try {
      if (!form.name) return alert("Lab name required");

      if (editId) {
        await axiosInstance.put(`/api/labs/${editId}`, form);
      } else {
        await axiosInstance.post("/api/labs", form);
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

      setEditId(null);
      fetchLabs();
    } catch (err) {
      console.error(err);
    }
  };

  /* DELETE */
  const handleDelete = async (id) => {
    await axiosInstance.delete(`/api/labs/${id}`);
    fetchLabs();
  };

  /* TOGGLE STATUS */
  const toggleStatus = async (id) => {
    await axiosInstance.patch(`/api/labs/${id}/toggle`);
    fetchLabs();
  };

  /* EDIT */
  const handleEdit = (lab) => {
    setForm(lab);
    setEditId(lab._id);
  };

  return (
    <div className="mt-6 space-y-6">

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl border shadow">
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit Lab" : "Add Lab"}
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input placeholder="Lab Name"
            className="border p-2"
            value={form.name}
            onChange={(e)=>setForm({...form,name:e.target.value})}
          />

          <input placeholder="Contact Person"
            className="border p-2"
            value={form.contactPerson}
            onChange={(e)=>setForm({...form,contactPerson:e.target.value})}
          />

          <input placeholder="Phone"
            className="border p-2"
            value={form.phone}
            onChange={(e)=>setForm({...form,phone:e.target.value})}
          />

          <input placeholder="Email"
            className="border p-2"
            value={form.email}
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />

          <input placeholder="Address"
            className="border p-2 col-span-2"
            value={form.address}
            onChange={(e)=>setForm({...form,address:e.target.value})}
          />

          <input placeholder="Category"
            className="border p-2"
            value={form.category}
            onChange={(e)=>setForm({...form,category:e.target.value})}
          />

          <input placeholder="DNA Price"
            className="border p-2"
            value={form.dnaPrice}
            onChange={(e)=>setForm({...form,dnaPrice:e.target.value})}
          />

        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update" : "Create"}
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-xl border shadow">
        <h2 className="text-xl font-semibold mb-4">Labs List</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th>Contact</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {labs.map((lab) => (
              <tr key={lab._id} className="border-t text-center">
                <td>{lab.name}</td>
                <td>{lab.contactPerson}</td>
                <td>{lab.phone}</td>

                <td>
                  <button
                    onClick={()=>toggleStatus(lab._id)}
                    className={`px-2 py-1 rounded ${
                      lab.active ? "bg-green-500" : "bg-red-500"
                    } text-white`}
                  >
                    {lab.active ? "Active" : "Inactive"}
                  </button>
                </td>

                <td className="space-x-2">
                  <button
                    onClick={()=>handleEdit(lab)}
                    className="bg-yellow-400 px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={()=>handleDelete(lab._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default LabsManagement;