'use client';

import { useState, useEffect, useRef } from 'react';

interface StickyFooterProps {
  children: React.ReactNode;
}

export default function StickyFooter({ children }: StickyFooterProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* In-flow content */}
      <div ref={sentinelRef} className="flex items-center gap-3">
        {children}
      </div>

      {/* Fixed clone when sentinel is out of view */}
      <div
        className={`fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 shadow-lg px-8 py-4 z-40 flex items-center justify-center gap-3 transition-opacity duration-200 ${
          isSticky ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {children}
      </div>
    </>
  );
}
