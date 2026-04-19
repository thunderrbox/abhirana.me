import { PERSONAL_INFO } from '../../data/personalInfo.js';
import FadeUp from '../../components/FadeUp/FadeUp.jsx';
import './Resume.css';

export default function Resume() {
  return (
    <section className="resume-section" id="resume">
      <FadeUp>
        <span className="section-eyebrow">Resume</span>
        <h2 className="section-title">Deep Dive.</h2>
        <p className="section-subtitle">
          View my full experience, education, and technical background.
        </p>
      </FadeUp>

      <FadeUp delay={0.2} className="resume-container glass">
        <div className="resume-header">
          <div className="resume-header-text">
            <h3>Standard PDF Resume</h3>
            <p>Optimized for ATS and recruiters.</p>
          </div>
          <a href={PERSONAL_INFO.resumePdf} className="btn-primary" download="Abhijeet_Singh_Rana_Resume.pdf">
            Download PDF
          </a>
        </div>
        <div className="resume-viewer">
          {/* using object instead of iframe for better PDF rendering on desktop */}
          <object data={PERSONAL_INFO.resumePdf} type="application/pdf" width="100%" height="100%">
            <div className="resume-fallback">
              <p>Your browser doesn't support built-in PDF viewers.</p>
              <a href={PERSONAL_INFO.resumePdf} className="btn-outline" download="Abhijeet_Singh_Rana_Resume.pdf">
                Download Resume Instead
              </a>
            </div>
          </object>
        </div>
      </FadeUp>
    </section>
  );
}
