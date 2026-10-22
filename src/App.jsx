import { useRevealOnView } from './lib/hooks.js';
import Loader from './components/Loader.jsx';
import Cursor from './components/Cursor.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Lead from './components/Lead.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Units from './components/Units.jsx';
import Sustainability from './components/Sustainability.jsx';
import News from './components/News.jsx';
import Investors from './components/Investors.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  useRevealOnView();

  return (
    <>
      <Loader />
      <Cursor />
      <Header />
      <main id="top">
        <Hero />
        <Lead />
        <Marquee />
        <About />
        <Units />
        <Sustainability />
        <News />
        <Investors />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
