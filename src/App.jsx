import { useEffect } from 'react';
import { useRevealOnView } from './lib/hooks.js';
import { useRoute } from './lib/router.js';
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
import CompanyProfile from './components/CompanyProfile.jsx';
import Principles from './components/Principles.jsx';
import Board from './components/Board.jsx';
import StoriesPage from './components/StoriesPage.jsx';
import StoryPage from './components/StoryPage.jsx';

const HOME_TITLE = document.title;

export default function App() {
  const route = useRoute();
  useRevealOnView(route.key);

  // New page: start at the top. Back on home from another page: jump to the requested section.
  useEffect(() => {
    if (route.page !== 'home') { scrollTo({ top: 0, behavior: 'instant' }); return; }
    document.title = HOME_TITLE;
    if (route.anchor) requestAnimationFrame(() => document.getElementById(route.anchor)?.scrollIntoView({ behavior: 'instant' }));
  }, [route.key]);

  return (
    <>
      <Loader />
      <Cursor />
      <Header plain={route.page !== 'home'} />
      {route.page === 'home' ? (
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
      ) : (
        <main id="main">
          {route.page === 'story' ? <StoryPage key={route.slug} slug={route.slug} />
            : route.page === 'profile' ? <CompanyProfile />
            : route.page === 'principles' ? <Principles />
            : route.page === 'board' ? <Board />
            : <StoriesPage />}
        </main>
      )}
      <Footer />
    </>
  );
}
