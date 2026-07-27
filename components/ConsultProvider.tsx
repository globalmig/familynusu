"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import ConsultModal from "./ConsultModal";

type ConsultContextValue = {
  open: () => void;
};

const ConsultContext = createContext<ConsultContextValue | null>(null);

export function useConsult() {
  const ctx = useContext(ConsultContext);
  if (!ctx) {
    throw new Error("useConsult는 ConsultProvider 내부에서만 사용할 수 있습니다.");
  }
  return ctx;
}

export default function ConsultProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ConsultContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      <ConsultModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ConsultContext.Provider>
  );
}
