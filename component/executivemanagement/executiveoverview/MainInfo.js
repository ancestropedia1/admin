"use client";

import React, { useEffect, useState } from "react";
import { axiosInstanceLocal } from "@/config/axios";

import ExecutiveHeader from "./ExecutiveHeader";
import ExecutiveTabs from "./ExecutiveTabs";
import InfoCards from "./InfoCards";
import StatsCards from "./StatsCards";
import ResponsibilitiesTable from "./ResponsibilitiesTable";
import CommentsNotes from "./CommentsNotes";

const MainInfo = ({ executiveId }) => {
  const [executive, setExecutive] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExecutive = async () => {
      try {
        const res = await axiosInstanceLocal.get(
          `/admin/executive/${executiveId}`
        );
        setExecutive(res.data.data);
      } catch (error) {
        console.error("Failed to fetch executive", error);
      } finally {
        setLoading(false);
      }
    };

    if (executiveId) fetchExecutive();
  }, [executiveId]);

  if (loading) {
    return <p className="p-6">Loading executive details...</p>;
  }

  if (!executive) {
    return <p className="p-6 text-red-500">Executive not found</p>;
  }

  return (
    <div className="p-6 bg-[#F6F9F7] min-h-screen">
      <ExecutiveHeader executive={executive} />
      <InfoCards executive={executive} />
      
      <CommentsNotes executiveId={executiveId} />
     
    </div>
  );
};

export default MainInfo;
