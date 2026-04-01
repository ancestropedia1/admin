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
  });

  const [labs, setLabs] = useState([]);
  const [editId, setEditId] = useState(null);

  /* FETCH */
  const fetchLabs = async () => {
    try {
      const res = await axiosInstance.get("/api/labs");
      setLabs(res.data.data);
    } catch (err) {
      console.error("FETCH ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchLabs();
  }, []);

  /* SUBMIT */
  const handleSubmit = async () => {
    try {
      if (!form.name) {
        alert("Lab name required");
        return;
      }

      if (editId) {
        await axiosInstance.put(`/api/labs/${editId}`, form);
      } else {
        await axiosInstance.post("/api/labs", form);
      }

      // reset form
      setForm({
        name: "",
        address: "",
        contactPerson: "",
        phone: "",
        email: "",
        category: "",
        dnaPrice: "",
      });

      setEditId(null);
      fetchLabs();

    } catch (err) {
      console.error("SUBMIT ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  /* DELETE */
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/labs/${id}`);
      fetchLabs();
    } catch (err) {
      console.error("DELETE ERROR:", err.response?.data || err.message);
    }
  };

  /* TOGGLE STATUS */
  const toggleStatus = async (id) => {
    try {
      await axiosInstance.patch(`/api/labs/${id}/toggle`);
      fetchLabs();
    } catch (err) {
      console.error("TOGGLE ERROR:", err.response?.data || err.message);
    }
  };

  /* EDIT */
  const handleEdit = (lab) => {
    const { _id, ...rest } = lab; // ✅ remove _id
    setForm(rest);
    setEditId(_id);
  };

  return (
    <div className="mt-6 space-y-6">

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl border shadow">
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit Lab" : "Add Lab"}
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            placeholder="Lab Name"
            className="border p-2"
            value={form.name}
            onChange={(e)=>setForm({...form,name:e.target.value})}
          />

          <input
            placeholder="Contact Person"
            className="border p-2"
            value={form.contactPerson}
            onChange={(e)=>setForm({...form,contactPerson:e.target.value})}
          />

          <input
            placeholder="Phone"
            className="border p-2"
            value={form.phone}
            onChange={(e)=>setForm({...form,phone:e.target.value})}
          />

          <input
            placeholder="Email"
            className="border p-2"
            value={form.email}
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />

          <input
            placeholder="Address"
            className="border p-2 col-span-2"
            value={form.address}
            onChange={(e)=>setForm({...form,address:e.target.value})}
          />

          {/* CATEGORY DROPDOWN (fix enum issue) */}
          <select
            className="border p-2"
            value={form.category}
            onChange={(e)=>setForm({...form,category:e.target.value})}
          >
            <option value="">Select Category</option>
            <option value="DNA">DNA</option>
            <option value="Blood Test">Blood Test</option>
            <option value="Pathology">Pathology</option>
          </select>

          <input
            placeholder="DNA Price"
            type="number"
            className="border p-2"
            value={form.dnaPrice}
            onChange={(e)=>setForm({...form,dnaPrice:e.target.value})}
          />

        </div>

        <button
          type="button"  // ✅ important
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
                      lab.status === "active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    } text-white`}
                  >
                    {lab.status === "active" ? "Active" : "Hold"}
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