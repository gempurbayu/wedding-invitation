"use client";

import React from "react";
import { motion } from "framer-motion";
import { invitationData } from "@/data/invitation";

export default function Hero({ guestName, onOpen }: { guestName: string; onOpen: () => void }) {
  return (
    <motion.section 
      key="landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 z-100 flex flex-col items-center justify-center bg-background text-center p-6 transition-colors duration-500"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/80 z-10"></div>
        <div
          className="w-full h-full bg-center bg-no-repeat bg-cover animate-fade-in"
          style={{
            backgroundImage:
              `url("${invitationData.gallery.heroImage}")`,
          }}

        ></div>
      </div>

      <div className="relative z-20 space-y-8 max-w-xs">
        <div className="space-y-2 animate-fade-in-up">
          <p className="text-white/80 text-xs font-black uppercase tracking-[0.4em]">Wedding Invitation</p>
          <h1 className="text-white text-5xl font-extrabold italic leading-tight">{invitationData.couple.groom.nickname} & {invitationData.couple.bride.nickname}</h1>

        </div>

        <div className="space-y-4 bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 animate-zoom-in [animation-delay:0.2s]">
          <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">Kepada Bapak/Ibu/Saudara/i:</p>
          <h2 className="text-white text-2xl font-bold italic">{guestName}</h2>
        </div>

        <button
          onClick={onOpen}
          className="w-full bg-primary hover:bg-primary/90 text-background py-5 rounded-2xl font-black text-xl shadow-2xl shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-3 animate-fade-in-up [animation-delay:0.4s]"
        >
          <span className="material-symbols-outlined">mail_outline</span>
          Open Invitation
        </button>
      </div>
    </motion.section>
  );
}
