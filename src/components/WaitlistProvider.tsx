"use client";

import { createContext, useContext, useState, useCallback } from "react";
import WaitlistModal from "./WaitlistModal";

const WaitlistContext = createContext<() => void>(() => {});

export const useWaitlist = () => useContext(WaitlistContext);

export default function WaitlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);

  return (
    <WaitlistContext.Provider value={openModal}>
      {children}
      <WaitlistModal open={open} onClose={() => setOpen(false)} />
    </WaitlistContext.Provider>
  );
}
