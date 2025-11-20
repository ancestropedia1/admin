"use client";

import { User, Dna, MapPin, GraduationCap } from "lucide-react";
import { Lato, Playfair_Display } from "next/font/google";
import Link from "next/link";
import Dropdown from "./Dropdown";
import AddUserTabs from "./AddUserTab";
// ⛔ WRONG: import Dropdown from "./Dropdown";
// ✅ RIGHT:

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function AddUserForm() {
  // options...
  const religionOptions = [
    { name: "Hinduism" },
    { name: "Muslim" },
    { name: "Christian" },
    { name: "Sikh" },
  ];

  const categoryOptions = [
    { name: "General" },
    { name: "OBC" },
    { name: "SC" },
    { name: "ST" },
  ];

  const casteOptions = [
    { name: "Brahmin" },
    { name: "Rajput" },
    { name: "Yadav" },
    { name: "Jat" },
  ];

  const bodyTypeOptions = [
    { name: "Slim" },
    { name: "Average" },
    { name: "Athletic" },
    { name: "Heavy" },
  ];

  const skinToneOptions = [
    { name: "Fair" },
    { name: "Wheatish" },
    { name: "Brown" },
    { name: "Dark" },
  ];

  const heightOptions = [
    { name: "3-4 ft" },
    { name: "4-5 ft" },
    { name: "5-5.5 ft" },
    { name: "5.5-6 ft" },
  ];

  const eyeOptions = [
    { name: "Black" },
    { name: "Brown" },
    { name: "Hazel" },
    { name: "Grey" },
  ];

  return (
    <form className="w-full max-w-5xl mx-auto p-6">

      <div>
        <Link
          href="#"
          className={`${lato.className} text-base text-green-700 font-medium hover:underline`}
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* HEADER */}
      <div className="bg-[#F6F1E9] border mt-4 border-[#faead2] p-6 rounded-md shadow-sm">
        <h1 className={`${playfair.className} text-3xl font-bold text-gray-800 text-center`}>
          Add New User
        </h1>
        <p className={`${lato.className} text-center text-gray-600 mt-2`}>
          Manually add user details to Ancestropedia's database.
        </p>
      </div>

      <div className="mt-15">
        <AddUserTabs/>
      </div>

      {/* PERSONAL INFO */}
      <div className="bg-[#FEFAF6] border  border-gray-300 rounded-xl shadow-sm p-8 mt-20">
        <h2 className={`${playfair.className} text-2xl font-semibold flex gap-2 mb-6`}>
          <User className="w-7 h-7" />
          Your Personal Info
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="First Name" placeholder="e.g. Anjali" />
          <Input label="Last Name" placeholder="e.g. Kapoor" />

          <Input label="Date of Birth" type="date" />
          <Input label="Age" type="number" placeholder="36" />

          <Dropdown label="Religion" options={religionOptions} placeholder="Select your religion" />
          <Dropdown label="Category" options={categoryOptions} placeholder="Select your category" />
          <Dropdown label="Caste" options={casteOptions} placeholder="Select your caste" />
        </div>
      </div>

      {/* PHYSICAL ATTRIBUTES */}
      <div className="bg-[#FEFAF6] rounded-lg shadow-md p-6 mt-10">
        <h2 className={`${playfair.className} text-[26px] font-semibold flex items-center gap-2 mb-6`}>
          <Dna className="w-5 h-5 text-green-700" />
          Physical Attributes
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <Dropdown label="Body Type" options={bodyTypeOptions} />
          <Dropdown label="Skin Tone" options={skinToneOptions} />
          <Dropdown label="Height" options={heightOptions} />
          <Dropdown label="Eye Color" options={eyeOptions} />
        </div>
      </div>

      {/* LOCATION */}
      <div className="bg-[#FEFAF6] rounded-lg shadow-md p-6 mt-10">
        <h2 className={`${playfair.className} text-[26px] font-semibold flex items-center gap-2 mb-6`}>
          <MapPin className="w-5 h-5 text-green-700" />
          Location Details
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <Input label="Birth-place" placeholder="e.g. Noida, UP, India" />
          <Input label="Current Location" placeholder="e.g. Noida, UP, India" />
        </div>
      </div>
      {/* EDUCATION */}
       <div className="bg-[#FEFAF6] border-gray-200 rounded-lg shadow-md p-6 mt-10"> 
        <h2 className={`${playfair.className} text-[26px] font-semibold flex items-center gap-2 mb-6`}> 
          <GraduationCap className="w-5 h-5 text-green-700" /> Education & Profession </h2> 
          <div className="grid grid-cols-1 gap-4"> 
            <Input label="Highest Education" placeholder="e.g. Graduate" /> <Input label="Profession" placeholder="e.g. Software Engineer" /> 
          </div> 
     </div>
 
      <button className="bg-[#FFC300] px-8 py-3 rounded-md text-lg mt-6">
        Next
      </button>
    </form>
  );
}

function Input({ label, type = "text", placeholder }) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border bg-white rounded-md p-2"
      />
    </div>
  );
}
