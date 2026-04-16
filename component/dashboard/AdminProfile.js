"use client";

import { useState, useEffect } from "react";
import { axiosInstance } from "@/config/axios";
import { Mail, Phone, Clock } from "lucide-react";

export default function AdminProfilePage() {
  /* ================= PROFILE STATES ================= */
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [contact, setContact] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  /* ================= PASSWORD STATES ================= */
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  /* ================= FETCH PROFILE ON LOAD ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(
          "/admin/profile/myprofile",
          { withCredentials: true }
        );

        console.log("PROFILE RESPONSE:", res.data);

        const data = res.data?.data || res.data?.admin || {};

        setFullName(data.fullName || "");
        setGender(data.gender || "");
        setCity(data.city || "");
        setEmail(data.email || "");
        setContact(data.contact || data.phoneNumber || "");
        setProfileImage(
          data.profileImage || data.profilePicture || ""
        );

        if (data.dateOfBirth) {
          const formatted = new Date(data.dateOfBirth)
            .toISOString()
            .split("T")[0];

          setDateOfBirth(formatted);
        }

      } catch (error) {
        console.log("FETCH PROFILE ERROR:", error);
        console.log("SERVER ERROR:", error?.response?.data);

        alert(
          error?.response?.data?.message ||
          error.message ||
          "Failed to fetch profile"
        );
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /* ================= CONVERT IMAGE TO BASE64 ================= */
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const base64 = await convertToBase64(file);
    setProfileImage(base64);
  };

  /* ================= UPDATE PROFILE ================= */
  const handleProfileUpdate = async () => {
    try {
      setProfileLoading(true);

      const res = await axiosInstance.put(
        "/admin/profile/updateprofile",
        {
          fullName,
          gender,
          dateOfBirth,
          city,
          email,
          contact,
          profileImage,
        },
        { withCredentials: true }
      );

      console.log("UPDATE RESPONSE:", res.data);

      const data = res.data?.data || res.data?.admin || {};

      if (data.profileImage || data.profilePicture) {
        setProfileImage(
          data.profileImage || data.profilePicture
        );
      }

      alert(res.data.message || "Profile updated");

    } catch (error) {
      console.log("UPDATE ERROR:", error);
      console.log("SERVER ERROR:", error?.response?.data);

      alert(
        error?.response?.data?.message ||
        error.message ||
        "Failed to update profile"
      );
    } finally {
      setProfileLoading(false);
    }
  };

  /* ================= CHANGE PASSWORD ================= */
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("All password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setPasswordLoading(true);

      const res = await axiosInstance.put(
        "/admin/login/change-password",
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        { withCredentials: true }
      );

      alert(res.data.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {
      alert(
        error?.response?.data?.message ||
        error.message ||
        "Failed to update password"
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-[#F8F6E7] min-h-screen">
      {/* HEADER CARD */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="h-36 bg-gradient-to-r from-red-900 to-red-700 relative">

          {/* PROFILE IMAGE */}
          <div className="absolute -bottom-16 left-6 flex flex-col items-center">
            <img
              src={
                profileImage?.startsWith("data:image")
                  ? profileImage
                  : profileImage || "https://i.pravatar.cc/150"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white object-cover"
            />

            {/* IMAGE UPLOAD INPUT */}
            <label className="mt-2 text-xs bg-white px-3 py-1 rounded-md shadow cursor-pointer hover:bg-gray-100">
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="pt-16 px-6 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">
              {fullName}
            </h2>

            <p className="text-sm text-gray-500">
              Administrator
            </p>

            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Mail size={14} /> {email}
              </span>

              <span className="flex items-center gap-1">
                <Phone size={14} /> {contact}
              </span>

              <span className="flex items-center gap-1">
                <Clock size={14} /> Secure Session
              </span>
            </div>
          </div>

          <span className="text-green-600 font-medium text-sm">
            ● Active
          </span>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

        {/* PROFILE FORM */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold mb-4">
            Profile Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <div>
              <label className="text-xs text-gray-500">
                Gender
              </label>

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <Input
              label="Date of Birth"
              type="date"
              value={dateOfBirth}
              onChange={(e) =>
                setDateOfBirth(e.target.value)
              }
            />

            <Input
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <Input
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <button
            onClick={handleProfileUpdate}
            disabled={profileLoading}
            className="mt-5 bg-green-700 text-white px-5 py-2 rounded-md disabled:opacity-50"
          >
            {profileLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* PASSWORD SECTION */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold mb-4">
            Change Password
          </h3>

          <div className="space-y-3">
            <Input
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
            />

            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
            />

            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />
          </div>

          <button
            onClick={handleChangePassword}
            disabled={passwordLoading}
            className="mt-4 bg-green-700 text-white w-full py-2 rounded-md disabled:opacity-50"
          >
            {passwordLoading ? "Updating..." : "Update Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* REUSABLE INPUT */
function Input({
  label,
  value = "",
  type = "text",
  onChange
}) {
  return (
    <div>
      <label className="text-xs text-gray-500">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full mt-1 border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-green-600"
      />
    </div>
  );
}