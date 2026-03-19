"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CoupleSection() {
  return (
    <section id="couple" className="py-16">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <div className="px-6 text-center mb-12 animate-fade-in">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-terracotta mb-2">The Happy Couple</p>
          <h2 className="text-primary text-4xl font-extrabold italic">Mempelai</h2>
          <div className="h-1 w-12 bg-accent mx-auto rounded-full mt-4"></div>
        </div>
        <div className="px-6 space-y-12 max-w-sm mx-auto">
          <div className="text-center space-y-6 animate-fade-in-up">
            <div className="relative size-56 mx-auto group">
              <div className="absolute inset-0 border-2 border-terracotta/20 rounded-full scale-110 group-hover:scale-125 transition-transform duration-700"></div>
              <div className="w-full h-full rounded-full bg-center bg-cover border-4 border-white shadow-2xl overflow-hidden transform group-hover:rotate-3 transition-transform" style={{ backgroundImage: "url('/groom.png')" }}></div>
            </div>
            <div className="space-y-3">
              <h3 className="text-primary text-3xl font-black italic">Aris S.T.</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4 italic">Putra Kedua dari <br /><span className="font-bold text-primary not-italic">Bapak Aris Sr. & Ibu Aris Sr.</span></p>
            </div>
          </div>
          <div className="flex justify-center py-4 animate-zoom-in [animation-delay:0.3s]">
            <span className="material-symbols-outlined text-5xl text-accent/40 italic animate-bounce">favorite</span>
          </div>
          <div className="text-center space-y-6 animate-fade-in-up [animation-delay:0.5s]">
            <div className="relative size-56 mx-auto group">
              <div className="absolute inset-0 border-2 border-terracotta/20 rounded-full scale-110 group-hover:scale-125 transition-transform duration-700"></div>
              <div className="w-full h-full rounded-full bg-center bg-cover border-4 border-white shadow-2xl overflow-hidden transform group-hover:-rotate-3 transition-transform" style={{ backgroundImage: "url('/bride.png')" }}></div>
            </div>
            <div className="space-y-3">
              <h3 className="text-primary text-3xl font-black italic">Maya S.Kom.</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4 italic">Putri Pertama dari <br /><span className="font-bold text-primary not-italic">Bapak Maya Sr. & Ibu Maya Sr.</span></p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
