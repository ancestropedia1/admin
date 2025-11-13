"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const sections = [
  {
    title: "Admin Panel",
    items: [
      { 
        icon: "/dashboard-icon.svg",
        link: "/", 
        text: "Dashboard" 
      },
      {
        icon: "/user-management.svg",
        link: "/user-management",
        text: "User Management",
      },
      {
        icon: "/add-user-data.svg",
        link: "/AddUser",
        text: "Add User Data",
      },
      { 
        icon: "/blogs-management.svg", 
        link: "/blogs-management", 
        text: "Blogs Management" 
      },
    ],
  },
  {
    title: "Order Management",
    items: [
      { 
        icon: "/DNA-Kit-Order.svg", 
        link: "/order", 
        text: "DNA Kit Order & Report" 
      },
      {
        icon: "/Wall-art-order.svg",
        link: "/heritage",
        text: "Wall Art Order & Frame",
      },
    ],
  },
  {
    title: "Token & Space",
    items: [
      {
        icon: "/Token-Request.svg",
        link: "/profile",
        text: "Token Request",
      },
      {
        icon: "/Vault-management.svg",
        link: "/settings/account",
        text: "Vault Management",
      },
    ],
  },
  {
    title: "Analaytics & Supports",
    items: [
      { 
        icon: "/Reports-Analytics.svg", 
        link: "/myorders", 
        text: "Reports & Analytics" 
      },
      { 
        icon: "/User-Support.svg", 
        link: "/blogs", 
        text: "User Support" 
      },
    ],
  },
  {
    title: "",
    items: [
      { 
        icon: "/Executive-Management.svg",
        link: "/help", 
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

export default function AdminSideBar({ setShow }) {
  const sideBarRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [logginOut, setLoggingOut] = useState(false);
  const logoutRef = useRef(null);

  // Click outside handler for sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        if (setShow) setShow();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShow]);

  // Click outside handler for logout confirmation
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        if (!logginOut) setShowLogoutConfirm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowLogoutConfirm, logginOut]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      console.log("Logging out...");
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
    if (setShow) setShow(); // Close sidebar on mobile after navigation
  };

  return (
    <>
      <aside
        className="w-[260px] border-t bg-white border-r border-gray-200 overflow-y-auto h-full scrollbar-hidden"
        ref={sideBarRef}
      >
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
                  const active = pathname === item.link; // Fixed: use exact match instead of startsWith
                  
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
                disabled={logginOut}
                className="p-2 bg-red-500 rounded-xl cursor-pointer text-white flex-1 hover:bg-red-600 disabled:bg-red-300"
              >
                {logginOut ? "Logging Out..." : "Log Out"}
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                disabled={logginOut}
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