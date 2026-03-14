"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Slide = {
  src: string;
  alt: string;
};

type ImageCarouselProps = {
  variant?: "default" | "background";
};

const slides: Slide[] = [
  {
    src: "/homepage/excursion%202026_63.jpg",
    alt: "Jeunes organisateurs",
  },
  {
    src: "/homepage/excursion%202026_71.jpg",
    alt: "Panel entrepreneurial",
  },
  {
    src: "/homepage/excursion%202026_72.jpg",
    alt: "Presentation de projet",
  },
  {
    src: "/homepage/excursion%202026_105.jpg",
    alt: "Temps fort de l'activite",
  },
];

export default function ImageCarousel({ variant = "default" }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className={cn(variant === "default" && "mt-12")}>
      <div
        className={cn(
          "relative overflow-hidden",
          variant === "default" && "rounded-3xl border bg-card shadow-sm",
          variant === "background" && "min-h-[420px] md:min-h-[520px]",
        )}
      >
        <div
          className="flex will-change-transform transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.src} className={cn("min-w-full", variant === "default" && "p-3")}>
              <img
                src={slide.src}
                alt={slide.alt}
                className={cn(
                  "w-full object-cover",
                  variant === "default" && "h-[260px] rounded-2xl sm:h-[360px] lg:h-[480px]",
                  variant === "background" && "h-[420px] md:h-[520px]",
                )}
              />
            </div>
          ))}
        </div>

        <div
          className={cn(
            "absolute left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/45 px-3 py-2",
            variant === "default" && "bottom-5",
            variant === "background" && "bottom-4 z-20",
          )}
        >
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(slideIndex)}
              className={`h-2.5 rounded-full transition-all ${
                slideIndex === index ? "w-8 bg-white" : "w-2.5 bg-white/55"
              }`}
              aria-label={`Afficher l'image ${slideIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
