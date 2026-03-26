"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative bg-black px-4 py-2 text-center text-sm text-white">
      <div className="container mx-auto flex items-center justify-center">
        <p>Les inscriptions exposants sont clôturées</p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
          aria-label="Close announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
