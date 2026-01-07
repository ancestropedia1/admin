
"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Baby, Users } from 'lucide-react';
import AdminDataForm from './AdminDataForm';

const AdminKidsForm = ({
  kidsDetails,
  setKidsDetails,
  maritalData,
  onNext,
  onBack
}) => {
  const [currentKidIndex, setCurrentKidIndex] = useState(0);
  const [currentKidData, setCurrentKidData] = useState({});

  // Initialize or load current kid data
  useEffect(() => {
    if (kidsDetails[currentKidIndex]) {
      setCurrentKidData(kidsDetails[currentKidIndex]);
    } else {
      setCurrentKidData({
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
        isAlive: true,
        birthOrder: currentKidIndex + 1
      });
    }
  }, [currentKidIndex, kidsDetails]);

  const totalKids = parseInt(maritalData.totalKids) || 0;

  const handleSaveKid = (kidData) => {
    const updatedKids = [...kidsDetails];
    
    if (currentKidIndex < updatedKids.length) {
      // Update existing kid
      updatedKids[currentKidIndex] = { ...kidData, birthOrder: currentKidIndex + 1 };
    } else {
      // Add new kid
      updatedKids.push({ ...kidData, birthOrder: currentKidIndex + 1 });
    }
    
    setKidsDetails(updatedKids);
    
    // Move to next kid or finish
    if (currentKidIndex + 1 < totalKids) {
      setCurrentKidIndex(currentKidIndex + 1);
    } else {
      // All kids added
      onNext();
    }
  };

  const handleBack = () => {
    if (currentKidIndex > 0) {
      setCurrentKidIndex(currentKidIndex - 1);
    } else {
      onBack();
    }
  };

  if (totalKids === 0) {
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
            <Baby className="w-6 h-6 text-gray-700 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 font-['Playfair_Display']">
              Children Information
            </h2>
          </div>
        </div>
        
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No children to add.</p>
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
      personalDetails={currentKidData}
      setPersonalDetails={setCurrentKidData}
      onBack={handleBack}
      onNext={handleSaveKid}
      personType="child"
      title={`Child ${currentKidIndex + 1} of ${totalKids}`}
      extraFields={{
        showBirthOrder: true,
        birthOrder: currentKidIndex + 1
      }}
      contextMessage={
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Adding Child {currentKidIndex + 1} of {totalKids}:</strong> 
            {currentKidIndex + 1 < totalKids 
              ? ` After saving, you'll add child ${currentKidIndex + 2}.`
              : ' This is the last child.'}
          </p>
        </div>
      }
    />
  );
};

export default AdminKidsForm;