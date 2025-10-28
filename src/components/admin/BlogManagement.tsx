import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Pencil, Trash2, Eye, ArrowUp, ArrowDown } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import { supabase } from '@/integrations/supabase/client';
import { Switch } from '@/components/ui/switch';

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1, 'Slug is required').max(200),
  content: z.string().min(1, 'Content is required'),
  published_at: z.string().optional(),
});

type BlogFormData = z.infer<typeof blogSchema>;

const BlogManagement = () => {
  const [activeTab, setActiveTab] = useState('blogs');
  const [blogTab, setBlogTab] = useState('create');
  const [faqTab, setFaqTab] = useState('create');
  const [content, setContent] = useState('');
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [editingFAQ, setEditingFAQ] = useState<any>(null);
  const [faqs, setFaqs] = useState<any[]>([]);

  const blogForm = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      slug: '',
      content: '',
      published_at: '',
    },
  });

  const faqSchema = z.object({
    question: z.string().min(1, 'Question is required').max(500),
    answer: z.string().min(1, 'Answer is required'),
    category: z.string().optional().or(z.literal('')),
    is_published: z.boolean().optional().default(false),
    display_order: z.number().optional().default(0),
  });

  const faqForm = useForm({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: '',
      answer: '',
      category: '',
      is_published: false,
      display_order: 0,
    },
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    blogForm.setValue('title', title);
    if (!editingBlog) {
      blogForm.setValue('slug', generateSlug(title));
    }
  };

  const onBlogSubmit = async (data: BlogFormData) => {
    try {
      const blogData = {
        ...data,
        content,
        published_at: data.published_at || new Date().toISOString(),
        user_id: (await supabase.auth.getUser()).data.user?.id,
      };

      if (editingBlog) {
        const { error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', editingBlog.id);

        if (error) throw error;
        toast({ title: 'Blog updated successfully!' });
      } else {
        const { error } = await supabase.from('blogs').insert(blogData);
        if (error) throw error;
        toast({ title: 'Blog created successfully!' });
      }

      blogForm.reset();
      setContent('');
      setEditingBlog(null);
      setBlogTab('manage');
      loadBlogs();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const loadBlogs = async () => {
    const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    if (!error && data) setBlogs(data);
  };

  const loadFAQs = async () => {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('display_order', { ascending: true });
    if (!error && data) setFaqs(data);
  };

  const handleEditBlog = (blog: any) => {
    setEditingBlog(blog);
    blogForm.setValue('title', blog.title);
    blogForm.setValue('slug', blog.slug);
    blogForm.setValue('content', blog.content);
    setContent(blog.content);
    blogForm.setValue('published_at', blog.published_at || '');
    setBlogTab('create');
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Blog deleted successfully!' });
      loadBlogs();
    }
  };

  const onFAQSubmit = async (data: any) => {
    try {
      if (editingFAQ) {
        const { error } = await supabase.from('faqs').update(data).eq('id', editingFAQ.id);
        if (error) throw error;
        toast({ title: 'FAQ updated successfully!' });
      } else {
        const { error } = await supabase.from('faqs').insert(data);
        if (error) throw error;
        toast({ title: 'FAQ created successfully!' });
      }

      faqForm.reset();
      setEditingFAQ(null);
      setFaqTab('manage');
      loadFAQs();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleEditFAQ = (faq: any) => {
    setEditingFAQ(faq);
    faqForm.setValue('question', faq.question);
    faqForm.setValue('answer', faq.answer);
    faqForm.setValue('category', faq.category || '');
    faqForm.setValue('is_published', faq.is_published);
    faqForm.setValue('display_order', faq.display_order);
    setFaqTab('create');
  };

  const handleDeleteFAQ = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    const { error } = await supabase.from('faqs').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'FAQ deleted successfully!' });
      loadFAQs();
    }
  };

  const handleReorderFAQ = async (id: string, direction: 'up' | 'down') => {
    const index = faqs.findIndex((f) => f.id === id);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === faqs.length - 1)) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newFaqs = [...faqs];
    [newFaqs[index], newFaqs[newIndex]] = [newFaqs[newIndex], newFaqs[index]];

    await supabase.from('faqs').update({ display_order: newIndex }).eq('id', faqs[index].id);
    await supabase.from('faqs').update({ display_order: index }).eq('id', faqs[newIndex].id);

    loadFAQs();
  };

  React.useEffect(() => {
    loadBlogs();
    loadFAQs();
  }, []);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="blogs">Blog Posts</TabsTrigger>
        <TabsTrigger value="faqs">FAQs</TabsTrigger>
      </TabsList>

      <TabsContent value="blogs">
        <Tabs value={blogTab} onValueChange={setBlogTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">{editingBlog ? 'Edit' : 'Create'} Post</TabsTrigger>
            <TabsTrigger value="manage">Manage Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>{editingBlog ? 'Edit' : 'Create New'} Blog Post</CardTitle>
                <CardDescription>Write and publish blog content</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...blogForm}>
                  <form onSubmit={blogForm.handleSubmit(onBlogSubmit)} className="space-y-6">
                    <FormField
                      control={blogForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onChange={(e) => handleTitleChange(e.target.value)}
                              placeholder="Enter blog title"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={blogForm.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="blog-post-url" />
                          </FormControl>
                          <FormDescription>URL-friendly version of the title</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <FormLabel>Content</FormLabel>
                      <MDEditor value={content} onChange={(val) => setContent(val || '')} height={400} />
                    </div>

                    <FormField
                      control={blogForm.control}
                      name="published_at"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Publish Date (Optional)</FormLabel>
                          <FormControl>
                            <Input {...field} type="datetime-local" />
                          </FormControl>
                          <FormDescription>Leave empty to publish now</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-4">
                      <Button type="submit">
                        {editingBlog ? 'Update' : 'Publish'} Blog
                      </Button>
                      {editingBlog && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setEditingBlog(null);
                            blogForm.reset();
                            setContent('');
                          }}
                        >
                          Cancel Edit
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle>Manage Blog Posts</CardTitle>
                <CardDescription>View and manage all blog posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{blog.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : 'Draft'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditBlog(blog)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteBlog(blog.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {blogs.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No blog posts yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </TabsContent>

      <TabsContent value="faqs">
        <Tabs value={faqTab} onValueChange={setFaqTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">{editingFAQ ? 'Edit' : 'Create'} FAQ</TabsTrigger>
            <TabsTrigger value="manage">Manage FAQs</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>{editingFAQ ? 'Edit' : 'Create New'} FAQ</CardTitle>
                <CardDescription>Add frequently asked questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...faqForm}>
                  <form onSubmit={faqForm.handleSubmit(onFAQSubmit)} className="space-y-6">
                    <FormField
                      control={faqForm.control}
                      name="question"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Question</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter question" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={faqForm.control}
                      name="answer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Answer</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Enter answer" rows={5} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={faqForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category (Optional)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., General, Account, Billing" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={faqForm.control}
                      name="display_order"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Order</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormDescription>Lower numbers appear first</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={faqForm.control}
                      name="is_published"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Publish</FormLabel>
                            <FormDescription>Make this FAQ visible to users</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-4">
                      <Button type="submit">{editingFAQ ? 'Update' : 'Create'} FAQ</Button>
                      {editingFAQ && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setEditingFAQ(null);
                            faqForm.reset();
                          }}
                        >
                          Cancel Edit
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle>Manage FAQs</CardTitle>
                <CardDescription>View and manage all FAQs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={faq.id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{faq.question}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{faq.answer}</p>
                        {faq.category && (
                          <span className="text-xs bg-secondary px-2 py-1 rounded mt-2 inline-block">
                            {faq.category}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReorderFAQ(faq.id, 'up')}
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReorderFAQ(faq.id, 'down')}
                          disabled={index === faqs.length - 1}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleEditFAQ(faq)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteFAQ(faq.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {faqs.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No FAQs yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </TabsContent>
    </Tabs>
  );
};

export default BlogManagement;
