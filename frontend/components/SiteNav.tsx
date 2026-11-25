"use client";

import { useEffect, useState } from "react";

export function SiteNav() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const heroHead = document.querySelector(".hero__head");
    if (!heroHead) return;

    const onScroll = () => {
      const rect = heroHead.getBoundingClientRect();
      setHidden(rect.bottom <= 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="nav" data-hidden={hidden}>
      <a className="brand" href="#top" aria-label="MindMetric home">
        MindMetric
      </a>

      <nav className="nav__links" aria-label="Primary">
        <a href="#dataset">Dataset</a>
        <a href="#studio">Estimate</a>
      </nav>
    </header>
  );
}
