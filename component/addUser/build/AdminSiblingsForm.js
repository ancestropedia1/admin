
"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users } from 'lucide-react';
import AdminDataForm from './AdminDataForm';

const AdminSiblingsForm = ({
  siblingsDetails,
  setSiblingsDetails,
  siblingsData,
  onNext,
  onBack
}) => {
  const [currentSiblingIndex, setCurrentSiblingIndex] = useState(0);
  const [currentSiblingData, setCurrentSiblingData] = useState({});

  // Initialize or load current sibling data
  useEffect(() => {
    if (siblingsDetails[currentSiblingIndex]) {
      setCurrentSiblingData(siblingsDetails[currentSiblingIndex]);
    } else {
      setCurrentSiblingData({
        firstName: "",
        lastName: "",
        birthDate: "",
        age: "",
        toDate: "Present",
        birthCity: "",
        residenceCity: "",
        profileImage: null,
        religion: "",
        category: "",
        caste: "",
        height: "",
        bodyType: "",
        skinTone: "",
        eyeColor: "",
        highestEducation: "",
        occupation: "",
        profession: "",
        living: true,
        siblingOrder: currentSiblingIndex + 1
      });
    }
  }, [currentSiblingIndex, siblingsDetails]);

  const totalSiblings = parseInt(siblingsData.totalSiblings) || 0;

  const handleSaveSibling = (siblingData) => {
    const updatedSiblings = [...siblingsDetails];
    
    if (currentSiblingIndex < updatedSiblings.length) {
      // Update existing sibling
      updatedSiblings[currentSiblingIndex] = { 
        ...siblingData, 
        siblingOrder: currentSiblingIndex + 1 
      };
    } else {
      // Add new sibling
      updatedSiblings.push({ 
        ...siblingData, 
        siblingOrder: currentSiblingIndex + 1 
      });
    }
    
    setSiblingsDetails(updatedSiblings);
    
    // Move to next sibling or finish
    if (currentSiblingIndex + 1 < totalSiblings) {
      setCurrentSiblingIndex(currentSiblingIndex + 1);
    } else {
      // All siblings added
      onNext();
    }
  };

  const handleBack = () => {
    if (currentSiblingIndex > 0) {
      setCurrentSiblingIndex(currentSiblingIndex - 1);
    } else {
      onBack();
    }
  };

  console.log("siblingsData:", siblingsData);
console.log("haveSiblings:", siblingsData?.haveSiblings);
console.log("totalSiblings (raw):", siblingsData?.totalSiblings);
console.log("totalSiblings (parsed):", totalSiblings);

  if (siblingsData.haveSiblings !== 'yes' || totalSiblings === 0) {
    return (
      <div className="w-full mx-auto p-6 bg-white rounded-lg">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center ml-4">
            <Users className="w-6 h-6 text-gray-700 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 font-['Playfair_Display']">
              Siblings Information
            </h2>
          </div>
        </div>
        
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">
            {siblingsData.haveSiblings === 'yes' 
              ? "You've chosen not to enter sibling details."
              : "No siblings to add."}
          </p>
          <button
            onClick={onNext}
            className="bg-[#FFC300] text-[#1E4838] font-semibold px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <AdminDataForm
      personalDetails={currentSiblingData}
      setPersonalDetails={setCurrentSiblingData}
      onBack={handleBack}
      onNext={handleSaveSibling}
      personType="sibling"
      title={`Sibling ${currentSiblingIndex + 1} of ${totalSiblings}`}
      extraFields={{
        showSiblingOrder: true,
        siblingOrder: currentSiblingIndex + 1
      }}
      contextMessage={
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Adding Sibling {currentSiblingIndex + 1} of {totalSiblings}:</strong> 
            {currentSiblingIndex + 1 < totalSiblings 
              ? ` After saving, you'll add sibling ${currentSiblingIndex + 2}.`
              : ' This is the last sibling.'}
          </p>
        </div>
      }
    />
  );
};

export default AdminSiblingsForm;