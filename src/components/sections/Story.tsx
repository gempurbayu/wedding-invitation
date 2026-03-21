"use client";

import React from "react";
import { motion } from "framer-motion";

export default function StorySection() {
  return (
    <section id="gallery" className="min-h-screen pt-16 bg-primary/5">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
        <div className="px-6 pb-12 text-center animate-fade-in">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40 mb-2">Our Moments</p>
          <h2 className="text-primary text-3xl font-extrabold italic">Story & Moments</h2>
          <div className="h-1 w-12 bg-primary/10 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Story Timeline */}
        <div className="px-8 pb-16 space-y-12 relative max-w-lg mx-auto border-b border-primary/5">
          <div className="absolute left-10 top-8 bottom-8 w-0.5 border-l-2 border-dashed border-primary/20"></div>
          {[
            { date: "2019", title: "First Meeting", desc: "A chance encounter at Hourminute coffee shop that changed everything.", icon: "coffee_maker", color: "bg-primary/20" },
            { date: "26 November 2021", title: "The First Date", desc: "Watching Gigs Normal-Normal Vol. 1 around Ciumbuleuit.", icon: "favorite", color: "bg-primary/40" },
            { date: "07 Maret 2026", title: "The Proposal", desc: "A beautiful afternoon in Palangkaraya, filled with calm and warmth.", icon: "auto_awesome", color: "bg-primary/60" },
            { date: "11 April 2026", title: "Our Wedding", desc: "The beginning of our new chapter as Mr. & Mrs.", icon: "celebration", color: "bg-primary" }

          ].map((step, i) => (
            <div key={i} className="relative flex items-start gap-8 group animate-fade-in-up" style={{ animationDelay: `${i * 0.2}s` }}>
              <div className={`relative z-10 size-12 rounded-full ${step.color} text-background flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ring-4 ring-background`}>
                <span className="material-symbols-outlined text-xl">{step.icon}</span>
              </div>
              <div className="flex-1 pt-1">
                <p className="text-xs font-black text-primary/60 uppercase tracking-widest mb-1">{step.date}</p>
                <h4 className="text-lg font-bold text-primary mb-2">{step.title}</h4>
                <p className="text-sm text-primary/60 leading-relaxed italic">&quot;{step.desc}&quot;</p>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-8 grid grid-cols-2 gap-4">
          {[
            "/photos/DSC06556.webp",
            "/photos/DSC06577.webp",
            "/photos/DSC06580.webp",
            "/photos/DSC06925.webp",
            "/photos/DSC06605.webp",
            "/photos/DSC06608.webp",
          ].map((src, i) => (
            <div
              key={i}
              className="animate-zoom-in aspect-square overflow-hidden rounded-2xl shadow-lg border border-primary/10"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <img
                src={src}
                alt="Gallery"
                className="w-full h-full object-cover object-bottom hover:scale-110 transition-transform duration-700"
              />
            </div>
          ))}
        </div>


        {/* Horizontal Carousel */}
        <div className="mt-8 overflow-hidden">
          <div className="px-6 mb-4 flex items-center justify-between animate-fade-in [animation-delay:0.5s]">
            <h3 className="text-primary font-bold text-sm italic tracking-tight">Gallery Highlights</h3>
            <div className="flex items-center gap-2 text-primary/30">
              <span className="text-[10px] font-black uppercase tracking-widest">Swipe</span>
              <span className="material-symbols-outlined text-xs animate-pulse">keyboard_double_arrow_right</span>
            </div>
          </div>
          <div className="flex overflow-x-auto gap-4 px-6 pb-4 no-scrollbar snap-x snap-mandatory scroll-smooth">
            {[
              "/photos/DSC06690.webp",
              "/photos/DSC06746.webp",
              "/photos/DSC06597.webp",
              "/photos/DSC06793.webp",
              "/photos/DSC06801.webp",
              "/photos/DSC06838.webp",
              "/photos/DSC06888.webp",
              "/photos/DSC06891.webp",
              "/photos/DSC06900.webp",
              "/photos/DSC06902.webp",
              "/photos/DSC06933.webp",
            ].map((src, i) => (
              <div key={i} className="w-80 flex-shrink-0 h-64 rounded-2xl overflow-hidden shadow-xl border border-primary/10 snap-center transition-all duration-300 hover:scale-[1.02]">
                <img src={src} alt="Gallery Carousel" className="w-full h-full object-cover object-center" />
              </div>
            ))}
          </div>
        </div>


      </motion.div>
    </section>
  );
}
