"use client";

import { useState } from "react";
import { X, User } from "lucide-react";
import { axiosInstance } from "@/config/axios";

export default function EditPersonModal({
  person,
  userId,
  onClose,
  onUpdate,
}) {
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    firstName: person?.firstName || "",
    lastName: person?.lastName || "",
    gender: person?.gender || "",
    birthDate: person?.birthDate || "",
    living:
      person?.living === true
        ? "true"
        : person?.living === false
        ? "false"
        : "",

    maritalStatus: person?.maritalStatus || "",
    childrenCount: person?.childrenCount ?? "",
    spouseCount: person?.spouseCount ?? "",

    birthCity: person?.birthCity || "",
    birthState: person?.birthState || "",
    birthCountry: person?.birthCountry || "",

    residenceCity: person?.residenceCity || "",
    residenceState: person?.residenceState || "",
    residenceCountry: person?.residenceCountry || "",

    occupation: person?.occupation || "",
    religion: person?.religion || "",
    community: person?.community || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // ✅ Clean payload for backend
      const payload = {
        ...form,
        living:
          form.living === ""
            ? undefined
            : form.living === "true",
        childrenCount:
          form.childrenCount === ""
            ? 0
            : Number(form.childrenCount),
        spouseCount:
          form.spouseCount === ""
            ? 0
            : Number(form.spouseCount),
      };

      const res = await axiosInstance.put(
        `/admin/person/${userId}`,
        payload
      );

      onUpdate?.(res.data.person);
      onClose?.();
    } catch (error) {
      console.error("Person update failed", error);
      alert(
        error?.response?.data?.message ||
          "Failed to update person ❌"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-3">
      <div className="bg-white w-full max-w-[520px] max-h-[90vh] overflow-y-auto rounded-lg p-4 shadow-md">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-semibold">
            Update Person Info
          </h2>

          <button onClick={onClose}>
            <X size={18} className="cursor-pointer" />
          </button>
        </div>

        {/* SECTION */}
        <div className="bg-gray-100 border rounded-lg p-3">
          <h3 className="text-green-700 text-sm font-semibold flex items-center gap-1 mb-3">
            <User size={14} />
            Person Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* BASIC */}
            <Input
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />

            <Input
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />

            <Select
              label="Gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
            />

            <Input
              label="Birth Date"
              name="birthDate"
              value={form.birthDate}
              onChange={handleChange}
              type="date"
            />

            <Select
              label="Living"
              name="living"
              value={form.living}
              onChange={handleChange}
              options={[
                { label: "Yes", value: "true" },
                { label: "No", value: "false" },
              ]}
            />

            <Input
              label="Marital Status"
              name="maritalStatus"
              value={form.maritalStatus}
              onChange={handleChange}
            />

            <Input
              label="Children Count"
              name="childrenCount"
              value={form.childrenCount}
              onChange={handleChange}
              type="number"
            />

            <Input
              label="Spouse Count"
              name="spouseCount"
              value={form.spouseCount}
              onChange={handleChange}
              type="number"
            />

            {/* BIRTH */}
            <Input
              label="Birth City"
              name="birthCity"
              value={form.birthCity}
              onChange={handleChange}
            />

            <Input
              label="Birth State"
              name="birthState"
              value={form.birthState}
              onChange={handleChange}
            />

            <Input
              label="Birth Country"
              name="birthCountry"
              value={form.birthCountry}
              onChange={handleChange}
            />

            {/* RESIDENCE */}
            <Input
              label="Residence City"
              name="residenceCity"
              value={form.residenceCity}
              onChange={handleChange}
            />

            <Input
              label="Residence State"
              name="residenceState"
              value={form.residenceState}
              onChange={handleChange}
            />

            <Input
              label="Residence Country"
              name="residenceCountry"
              value={form.residenceCountry}
              onChange={handleChange}
            />

            {/* OTHER */}
            <Input
              label="Occupation"
              name="occupation"
              value={form.occupation}
              onChange={handleChange}
            />

            <Input
              label="Religion"
              name="religion"
              value={form.religion}
              onChange={handleChange}
            />

            <Input
              label="Community"
              name="community"
              value={form.community}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-1.5 bg-yellow-400 rounded-md text-sm font-medium disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save →"}
          </button>

          <button
            onClick={onClose}
            disabled={saving}
            className="px-4 py-1.5 border rounded-md text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* INPUT */
function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>
      <label className="text-[11px] text-gray-500">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className="w-full border mt-1 p-1.5 rounded-md text-xs"
      />
    </div>
  );
}

/* SELECT */
function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="text-[11px] text-gray-500">
        {label}
      </label>

      <select
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className="w-full border mt-1 p-1.5 rounded-md text-xs"
      >
        <option value="">Select</option>

        {options ? (
          options.map((opt, i) => (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          ))
        ) : (
          <>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </>
        )}
      </select>
    </div>
  );
}