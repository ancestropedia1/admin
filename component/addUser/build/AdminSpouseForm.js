
"use client";

import React from 'react';
import AdminDataForm from './AdminDataForm';

const AdminSpouseForm = ({
  spouseDetails,
  setSpouseDetails,
  maritalData,
  personalDetails,
  onNext,
  onBack
}) => {
  // Prepare spouse-specific title and context
  const getSpouseTitle = () => {
    if (maritalData.status === 'married') return "Spouse Information";
    if (maritalData.status === 'divorced') return "Ex-Spouse Information";
    if (maritalData.status === 'widowed') return "Deceased Spouse Information";
    return "Partner Information";
  };

  // Auto-set some fields based on marital status
  const prepareSpouseData = (data) => {
    const preparedData = { ...data };
    
    // Add spouse-specific fields if not present
    if (!preparedData.marriageDate && maritalData.status === 'married') {
      preparedData.marriageDate = "";
    }
    
    if (!preparedData.divorceDate && maritalData.status === 'divorced') {
      preparedData.divorceDate = "";
    }
    
    return preparedData;
  };

  // Handle submit with spouse-specific validation
  const handleSubmit = (formData) => {
    // Additional spouse validation
    if (maritalData.status === 'married' && !formData.marriageDate) {
      alert('Marriage date is required for married status');
      return false;
    }
    
    if (maritalData.status === 'divorced' && !formData.divorceDate) {
      alert('Divorce date is required for divorced status');
      return false;
    }
    
    setSpouseDetails(formData);
    onNext();
    return true;
  };

  return (
    <AdminDataForm
      personalDetails={prepareSpouseData(spouseDetails)}
      setPersonalDetails={(data) => {
        // Intercept to add spouse-specific logic
        const updatedData = prepareSpouseData(data);
        setSpouseDetails(updatedData);
      }}
      onBack={onBack}
      onNext={(data) => handleSubmit(data)}
      personType="spouse"
      title={getSpouseTitle()}
      maritalData={maritalData}
      extraFields={{
        showMaritalFields: true,
        maritalStatus: maritalData.status
      }}
      contextMessage={
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Adding {getSpouseTitle().toLowerCase()}:</strong> 
            {maritalData.status === 'married' && ' Enter marriage details.'}
            {maritalData.status === 'divorced' && ' Enter divorce details.'}
            {maritalData.status === 'widowed' && ' Enter details of deceased spouse.'}
          </p>
        </div>
      }
    />
  );
};

export default AdminSpouseForm;