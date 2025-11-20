"use client";
import { useState } from "react";


export default function AddUserTabs() {
  const [activeTab, setActiveTab] = useState("user");

  const tabs = [
    { id: "user", label: "User Information" },
    { id: "parents", label: "Parent's Information" },
    { id: "spouse", label: "Spouse Information" },
    { id: "children", label: "Children's Information" },
  ];

  return (
    <div className="w-full">

      {/* TAB HEADERS */}
      <div className="flex justify-center border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-semibold transition 
              ${
                activeTab === tab.id
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-gray-500"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="mt-6">
        {activeTab === "user" && <h1></h1>}
        {activeTab === "parents" && <ParentsForm />}
        {activeTab === "spouse" && <SpouseForm />}
        {activeTab === "children" && <ChildrenForm />}
      </div>

    </div>
  );
}

/* ------ FORM COMPONENTS ------- */

function UserForm() {
  return <div>Your user info form here...</div>;
}

function ParentsForm() {
  return <div>Parents info form...</div>;
}

function SpouseForm() {
  return <div>Spouse info form...</div>;
}

function ChildrenForm() {
  return <div>Children info form...</div>;
}
