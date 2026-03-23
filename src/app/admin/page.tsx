"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminHeader from "@/components/admin/AdminHeader";
import InvitationManager from "@/components/admin/InvitationManager";
import RSVPResults from "@/components/admin/RSVPResults";
import AdminLogin from "@/components/admin/AdminLogin";
import { RSVP, Invitation, PaginatedResponse } from "@/components/admin/types";

export default function AdminPage() {
  const [rsvps, setRsvps] = useState<PaginatedResponse<RSVP>>({ data: [], count: 0, totalPages: 0, currentPage: 1 });
  const [invitations, setInvitations] = useState<PaginatedResponse<Invitation>>({ data: [], count: 0, totalPages: 0, currentPage: 1 });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'invitations' | 'rsvp'>('invitations');

  // Search/Page states
  const [inviteSearch, setInviteSearch] = useState("");
  const [invitePage, setInvitePage] = useState(1);
  const [rsvpSearch, setRsvpSearch] = useState("");
  const [rsvpPage, setRsvpPage] = useState(1);
  const [rsvpStatus, setRsvpStatus] = useState<string>("all");

  // Base URL for links
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  const fetchInvitations = async (page = 1, search = "") => {
    try {
      const res = await fetch(`/api/invitations?page=${page}&limit=10&search=${encodeURIComponent(search)}`);
      const result = await res.json();
      setInvitations(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRSVP = async (page = 1, search = "", status = "all") => {
    try {
      let url = `/api/rsvp?page=${page}&limit=10&search=${encodeURIComponent(search)}`;
      if (status !== "all") {
        url += `&attending=${status}`;
      }
      const res = await fetch(url);
      const result = await res.json();
      setRsvps(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    await Promise.all([
      fetchInvitations(invitePage, inviteSearch),
      fetchRSVP(rsvpPage, rsvpSearch, rsvpStatus)
    ]);
    setLoading(false);
  };

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Sync refreshes on param changes
  const handleLogin = async (password: string) => {
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        body: JSON.stringify({ password }),
        headers: { "Content-Type": "application/json" }
      });
      const result = await res.json();
      if (result.success) {
        sessionStorage.setItem("admin_auth", "true");
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchInvitations(invitePage, inviteSearch);
    }
  }, [invitePage, inviteSearch, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchRSVP(rsvpPage, rsvpSearch, rsvpStatus);
    }
  }, [rsvpPage, rsvpSearch, rsvpStatus, isAuthenticated]);

  const handleAddInvitation = async (name: string, whatsapp: string) => {
    try {
      const res = await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, whatsapp }),
      });
      if (res.ok) {
        fetchInvitations(invitePage, inviteSearch);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteInvitation = async (id: string) => {
    if (!confirm("Hapus undangan ini?")) return;
    try {
      const res = await fetch(`/api/invitations?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchInvitations(invitePage, inviteSearch);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRSVP = async (id: string) => {
    if (!confirm("Hapus data RSVP ini?")) return;
    try {
      const res = await fetch(`/api/rsvp?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchRSVP(rsvpPage, rsvpSearch, rsvpStatus);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-12 font-sans selection:bg-white/10">
      <div className="max-w-7xl mx-auto space-y-12">
        <AdminHeader onRefresh={fetchData} onLogout={handleLogout} />
        
        {/* Tab Switcher */}
        <div className="flex gap-1 bg-zinc-900 p-1 rounded-2xl w-fit border border-white/5 mx-auto md:mx-0">
          <button 
            onClick={() => setActiveTab('invitations')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'invitations' ? 'bg-white text-black shadow-lg shadow-white/5' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
          >
            Invitation Manager
          </button>
          <button 
            onClick={() => setActiveTab('rsvp')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'rsvp' ? 'bg-white text-black shadow-lg shadow-white/5' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
          >
            RSVP Results
          </button>
        </div>

        <motion.div
           key={activeTab}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.3 }}
        >
          {activeTab === 'invitations' ? (
            <InvitationManager 
              invitations={invitations} 
              onAdd={handleAddInvitation}
              onDelete={handleDeleteInvitation}
              baseUrl={baseUrl}
              onPageChange={setInvitePage}
              onSearchChange={setInviteSearch}
              searchQuery={inviteSearch}
            />
          ) : (
            <RSVPResults 
              rsvps={rsvps} 
              onPageChange={setRsvpPage}
              onSearchChange={setRsvpSearch}
              searchQuery={rsvpSearch}
              statusFilter={rsvpStatus}
              onStatusChange={setRsvpStatus}
              onDelete={handleDeleteRSVP}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
