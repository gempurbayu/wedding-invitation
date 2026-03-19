"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="size-10 rounded-full bg-primary/10 backdrop-blur-md border border-primary/10 flex items-center justify-center text-primary shadow-lg hover:scale-110 active:scale-95 transition-all outline-none"
      title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={theme}
          initial={{ y: 5, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -5, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2 }}
          className="material-symbols-outlined text-xl"
        >
          {theme === "light" ? "dark_mode" : "light_mode"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
