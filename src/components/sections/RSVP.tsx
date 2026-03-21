"use client";

import React from "react";
import { motion } from "framer-motion";

interface RSVPResponse {
  id: string;
  name: string;
  attending: boolean;
  message: string;
  guest_count?: number;
  created_at: string;
}

interface RSVPSectionProps {
  guestName: string;
  rsvpName: string;
  setRsvpName: (name: string) => void;
  isAttending: boolean | null;
  setIsAttending: (attending: boolean | null) => void;
  guestCount: number;
  setGuestCount: (count: number) => void;
  rsvpMessage: string;
  setRsvpMessage: (message: string) => void;
  isSubmitting: boolean;
  isSubmitted: boolean;
  setIsSubmitted: (submitted: boolean) => void;
  responses: RSVPResponse[];
  onSubmit: (e: React.FormEvent) => void;
}

export default function RSVPSection({
  guestName,
  rsvpName,
  setRsvpName,
  isAttending,
  setIsAttending,
  guestCount,
  setGuestCount,
  rsvpMessage,
  setRsvpMessage,
  isSubmitting,
  isSubmitted,
  setIsSubmitted,
  responses,
  onSubmit
}: RSVPSectionProps) {
  return (
    <section id="rsvp" className="min-h-screen py-16 bg-primary/5 transition-colors duration-500">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <div className="px-6 pb-8 text-center text-primary animate-fade-in">
          <h2 className="text-3xl font-extrabold italic mb-2">Join Our Story</h2>
          <p className="text-primary/60 text-sm font-medium italic mb-4">Please let us know if you can make it</p>
          <div className="bg-primary/10 p-4 rounded-xl border border-primary/10 inline-block animate-pulse max-w-[350px]">
            <p className="text-primary font-medium text-[10px] leading-relaxed italic">
              Besar harapan kami dapat berbagi kebahagiaan bersama. Mohon kesediaannya untuk konfirmasi paling lambat <span className="font-black not-italic text-xs">4 April 2026</span>.
            </p>
          </div>
        </div>
        {isSubmitted ? (
          <div className="px-6 py-12 text-center space-y-4 animate-zoom-in">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <span className="material-symbols-outlined text-4xl text-primary icon-filled">check_circle</span>
            </div>
            <h3 className="text-2xl font-bold text-primary italic">Terima Kasih!</h3>
            <p className="text-primary/60 italic text-sm">Konfirmasi Anda telah kami terima.</p>
            <button onClick={() => setIsSubmitted(false)} className="text-primary font-bold text-xs underline underline-offset-4 pt-4">Kirim pesan lain</button>
          </div>
        ) : (
          <form className="px-6 space-y-6 max-w-sm mx-auto animate-fade-in-up [animation-delay:0.2s]" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Full Name</label>
              <input type="text" required value={rsvpName} onChange={(e) => setRsvpName(e.target.value)} className="w-full h-14 bg-primary/5 border border-primary/10 rounded-xl px-4 outline-none transition-all placeholder:italic text-primary" placeholder="Enter your guest name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Will you attend?</label>
              <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={() => setIsAttending(true)} className={`h-14 rounded-xl border-2 transition-all font-bold ${isAttending === true ? 'bg-primary text-background border-primary shadow-lg scale-105' : 'border-primary/10 text-primary'}`}>Yes, I&apos;m In!</button>
                <button type="button" onClick={() => setIsAttending(false)} className={`h-14 rounded-xl border-2 transition-all font-bold ${isAttending === false ? 'bg-primary text-background border-primary shadow-lg scale-105' : 'border-primary/10 text-primary'}`}>Sorry, can&apos;t</button>
              </div>
            </div>
            {isAttending === true && (
              <div className="space-y-2 animate-fade-in-up">
                <label className="text-sm font-bold text-primary">Jumlah Kehadiran</label>
                <div className="relative">
                  <select value={guestCount} onChange={(e) => setGuestCount(Number(e.target.value))} className="w-full h-14 bg-primary/5 border border-primary/10 rounded-xl px-4 outline-none transition-all text-primary cursor-pointer appearance-none font-medium">
                    <option value={1} className="text-foreground">1 Orang</option>
                    <option value={2} className="text-foreground">2 Orang</option>
                    <option value={3} className="text-foreground">3 Orang</option>
                    <option value={4} className="text-foreground">4 Orang</option>
                    <option value={5} className="text-foreground">5 Orang</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary/50 pointer-events-none">expand_more</span>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Ucapan & Doa</label>
              <textarea value={rsvpMessage} onChange={(e) => setRsvpMessage(e.target.value)} className="w-full h-32 bg-primary/5 border border-primary/10 rounded-xl p-4 outline-none transition-all resize-none placeholder:italic text-primary" placeholder="Tuliskan ucapan & doa untuk mempelai..." />
            </div>
            <button type="submit" disabled={isSubmitting || !rsvpName || isAttending === null} className="w-full bg-primary text-background h-16 rounded-2xl font-black text-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 disabled:opacity-50 italic">
              {isSubmitting ? 'SENDING...' : 'CONFIRM RSVP'}
            </button>
          </form>
        )}

        {/* List of Messages */}
        {responses.length > 0 && (
          <div className="mt-12 px-6 max-w-sm mx-auto space-y-4 animate-fade-in-up">
            <h3 className="text-primary font-bold italic border-b border-primary/5 pb-2 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">chat_bubble</span>
              Guest Messages ({responses.length})
            </h3>
            <div className="max-h-80 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-primary/10">
              {responses.map((res) => (
                <div key={res.id} className="bg-primary/5 p-4 rounded-xl shadow-sm border border-primary/5 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold text-xs">{res.name}</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${res.attending ? 'bg-primary/20 text-primary' : 'bg-primary/5 text-primary/50'}`}>
                      {res.attending ? `Hadir (${res.guest_count || 1})` : 'Absen'}
                    </span>
                  </div>
                  <p className="text-sm text-primary/70 italic leading-relaxed">&quot;{res.message}&quot;</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
