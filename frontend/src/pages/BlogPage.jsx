import React, { useState } from 'react';
import { blogs } from '../data/blogsData';
import { ArrowRight, Clock, Calendar, User, Search } from 'lucide-react';

export function BlogPage() {
  const [activeArticle, setActiveArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Performance Marketing', 'Website Development', 'Content Production'];

  const filteredBlogs = blogs.filter((b) => {
    const matchCat = selectedCategory === 'All' || b.category === selectedCategory;
    const matchSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || b.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="blog-page">
      <section className="page-hero">
        <div className="container">
          <span className="badge-pill">KNOWLEDGE &amp; INSIGHTS</span>
          <h1>Digital Growth Intelligence &amp; Industry Playbooks</h1>
          <p className="page-hero-sub">
            Actionable strategies, ad algorithms analysis, engineering frameworks, and media production insights from our practitioners.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          {/* Search & Filter Bar */}
          <div className="blog-filter-bar">
            <div className="blog-search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search articles by keyword, topic or strategy..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="blog-cat-buttons">
              {categories.map((c) => (
                <button
                  key={c}
                  className={`blog-cat-btn ${selectedCategory === c ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Listing Grid */}
          <div className="blog-grid">
            {filteredBlogs.map((post) => (
              <article key={post.id} className="blog-post-card">
                <div className="bpc-meta">
                  <span className="bpc-cat">{post.category}</span>
                  <span className="bpc-time"><Clock size={12} /> {post.readTime}</span>
                </div>

                <h3>{post.title}</h3>
                <p className="bpc-excerpt">{post.excerpt}</p>

                <div className="bpc-footer">
                  <div className="bpc-author-info">
                    <User size={14} className="text-blue" />
                    <span>{post.author} • {post.date}</span>
                  </div>
                  <button className="btn-read-more" onClick={() => setActiveArticle(post)}>
                    Read Article <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Full Article Reading Modal */}
      {activeArticle && (
        <div className="modal-overlay" onClick={() => setActiveArticle(null)} role="dialog" aria-modal="true">
          <div className="modal-card modal-article" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveArticle(null)} aria-label="Close article">
              ×
            </button>

            <span className="badge-pill">{activeArticle.category} • {activeArticle.readTime}</span>
            <h1 className="mt-16">{activeArticle.title}</h1>
            <div className="article-meta-strip mt-8">
              <span>By {activeArticle.author}</span>
              <span className="dot-sep">•</span>
              <span>Published on {activeArticle.date}</span>
            </div>

            <div className="article-body-content mt-24">
              {activeArticle.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('### ')) {
                  return <h3 key={i}>{paragraph.replace('### ', '')}</h3>;
                }
                return <p key={i}>{paragraph}</p>;
              })}
            </div>

            <div className="article-modal-footer mt-32">
              <button className="btn-secondary" onClick={() => setActiveArticle(null)}>
                Back to Blog Directory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
