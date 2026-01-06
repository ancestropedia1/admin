
"use client";

import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, AlertCircle, User, Users, Heart, Baby, UserCog } from 'lucide-react';
import { axiosInstance } from '@/config/axios';
import { useRouter } from 'next/navigation';

const AdminBuilding = ({ completeData, onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error'
  const router = useRouter();

  const {
    personalDetails,
    fatherDetails,
    motherDetails,
    maritalData,
    spouseDetails,
    siblingsData,
    kidsDetails,
    siblingsDetails
  } = completeData;

  
const handleSubmit = async () => {
  setIsSubmitting(true);
  setSubmitStatus(null);

  try {
    const payload = {
      personalDetails,
      fatherDetails: fatherDetails?.firstName ? fatherDetails : null,
      motherDetails: motherDetails?.firstName ? motherDetails : null,
      spouseDetails: spouseDetails?.firstName ? spouseDetails : null,
      maritalData,
      kidsDetails: kidsDetails.filter(k => k.firstName),
      siblingsDetails: siblingsDetails.filter(s => s.firstName),
    };

    //https://server.ancestropedia.com/api/admin/tree/adminbuildtree
    const response = await axiosInstance.post(
      "/admin/tree/adminbuildtree",
      payload
    );

    if (response.data.success) {
      setSubmitStatus("success");
      setTimeout(() => {
        router.push("/admin/users");
      }, 3000);
    } else {
      setSubmitStatus("error");
    }
  } catch (error) {
    console.error("Error building tree:", error);
    setSubmitStatus("error");
  } finally {
    setIsSubmitting(false);
  }
};

  // Summary cards
  const summarySections = [
    {
      title: "User Information",
      icon: <User className="w-5 h-5" />,
      data: personalDetails,
      fields: ['firstName', 'lastName', 'email', 'gender', 'birthDate']
    },
    {
      title: "Father's Information",
      icon: <UserCog className="w-5 h-5" />,
      data: fatherDetails,
      fields: ['firstName', 'lastName', 'occupation', 'birthDate'],
      condition: fatherDetails.firstName
    },
    {
      title: "Mother's Information",
      icon: <UserCog className="w-5 h-5" />,
      data: motherDetails,
      fields: ['firstName', 'lastName', 'occupation', 'birthDate'],
      condition: motherDetails.firstName
    },
    {
      title: "Marital Status",
      icon: <Heart className="w-5 h-5" />,
      data: maritalData,
      fields: ['status', 'haveKids', 'totalKids']
    },
    {
      title: "Spouse Information",
      icon: <Users className="w-5 h-5" />,
      data: spouseDetails,
      fields: ['firstName', 'lastName', 'gender', 'birthDate'],
      condition: spouseDetails.firstName 
    },
    {
      title: "Children",
      icon: <Baby className="w-5 h-5" />,
      count: kidsDetails.filter(k => k.firstName).length,
      condition: maritalData.haveKids === 'yes'
    },
    {
      title: "Siblings",
      icon: <Users className="w-5 h-5" />,
      count: siblingsDetails.filter(s => s.firstName).length,
      condition: siblingsData.haveSiblings === 'yes'
    }
  ];

  return (
    <div className="w-full mx-auto p-4 rounded-lg shadow-md space-y-6 bg-[#FDFCFB] border border-[#919191]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <ArrowLeft
          className="cursor-pointer"
          onClick={onBack}
        />
        <h2 className="text-xl font-bold text-[#4F4F4F] font-['Playfair_Display']">
          Review & Submit
        </h2>
      </div>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-800">User Created Successfully!</h3>
              <p className="text-sm text-green-700 mt-1">
                The user has been added to the database. Redirecting to users list...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-800">Submission Failed</h3>
              <p className="text-sm text-red-700 mt-1">
                There was an error creating the user. Please try again.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Admin Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Admin Note:</strong> Review all information before submission. 
          Once submitted, the user will be created immediately in the database.
        </p>
      </div>

      {/* Summary Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {summarySections.map((section, index) => {
            if (section.condition === false) return null;
            
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {section.icon}
                  </div>
                  <h4 className="font-medium text-gray-800">{section.title}</h4>
                </div>
                
                {section.count !== undefined ? (
                  <div className="text-sm text-gray-600">
                    {section.count} {section.title.toLowerCase()}{section.count !== 1 ? 's' : ''} added
                  </div>
                ) : (
                  <div className="space-y-1">
                    {section.fields.map((field) => {
                      const value = section.data[field];
                      if (!value) return null;
                      
                      return (
                        <div key={field} className="text-sm">
                          <span className="font-medium text-gray-700 capitalize">
                            {field.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="ml-2 text-gray-600">
                            {typeof value === 'boolean' 
                              ? (value ? 'Yes' : 'No')
                              : value.toString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Preview (Collapsible) */}
      <details className="border border-gray-200 rounded-lg">
        <summary className="p-4 cursor-pointer font-medium text-gray-700">
          View Complete Data (JSON Preview)
        </summary>
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            {JSON.stringify(
            {
              personalDetails,
              fatherDetails,
              motherDetails,
              spouseDetails,
              maritalData,
              kidsDetails,
              siblingsDetails,
            },
            null,2)}
          </pre>
        </div>
      </details>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          disabled={isSubmitting}
        >
          Back to Edit
        </button>
        
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.push('/admin/users')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || submitStatus === 'success'}
            className={`px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
              isSubmitting || submitStatus === 'success'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating User...
              </>
            ) : submitStatus === 'success' ? (
              <>
                <CheckCircle className="w-5 h-5" />
                User Created
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Create User
              </>
            )}
          </button>
        </div>
      </div>

      {/* Submission Notes */}
      <div className="text-sm text-gray-500 mt-4">
        <p>
          <strong>Note:</strong> This will create a new user with all family relationships. 
          The user will be immediately active in the system.
        </p>
      </div>
    </div>
  );
};

export default AdminBuilding;