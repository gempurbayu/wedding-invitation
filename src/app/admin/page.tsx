"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RSVP {
  id: string;
  name: string;
  attending: boolean;
  message: string;
  created_at: string;
}

interface Invitation {
  id: string;
  name: string;
  whatsapp: string;
  slug: string;
  created_at: string;
}

export default function AdminPage() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [newName, setNewName] = useState("");
  const [newWA, setNewWA] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Base URL for links
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  const fetchData = async () => {
    setLoading(true);
    try {
      const [rsvpRes, inviteRes] = await Promise.all([
        fetch("/api/rsvp"),
        fetch("/api/invitations"),
      ]);
      const rsvpData = await rsvpRes.json();
      const inviteData = await inviteRes.json();
      setRsvps(rsvpData);
      setInvitations(inviteData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, whatsapp: newWA }),
      });
      if (res.ok) {
        setNewName("");
        setNewWA("");
        fetchData();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteInvitation = async (id: string) => {
    if (!confirm("Hapus undangan ini?")) return;
    try {
      const res = await fetch(`/api/invitations?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Link berhasil disalin!");
  };

  const getWALink = (invite: Invitation) => {
    const text = `Halo ${invite.name},\n\nTanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.\n\nDetail undangan dapat dilihat pada tautan berikut:\n${baseUrl}/?to=${invite.slug}\n\nTerima kasih.`;
    const phone = invite.whatsapp.startsWith('0') ? '62' + invite.whatsapp.slice(1) : invite.whatsapp;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-10">
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold italic tracking-tighter">Admin Dashboard</h1>
            <div className="flex items-center gap-3">
              <p className="text-zinc-500 uppercase text-[10px] font-black tracking-[0.3em]">Wedding Management System v1.0</p>
              <span className="text-zinc-700">•</span>
              <a href="/" className="text-white/50 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">open_in_new</span>
                Lihat Undangan
              </a>
            </div>
          </div>
          <button 
            onClick={fetchData} 
            className="size-10 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-xl">refresh</span>
          </button>
        </div>

        {/* Invitation Management Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-zinc-400">send</span>
            <h2 className="text-2xl font-bold italic">Invitation Manager</h2>
          </div>

          {/* Add Form */}
          <form onSubmit={handleAddInvitation} className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5 flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px] space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest pl-1">Nama Tamu</label>
              <input 
                type="text" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ex: Andi & Partner"
                className="w-full bg-zinc-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-white/20 transition-all outline-none"
                required
              />
            </div>
            <div className="flex-1 min-w-[200px] space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest pl-1">No. WhatsApp (Optional)</label>
              <input 
                type="text" 
                value={newWA} 
                onChange={(e) => setNewWA(e.target.value)}
                placeholder="Ex: 08123456789"
                className="w-full bg-zinc-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-white/20 transition-all outline-none"
              />
            </div>
            <button 
              disabled={isSubmitting}
              type="submit"
              className="bg-white text-black px-8 py-3 rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all disabled:opacity-50 h-[44px]"
            >
              {isSubmitting ? 'Processing...' : 'Add Guest'}
            </button>
          </form>

          {/* Invitation Table */}
          <div className="bg-zinc-900/50 rounded-3xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5">
                    <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-zinc-400 w-16">No</th>
                    <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-zinc-400">Nama</th>
                    <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-zinc-400">No. WA</th>
                    <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-zinc-400">Link</th>
                    <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-zinc-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence>
                  {invitations.map((invite, idx) => (
                    <motion.tr 
                      key={invite.id} 
                      className="hover:bg-white/5 transition-colors group"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td className="px-6 py-4 text-zinc-500 font-mono">{idx + 1}</td>
                      <td className="px-6 py-4 font-bold">{invite.name}</td>
                      <td className="px-6 py-4 text-zinc-400 font-mono">{invite.whatsapp || '-'}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <code className="bg-black/50 px-2 py-1 rounded text-[10px] text-zinc-400">?to={invite.slug}</code>
                          <button 
                            onClick={() => copyToClipboard(`${baseUrl}/?to=${invite.slug}`)}
                            className="p-1.5 hover:bg-white/10 rounded-lg transition-all text-zinc-500 hover:text-white"
                          >
                            <span className="material-symbols-outlined text-sm">content_copy</span>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {invite.whatsapp && (
                            <a 
                              href={getWALink(invite)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="size-8 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-full flex items-center justify-center transition-all"
                            >
                              <span className="material-symbols-outlined text-sm">share</span>
                            </a>
                          )}
                          <button 
                            onClick={() => handleDeleteInvitation(invite.id)}
                            className="size-8 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                  </AnimatePresence>
                  {invitations.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-zinc-500 italic">Belum ada tamu yang ditambahkan.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* RSVP Results Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-zinc-400">check_circle</span>
            <h2 className="text-2xl font-bold italic">RSVP Responses</h2>
          </div>

          <div className="bg-zinc-900/50 rounded-3xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5">
                    <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-zinc-400">Tamu</th>
                    <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-zinc-400">Kehadiran</th>
                    <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-zinc-400 w-1/3">Pesan</th>
                    <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-zinc-400 text-right">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-bold">{rsvp.name}</td>
                      <td className="px-6 py-4">
                        {rsvp.attending ? (
                          <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Hadir</span>
                        ) : (
                          <span className="bg-zinc-500/10 text-zinc-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Absen</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-zinc-400 italic">
                        {rsvp.message ? `"${rsvp.message}"` : '-'}
                      </td>
                      <td className="px-6 py-4 text-right text-zinc-500 text-[10px] font-mono">
                        {new Date(rsvp.created_at).toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))}
                  {rsvps.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-zinc-500 italic">Belum ada respon RSVP.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
