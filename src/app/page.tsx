"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import Countdown from "@/components/Countdown";

interface RSVPResponse {
  id: string;
  name: string;
  attending: boolean;
  message: string;
  created_at: string;
}

const CRITICAL_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA8yJ6pa4M5BqKL4VNRDNtVW1OA7RxCcvrSgyYR4ay10SX-W914WsPu6_xzDv-2cKgU7O9XRUKZRGLNCGK1GQ6srZEuiCMQbemxWj9QEwmBviXSM6DgPdeifayzFkxYcYZUHTuSLWkZkZvh9OlhcgBIQ1yET4QqLNIZuNo83Dca3RolWTWezAg-ugxXTK8XNAo-Z6sCCxpL_u3rK3JToWw8BHoCHfufeN5TB2v-D7-O2W_JLvvglGGDb-QM15Oazh3BVWq818rfVk8",
  "/groom.png",
  "/bride.png",
];

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
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
      className="fixed inset-0 z-[2000] bg-background-light flex flex-col items-center justify-center p-8 transition-colors duration-1000"
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
            className="text-terracotta/5"
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
            className="text-terracotta transition-all duration-300"
          />
        </svg>
        <div className="text-center space-y-1 z-10">
          <h2 className="text-primary font-bold italic tracking-tighter text-sm">Loading</h2>
          <p className="text-terracotta text-lg font-extrabold italic leading-none">Memories</p>
          <p className="text-primary/20 text-[8px] font-black uppercase tracking-widest">{percent}%</p>
        </div>
      </div>
    </motion.div>
  );
}

