import { useState } from 'react';
import FadeUp from '../../components/FadeUp/FadeUp.jsx';
import { BLOGS } from '../../data/blogs.js';
import './Blogs.css';

export default function Blogs() {
  const [activeTab, setActiveTab] = useState('project');

  const activeBlogs = activeTab === 'project' ? BLOGS.project_blogs : BLOGS.personal_blogs;

  return (
    <section className="blogs" id="blogs">
      <FadeUp>
        <div className="blogs-header">
          <div>
            <span className="section-eyebrow">Writing</span>
            <h2 className="section-title">Latest Articles</h2>
          </div>
          
          <div className="blogs-tabs">
            <button 
              className={`blog-tab ${activeTab === 'project' ? 'active' : ''}`}
              onClick={() => setActiveTab('project')}
            >
              Project Architecture
            </button>
            <button 
              className={`blog-tab ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              Personal & Mindset
            </button>
          </div>
        </div>
      </FadeUp>

      <div className="blogs-grid">
        {activeBlogs.map((blog, i) => (
          <FadeUp key={blog.id} delay={0.1 + i * 0.1} className="blog-card">
            <div className="blog-card-meta">
              <span className="blog-date">{blog.date}</span>
              <span className="blog-read-time">{blog.readTime}</span>
            </div>
            
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-excerpt">{blog.excerpt}</p>
            
            <div className="blog-card-footer">
              <div className="blog-tags">
                {blog.tags.map(t => (
                  <span key={t} className="blog-tag">{t}</span>
                ))}
              </div>
              <a href={blog.link} target="_blank" rel="noopener noreferrer" className="read-more-btn">
                Read →
              </a>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
