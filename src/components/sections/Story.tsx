"use client";

import React from "react";
import { motion } from "framer-motion";
import { invitationData } from "@/data/invitation";

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
          {invitationData.story.map((step, i) => {
            const icons = ["coffee_maker", "favorite", "auto_awesome", "celebration"];
            const colors = ["bg-primary/20", "bg-primary/40", "bg-primary/60", "bg-primary"];
            return (
              <div key={i} className="relative flex items-start gap-8 group animate-fade-in-up" style={{ animationDelay: `${i * 0.2}s` }}>
                <div className={`relative z-10 size-12 rounded-full ${colors[i]} text-background flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ring-4 ring-background`}>
                  <span className="material-symbols-outlined text-xl">{icons[i]}</span>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-xs font-black text-primary/60 uppercase tracking-widest mb-1">{step.year}</p>
                  <h4 className="text-lg font-bold text-primary mb-2">{step.title}</h4>
                  <p className="text-sm text-primary/60 leading-relaxed italic">&quot;{step.description}&quot;</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="px-4 py-8 grid grid-cols-2 gap-4">
          {invitationData.gallery.gridImages.map((src, i) => (
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
            {invitationData.gallery.carouselImages.map((image, i) => (
              <div key={i} className="w-80 flex-shrink-0 h-72 rounded-2xl overflow-hidden shadow-xl border border-primary/10 snap-center transition-all duration-300 hover:scale-[1.02]">
                <img src={image.src} alt="Gallery Carousel" className={`w-full h-full object-cover ${image.position || 'object-center'}`} />
              </div>
            ))}
          </div>
        </div>


      </motion.div>
    </section>
  );
}
