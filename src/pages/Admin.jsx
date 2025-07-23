"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Textarea } from "../components/ui/textarea"
import MDEditor from "@uiw/react-md-editor"
import rehypeSanitize from "rehype-sanitize"
import { useToast } from "../components/ui/use-toast"
import {
  Eye,
  EyeOff,
  FileText,
  Calendar,
  User,
  Trash2,
  Edit3,
  Plus,
  Sparkles,
  Clock,
  CheckCircle,
  Lock,
  Unlock,
  BarChart3,
} from "lucide-react"

export default function Admin() {
  const [jwt, setJwt] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [posts, setPosts] = useState([])
  const [formData, setFormData] = useState({ title: "", content: "", author: "", excerpt: "", tags: "" })
  const [isPreviewMode, setIsPreviewMode] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [wordCount, setWordCount] = useState(0)
  const [isPublishing, setIsPublishing] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const { toast } = useToast()

  // Auto-save functionality
  useEffect(() => {
    if (isAuthenticated && (formData.title || formData.content)) {
      const timer = setTimeout(() => {
        handleAutoSave()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [formData, isAuthenticated])

  // Word count calculation
  useEffect(() => {
    const text = formData.content.replace(/[#*`_~]/g, "").trim()
    const words = text ? text.split(/\s+/).length : 0
    setWordCount(words)
  }, [formData.content])

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) throw new Error('Invalid credentials')
      const { token } = await res.json()
      setJwt(token)
      setIsAuthenticated(true)
      toast({ title: 'Welcome back!', description: 'Successfully authenticated' })
    } catch (err) {
      toast({ title: 'Authentication Failed', description: err.message, variant: 'destructive' })
    }
  }

  const handleAutoSave = async () => {
    if (!formData.title && !formData.content) return

    setIsSaving(true)
    // Simulate auto-save
    setTimeout(() => {
      setIsSaving(false)
      setLastSaved(new Date())
    }, 500)
  }

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog', {
        headers: jwt ? { Authorization: `Bearer ${jwt}` } : {},
      })
      const data = await res.json()
      setPosts(data)
    } catch (err) {
      toast({ title: 'Failed to fetch posts', description: err.message, variant: 'destructive' })
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts()
    }
  }, [isAuthenticated])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsPublishing(true)
    try {
      const method = editingPost ? 'PUT' : 'POST'
      const url = editingPost ? `/api/blog/${editingPost.id}` : '/api/blog'
      const body = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean).join(','),
      }
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
        },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('Failed to save post')
      toast({
        title: editingPost ? 'Blog Post Updated!' : 'Blog Post Published!',
        description: editingPost ? 'Your post was updated.' : 'Your post is now live and visible to readers',
      })
      setFormData({ title: '', content: '', author: '', excerpt: '', tags: '' })
      setEditingPost(null)
      setIsPublishing(false)
      fetchPosts()
    } catch (err) {
      setIsPublishing(false)
      toast({ title: 'Error', description: err.message, variant: 'destructive' })
    }
  }

  const handleEdit = (post) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      content: post.content || '',
      author: post.author,
      excerpt: post.excerpt,
      tags: post.tags ? post.tags.split(',').map(t => t.trim()).join(', ') : '',
    })
  }

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return
    try {
      const res = await fetch(`/api/blog/${postId}`, {
        method: 'DELETE',
        headers: jwt ? { Authorization: `Bearer ${jwt}` } : {},
      })
      if (!res.ok) throw new Error('Failed to delete post')
      setPosts(posts.filter((p) => p.id !== postId))
      toast({ title: 'Post deleted', description: 'The blog post has been removed' })
    } catch (err) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' })
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-xl">
            <CardHeader className="text-center pb-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4"
              >
              </motion.div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Admin Access
              </CardTitle>
              <p className="text-muted-foreground">Enter your username and password to continue</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative space-y-2">
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pr-12"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  className="pr-12"
                />
               
              </div>
              <Button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                <Lock className="mr-2" size={16} />
                Authenticate
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Blog Studio
            </h1>
            <div className="flex items-center gap-2">
              {isSaving && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Clock className="animate-spin" size={14} />
                  Saving...
                </motion.div>
              )}
              {lastSaved && !isSaving && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-sm text-green-600"
                >
                  <CheckCircle size={14} />
                  Saved {lastSaved.toLocaleTimeString()}
                </motion.div>
              )}
            </div>
          </div>
          <p className="text-muted-foreground">Create and manage your blog posts with real-time preview</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Editor Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="shadow-xl border-0 bg-background/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Edit3 className="text-primary" size={20} />
                    {editingPost ? "Edit Post" : "Create New Post"}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPreviewMode(!isPreviewMode)}
                      className="flex items-center gap-2"
                    >
                      {isPreviewMode ? <EyeOff size={16} /> : <Eye size={16} />}
                      {isPreviewMode ? "Hide Preview" : "Show Preview"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Title</label>
                      <Input
                        placeholder="Enter an engaging title..."
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="text-lg font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Author</label>
                      <Input
                        placeholder="Author name"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Excerpt</label>
                    <Textarea
                      placeholder="Brief description of your post..."
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Tags</label>
                    <Input
                      placeholder="marketing, leads, business (comma separated)"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Content</label>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{wordCount} words</span>
                        <span>{Math.ceil(wordCount / 200)} min read</span>
                      </div>
                    </div>
                    <div className="rounded-lg border bg-background">
                      <MDEditor
                        value={formData.content}
                        onChange={(val) => setFormData({ ...formData, content: val || "" })}
                        height={400}
                        previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
                        textareaProps={{
                          placeholder:
                            "Start writing your amazing blog post...\n\n# Use Markdown for formatting\n\n**Bold text**, *italic text*, and [links](https://example.com) are supported!",
                        }}
                        data-color-mode="light"
                        preview={isPreviewMode ? "edit" : "edit"}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={isPublishing || !formData.title || !formData.content}
                      className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 flex-1"
                    >
                      {isPublishing ? (
                        <>
                          <Clock className="mr-2 animate-spin" size={16} />
                          Publishing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2" size={16} />
                          {editingPost ? "Update Post" : "Publish Post"}
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setFormData({ title: "", content: "", author: "", excerpt: "", tags: "" })
                        setEditingPost(null)
                      }}
                    >
                      <Plus className="mr-2" size={16} />
                      New Post
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Live Preview */}
            <AnimatePresence>
              {isPreviewMode && formData.content && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="shadow-xl border-0 bg-background/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="text-primary" size={20} />
                        Live Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-lg max-w-none">
                        {formData.title && <h1 className="text-3xl font-bold mb-2">{formData.title}</h1>}
                        {formData.author && <p className="text-muted-foreground mb-4">by {formData.author}</p>}
                        {formData.excerpt && (
                          <p className="text-lg text-muted-foreground italic mb-6 border-l-4 border-primary pl-4">
                            {formData.excerpt}
                          </p>
                        )}
                        <MDEditor.Markdown
                          source={formData.content}
                          style={{ background: "none" }}
                          previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Posts Management */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="shadow-xl border-0 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="text-primary" size={20} />
                  Your Posts ({posts.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <AnimatePresence>
                  {posts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/50">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-sm leading-tight">{post.title}</h3>
                            <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                            <User size={12} />
                            <span>{post.author}</span>
                            <Calendar size={12} />
                            <span>{post.createdAt}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {post.tags && post.tags.split(',').map((tag) => (
                              <Badge key={tag.trim()} variant="outline" className="text-xs">
                                {tag.trim()}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(post)}
                              className="flex-1 text-xs"
                            >
                              <Edit3 size={12} className="mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(post.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 size={12} />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {posts.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No posts yet. Create your first blog post!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 className="text-primary" size={16} />
                  Quick Stats
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{posts.length}</div>
                    <div className="text-xs text-muted-foreground">Total Posts</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {posts.filter((p) => p.status === "published").length}
                    </div>
                    <div className="text-xs text-muted-foreground">Published</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
