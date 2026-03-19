"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense, useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";

// Components
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import HomeSection from "@/components/sections/Home";
import CoupleSection from "@/components/sections/Couple";
import DetailsSection from "@/components/sections/Details";
import StorySection from "@/components/sections/Story";
import RSVPSection from "@/components/sections/RSVP";
import GiftSection from "@/components/sections/Gift";

interface RSVPResponse {
  id: string;
  name: string;
  attending: boolean;
  message: string;
  created_at: string;
}

function InvitationContent() {
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "Tamu Undangan";

  // RSVP States
  const [rsvpName, setRsvpName] = useState(guestName);
  const [isAttending, setIsAttending] = useState<boolean | null>(null);
  const [rsvpMessage, setRsvpMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responses, setResponses] = useState<RSVPResponse[]>([]);

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

  useEffect(() => {
    fetchResponses();
  }, []);

  useEffect(() => {
    if (guestName !== "Tamu Undangan") setRsvpName(guestName);
  }, [guestName]);

  useEffect(() => {
    if (isOpened && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Autoplay blocked:", err);
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

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || isAttending === null) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: rsvpName,
          attending: isAttending,
          message: rsvpMessage
        })
      });
      if (res.ok) {
        setIsSubmitted(true);
        setRsvpMessage("");
        fetchResponses();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light selection:bg-terracotta/10 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!isAssetsLoaded && (
          <LoadingScreen key="loader" onComplete={() => setIsAssetsLoaded(true)} />
        )}
      </AnimatePresence>

      <audio ref={audioRef} src="/bgm.mp3" loop />

      <AnimatePresence mode="wait">
        {isAssetsLoaded && !isOpened ? (
          <Hero guestName={guestName} onOpen={() => setIsOpened(true)} />
        ) : isAssetsLoaded && isOpened ? (
          <motion.div 
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex h-auto w-full flex-col relative"
          >
            {/* Music Controls */}
            <div className="fixed bottom-36 left-1/2 -translate-x-1/2 w-full max-w-md z-100 pointer-events-none">
              <div className="relative w-full h-0">
                <button
                  onClick={toggleMusic}
                  className="absolute right-4 top-0 size-10 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white flex items-center justify-center shadow-lg transition-transform active:scale-90 pointer-events-auto animate-zoom-in"
                >
                  <span className={`material-symbols-outlined text-xl text-terracotta ${isPlaying ? 'animate-pulse' : ''}`}>
                    {isPlaying ? 'music_note' : 'music_off'}
                  </span>
                </button>
              </div>
            </div>

            <HomeSection />
            <CoupleSection />
            <DetailsSection />
            <StorySection />
            <RSVPSection 
              guestName={guestName}
              rsvpName={rsvpName}
              setRsvpName={setRsvpName}
              isAttending={isAttending}
              setIsAttending={setIsAttending}
              rsvpMessage={rsvpMessage}
              setRsvpMessage={setRsvpMessage}
              isSubmitting={isSubmitting}
              isSubmitted={isSubmitted}
              setIsSubmitted={setIsSubmitted}
              responses={responses}
              onSubmit={handleRSVPSubmit}
            />
            <GiftSection />

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
    <Suspense fallback={
      <div className="min-h-screen bg-background-light animate-pulse flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-terracotta border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <InvitationContent />
    </Suspense>
  );
}
