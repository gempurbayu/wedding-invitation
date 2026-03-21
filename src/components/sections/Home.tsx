"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HomeSection() {
  return (
    <section id="home" className="min-h-screen flex flex-col pt-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col h-full"
      >
        <div className="px-4 py-2 flex flex-col justify-center">
          <div className="relative w-full aspect-[4/5] max-h-[60vh] overflow-hidden rounded-3xl shadow-2xl animate-zoom-in">
            <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent z-10"></div>
            <div
              className="w-full h-full bg-center bg-no-repeat bg-cover transform hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage:
                  'url("/photos/DSC06801.webp")',
              }}
            ></div>
            <div className="absolute bottom-8 left-0 right-0 z-20 px-6 text-center animate-fade-in-up [animation-delay:0.3s]">
              <p className="text-white/90 text-xs font-black tracking-[0.4em] uppercase mb-3 opacity-80">Save the Date</p>
              <h1 className="text-white text-5xl font-extrabold leading-tight italic drop-shadow-2xl">Joel & Vio</h1>
            </div>
          </div>
        </div>


        <div className="px-6 py-8 text-center space-y-8 animate-fade-in-up [animation-delay:0.5s]">
          <div className="space-y-2">
            <h2 className="text-primary text-2xl font-bold tracking-tight uppercase">April 11th, 2026</h2>
            <p className="text-primary/60 font-medium italic">At My Pisita Anyer Resort</p>
          </div>
          <div className="flex flex-col gap-3 max-w-sm mx-auto">
            <a
              href="https://www.google.com/calendar/render?action=TEMPLATE&text=Joel+%26+Vio+Wedding&dates=20260411T133000/20260411T200000&details=Join+us+for+our+special+day!+Adat+Dayak+at+1:30+PM,+Pemberkatan+at+4:15+PM.&location=My+Pisita+Anyer+Resort,+Banten"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-primary hover:bg-primary/90 text-background py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/10 transition-all text-center flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <span className="material-symbols-outlined text-xl">calendar_add_on</span>
              Save to Google Calendar
            </a>
          </div>


          {/* Animated Scroll Down indicator */}
          <div className="flex flex-col items-center gap-3 pt-4 opacity-40 animate-fade-in [animation-delay:1s]">
            <div className="w-[20px] h-[32px] border-2 border-primary/20 rounded-full flex justify-center p-1.5">
              <motion.div
                animate={{
                  y: [0, 8, 0],
                  opacity: [1, 0.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-[3px] h-[6px] bg-primary rounded-full"
              />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Scroll Down</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
