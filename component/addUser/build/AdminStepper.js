
"use client";

import React from "react";

const AdminStepper = ({ currentStep, setCurrentStep }) => {
  const steps = [
    "User Information",
    "Parent's Information",
    "Spouse Information",
    "Children's Information"
  ];

  // Map your internal step flow (0–4) to the 4 UI steps
  // UI Step 0 = Personal
  // UI Step 1 = Father + Mother
  // UI Step 2 = Marital + Spouse
  // UI Step 3 = Kids + Siblings
  const getUIStep = () => {
    if (currentStep === 0) return 0;
    if (currentStep === 1 || currentStep === 2) return 1;
    if (currentStep === 3) return 2;
    if (currentStep === 4) return 3;
    return 0;
  };

  const uiStep = getUIStep();

  return (
    <div className="w-full mt-6">
      {/* Step Labels */}
      <div className="relative flex justify-between text-center text-sm sm:text-base w-full px-2">
        {steps.map((label, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)} // you may adjust mapping if needed
            className={`
              transition-colors
              ${uiStep === index ? "text-[#A86A10] font-semibold" : "text-gray-500"}
            `}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Progress Line */}
      <div className="relative w-full mt-3">
        {/* Base Line (gray) */}
        <div className="absolute top-0 left-0 h-0.5 w-full bg-gray-300"></div>

        {/* Active Line (brown) */}
        <div
          className="absolute top-0 left-0 h-0.5 bg-[#A86A10] transition-all duration-300"
          style={{ width: `${(uiStep / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AdminStepper;
