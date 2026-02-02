"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const protectPage = (requiredPermission = null) => {
  return (Component) => {
    return function ProtectedPage(props) {
      const router = useRouter();

      useEffect(() => {
        const token = localStorage.getItem("adminUserToken");
        const role = localStorage.getItem("role");

        let permissions = [];
        try {
          permissions = JSON.parse(localStorage.getItem("permissions")) || [];
        } catch {
          permissions = [];
        }

        // ❌ Not logged in
        // if (!token) {
        //   router.replace("/login");
        //   return;
        // }

        // ✅ Admin → full access
        if (role === "admin") {
          return;
        }

        // ❌ Executive but permission missing
        if (
          requiredPermission &&
          !permissions.includes(requiredPermission)
        ) {
          router.replace("/unauthorized");
          return;
        }
      }, [router]);

      return <Component {...props} />;
    };
  };
};

export default protectPage;
