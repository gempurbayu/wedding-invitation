"use client";

import React from "react";
import { motion } from "framer-motion";
import Countdown from "@/components/Countdown";

export default function DetailsSection() {
  return (
    <section id="details" className="min-h-screen py-16 border-t border-primary/5">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <div className="px-6 pb-2 text-center animate-fade-in"><h2 className="text-primary text-3xl font-extrabold italic mb-2">The Celebration</h2><div className="h-1 w-12 bg-primary/10 mx-auto rounded-full"></div></div>
        <div className="animate-zoom-in [animation-delay:0.2s]"><Countdown /></div>
        <div className="px-4 space-y-8 mt-12">
          <div className="bg-primary/5 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-primary/5 space-y-4 animate-fade-in-up [animation-delay:0.3s]">
            <div className="flex items-center gap-3 mb-2"><div className="bg-primary text-background p-2 rounded-lg"><span className="material-symbols-outlined icon-filled">gavel</span></div><h3 className="text-primary text-xl font-bold">Pernikahan Adat Dayak</h3></div>
            <div className="space-y-3">
              <div className="flex items-start gap-3"><span className="material-symbols-outlined text-primary mt-0.5">schedule</span><div><p className="font-semibold text-primary">13.30 — 15.00 WIB</p><p className="text-sm text-primary/50 italic text-[10px]">Villa My Pisita Anyer</p></div></div>
              <div className="flex items-start gap-3"><span className="material-symbols-outlined text-primary mt-0.5">location_on</span><div><p className="font-semibold text-primary">My Pisita Anyer Resort</p><p className="text-sm text-primary/50 text-[10px]">Jl. Raya Anyer-Sirih No.Km.129, Anyar, Banten</p></div></div>
            </div>
          </div>
          <div className="bg-primary/5 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-primary/5 space-y-4 animate-fade-in-up [animation-delay:0.4s]">
            <div className="flex items-center gap-3 mb-2"><div className="bg-primary/10 text-primary p-2 rounded-lg"><span className="material-symbols-outlined icon-filled">celebration</span></div><h3 className="text-primary text-xl font-bold">Pemberkatan & Resepsi</h3></div>
            <div className="space-y-3">
              <div className="flex items-start gap-3"><span className="material-symbols-outlined text-primary mt-0.5">restaurant</span><div><p className="font-semibold text-primary">16.15 — 17.30 WIB</p><p className="text-sm text-primary/50 italic text-[10px]">Villa My Pisita Anyer</p></div></div>
              <div className="flex items-start gap-3"><span className="material-symbols-outlined text-primary mt-0.5">home_pin</span><div><p className="font-semibold text-primary">My Pisita Anyer Resort</p><p className="text-sm text-primary/50 text-[10px]">Jl. Raya Anyer-Sirih No.Km.129, Anyar, Banten</p></div></div>
            </div>
          </div>
          <div className="bg-primary/5 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-primary/5 space-y-6 animate-fade-in-up [animation-delay:0.5s]">
            <div className="flex items-center gap-3 mb-2"><div className="bg-primary p-2 rounded-lg text-background"><span className="material-symbols-outlined icon-filled">map</span></div><h3 className="text-primary text-xl font-bold">Lokasi Acara</h3></div>
            <div className="w-full h-48 rounded-xl overflow-hidden border border-primary/10 bg-center bg-cover hover:scale-[1.02] transition-transform duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAzYLRYN6Wr5uyUiUDPf3XjpOcK7Kf3yu1KLvfQEHFXJjFUBsdAZ5YNpGTpUn9Sle-xDrxdAFZvk71mSMO0rQRFHlFLo-BRKIzNKtaEo2gbTw90jMgagJjZ-G_YyeWK6wp-eH49AgycbDCWgFcduOFY_aCqxsPKaZtikwEeqgWU4ZkL408q-mNuB4lHIi_Ice71_7NbWV9MoipN0QA9KCA_2h3tS82cgWGeb-IcMvATyAEYHl6bdO8KwI2_qyAR_29JLOj29RjXqUc')" }}></div>
            <a href="https://www.google.com/maps/search/?api=1&query=My+Pisita+Anyer+Resort" target="_blank" rel="noopener noreferrer" className="w-full bg-primary text-background h-14 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg active:scale-95"><span className="material-symbols-outlined">directions</span> Buka di Google Maps</a>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
