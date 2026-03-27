import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import FadeUp from '../../components/FadeUp/FadeUp.jsx';
import { PERSONAL_INFO } from '../../data/personalInfo.js';
import './Contact.css';

export default function Contact() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.email.trim() || !form.email.includes('@')) errs.email = true;
    if (!form.message.trim()) errs.message = true;
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSending(true);
    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formRef.current,
        'YOUR_PUBLIC_KEY'
      );
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e8b63a', '#4ade80', '#b8cc42'],
      });
    } catch {
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.message)}`;
    }
    setSending(false);
  };

  return (
    <section className="contact" id="contact">
      <FadeUp delay={0.1}>
        <span className="section-tag">&gt; ping contact.exe</span>

        <div className="contact-grid">
          <div className="contact-left">
            <h2 className="section-title">Let's Build Something Together</h2>
            <p className="contact-sub">
              Whether it's an internship, a project collab, or just nerding out
              about DSA — I'm in.
            </p>

            <div className="contact-cards">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="contact-card">
                <span className="contact-card-icon">@</span>
                {PERSONAL_INFO.email}
              </a>
              <a href={PERSONAL_INFO.linkedin} className="contact-card" target="_blank" rel="noopener noreferrer">
                <span className="contact-card-icon">in</span>
                linkedin.com/in/abhi-s-rana
              </a>
              <div className="contact-card">
                <span className="contact-card-icon">◎</span>
                {PERSONAL_INFO.location}
              </div>
              <a href={`tel:${PERSONAL_INFO.phone.replace(/\s/g, '')}`} className="contact-card">
                <span className="contact-card-icon">◇</span>
                {PERSONAL_INFO.phone}
              </a>
            </div>

            <div className="contact-response">→ Usually replies within 24 hours</div>

            <div className="contact-availability">
              <span className="avail-chip">◆ Open to Internships</span>
              <span className="avail-chip">◆ Freelance Projects</span>
              <span className="avail-chip">◆ Open Source</span>
              <span className="avail-chip">◆ Collaborations</span>
            </div>
          </div>

          <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
            <input className={`contact-input ${errors.name ? 'error' : ''}`} name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} />
            <input className={`contact-input ${errors.email ? 'error' : ''}`} name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} />
            <input className="contact-input" name="subject" type="text" placeholder="Subject" value={form.subject} onChange={handleChange} />
            <textarea className={`contact-textarea ${errors.message ? 'error' : ''}`} name="message" placeholder="Your Message" value={form.message} onChange={handleChange} />

            {sent ? (
              <div className="contact-success">
                Message sent successfully! I'll get back to you soon.
              </div>
            ) : (
              <button className="contact-submit" type="submit" disabled={sending}>
                {sending ? 'Sending...' : 'Send Message →'}
              </button>
            )}
          </form>
        </div>
      </FadeUp>
    </section>
  );
}
