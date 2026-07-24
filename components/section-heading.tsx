"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const heading = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      gsap.from(heading.current, {
        autoAlpha: 0,
        y: 32,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading.current,
          // Fires once the heading is comfortably in view — at 80% the
          // reveal was mostly over before anyone was looking at it.
          start: "top 70%",
        },
      });
    },
    { scope: heading },
  );

  return (
    <h2
      id={id}
      ref={heading}
      className="mt-8 max-w-[46rem] font-display text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl"
    >
      {children}
    </h2>
  );
}
