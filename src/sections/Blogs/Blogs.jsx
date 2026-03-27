import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Tilt from 'react-parallax-tilt';
import FadeUp from '../../components/FadeUp/FadeUp.jsx';
import { BLOGS_TECH, BLOGS_PERSONAL } from '../../data/blogs.js';
import './Blogs.css';

export default function Blogs() {
  const [tab, setTab] = useState('tech');
  const [activeBlog, setActiveBlog] = useState(null);

  const blogs = tab === 'tech' ? BLOGS_TECH : BLOGS_PERSONAL;

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeBlog) {
        setActiveBlog(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeBlog]);

  return (
    <section className="blogs" id="blogs">
      <FadeUp className="reveal-wrap visible" delay={0.1}>
        <span className="section-tag">&gt; cat blog_posts.md</span>
        <h2 className="section-title">Blogs & Insights</h2>
        <p className="section-sub">
          Deep dives into what I build, how I think, and lessons from the trenches.
        </p>

        <div className="blogs-tabs">
          <button
            className={`blogs-tab ${tab === 'tech' ? 'active' : ''}`}
            onClick={() => setTab('tech')}
          >
            Technical
          </button>
          <button
            className={`blogs-tab ${tab === 'personal' ? 'active' : ''}`}
            onClick={() => setTab('personal')}
          >
            Personal
          </button>
        </div>

        <div className="blogs-grid">
          {blogs.map((b, i) => (
            <Tilt
              key={i}
              tiltMaxAngleX={6}
              tiltMaxAngleY={6}
              scale={1.02}
              transitionSpeed={400}
              className={`blog-tilt-wrapper ${b.featured ? 'featured' : ''}`}
              glareEnable={true}
              glareMaxOpacity={0.1}
              glareColor="var(--accent-green)"
              glarePosition="all"
            >
              <div
                className={`blog-card ${b.featured ? 'featured' : ''}`}
                onClick={() => setActiveBlog(b)}
              >
                <div className="blog-thumb" style={{ background: b.color }}>
                  <span className="blog-thumb-icon">{b.icon}</span>
                </div>
                <div className="blog-body">
                  <h3 className="blog-title">{b.title}</h3>
                  <p className="blog-excerpt">{b.excerpt}</p>
                  <div className="blog-tags">
                    {b.tags.map((t) => (
                      <span key={t} className="blog-tag">{t}</span>
                    ))}
                  </div>
                  <div className="blog-meta">
                    <span>📖 {b.time}</span>
                    <span>📅 {b.date}</span>
                  </div>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </FadeUp>

      {/* Blog Detail Modal */}
      {activeBlog && (
        <div className="blog-modal-overlay" onClick={() => setActiveBlog(null)}>
          <div className="blog-modal-content" onClick={e => e.stopPropagation()}>
            <button className="blog-modal-close" onClick={() => setActiveBlog(null)}>
              [×] Close
            </button>
            
            <div className="blog-modal-header" style={{ background: activeBlog.color }}>
               <span className="blog-modal-icon">{activeBlog.icon}</span>
               <div className="blog-modal-meta">
                 <span>📅 {activeBlog.date}</span>
                 <span>📖 {activeBlog.time} reading time</span>
               </div>
            </div>
            
            <div className="blog-markdown-body">
              <ReactMarkdown>{activeBlog.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
