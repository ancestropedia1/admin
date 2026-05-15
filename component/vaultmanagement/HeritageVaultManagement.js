"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axios";

import VaultStatsCards from "./VaultStatsCards";
import VaultAnalysis from "./VaultAnalysis";
import VaultFilters from "./VaultFilters";
import VaultUserTable from "./VaultUserTable";
import VaultPlanAllocation from "./VaultPlanAllocation";
import VaultUserDetailModal from "./VaultUserDetailModal";

export default function HeritageVaultManagement() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] =
    useState(null);

  // FETCH STATS
  const fetchStats = async () => {
    try {
      const res = await axiosInstance.get(
        "/admin/vault/stats"
      );

      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get(
        "/admin/vault/users",
        {
          params: {
            page,
            limit: 10,
            search,
          },
        }
      );

      if (res.data.success) {
        setUsers(res.data.data);
        setPagination(res.data.pagination);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  return (
    <div className="min-h-screen bg-[#F8F5F1] p-4 md:p-8 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-[#1B4332]">
          Heritage Vault Management
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Securely manage storage, user vaults,
          and heritage content.
        </p>
      </div>

      {/* STATS */}
      <VaultStatsCards stats={stats} />

      {/* ANALYSIS */}
      <VaultAnalysis stats={stats} />

      {/* FILTERS */}
      <VaultFilters
        search={search}
        onSearch={setSearch}
      />

      {/* TABLE */}
      <VaultUserTable
        users={users}
        pagination={pagination}
        page={page}
        setPage={setPage}
        onManage={(user) =>
          setSelectedUser(user)
        }
      />

      {/* PLANS */}
      <VaultPlanAllocation />

      {/* MODAL */}
      {selectedUser && (
        <VaultUserDetailModal
          userId={selectedUser._id}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}