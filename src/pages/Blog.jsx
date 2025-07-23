import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import katex from 'katex';
import 'katex/dist/katex.css';
import mermaid from 'mermaid';
import { useNavigate } from 'react-router-dom';

function calculateReadingTime(text) {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function BlogDetailModal({ post, onClose }) {
  if (!post) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-muted-foreground hover:text-primary">×</button>
        {post.coverImage && (
          <img src={post.coverImage} alt={post.title} className="rounded-xl mb-6 w-full object-cover max-h-64 " />
        )}
        <h1 className="text-3xl font-bold mb-2 text-primary drop-shadow">{post.title}</h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
          <span>By {post.author}</span>
          <span>·</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span>·</span>
          <span>{calculateReadingTime(post.content)} min read</span>
        </div>
        <MDEditor.Markdown
          source={post.content}
          style={{ background: 'none', fontSize: 18}}
          previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
        />
      </div>
    </div>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(setPosts);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpen = (post) => {
    navigate(`/blog/${post.id}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <section className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <span className="inline-block bg-primary/10 text-primary font-bold px-4 py-1 rounded-full mb-2">Lead Generation Insights</span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 theme === 'dark' ? 'text-white' : 'text-black'">Stay Ahead with <span className="text-primary">Expert Insights</span></h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Discover the latest strategies, industry trends, and success stories from College Station's premier lead generation experts.</p>
          </div>
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-transparent pb-2">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-w-[700px]">
              {posts.map(post => (
                <article
                  key={post.id}
                  className="bg-card border rounded-xl shadow-lg p-6 flex flex-col cursor-pointer hover:scale-[1.03] hover:shadow-2xl transition-transform duration-200"
                  onClick={() => handleOpen(post)}
                >
                  {post.coverImage && (
                    <img src={post.coverImage} alt={post.title} className="rounded-lg mb-4 w-full object-cover max-h-48 " />
                  )}
                  <span className="text-xs uppercase text-primary font-semibold mb-2">{post.tags || 'General'}</span>
                  <h2 className="text-xl font-bold mb-2 line-clamp-2 theme === 'dark' ? 'text-white' : 'text-black'">{post.title}</h2>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt || post.content.slice(0, 120) + '...'}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-auto">
                    <span>By {post.author}</span>
                    <span>·</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span>·</span>
                    <span>{calculateReadingTime(post.content)} min read</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        {selected && !isMobile && (
          <BlogDetailModal post={selected} onClose={() => setSelected(null)} />
        )}
      </main>
      <Footer />
    </div>
  );
} 