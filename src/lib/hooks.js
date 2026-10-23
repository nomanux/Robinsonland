import { useEffect, useRef } from 'react';

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isMobile = () => innerWidth < 700;

/* Hide a broken image so the .img-fallback gradient behind it shows */
export const hideOnError = e => { e.currentTarget.style.display = 'none'; };

/* Run handler once per animation frame on scroll and resize, plus once on mount */
export function useScrollFrame(handler) {
  const saved = useRef(handler);
  saved.current = handler;
  useEffect(() => {
    let raf = 0;
    const run = () => { raf = 0; saved.current(); };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(run); };
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    run();
    return () => {
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
      cancelAnimationFrame(raf);
    };
  }, []);
}

/* Add .in to every .rv element (and the footer wordmark) the first time it scrolls into view; rescans when `key` changes */
export function useRevealOnView(key) {
  useEffect(() => {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .15 });
    document.querySelectorAll('.rv, .wordmark').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [key]);
}
