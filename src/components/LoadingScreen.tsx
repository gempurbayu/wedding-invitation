"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CRITICAL_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA8yJ6pa4M5BqKL4VNRDNtVW1OA7RxCcvrSgyYR4ay10SX-W914WsPu6_xzDv-2cKgU7O9XRUKZRGLNCGK1GQ6srZEuiCMQbemxWj9QEwmBviXSM6DgPdeifayzFkxYcYZUHTuSLWkZkZvh9OlhcgBIQ1yET4QqLNIZuNo83Dca3RolWTWezAg-ugxXTK8XNAo-Z6sCCxpL_u3rK3JToWw8BHoCHfufeN5TB2v-D7-O2W_JLvvglGGDb-QM15Oazh3BVWq818rfVk8",
  "/groom.png",
  "/bride.png",
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const total = CRITICAL_IMAGES.length;

    if (total === 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      onComplete(); // Failsafe after 5 seconds
    }, 5000);

    CRITICAL_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        setPercent(Math.round((loadedCount / total) * 100));
        if (loadedCount === total) {
          clearTimeout(timer);
          setTimeout(onComplete, 500); // Slight delay for smoothness
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === total) {
          clearTimeout(timer);
          onComplete();
        }
      };
    });

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-2000 bg-background flex flex-col items-center justify-center p-8 transition-colors duration-1000"
    >
      <div className="relative size-40 flex items-center justify-center">
        <svg className="absolute inset-0 size-40 -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="76"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="transparent"
            className="text-primary/5"
          />
          <motion.circle
            cx="80"
            cy="80"
            r="76"
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            strokeDasharray="478"
            strokeDashoffset={478 - (478 * percent) / 100}
            strokeLinecap="round"
            className="text-primary transition-all duration-300"
          />
        </svg>
        <div className="text-center space-y-1 z-10">
          <h2 className="text-primary font-bold italic tracking-tighter text-sm">Loading</h2>
          <p className="text-primary text-lg font-extrabold italic leading-none opacity-60">Memories</p>
          <p className="text-primary/20 text-[8px] font-black uppercase tracking-widest">{percent}%</p>
        </div>
      </div>
    </motion.div>
  );
}
