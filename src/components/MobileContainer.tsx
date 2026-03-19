import React from "react";

export default function MobileContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center min-h-screen bg-neutral-100 dark:bg-neutral-900">
      <div className="relative w-full max-w-md bg-background-light dark:bg-background-dark shadow-2xl min-h-screen overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
