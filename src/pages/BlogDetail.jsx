import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { useTheme } from '../components/theme-provider';
import { color } from 'framer-motion';

function calculateReadingTime(text) {
  const words = text ? text.split(/\s+/).length : 0;
  return Math.max(1, Math.round(words / 200));
}

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetch(`/api/blog`)
      .then(res => res.json())
      .then(posts => {
        const found = posts.find(p => String(p.id) === String(id));
        if (!found) throw new Error('Blog post not found');
        setPost(found);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><span>Loading...</span></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-background text-red-600">{error}</div>;

  return (
    <div className={`flex min-h-screen flex-col bg-gradient-to-br from-blue via-background to-primary/5 ${theme === 'dark' ? 'dark' : ''}`}>
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <section className="container mx-auto px-4 max-w-3xl">
          <button onClick={() => navigate(-1)} className="mb-6 text-primary hover:underline">← Back to Blogs</button>
          <h1 className={`text-4xl font-extrabold mb-2 drop-shadow ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{post.title}</h1>
          <div className="flex items-center gap-3 text-sm mb-6">
            <span className={theme === 'dark' ? 'text-white' : 'text-black'}>
              By <span className="font-semibold">{post.author}</span>
            </span>
            <span className={theme === 'dark' ? 'text-white' : 'text-black'}>·</span>
            <span className={theme === 'dark' ? 'text-white' : 'text-black'}>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span className={theme === 'dark' ? 'text-white' : 'text-black'}>·</span>
            <span className={theme === 'dark' ? 'text-white' : 'text-black'}>{calculateReadingTime(post.content)} min read</span>
          </div>
          {post.excerpt && (
            <blockquote className={`border-l-4 border-primary pl-4 italic text-lg mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{post.excerpt}</blockquote>
          )}
          <div
            className={`prose prose-lg max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
            <MDEditor.Markdown
              source={post.content}
              style={{ background: 'none', color: theme === 'dark' ? 'white' : 'black' }}
              previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
            />
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags && post.tags.split(',').map(tag => (
              <span key={tag.trim()} className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                {tag.trim()}
              </span>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 