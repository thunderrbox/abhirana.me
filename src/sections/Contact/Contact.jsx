import { useState, useRef } from 'react';
import { PERSONAL_INFO } from '../../data/personalInfo.js';
import FadeUp from '../../components/FadeUp/FadeUp.jsx';
import './Contact.css';

export default function Contact() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    setStatus('sending');
    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.sendForm(
        'YOUR_SERVICE_ID', // Replaced correctly if configured
        'YOUR_TEMPLATE_ID',
        formRef.current,
        'YOUR_PUBLIC_KEY'
      );
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      // Fallback
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.message)}`;
      setStatus('idle');
    }
  };

  return (
    <section className="contact" id="contact">
      <FadeUp>
        <span className="section-eyebrow">Contact</span>
        <h2 className="section-title">Let's Build Something.</h2>
        <p className="section-subtitle">
          Open to roles, collaborations, and discussions on system architecture.
        </p>
      </FadeUp>

      <div className="contact-grid">
        <FadeUp className="contact-info" delay={0.1}>
          <div className="contact-card glass">
            <h3 className="contact-card-title">Get in Touch</h3>
            <p className="contact-card-desc">Usually replies within 24 hours.</p>
            
            <div className="contact-methods">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="contact-method">
                <span className="contact-method-label">Email</span>
                <span className="contact-method-value">{PERSONAL_INFO.email}</span>
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="contact-method">
                <span className="contact-method-label">LinkedIn</span>
                <span className="contact-method-value">linkedin.com/in/abhi-s-rana</span>
              </a>
              <div className="contact-method">
                <span className="contact-method-label">Location</span>
                <span className="contact-method-value">{PERSONAL_INFO.location}</span>
              </div>
            </div>
            
            <div className="contact-availability">
              <span className="contact-avail-dot" />
              Available for Internships & Roles
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <form className="contact-form glass" ref={formRef} onSubmit={handleSubmit}>
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
        </FadeUp>
      </div>
    </section>
  );
}