function InvitationContent() {
  const [activeSegment, setActiveSegment] = React.useState("#home");
  const [isAssetsLoaded, setIsAssetsLoaded] = React.useState(false);
  const [isOpened, setIsOpened] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "";

  const [rsvpName, setRsvpName] = React.useState(guestName);
  const [isAttending, setIsAttending] = React.useState<boolean | null>(null);
  const [rsvpMessage, setRsvpMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [responses, setResponses] = React.useState<RSVPResponse[]>([]);

  const fetchResponses = async () => {
    try {
      const res = await fetch('/api/rsvp');
      if (res.ok) {
        const data = await res.json();
        setResponses(data.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
      }
    } catch (error) {
      console.error("Failed to fetch RSVPs:", error);
    }
  };

  React.useEffect(() => {
    fetchResponses();
  }, []);

  React.useEffect(() => {
    if (guestName) setRsvpName(guestName);
  }, [guestName]);

  React.useEffect(() => {
    if (isOpened && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Autoplay prevented:", err);
      });
    }
  }, [isOpened]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-background-light selection:bg-terracotta/10">
      <AnimatePresence mode="wait">
        {!isAssetsLoaded && (
          <LoadingScreen key="loader" onComplete={() => setIsAssetsLoaded(true)} />
        )}
      </AnimatePresence>

      {/* BGM AUDIO ELEMENT */}
      <audio ref={audioRef} src="/bgm.mp3" loop />

      <AnimatePresence mode="wait">
        {isAssetsLoaded && !isOpened ? (
          <motion.section 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background-light text-center p-6"
          >
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-linear-to-b from-background-dark/40 to-background-dark/80 z-10"></div>
              <div
                className="w-full h-full bg-center bg-no-repeat bg-cover animate-fade-in"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA8yJ6pa4M5BqKL4VNRDNtVW1OA7RxCcvrSgyYR4ay10SX-W914WsPu6_xzDv-2cKgU7O9XRUKZRGLNCGK1GQ6srZEuiCMQbemxWj9QEwmBviXSM6DgPdeifayzFkxYcYZUHTuSLWkZkZvh9OlhcgBIQ1yET4QqLNIZuNo83Dca3RolWTWezAg-ugxXTK8XNAo-Z6sCCxpL_u3rK3JToWw8BHoCHfufeN5TB2v-D7-O2W_JLvvglGGDb-QM15Oazh3BVWq818rfVk8")',
                }}
              ></div>
            </div>

            <div className="relative z-20 space-y-8 max-w-xs">
              <div className="space-y-2 animate-fade-in-up">
                <p className="text-white/80 text-xs font-black uppercase tracking-[0.4em]">Wedding Invitation</p>
                <h1 className="text-white text-5xl font-extrabold italic leading-tight">Aris & Maya</h1>
              </div>

              <div className="space-y-4 bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 animate-zoom-in [animation-delay:0.2s]">
                <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">Kepada Bapak/Ibu/Saudara/i:</p>
                <h2 className="text-white text-2xl font-bold italic">{guestName}</h2>
              </div>

              <button
                onClick={() => setIsOpened(true)}
                className="w-full bg-terracotta hover:bg-terracotta/90 text-white py-5 rounded-2xl font-black text-xl shadow-2xl shadow-terracotta/40 transition-all active:scale-95 flex items-center justify-center gap-3 animate-fade-in-up [animation-delay:0.4s]"
              >
                <span className="material-symbols-outlined">mail_outline</span>
                Open Invitation
              </button>
            </div>
          </motion.section>
        ) : isAssetsLoaded && isOpened ? (
          <motion.div 
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex h-auto w-full flex-col relative"
          >
            {/* FLOATING BGM TOGGLE */}
            <div className="fixed bottom-36 left-1/2 -translate-x-1/2 w-full max-w-md z-100 pointer-events-none">
              <div className="relative w-full h-0">
                <button
                  onClick={toggleMusic}
                  className="absolute right-4 top-0 size-10 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white flex items-center justify-center shadow-lg transition-transform active:scale-90 pointer-events-auto animate-zoom-in"
                  aria-label="Toggle Music"
                >
                  <span className={`material-symbols-outlined text-xl text-terracotta ${isPlaying ? 'animate-pulse' : ''}`}>
                    {isPlaying ? 'music_note' : 'music_off'}
                  </span>
                </button>
              </div>
            </div>

            {/* SECTION: HOME */}
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
                  <div className="flex flex-col gap-3 max-w-sm mx-auto pb-12">
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
                </div>
              </motion.div>
            </section>

            {/* SECTION: COUPLE */}
            <section id="couple" className="py-16">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <div className="px-6 text-center mb-12 animate-fade-in">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-terracotta mb-2">The Happy Couple</p>
                  <h2 className="text-primary text-4xl font-extrabold italic">Mempelai</h2>
                  <div className="h-1 w-12 bg-accent mx-auto rounded-full mt-4"></div>
                </div>
                <div className="px-6 space-y-12 max-w-sm mx-auto">
                  <div className="text-center space-y-6 animate-fade-in-up">
                    <div className="relative size-56 mx-auto group">
                      <div className="absolute inset-0 border-2 border-terracotta/20 rounded-full scale-110 group-hover:scale-125 transition-transform duration-700"></div>
                      <div className="w-full h-full rounded-full bg-center bg-cover border-4 border-white shadow-2xl overflow-hidden transform group-hover:rotate-3 transition-transform" style={{ backgroundImage: "url('/groom.png')" }}></div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-primary text-3xl font-black italic">Aris S.T.</h3>
                      <p className="text-slate-500 text-sm leading-relaxed px-4 italic">Putra Kedua dari <br /><span className="font-bold text-primary not-italic">Bapak Aris Sr. & Ibu Aris Sr.</span></p>
                    </div>
                  </div>
                  <div className="flex justify-center py-4 animate-zoom-in [animation-delay:0.3s]">
                    <span className="material-symbols-outlined text-5xl text-accent/40 italic animate-bounce">favorite</span>
                  </div>
                  <div className="text-center space-y-6 animate-fade-in-up [animation-delay:0.5s]">
                    <div className="relative size-56 mx-auto group">
                      <div className="absolute inset-0 border-2 border-terracotta/20 rounded-full scale-110 group-hover:scale-125 transition-transform duration-700"></div>
                      <div className="w-full h-full rounded-full bg-center bg-cover border-4 border-white shadow-2xl overflow-hidden transform group-hover:-rotate-3 transition-transform" style={{ backgroundImage: "url('/bride.png')" }}></div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-primary text-3xl font-black italic">Maya S.Kom.</h3>
                      <p className="text-slate-500 text-sm leading-relaxed px-4 italic">Putri Pertama dari <br /><span className="font-bold text-primary not-italic">Bapak Maya Sr. & Ibu Maya Sr.</span></p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            <section id="details" className="min-h-screen py-16 border-t border-primary/5">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <div className="px-6 pb-2 text-center animate-fade-in"><h2 className="text-primary text-3xl font-extrabold italic mb-2">The Celebration</h2><div className="h-1 w-12 bg-accent mx-auto rounded-full"></div></div>
                <div className="animate-zoom-in [animation-delay:0.2s]"><Countdown /></div>
                <div className="px-4 space-y-8 mt-12">
                  <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-primary/5 space-y-4 animate-fade-in-up [animation-delay:0.3s]">
                    <div className="flex items-center gap-3 mb-2"><div className="bg-primary text-white p-2 rounded-lg"><span className="material-symbols-outlined icon-filled">church</span></div><h3 className="text-primary text-xl font-bold">Pemberkatan</h3></div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3"><span className="material-symbols-outlined text-primary mt-0.5">schedule</span><div><p className="font-semibold text-primary">2:30 PM — 3:30 PM</p><p className="text-sm text-slate-500 italic text-[10px]">Mohon hadir 15 menit lebih awal</p></div></div>
                      <div className="flex items-start gap-3"><span className="material-symbols-outlined text-primary mt-0.5">location_on</span><div><p className="font-semibold text-primary">St. Mary&apos;s Botanical Garden</p><p className="text-sm text-slate-500">123 Green Valley Road, Ojai, CA</p></div></div>
                    </div>
                  </div>
                  <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-primary/5 space-y-4 animate-fade-in-up [animation-delay:0.4s]">
                    <div className="flex items-center gap-3 mb-2"><div className="bg-terracotta text-white p-2 rounded-lg"><span className="material-symbols-outlined icon-filled">celebration</span></div><h3 className="text-primary text-xl font-bold">Acara Resepsi</h3></div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3"><span className="material-symbols-outlined text-terracotta mt-0.5">restaurant</span><div><p className="font-semibold text-primary">5:00 PM — 11:00 PM</p><p className="text-sm text-slate-500 italic text-[10px]">Cocktails, Makan Malam & Hiburan</p></div></div>
                      <div className="flex items-start gap-3"><span className="material-symbols-outlined text-terracotta mt-0.5">home_pin</span><div><p className="font-semibold text-primary">St. Mary&apos;s Botanical Garden</p><p className="text-sm text-slate-500">123 Green Valley Road, Ojai, CA</p></div></div>
                    </div>
                  </div>
                  <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-primary/5 space-y-6 animate-fade-in-up [animation-delay:0.5s]">
                    <div className="flex items-center gap-3 mb-2"><div className="bg-accent text-white p-2 rounded-lg"><span className="material-symbols-outlined icon-filled">map</span></div><h3 className="text-primary text-xl font-bold">Lokasi Acara</h3></div>
                    <div className="w-full h-48 rounded-xl overflow-hidden border border-primary/10 bg-center bg-cover hover:scale-[1.02] transition-transform duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAzYLRYN6Wr5uyUiUDPf3XjpOcK7Kf3yu1KLvfQEHFXJjFUBsdAZ5YNpGTpUn9Sle-xDrxdAFZvk71mSMO0rQRFHlFLo-BRKIzNKtaEo2gbTw90jMgagJjZ-G_YyeWK6wp-eH49AgycbDCWgFcduOFY_aCqxsPKaZtikwEeqgWU4ZkL408q-mNuB4lHIi_Ice71_7NbWV9MoipN0QA9KCA_2h3tS82cgWGeb-IcMvATyAEYHl6bdO8KwI2_qyAR_29JLOj29RjXqUc')" }}></div>
                    <a href="https://www.google.com/maps/search/?api=1&query=St.+Mary%27s+Botanical+Garden" target="_blank" rel="noopener noreferrer" className="w-full bg-primary text-white h-14 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg active:scale-95"><span className="material-symbols-outlined">directions</span> Buka di Google Maps</a>
                  </div>
                </div>
              </motion.div>
            </section>

            <section id="gallery" className="min-h-screen py-16 bg-sage/5">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                <div className="px-6 pb-12 text-center animate-fade-in"><p className="text-[10px] font-black uppercase tracking-[0.4em] text-sage mb-2">Our Moments</p><h2 className="text-primary text-3xl font-extrabold italic">Story & Moments</h2><div className="h-1 w-12 bg-accent mx-auto rounded-full mt-4"></div></div>
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

            <section id="rsvp" className="min-h-screen py-16 bg-white/20">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <div className="px-6 pb-8 text-center text-primary animate-fade-in"><h2 className="text-3xl font-extrabold italic mb-2">Join Our Story</h2><p className="text-primary/60 text-sm font-medium italic">Please let us know if you can make it</p></div>
                {isSubmitted ? (
                  <div className="px-6 py-12 text-center space-y-4 animate-zoom-in"><div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce"><span className="material-symbols-outlined text-4xl text-primary icon-filled">check_circle</span></div><h3 className="text-2xl font-bold text-primary italic">Terima Kasih!</h3><p className="text-primary/60 italic text-sm">Konfirmasi Anda telah kami terima.</p><button onClick={() => setIsSubmitted(false)} className="text-primary font-bold text-xs underline underline-offset-4 pt-4">Kirim pesan lain</button></div>
                ) : (
                  <form className="px-6 space-y-6 max-w-sm mx-auto animate-fade-in-up [animation-delay:0.2s]" onSubmit={async (e) => { e.preventDefault(); if (!rsvpName || isAttending === null) return; setIsSubmitting(true); try { const res = await fetch('/api/rsvp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: rsvpName, attending: isAttending, message: rsvpMessage }) }); if (res.ok) { setIsSubmitted(true); setRsvpMessage(""); fetchResponses(); } } catch (error) { console.error(error); } finally { setIsSubmitting(false); } }}>
                    <div className="space-y-2"><label className="text-sm font-bold text-primary">Full Name</label><input type="text" required value={rsvpName} onChange={(e) => setRsvpName(e.target.value)} className="w-full h-14 bg-white/40 border border-primary/10 rounded-xl px-4 outline-none transition-all placeholder:italic" placeholder="Enter your guest name" /></div>
                    <div className="space-y-2"><label className="text-sm font-bold text-primary">Will you attend?</label><div className="grid grid-cols-2 gap-4"><button type="button" onClick={() => setIsAttending(true)} className={`h-14 rounded-xl border-2 transition-all font-bold ${isAttending === true ? 'bg-primary text-white border-primary shadow-lg scale-105' : 'border-primary/10 text-primary'}`}>Yes, I&apos;m In!</button><button type="button" onClick={() => setIsAttending(false)} className={`h-14 rounded-xl border-2 transition-all font-bold ${isAttending === false ? 'bg-primary text-white border-primary shadow-lg scale-105' : 'border-primary/10 text-primary'}`}>Sorry, can&apos;t</button></div></div>
                    <div className="space-y-2"><label className="text-sm font-bold text-primary">Ucapan & Doa</label><textarea value={rsvpMessage} onChange={(e) => setRsvpMessage(e.target.value)} className="w-full h-32 bg-white/40 border border-primary/10 rounded-xl p-4 outline-none transition-all resize-none placeholder:italic" placeholder="Tuliskan ucapan & doa untuk mempelai..." /></div>
                    <button type="submit" disabled={isSubmitting || !rsvpName || isAttending === null} className="w-full bg-primary text-white h-16 rounded-2xl font-black text-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 disabled:opacity-50 italic">
                      {isSubmitting ? 'SENDING...' : 'CONFIRM RSVP'}
                    </button>
                  </form>
                )}
              </motion.div>
            </section>

            <section id="gift" className="min-h-screen py-16 bg-primary text-white">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <div className="px-8 pb-12 text-center animate-fade-in"><span className="material-symbols-outlined text-5xl mb-4 icon-filled opacity-80 animate-bounce">featured_seasonal_and_gifts</span><h2 className="text-3xl font-black italic mb-4">Wedding Gift</h2></div>
                <div className="px-6 space-y-6">
                  <div className="bg-white/90 rounded-3xl p-8 text-primary shadow-2xl relative overflow-hidden animate-zoom-in [animation-delay:0.3s]">
                    <div className="mb-8"><p className="text-primary font-mono text-2xl font-bold tracking-tighter">8820 4491 300</p><p className="text-[10px] uppercase font-black text-primary/40 mt-1">Aris & Maya</p></div>
                    <button className="w-full h-12 bg-primary text-white rounded-xl font-bold">Copy Account Number</button>
                  </div>
                </div>
              </motion.div>
            </section>

            <div className="h-24"></div>
            <BottomNav />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background-light animate-pulse flex items-center justify-center"><div className="w-12 h-12 border-4 border-terracotta border-t-transparent rounded-full animate-spin"></div></div>}>
      <InvitationContent />
    </Suspense>
  );
}
