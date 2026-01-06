
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

const AdminMaritalForm = ({
  maritalData,
  setMaritalData,
  setAddSpouse,
  setAddKids,
  onNext,
  onBack
}) => {
  const [formData, setFormData] = useState({
    status: maritalData.status || "",
    haveKids: maritalData.haveKids || "",
    totalKids: maritalData.totalKids || "",
  });

  const maritalStatusRef = useRef(null);
  const haveKidsRef = useRef(null);
  const totalKidsRef = useRef(null);

  const [showMaritalStatus, setShowMaritalStatus] = useState(false);
  const [showHaveKids, setShowHaveKids] = useState(false);
  const [showTotalKids, setShowTotalKids] = useState(false);

  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (maritalStatusRef.current && !maritalStatusRef.current.contains(event.target)) {
        setShowMaritalStatus(false);
      }
      if (haveKidsRef.current && !haveKidsRef.current.contains(event.target)) {
        setShowHaveKids(false);
      }
      if (totalKidsRef.current && !totalKidsRef.current.contains(event.target)) {
        setShowTotalKids(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to parent state
    setMaritalData(formData);
    
    // Determine next step
    if (formData.status ) {
      setAddSpouse(true);
    } else if (formData.haveKids === 'yes') {
      setAddKids(true);
    } else {
      onNext();
    }
  };

  const isValid = () => {
    if (!formData.status) return false;
    if (!formData.haveKids) return false;
    if (formData.haveKids === 'yes' && !formData.totalKids) return false;
    return true;
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 rounded-lg shadow-md space-y-6 bg-[#FDFCFB] border border-[#919191]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <ArrowLeft
          className="cursor-pointer"
          onClick={onBack}
        />
        <h2 className="text-xl font-bold text-[#4F4F4F] font-['Playfair_Display']">
          Marital Status
        </h2>
      </div>

      {/* Admin Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
        <p className="text-sm">
          <strong>Admin Note:</strong> As an admin, you can directly enter all details. No proof or verification required.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Marital Status Dropdown */}
        <div className="relative w-full" ref={maritalStatusRef}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marital Status *
          </label>
          <button
            type="button"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left bg-white flex justify-between items-center hover:border-blue-500"
            onClick={() => setShowMaritalStatus(!showMaritalStatus)}
          >
            <span className={formData.status ? "text-gray-900 capitalize" : "text-gray-400"}>
              {formData.status ? formData.status : "Select Marital Status"}
            </span>
            <span>▼</span>
          </button>
          {showMaritalStatus && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              {[ 'married', 'divorced', 'widowed'].map((status) => (
                <div
                  key={status}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer capitalize"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, status }));
                    setShowMaritalStatus(false);
                  }}
                >
                  {status}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Have Kids Dropdown */}
        <div className="relative w-full" ref={haveKidsRef}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Do you have children? *
          </label>
          <button
            type="button"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left bg-white flex justify-between items-center hover:border-blue-500"
            onClick={() => setShowHaveKids(!showHaveKids)}
          >
            <span className={formData.haveKids ? "text-gray-900 capitalize" : "text-gray-400"}>
              {formData.haveKids ? formData.haveKids : "Select"}
            </span>
            <span>▼</span>
          </button>
          {showHaveKids && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              {['yes', 'no'].map((option) => (
                <div
                  key={option}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer capitalize"
                  onClick={() => {
                    setFormData(prev => ({ 
                      ...prev, 
                      haveKids: option,
                      totalKids: option === 'no' ? '' : prev.totalKids
                    }));
                    setShowHaveKids(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total Kids Dropdown (only if haveKids = yes) */}
        {formData.haveKids === 'yes' && (
          <div className="relative w-full" ref={totalKidsRef}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How many children? *
            </label>
            <button
              type="button"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left bg-white flex justify-between items-center hover:border-blue-500"
              onClick={() => setShowTotalKids(!showTotalKids)}
            >
              <span className={formData.totalKids ? "text-gray-900" : "text-gray-400"}>
                {formData.totalKids || "Select number"}
              </span>
              <span>▼</span>
            </button>
            {showTotalKids && (
              <div className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg">
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                  <div
                    key={num}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, totalKids: num }));
                      setShowTotalKids(false);
                    }}
                  >
                    {num}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Admin always enters details - no checkbox needed */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            As an admin, you will enter spouse and children details directly.
          </p>
        </div>
      </div>

      {/* Next Steps Info */}
      {(formData.status ) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Next:</strong> You ll enter spouse information on the next screen.
          </p>
        </div>
      )}

      {formData.status && formData.haveKids === 'yes' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Next:</strong> You ll enter children information on the next screen.
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        
        <button
          type="submit"
          className={`bg-[#FFC300] text-[#1E4838] font-semibold px-8 py-3 rounded flex items-center gap-2 hover:bg-yellow-500 transition-colors ${
            !isValid() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isValid()}
        >
          Continue
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="26"
            viewBox="0 0 27 26"
            fill="none"
          >
            <path
              d="M17.7677 14.0859H4.57812V11.9193H17.7677L11.701 5.8526L13.2448 4.33594L21.9115 13.0026L13.2448 21.6693L11.701 20.1526L17.7677 14.0859Z"
              fill="#1E4838"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default AdminMaritalForm;