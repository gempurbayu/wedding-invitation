"use client";

import React from "react";

const navItems = [
  { label: "Home", icon: "home", href: "#home" },
  { label: "Event", icon: "calendar_month", href: "#details" },
  { label: "Gallery", icon: "photo_library", href: "#gallery" },
  { label: "RSVP", icon: "how_to_reg", href: "#rsvp" },
  { label: "Gift", icon: "featured_seasonal_and_gifts", href: "#gift" },
];

export default function BottomNav() {
  const [activeSegment, setActiveSegment] = React.useState("#home");

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top < 200) {
          setActiveSegment(`#${section}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none pb-4 px-4">
      <div className="w-full max-w-md bg-white/40 backdrop-blur-xl border border-primary/10 rounded-2xl px-2 py-3 flex justify-around items-center pointer-events-auto shadow-2xl">
        {navItems.map((item) => {
          const isActive = activeSegment === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-all duration-300 relative px-2 ${
                isActive ? "text-primary scale-110" : "text-primary/40 hover:text-primary"
              }`}
            >
              <span className={`material-symbols-outlined text-2xl ${isActive ? "icon-filled" : ""}`}>
                {item.icon}
              </span>
              <p className="text-[9px] font-black uppercase tracking-widest">{item.label}</p>
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full" />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
