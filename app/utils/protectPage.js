"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function protectPage(requiredPermission) {
  return (Component) => {
    return function Protected(props) {
      const router = useRouter();
      const token = typeof window !== "undefined" && localStorage.getItem("token");
      const role = typeof window !== "undefined" && localStorage.getItem("role");
      const permissions = typeof window !== "undefined" 
        ? JSON.parse(localStorage.getItem("permissions") || "[]")
        : [];

      useEffect(() => {
        if (!token) return router.replace("/login");

        // ADMIN CAN ACCESS EVERYTHING
        if (role === "Admin") return;

        // EXECUTIVE: ONLY IF PAGE PERMISSION MATCHES
        if (!permissions.includes(requiredPermission)) {
          return router.replace("/unauthorized");
        }
      }, []);

      return <Component {...props} />;
    };
  };
}
