import { Fragment, useRef, useState } from 'react';
import { useScrollFrame } from '../lib/hooks.js';

const WORDS = "Robinsons Land is the real estate arm of JG Summit Holdings. We are the country's largest office landlord, run the second-largest chain of lifestyle malls and build homes, hotels and logistics hubs nationwide. Our purpose: building things better, to make life more meaningful for the Filipino.".split(' ');

/* Words light up one by one as the paragraph scrolls through the viewport */
export default function Intro() {
  const ref = useRef(null);
  const [lit, setLit] = useState(0);

  useScrollFrame(() => {
    const r = ref.current.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height + innerHeight * .35)));
    setLit(Math.floor(p * WORDS.length));
  });

  return (
    <section className="intro wrap" id="about">
      <div className="intro-grid">
        <div><span className="eyebrow">Who we are</span></div>
        <p className="intro-text" ref={ref}>
          {WORDS.map((w, i) => (
            <Fragment key={i}><span className={`w${i < lit ? ' on' : ''}`}>{w}</span>{' '}</Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
