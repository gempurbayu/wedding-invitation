"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HomeSection() {
  return (
    <section id="home" className="min-h-screen flex flex-col pt-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="px-4 py-4 flex flex-col justify-center">
          <div className="relative w-full aspect-4/5 overflow-hidden rounded-xl shadow-2xl animate-zoom-in">
            <div className="absolute inset-0 bg-linear-to-t from-background-dark/60 via-transparent to-transparent z-10"></div>
            <div
              className="w-full h-full bg-center bg-no-repeat bg-cover transform hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA8yJ6pa4M5BqKL4VNRDNtVW1OA7RxCcvrSgyYR4ay10SX-W914WsPu6_xzDv-2cKgU7O9XRUKZRGLNCGK1GQ6srZEuiCMQbemxWj9QEwmBviXSM6DgPdeifayzFkxYcYZUHTuSLWkZkZvh9OlhcgBIQ1yET4QqLNIZuNo83Dca3RolWTWezAg-ugxXTK8XNAo-Z6sCCxpL_u3rK3JToWw8BHoCHfufeN5TB2v-D7-O2W_JLvvglGGDb-QM15Oazh3BVWq818rfVk8")',
              }}
            ></div>
            <div className="absolute bottom-6 left-0 right-0 z-20 px-6 text-center animate-fade-in-up [animation-delay:0.3s]">
              <p className="text-white/90 text-sm font-medium tracking-[0.2em] uppercase mb-2">Save the Date</p>
              <h1 className="text-white text-4xl font-extrabold leading-tight mb-4 italic">Aris & Maya</h1>
            </div>
          </div>
        </div>

        <div className="px-6 py-8 text-center space-y-8 animate-fade-in-up [animation-delay:0.5s]">
          <div className="space-y-2">
            <h2 className="text-terracotta text-2xl font-bold tracking-tight">August 24th, 2026</h2>
            <p className="text-sage font-medium italic">At The Whispering Pines Estate</p>
          </div>
          <div className="flex flex-col gap-3 max-w-sm mx-auto">
            <a
              href="https://www.google.com/calendar/render?action=TEMPLATE&text=Aris+%26+Maya+Wedding&dates=20260824T143000/20260824T230000&details=Join+us+for+our+special+day!+Ceremony+at+2:30+PM,+Reception+at+5:00+PM.&location=St.+Mary's+Botanical+Garden,+Ojai,+CA"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all text-center flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <span className="material-symbols-outlined text-xl">calendar_add_on</span>
              Save to Google Calendar
            </a>
          </div>

          {/* Animated Scroll Down indicator */}
          <div className="flex flex-col items-center gap-3 pt-4 opacity-30 animate-fade-in [animation-delay:1s]">
            <div className="w-[20px] h-[32px] border-2 border-primary rounded-full flex justify-center p-1.5">
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
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Scroll Down</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
