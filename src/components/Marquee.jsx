const HOTELS_SVG = 'https://robinsonshotels.com/static/RHR-Logo-6d02ae4fc0172b2614d6dc1be16df4b7.svg';

const BRANDS = [
  { src: 'assets/white-estates.png', alt: 'Robinsons Destination Estates' },
  { src: HOTELS_SVG, fallback: 'assets/white-hotels.png', alt: 'Robinsons Hotels and Resorts' },
  { src: 'assets/white-rlx.png', alt: 'RLX Robinsons Logistix and Industrials' },
  { src: 'assets/white-malls.png', alt: 'Robinsons Malls' },
  { src: 'assets/white-offices.png', alt: 'Robinsons Offices' },
  { src: 'assets/white-residences.png', alt: 'RLC Residences' },
  { src: 'assets/white-sports.png', alt: 'Robinsons Sports, Entertainment and Recreation' },
];

const swap = e => { const img = e.currentTarget; if (img.dataset.fallback) { img.src = img.dataset.fallback; delete img.dataset.fallback; } };

/* Endless row of white brand logos; the list is doubled so the loop is seamless */
export default function Marquee() {
  return (
    <div className="marquee" aria-label="Robinsons Land brands">
      <div className="marquee-track">
        {[0, 1, 2, 3].map(set => (
          <ul key={set} className="brand-set" aria-hidden={set > 0}>
            {BRANDS.map(b => (
              <li key={b.alt} title={b.alt}>
                <img src={b.src} data-fallback={b.fallback} onError={swap} alt={set === 0 ? b.alt : ''} loading="lazy" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
