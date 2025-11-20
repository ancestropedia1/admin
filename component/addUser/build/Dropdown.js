"use client";

import { useState } from "react";

export default function Dropdown({ label, options = [], placeholder, onChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSelect = (option) => {
    setSelected(option.name);
    setOpen(false);
    if (onChange) onChange(option.name);
  };

  return (
    <div className="relative w-full">
      {/* LABEL */}
      {label && (
        <label className="block mb-1 font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* SELECT BOX */}
      <div
        className="w-full bg-white border rounded-md p-2 flex justify-between items-center cursor-pointer focus:ring focus:ring-green-200"
        onClick={() => setOpen(!open)}
      >
        <span className="text-gray-700">
          {selected || placeholder || "Select option"}
        </span>
        <span className="text-gray-500">▼</span>
      </div>

      {/* OPTIONS LIST */}
      {open && (
        <div className="absolute left-0 right-0 bg-white border rounded-md shadow-md mt-1 z-20 max-h-52 overflow-y-auto">
          {options.length > 0 ? (
            options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {option.name}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-400">No options</div>
          )}
        </div>
      )}
    </div>
  );
}
