"use client";
import { axiosInstance } from "@/config/axios";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const sections = [
  {
    title: "Admin Panel",
    items: [
      { 
        icon: "/dashboard-icon.svg",
        link: "/dashboard",
        text: "Dashboard",
      },
      {
        icon: "/add-user-data.svg",
        link: "/adduser",
        text: "Add User",
      },
      {
        icon: "/user-management.svg",
        link: "/usermanagement",
        text: "User Management",
      },
      { 
        icon: "/blogs-management.svg", 
        link: "/blogManagement", 
        text: "Blogs Management" 
      },
    ],
  },
  {
    title: "Order Management",
    items: [
      { 
        icon: "/DNA-Kit.svg", 
        link: "/dna-kit", 
        text: "DNA Kit" 
      },
      {
        icon: "/Wall-art-order.svg",
        link: "/wall-art",
        text: "Wall Art",
      },
    ],
  },
  {
    title: "Token & Space",
    items: [
      {
        icon: "/Token-Request.svg",
        link: "/tokenmanagement",
        text: "Token Request",
      },
      {
        icon: "/Vault-Management.svg",
        link: "/vaultmanagement",
        text: "Vault Management",
      },
    ],
  },
  {
    title: "Analaytics & Supports",
    items: [
      { 
        icon: "/Reports-Analytics.svg", 
        link: "/reportmanagement", 
        text: "Reports & Analytics" 
      },
      { 
        icon: "/User-Support.svg", 
        link: "/supportmanagement", 
        text: "User Support" 
      },
    ],
  },
  {
    title: "",
    items: [
      { 
        icon: "/Executive-Management.svg",
        link: "/executivemanagement", 
        text: "Executive Management" 
      },
      { 
        icon: "/Logout-icon.svg", 
        link: "/logout", 
        text: "Log out" 
      },
    ],
  },
];

export default function AdminSideBar({ onNavigate }) {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const logoutRef = useRef(null);

  // Click outside handler ONLY for logout modal
  useEffect(() => {
    if (!showLogoutConfirm) return;

    const handleClickOutside = (event) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        if (!loggingOut) {
          setShowLogoutConfirm(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLogoutConfirm, loggingOut]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      console.log("Logging out...");
      const res = await axiosInstance.post("admin/auth/logout");
      console.log("Logged out successfully", res);

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      console.log("Error in logging out", error);
    } finally {
      setLoggingOut(false);
    }
  };

  const handleNavigation = (link) => {
    router.push(link);
    if (onNavigate) onNavigate(); // Close sidebar on mobile after navigation
  };

  return (
    <>
      <aside className="w-[260px] border-t bg-white border-r border-gray-200 overflow-y-auto h-full scrollbar-hidden">
        <nav className="p-4 flex flex-col gap-6">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className={`${
                section.title === "" ? "border-t border-[#6F6F6F] pt-3" : ""
              }`}
            >
              {section.title && (
                <p className="text-[#2D2D2D] text-[16px] font-medium leading-8 mb-2">
                  {section.title}
                </p>
              )}
              <ul className="flex flex-col gap-1">
                {section.items.map((item, i) => {
                  const active = pathname === item.link;
                  
                  return (
                    <li key={i}>
                      {item.link !== "/logout" ? (
                        <button
                          onClick={() => handleNavigation(item.link)}
                          className={`flex items-center gap-3 px-3 py-2 w-full cursor-pointer rounded-md transition-colors ${
                            active
                              ? "bg-[#265A46] text-white font-normal"
                              : "text-[#6F6F6F] hover:bg-gray-100"
                          }`}
                        >
                          <Image
                            src={item.icon}
                            width={24}
                            height={24}
                            alt={item.text}
                            className={active ? "invert brightness-0" : ""}
                          />
                          <span>{item.text}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowLogoutConfirm(true)}
                          className="flex cursor-pointer w-full mb-10 items-center gap-3 px-3 py-2 rounded-md transition-colors text-gray-700 hover:bg-gray-100"
                        >
                          <Image
                            src={item.icon}
                            width={24}
                            height={24}
                            alt={item.text}
                          />
                          <span>{item.text}</span>
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div
            className="bg-[#F3FFF9] rounded-lg shadow-lg w-4/5 sm:w-1/3 p-6 flex flex-col items-center gap-6"
            ref={logoutRef}
          >
            <h2 className="text-xl font-semibold text-center">
              Are you sure you want to logout?
            </h2>
            <div className="flex w-full justify-between gap-4">
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="p-2 bg-red-500 rounded-xl cursor-pointer text-white flex-1 hover:bg-red-600 disabled:bg-red-300"
              >
                {loggingOut ? "Logging Out..." : "Log Out"}
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                disabled={loggingOut}
                className="p-2 bg-gray-200 rounded-xl cursor-pointer text-gray-800 flex-1 hover:bg-gray-300 disabled:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}