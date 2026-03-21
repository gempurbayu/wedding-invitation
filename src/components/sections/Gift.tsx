"use client";

import React from "react";
import { motion } from "framer-motion";

export default function GiftSection() {
  const accountNumber = "7750 9748 69";

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber.replace(/\s/g, ""));
    alert("Nomor rekening disalin!");
  };

  return (
    <section id="gift" className="min-h-screen py-16 bg-primary text-background text-center transition-colors duration-500">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <div className="px-8 pb-12 text-center animate-fade-in">
          <span className="material-symbols-outlined text-5xl mb-4 icon-filled opacity-80 animate-bounce text-background">featured_seasonal_and_gifts</span>
          <h2 className="text-3xl font-black italic mb-4 text-background">Wedding Gift</h2>
          <p className="text-background/60 text-sm italic max-w-xs mx-auto">Doa restu Anda merupakan kado terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih, Anda dapat memberikannya melalui:</p>
        </div>
        <div className="px-6 space-y-6 max-w-sm mx-auto">
          <div className="bg-background rounded-3xl p-8 text-primary shadow-2xl relative overflow-hidden animate-zoom-in [animation-delay:0.3s]">
            <div className="mb-8 text-center">
              <p className="text-[10px] uppercase font-black text-primary/40 mb-1">Transfer Bank</p>
              <p className="text-primary font-mono text-2xl font-bold tracking-tighter">{accountNumber}</p>
              <p className="text-xs font-bold text-primary mt-1">Bank BCA - Joel Andrew M.K. Ginting</p>
            </div>

            <button
              onClick={handleCopy}
              className="w-full h-12 bg-primary text-background rounded-xl font-bold active:scale-95 transition-transform"
            >
              Copy Account Number
            </button>
          </div>

          {/* <div className="bg-background rounded-3xl p-8 text-primary shadow-2xl relative overflow-hidden animate-zoom-in [animation-delay:0.4s]">
            <div className="flex flex-col items-center gap-6">
              <div className="size-48 bg-white p-2 rounded-2xl shadow-inner border border-primary/5">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WeddingGiftArisMaya" 
                  alt="QRIS" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <p className="text-[10px] uppercase font-black text-primary/40 text-center">Scan QRIS for Digital Gift</p>
            </div>
          </div> */}
        </div>
      </motion.div>
    </section>
  );
}
