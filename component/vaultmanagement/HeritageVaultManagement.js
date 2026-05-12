"use client";

import { useState, useEffect } from "react";
import { axiosInstance } from "@/config/axios";

import VaultStatsCards from "./VaultStatsCards";
import VaultAnalysis from "./VaultAnalysis";
import VaultFilters from "./VaultFilters";
import VaultUserTable from "./VaultUserTable";
import VaultPlanAllocation from "./VaultPlanAllocation";
import VaultUserDetailModal from "./VaultUserDetailModal";

export default function HeritageVaultManagement() {
  const [stats,         setStats]         = useState(null);
  const [users,         setUsers]         = useState([]);
  const [pagination,    setPagination]    = useState({ total: 0, pages: 1 });
  const [page,          setPage]          = useState(1);
  const [search,        setSearch]        = useState("");
  const [loading,       setLoading]       = useState(true);
  const [selectedUser,  setSelectedUser]  = useState(null);

  // ✅ Fetch vault stats
  const fetchStats = async () => {
    try {
      const res = await axiosInstance.get("/admin/vault/stats");
      if (res.data.success) setStats(res.data.data);
    } catch (err) {
      console.error("Failed to fetch vault stats:", err);
    }
  };

  // ✅ Fetch user storage list
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/vault/users", {
        params: { page, limit: 10, search },
      });
      if (res.data.success) {
        setUsers(res.data.data);
        setPagination(res.data.pagination);
      }
    } catch (err) {
      console.error("Failed to fetch vault users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  return (
    <div className="min-h-screen bg-[#FEFBF7] p-4 md:p-6 lg:p-10 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-[#213327]">
          Heritage Vault Management
        </h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base max-w-xl">
          Securely manage storage, user vaults, and heritage content with
          advanced encryption and access controls.
        </p>
      </div>

      {/* TOP ALERT CARDS */}
      <VaultStatsCards stats={stats} />

      {/* ANALYSIS SECTION */}
      <VaultAnalysis stats={stats} />

      {/* FILTERS */}
      <VaultFilters
        search={search}
        onSearch={setSearch}
        onPageReset={() => setPage(1)}
      />

      {/* USER TABLE */}
      <VaultUserTable
        users={users}
        loading={loading}
        page={page}
        setPage={setPage}
        pagination={pagination}
        onManage={(user) => setSelectedUser(user)}
      />

      {/* PLAN ALLOCATION */}
      <VaultPlanAllocation />

      {/* USER DETAIL MODAL */}
      {selectedUser && (
        <VaultUserDetailModal
          userId={selectedUser._id}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}