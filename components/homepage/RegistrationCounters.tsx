"use client";

import { useEffect, useState } from "react";

type Stats = {
  exposants: number;
  concours: number;
  configured: boolean;
};

export default function RegistrationCounters() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const response = await fetch("/api/inscriptions", { cache: "no-store" });
        if (!response.ok) {
          if (!ignore) {
            setStats({ exposants: 0, concours: 0, configured: false });
          }
          return;
        }

        const data = (await response.json()) as Stats;
        if (!ignore) {
          setStats(data);
        }
      } catch {
        if (!ignore) {
          setStats({ exposants: 0, concours: 0, configured: false });
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="mt-6 text-center">
     
      <p className="mt-2 text-lg text-white/90 md:text-xl">
        <span className="font-semibold text-white">{stats ? stats.exposants : "..."}</span>{" "}
        exposants ont déjà reservé leur place.
      </p>
    </div>
  );
}