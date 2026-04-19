import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './sections/Hero/Hero.jsx';
import About from './sections/About/About.jsx';
import Projects from './sections/Projects/Projects.jsx';
import Skills from './sections/Skills/Skills.jsx';
import Blogs from './sections/Blogs/Blogs.jsx';
import Experience from './sections/Experience/Experience.jsx';
import Education from './sections/Education/Education.jsx';
import Resume from './sections/Resume/Resume.jsx';
import Contact from './sections/Contact/Contact.jsx';
import Footer from './sections/Footer/Footer.jsx';

function App() {
  return (
    <>
      <div className="ambient-glow-left" />
      <div className="ambient-glow-right" />
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Blogs />
        <Experience />
        <Education />
        <Resume />
        <Contact />
      </main>
      
      <Footer />
    </>
  );
}

export default App;
