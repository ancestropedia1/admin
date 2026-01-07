"use client";

import { User } from "lucide-react";

export default function EditUserForm({ params }) {
  const { id } = params;

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[480px]">

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-center">Update Personal Info</h2>

        {/* ICON */}
        <div className="flex justify-center my-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <User size={28} />
          </div>
        </div>

        {/* FORM */}
        <div className="space-y-5">

          {/* Location */}
          <div>
            <label className="text-sm font-medium">Current Location</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="e.g. Noida, UP, India"
            />
          </div>

          {/* DOB / TO */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Date of Birth</label>
              <input type="date" className="w-full border p-2 rounded" />
            </div>

            <div>
              <label className="text-sm font-medium">To</label>
              <input type="text" className="w-full border p-2 rounded" placeholder="Present" />
            </div>
          </div>

          {/* Age / Religion */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Age</label>
              <input type="text" className="w-full border p-2 rounded" />
            </div>

            <div>
              <label className="text-sm font-medium">Religion</label>
              <select className="w-full border p-2 rounded">
                <option>Select religion</option>
                <option>Hinduism</option>
                <option>Muslim</option>
                <option>Sikh</option>
              </select>
            </div>
          </div>

          {/* Height / Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Height</label>
              <select className="w-full border p-2 rounded">
                <option>Select height</option>
                <option>5.0 – 5.5 ft</option>
                <option>5.5 – 6.0 ft</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Category</label>
              <select className="w-full border p-2 rounded">
                <option>Select category</option>
              </select>
            </div>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex justify-between mt-6">
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Save Changes
          </button>

          <button
            onClick={() => history.back()}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
