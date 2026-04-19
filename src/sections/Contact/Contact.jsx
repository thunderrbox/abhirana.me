import { useState, useRef } from 'react';
import { PERSONAL_INFO } from '../../data/personalInfo.js';
import FadeUp from '../../components/FadeUp/FadeUp.jsx';
import './Contact.css';

export default function Contact() {
  const formRef = useRef(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    setStatus('sending');
    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formRef.current, 'YOUR_PUBLIC_KEY');
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.message)}`;
      setStatus('idle');
    }
  };

  return (
    <section className="contact" id="contact">
      <FadeUp>
        <span className="section-eyebrow">Contact</span>
        <h2 className="section-title">Let's Build Something.</h2>
      </FadeUp>

      <div className="contact-grid">
        <FadeUp className="contact-info" delay={0.1}>
          <div className="contact-card">
            <h3 className="contact-card-title">Get in Touch</h3>
            <p className="contact-card-desc">Usually replies within 24 hours.</p>
            
            <div className="contact-methods">
              <div className="contact-method">
                <span className="contact-method-label">Email</span>
                <span className={`contact-method-value ${!isUnlocked ? 'concealed' : ''}`}>
                  {isUnlocked ? PERSONAL_INFO.email : '••••••@••••.com'}
                </span>
              </div>
              <div className="contact-method">
                <span className="contact-method-label">Phone</span>
                <span className={`contact-method-value ${!isUnlocked ? 'concealed' : ''}`}>
                  {isUnlocked ? PERSONAL_INFO.phone : '+91 ••••• •••••'}
                </span>
              </div>
              <div className="contact-method">
                <span className="contact-method-label">LinkedIn</span>
                <span className={`contact-method-value ${!isUnlocked ? 'concealed' : ''}`}>
                  {isUnlocked ? 'linkedin.com/in/abhi-s-rana' : 'linkedin.com/in/••••••'}
                </span>
              </div>
              <div className="contact-method">
                <span className="contact-method-label">Location</span>
                <span className="contact-method-value">{PERSONAL_INFO.location}</span>
              </div>
            </div>
            
            {!isUnlocked && (
              <button className="btn-primary unlock-btn" onClick={() => setIsUnlocked(true)}>
                <span>Unlock Contact Details</span>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </button>
            )}

            {isUnlocked && (
              <div className="contact-availability">
                <span className="contact-avail-dot" />
                Available for Internships & Roles
              </div>
            )}
          </div>
        </FadeUp>

        <FadeUp delay={0.2} className="contact-form-wrapper">
          {!isUnlocked ? (
            <div className="locked-form-overlay">
              <p>Unlock to send a direct message.</p>
            </div>
          ) : (
            <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
              </div>
              <div className="form-group">
                <textarea name="message" placeholder="Your Message" rows="5" value={form.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn-primary form-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
              </button>
            </form>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
