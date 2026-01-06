// Update the AdminComplete.js to use separate forms
"use client";

import React, { useState } from 'react';
import AdminStepper from './AdminStepper';
import AdminDataForm from './AdminDataForm';
import AdminMaritalForm from './AdminMaritalForm';
import AdminSpouseForm from './AdminSpouseForm';
import AdminKidsForm from './AdminKidsForm';
import AdminSiblingsForm from './AdminSiblingsForm';
import AdminBuilding from './AdminBuilding';
import { ArrowLeft } from 'lucide-react';

const AdminComplete = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showBuilding, setShowBuilding] = useState(false);
  
  // All form states
  const [personalDetails, setPersonalDetails] = useState(() => ({
    firstName: "",
    lastName: "",
    occupation: "",
    birthDate: "",
    age: "",
    toDate: "Present",
    birthCity: "",
    birthState: "",
    birthCountry: "",
    residenceCity: "",
    residenceState: "",
    residenceCountry: "",
    profileImage: null,
    religion: "",
    category: "",
    caste: "",
    height: "",
    weight: "",
    eyeColor: "",
    highestEducation: "",
    profession: "",
    email: "",
    phone: "",
    living: true,
    bodyType: "",
    skinTone: ""
  }));

  const [fatherDetails, setFatherDetails] = useState(() => ({
    firstName: "",
    lastName: "",
    occupation: "",
    birthDate: "",
    age: "",
    toDate: "Present",
    birthCity: "",
    birthState: "",
    birthCountry: "",
    residenceCity: "",
    residenceState: "",
    residenceCountry: "",
    profileImage: null,
    living: true
  }));

  const [motherDetails, setMotherDetails] = useState(() => ({
    firstName: "",
    lastName: "",
    occupation: "",
    birthDate: "",
    age: "",
    toDate: "Present",
    birthCity: "",
    birthState: "",
    birthCountry: "",
    residenceCity: "",
    residenceState: "",
    residenceCountry: "",
    profileImage: null,
    living: true,
  }));

  const [maritalData, setMaritalData] = useState({
    status: "",
    haveKids: "",
    totalKids: "",
    marriageDate: "",
    divorceDate: "",
  });

  const [spouseDetails, setSpouseDetails] = useState({
    firstName: "",
    lastName: "",
    occupation: "",
    birthDate: "",
    age: "",
    toDate: "Present",
    birthCity: "",
    birthState: "",
    birthCountry: "",
    residenceCity: "",
    residenceState: "",
    residenceCountry: "",
    profileImage: null,
    marriageDate: "",
    divorceDate: "",
    living: true,
    bodyType: "",
    skinTone: "",
    height: "",
    eyeColor: "",
    religion: "",
    category: "",
    caste: "",
    highestEducation: "",
    profession: ""
  });

  const [siblingsData, setSiblingsData] = useState({
    haveSiblings: "",
    totalSiblings: "",
    enterDetails: true
  });

  const [kidsDetails, setKidsDetails] = useState([]);
  const [siblingsDetails, setSiblingsDetails] = useState([]);

  // Flow control states
  const [addSpouse, setAddSpouse] = useState(false);
  const [addKids, setAddKids] = useState(false);
  const [addSiblings, setAddSiblings] = useState(false);

  // Validation checks
  const personalCompleted = personalDetails.firstName && personalDetails.lastName && 
                           personalDetails.birthDate;
  
  const fatherCompleted = fatherDetails.firstName && fatherDetails.lastName;
  const motherCompleted = motherDetails.firstName && motherDetails.lastName;

  const maritalCompleted = maritalData.status && maritalData.haveKids;
  const siblingsCompleted = siblingsData.haveSiblings;

  const stepsCompleted = [
    personalCompleted,
    fatherCompleted,
    motherCompleted,
    maritalCompleted,
    siblingsCompleted
  ];

  // All data combined for final submission
  const completeData = {
    personalDetails,
    fatherDetails,
    motherDetails,
    maritalData,
    spouseDetails,
    siblingsData,
    kidsDetails,
    siblingsDetails
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowBuilding(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      // Reset sub-states when going back
      if (currentStep === 3) {
        setAddSpouse(false);
        setAddKids(false);
      }
      if (currentStep === 4) {
        setAddSiblings(false);
      }
    } else if (onClose) {
      onClose(); // Go back to dashboard
    }
  };

  const handleStepClick = (stepIndex) => {
    if (stepIndex <= currentStep || stepsCompleted[stepIndex - 1]) {
      setCurrentStep(stepIndex);
      // Reset sub-states when going back
      if (stepIndex < 3) {
        setAddSpouse(false);
        setAddKids(false);
      }
      if (stepIndex < 4) {
        setAddSiblings(false);
      }
      setShowBuilding(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 bg-[#FDFCFB] min-h-screen">
      {/* Header */}
      {!showBuilding && (
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-6xl mx-auto">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {currentStep === 0 ? "Back to Dashboard" : "Back"}
            </button>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New User</h1>
              <p className="text-gray-600 mt-2">
                Manually add user details to Ancestropedia's database.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step Indicator */}
      {!showBuilding && (
        <div className="max-w-6xl mx-auto w-full px-4 pt-6">
          <AdminStepper
            currentStep={currentStep}
            setCurrentStep={handleStepClick}
            stepsCompleted={stepsCompleted}
          />
        </div>
      )}

      {/* Form Content */}
      <div className="flex-1 px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          {showBuilding ? (
            <AdminBuilding 
              completeData={completeData}
              onBack={() => {
                setShowBuilding(false);
                setCurrentStep(4);
              }}
            />
          ) : (
            <>
              {/* Step 0: User Information */}
              {currentStep === 0 && (
                <AdminDataForm
                  personalDetails={personalDetails}
                  setPersonalDetails={setPersonalDetails}
                  onBack={handleBack}
                  onNext={handleNext}
                  personType="user"
                />
              )}
              
              {/* Step 1: Father Information */}
              {currentStep === 1 && (
                <AdminDataForm
                  personalDetails={fatherDetails}
                  setPersonalDetails={setFatherDetails}
                  onBack={handleBack}
                  onNext={handleNext}
                  personType="father"
                />
              )}
              
              {/* Step 2: Mother Information */}
              {currentStep === 2 && (
                <AdminDataForm
                  personalDetails={motherDetails}
                  setPersonalDetails={setMotherDetails}
                  onBack={handleBack}
                  onNext={handleNext}
                  personType="mother"
                />
              )}
              
              {/* Step 3: Marital Status */}
              {currentStep === 3 && !addSpouse && !addKids && (
                <AdminMaritalForm
                  maritalData={maritalData}
                  setMaritalData={setMaritalData}
                  setAddSpouse={setAddSpouse}
                  setAddKids={setAddKids}
                  onNext={() => {
                    // Auto-detect if spouse or kids form should be shown
                    if (maritalData.status) {
                      setAddSpouse(true);
                    } else if (maritalData.haveKids === 'yes') {
                      setAddKids(true);
                    } else {
                      handleNext();
                    }
                  }}
                  onBack={handleBack}
                />
              )}
              
              {/* Step 3a: Spouse Information */}
              {currentStep === 3 && addSpouse && !addKids && (
                <AdminSpouseForm
                  spouseDetails={spouseDetails}
                  setSpouseDetails={setSpouseDetails}
                  maritalData={maritalData}
                  personalDetails={personalDetails}
                  onNext={() => {
                    if (maritalData.haveKids === "yes") {
                      setAddSpouse(false);
                      setAddKids(true);
                    } else {
                      handleNext();
                    }
                  }}
                  onBack={() => {
                    setAddSpouse(false);
                  }}
                />
              )}
              
              {/* Step 3b: Kids Information */}
              {currentStep === 3 && addKids && !addSpouse && (
                <AdminKidsForm
                  kidsDetails={kidsDetails}
                  setKidsDetails={setKidsDetails}
                  maritalData={maritalData}
                  onNext={handleNext}
                  onBack={() => {
                    setAddKids(false);
                    if (maritalData.status) {
                      setAddSpouse(true);
                    }
                  }}
                />
              )}
              
              {/* Step 4: Siblings Information */}
              {currentStep === 4 && !addSiblings && (
                <AdminSiblingsForm
                  siblingsData={siblingsData}
                  setSiblingsData={setSiblingsData}
                  siblingsDetails={siblingsDetails}
                  setSiblingsDetails={setSiblingsDetails}
                  setAddSiblings={setAddSiblings}
                  onNext={() => {
                    if (siblingsData.haveSiblings === "yes" && siblingsData.enterDetails) {
                      setAddSiblings(true);
                    } else {
                      handleNext();
                    }
                  }}
                  onBack={handleBack}
                />
              )}
              
              {/* Step 4a: Siblings Details */}
              {currentStep === 4 && addSiblings && (
                <AdminSiblingsForm
                  siblingsData={siblingsData}
                  setSiblingsData={setSiblingsData}
                  siblingsDetails={siblingsDetails}
                  setSiblingsDetails={setSiblingsDetails}
                  onNext={handleNext}
                  onBack={() => {
                    setAddSiblings(false);
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminComplete;