"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ClosingSection() {
  return (
    <section className="py-24 bg-background text-center px-6 relative overflow-hidden transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-xs mx-auto space-y-8 relative z-10"
      >
        <div className="space-y-4">
          <p className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-4 opacity-40">Terima Kasih</p>
          <p className="text-primary/70 text-sm leading-relaxed italic">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga, apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kedua mempelai.
          </p>
        </div>

        <div className="pt-8">
          <p className="text-primary/40 text-[10px] font-black uppercase tracking-widest mb-6">Kami yang berbahagia,</p>
          <h2 className="text-primary text-4xl font-extrabold italic leading-tight">Aris & Maya</h2>
          <p className="text-primary/60 text-xs mt-4 font-medium italic">& Kel. Besar Kedua Mempelai</p>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/10 to-transparent"></div>
      <div className="absolute -bottom-24 -left-24 size-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -top-24 -right-24 size-64 bg-primary/5 rounded-full blur-3xl"></div>
    </section>
  );
}
