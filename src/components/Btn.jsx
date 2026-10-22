import { prefersReducedMotion } from '../lib/hooks.js';

const isMagnetic = () => !prefersReducedMotion() && matchMedia('(hover:hover)').matches;

const pull = e => {
  if (!isMagnetic()) return;
  const b = e.currentTarget, r = b.getBoundingClientRect();
  b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`;
};
const release = e => { e.currentTarget.style.transform = ''; };

/* Pill button that leans toward the cursor */
export default function Btn({ as: Tag = 'a', ghost = false, arrow = '→', className = '', children, ...rest }) {
  const cls = ['btn', ghost && 'ghost', className].filter(Boolean).join(' ');
  return (
    <Tag className={cls} onMouseMove={pull} onMouseLeave={release} {...rest}>
      <span>{children}</span><span className="arr">{arrow}</span>
    </Tag>
  );
}
