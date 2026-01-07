
"use client";

import { ArrowLeft, Camera, UserCircle2Icon, HeartHandshakeIcon, Baby, Users } from 'lucide-react';
import Image from 'next/image';
import { useState, useMemo } from 'react';

export default function AdminDataForm({
  personalDetails,
  setPersonalDetails,
  onBack,
  onNext,
  personType = "user",
  title,
  maritalData = {},
  extraFields = {},
  contextMessage
}) {
  // Determine form title based on person type
  const formTitles = {
    user: "Your Personal Info",
    father: "Father's Personal Info", 
    mother: "Mother's Personal Info",
    spouse: "Spouse Information",
    child: "Child Information",
    sibling: "Sibling Information"
  };

  // Determine icon based on person type
  const personIcons = {
    user: <UserCircle2Icon className="w-6 h-6 text-gray-700" />,
    father: <UserCircle2Icon className="w-6 h-6 text-gray-700" />,
    mother: <UserCircle2Icon className="w-6 h-6 text-gray-700" />,
    spouse: <HeartHandshakeIcon className="w-6 h-6 text-gray-700" />,
    child: <Baby className="w-6 h-6 text-gray-700" />,
    sibling: <Users className="w-6 h-6 text-gray-700" />
  };

  // Initialize formData from personalDetails
  const [formData, setFormData] = useState(() => ({
    firstName: personalDetails.firstName || "",
    lastName: personalDetails.lastName || "",
    occupation: personalDetails.occupation || "",
    birthDate: personalDetails.birthDate || "",
    gender: personalDetails.gender || "",
    toDate: personalDetails.toDate || "Present",
    birthCity: personalDetails.birthCity || "",
    birthState: personalDetails.birthState || "",
    birthCountry: personalDetails.birthCountry || "",
    residenceCity: personalDetails.residenceCity || "",
    residenceState: personalDetails.residenceState || "",
    residenceCountry: personalDetails.residenceCountry || "",
    profileImage: personalDetails.profileImage || null,
    religion: personalDetails.religion || "",
    category: personalDetails.category || "",
    caste: personalDetails.caste || "",
    height: personalDetails.height || "",
    weight: personalDetails.weight || "",
    eyeColor: personalDetails.eyeColor || "",
    highestEducation: personalDetails.highestEducation || "",
    phone: personalDetails.phone || "",
    living: personalDetails.living  !== false,
    bodyType: personalDetails.bodyType || "",
    skinTone: personalDetails.skinTone || "",
    // Spouse-specific fields
    marriageDate: personalDetails.marriageDate || "",
    divorceDate: personalDetails.divorceDate || "",
    // Child-specific fields
    birthOrder: personalDetails.birthOrder || 1,
    // Sibling-specific fields
    siblingOrder: personalDetails.siblingOrder || 1
  }));

  const [loading, setLoading] = useState(false);

  // Admin: Strict validation - ALL fields must be filled including photo
  // Use useMemo to calculate isValid
  const isValid = useMemo(() => {
    // Base required fields for all person types
    const baseFields = [
      'firstName',
      'lastName',
      'birthDate',
      'gender',
      'religion',
      'category',
      'caste',
      'height',
      'bodyType',
      'skinTone',
      'eyeColor',
      'birthCity',
      'residenceCity',
      'highestEducation',
      'occupation'
    ];
    
    // Check each base field
    const allFieldsFilled = baseFields.every(field => 
      formData[field] && formData[field].toString().trim() !== ''
    );
    
    // Check profile image
    const profileImageFilled = !!formData.profileImage;
    
    
    return allFieldsFilled && profileImageFilled;
  }, [formData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({ ...prev, profileImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleToDate = () => {
  setFormData(prev => ({
    ...prev,
    living: !prev.living,
    toDate: !prev.living ? "Present" : ""
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form - ALL fields must be filled
    if (!isValid) {
      alert('Please fill in all fields including the profile picture');
      return;
    }
    
    setLoading(true);

    // Save to parent state
    if (setPersonalDetails) {
      setPersonalDetails(formData);
    }
    
    // Move to next step
    setTimeout(() => {
      setLoading(false);
      if (onNext) onNext(formData);
    }, 500);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <div className="flex items-center ml-4">
          <div className="mr-3">
            {personIcons[personType] || personIcons.user}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-['Playfair_Display']">
            {title || formTitles[personType]}
          </h2>
        </div>
      </div>

      {/* Context Message */}
      {contextMessage}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Picture Section */}
        <div className="flex items-center justify-center mb-8">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="profileImageInput"
            onChange={handleFileChange}
          />
          <label
            htmlFor="profileImageInput"
            className="cursor-pointer relative group"
          >
            <div className="w-32 h-32 rounded-full border-4 border-[#E5E7EB] bg-gray-100 flex items-center justify-center overflow-hidden">
              {formData.profileImage ? (
                <Image
                  src={formData.profileImage}
                  alt="Profile Photo"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserCircle2Icon className="w-20 h-20 text-gray-400" />
              )}
            </div>
            <div className="absolute bottom-0 right-0 bg-[#FFC300] rounded-full p-2 shadow-lg">
              <Camera className="w-5 h-5 text-gray-800" />
            </div>
          </label>
        </div>

        {/* SECTION 1: Personal Information */}
        <div className="grid grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleChange}
              placeholder="e.g. Anjali"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300] bg-white"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleChange}
              placeholder="e.g. Kapoor"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300] bg-white"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300] bg-white"
            />
          </div>

                {/* Gender */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC300]"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Other</option>
            </select>
            </div>


          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300] bg-white appearance-none"
            >
              <option value="">Select your categories</option>
              <option value="general">General</option>
              <option value="obc">OBC</option>
              <option value="sc">SC</option>
              <option value="st">ST</option>
            </select>
          </div>

          {/* To/Death Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="date"
                name="toDate"
                value={formData.toDate === "Present" ? "" : (formData.toDate || '')}
                onChange={(e) => setFormData(prev => ({ ...prev, toDate: e.target.value }))}
                disabled={formData.living}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${
                  formData.living ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="living"
                  checked={formData.living}
                  onChange={toggleToDate}
                  className="h-5 w-5 text-[#FFC300] rounded border-gray-300 focus:ring-[#FFC300]"
                />
                <label htmlFor="living" className="ml-2 text-sm text-gray-700 whitespace-nowrap">
                  Present
                </label>
              </div>
            </div>
          </div>

          {/* Religion */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Religion
            </label>
            <select
              name="religion"
              value={formData.religion || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300] bg-white appearance-none"
            >
              <option value="">Select your religion</option>
              <option value="hindu">Hindu</option>
              <option value="muslim">Muslim</option>
              <option value="christian">Christian</option>
              <option value="sikh">Sikh</option>
              <option value="buddhist">Buddhist</option>
              <option value="jain">Jain</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Caste */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caste
            </label>
            <select
              name="caste"
              value={formData.caste || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300] bg-white appearance-none"
            >
              <option value="">Select your caste</option>
              <option value="brahmin">Brahmin</option>
              <option value="kshatriya">Kshatriya</option>
              <option value="vaishya">Vaishya</option>
              <option value="shudra">Shudra</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-8"></div>

        {/* SECTION 2: Physical Attributes */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 font-['Playfair_Display']">
            Physical Attributes
          </h3>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Body Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Body Type
              </label>
              <p className="text-sm text-gray-500 mb-3">Choose your Body Type</p>
              <select
                name="bodyType"
                value={formData.bodyType || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300] bg-white appearance-none"
              >
                <option value="">Select Body Type</option>
                <option value="slim">Slim</option>
                <option value="athletic">Athletic</option>
                <option value="average">Average</option>
                <option value="heavy">Heavy</option>
              </select>
            </div>

            {/* Skin Tone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skin Tone
              </label>
              <p className="text-sm text-gray-500 mb-3">Choose your Skin Tone</p>
              <select
                name="skinTone"
                value={formData.skinTone || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300] bg-white appearance-none"
              >
                <option value="">Select Skin Tone</option>
                <option value="fair">Fair</option>
                <option value="wheatish">Wheatish</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height
              </label>
              <p className="text-sm text-gray-500 mb-3">Select your height</p>
              <input
                type="text"
                name="height"
                value={formData.height || ''}
                onChange={handleChange}
                placeholder="e.g., 5'8''"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300] bg-white"
              />
            </div>

            {/* Eyes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Eyes
              </label>
              <p className="text-sm text-gray-500 mb-3">Select your eye color</p>
              <input
                type="text"
                name="eyeColor"
                value={formData.eyeColor || ''}
                onChange={handleChange}
                placeholder="e.g., Brown"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300] bg-white"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-8"></div>

        {/* SECTION 3: Location Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 font-['Playfair_Display']">
            Location Details
          </h3>
          
          <div className="space-y-4">
            {/* Birth-place */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Birth-place
              </label>
              <input
                type="text"
                name="birthCity"
                value={formData.birthCity || ''}
                onChange={handleChange}
                placeholder="e.g. Noida, UP, India"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300] bg-white"
              />
            </div>

            {/* Current Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Location
              </label>
              <input
                type="text"
                name="residenceCity"
                value={formData.residenceCity || ''}
                onChange={handleChange}
                placeholder="e.g. Noida, UP, India"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300] bg-white"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-8"></div>

        {/* SECTION 4: Education & Profession */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 font-['Playfair_Display']">
            Education & Profession
          </h3>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Highest Education */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Highest Education
              </label>
              <input
                type="text"
                name="highestEducation"
                value={formData.highestEducation || ''}
                onChange={handleChange}
                placeholder="e.g. Graduate"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300] bg-white"
              />
            </div>

            {/* occupation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                occupation
              </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation || ''}
                onChange={handleChange}
                placeholder="e.g. Software Engineer"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300] bg-white"
              />
            </div>
          </div>
        </div>

        {/* SECTION 5: Spouse-Specific Fields */}
        {personType === "spouse" && extraFields.showMaritalFields && (
          <>
            <div className="border-t border-gray-300 my-8"></div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 font-['Playfair_Display']">
                Marital Information
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                {/* Marriage Date (if married) */}
                {extraFields.maritalStatus === 'married' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marriage Date
                    </label>
                    <input
                      type="date"
                      name="marriageDate"
                      value={formData.marriageDate || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300] bg-white"
                    />
                  </div>
                )}

                {/* Divorce Date (if divorced) */}
                {extraFields.maritalStatus === 'divorced' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Divorce Date
                    </label>
                    <input
                      type="date"
                      name="divorceDate"
                      value={formData.divorceDate || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300] bg-white"
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* SECTION 6: Child/Sibling Order Fields */}
        {(personType === "child" || personType === "sibling") && extraFields.showBirthOrder && (
          <>
            <div className="border-t border-gray-300 my-8"></div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 font-['Playfair_Display']">
                {personType === "child" ? "Child Information" : "Sibling Information"}
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                {/* Birth/Sibling Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {personType === "child" ? "Birth Order" : "Sibling Order"}
                  </label>
                  <input
                    type="number"
                    name={personType === "child" ? "birthOrder" : "siblingOrder"}
                    value={personType === "child" ? formData.birthOrder || 1 : formData.siblingOrder || 1}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC300] focus:border-[#FFC300] bg-white"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {personType === "child" 
                      ? "Position among children (1 = firstborn)"
                      : "Position among siblings"}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}


        {/* Submit Button */}
        <div className="flex justify-end pt-8">
          <button
            type="submit"
            className={`bg-[#FFC300] text-[#1E4838] font-semibold px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-yellow-500 transition-colors ${
              !isValid || loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={!isValid || loading}
          >
            <span className="text-lg">
              {loading ? "Saving..." : 
               personType === "child" ? "Save Child & Continue" :
               personType === "sibling" ? "Save Sibling & Continue" :
               personType === "spouse" ? "Continue" :
               "Next →"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

// Add default props for safety
AdminDataForm.defaultProps = {
  personalDetails: {},
  setPersonalDetails: () => {},
  onBack: () => {},
  onNext: () => {},
  personType: "user",
  title: "",
  maritalData: {},
  extraFields: {},
  contextMessage: null
};
