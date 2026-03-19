"use client";

import React from "react";
import { motion } from "framer-motion";

export default function StorySection() {
  return (
    <section id="gallery" className="min-h-screen py-16 bg-sage/5">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
        <div className="px-6 pb-12 text-center animate-fade-in">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-sage mb-2">Our Moments</p>
          <h2 className="text-primary text-3xl font-extrabold italic">Story & Moments</h2>
          <div className="h-1 w-12 bg-accent mx-auto rounded-full mt-4"></div>
        </div>

        {/* Story Timeline */}
        <div className="px-8 pb-16 space-y-12 relative max-w-lg mx-auto border-b border-primary/5">
          <div className="absolute left-10 top-8 bottom-8 w-0.5 border-l-2 border-dashed border-primary/20"></div>
          {[
            { date: "Summer 2020", title: "First Meeting", desc: "A chance encounter at a local coffee shop that changed everything.", icon: "coffee_maker", color: "bg-sage" },
            { date: "Winter 2021", title: "The First Date", desc: "An evening walk under the city lights that felt like a lifetime.", icon: "favorite", color: "bg-primary" },
            { date: "Spring 2023", title: "The Proposal", desc: "On a quiet hilltop at sunset, she said 'Yes' to forever.", icon: "auto_awesome", color: "bg-terracotta" },
            { date: "August 2026", title: "Our Wedding", desc: "The beginning of our new chapter as Mr. & Mrs.", icon: "celebration", color: "bg-accent" }
          ].map((step, i) => (
            <div key={i} className="relative flex items-start gap-8 group animate-fade-in-up" style={{ animationDelay: `${i * 0.2}s` }}>
              <div className={`relative z-10 size-12 rounded-full ${step.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ring-4 ring-background-light`}>
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

        <div className="px-4 py-8 masonry-grid">
          {[
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDSWgyyCvIaT2b8ilZBBLsDCQfMFaBr6r-FqJGYk6163zq-CjteOjNg0yZDMD0ZS_Q_iFhC8NerCLFskuI1rhJ6L1EYuNw9q_LX6UP5Wv8M6j4pML7VHmFOQHi2JZTeExFYudhKZke-F5Vzt8xzoM7ph3MPcJmyUpkJIJuc_QlCeS23bwfCmEahiJrG_ztP2dSLDtUvRX34Ecu9yXwty5Ay8LQIZBYXwGtQb7ufeSmI6Bkl_bg3MHBnKTl_xbhzgqAqYX8OHDEY5HA",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuASYcYIvUgnQKu2X86DR1QW5UC2I-9UCkjC4x8Kp3e6gKxXN9PQ2GRDKsWWtnlMlVgi6cpaB-GA67VPzW54nbVp_gf1213VWrUTfr807j_NIvcWTBHIGCghxnJFt6ZJcXblmiSAw33FtHqXz0iv3J4oBOfewTlPBrEc3cnsGeGdKpNWGm8Yhrx6wF6z6NyocO7vhhTcvnPfgdBIg7DfNjJCOs74ZAlw6yf-wHL9f5taJc4lcj-iG1P08xC5-1OvLvyfSygvoLZ0-cw",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD-8WF3YrghFh4WFCfwn1yCdYmlr0u9hEgox4KRgm22C4BK4AX6BbhimHQ-viy_1m-3ZLc9mBxt00wjTgjwM31E3MD91U2gR-YO2W84dtJMVIGSQ3WfYYK8AvC7zHM1RIlUrggtESpF1CCNkahTdZbOuDWd7iMN_V9qewpvtrSWRYArn4VA4acLNKZTd2KM0NjAqAxzgEZvb0K3OZ2y8cBsTiszM3fqCZ0r-cXcRxXPoIzJsKuBqTMjGKVghCQGOC1K4X2QvmrP_OU",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDhe0G3A6mxjq8-lQzYD-vEc6856lla7so0xoBf5pMHviA4JDGrbiSxFMvgNtXuYNTMFg8SPUmtgXuDM3QY2fskGIMsgHlSHM45CT91woSVCcSkgSEjiAYV6Ocs0p-9BwcaHjgaL2cVuPgqbSCrvB_mMpijY4ldHthnQ_Cx-oypBOsvP3xWJyeQTJnoTPrQ58vrTVtA_KBHJM_WsPdPraj9QSfAy2rPeqfkbQasnTjEVtVhpYnkbTfPHtET9oMKYC9UDeWtbXrNJEo"
          ].map((src, i) => (
            <div key={i} className="masonry-item animate-zoom-in" style={{ animationDelay: `${i * 0.15}s` }}><img src={src} alt="Gallery" className="w-full rounded-2xl shadow-lg border border-white/20 hover:scale-[1.03] transition-transform duration-500" /></div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
