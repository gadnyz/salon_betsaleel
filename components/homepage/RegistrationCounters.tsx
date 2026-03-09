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
    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {/* <div className="rounded-xl border bg-background/80 p-4 text-center sm:col-span-2 max-w-sm mx-auto">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Inscriptions exposants
        </p>
        <p className="mt-1 text-2xl font-bold">
          {stats ? stats.exposants : "..."}
        </p>
      </div> */}

      {/* {stats && !stats.configured && (
        <p className="sm:col-span-2 text-xs text-muted-foreground text-center">
          Compteur en attente de configuration Google Sheets.
        </p>
      )} */}
    </div>
  );
}