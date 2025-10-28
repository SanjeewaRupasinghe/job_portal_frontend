import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, Eye, Globe, Search, Calendar, User, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { useToast } from '@/hooks/use-toast';

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  metaTitle: z.string().min(1, 'Meta title is required').max(60, 'Meta title should be less than 60 characters'),
  metaDescription: z.string().min(1, 'Meta description is required').max(160, 'Meta description should be less than 160 characters'),
  keywords: z.string().min(1, 'Keywords are required'),
  category: z.string().min(1, 'Category is required'),
  featuredImage: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().min(1, 'Excerpt is required').max(300, 'Excerpt should be less than 300 characters'),
  status: z.enum(['draft', 'published']),
  publishedAt: z.string().optional(),
  jsonLd: z.string().optional(),
});

type BlogFormData = z.infer<typeof blogSchema>;

const BlogManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('create');
  const [mdValue, setMdValue] = useState('');

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      slug: '',
      metaTitle: '',
      metaDescription: '',
      keywords: '',
      category: '',
      featuredImage: '',
      content: '',
      excerpt: '',
      status: 'draft',
      publishedAt: '',
      jsonLd: '',
    },
  });

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Auto-generate JSON-LD structured data
  const generateJsonLd = (data: Partial<BlogFormData>) => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": data.metaTitle || data.title,
      "description": data.metaDescription,
      "image": data.featuredImage || "",
      "author": {
        "@type": "Person",
        "name": "Admin"
      },
      "publisher": {
        "@type": "Organization",
        "name": "JobPortal",
        "logo": {
          "@type": "ImageObject",
          "url": ""
        }
      },
      "datePublished": data.publishedAt || new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://yoursite.com/blog/${data.slug}`
      },
      "keywords": data.keywords?.split(',').map(k => k.trim())
    };
    
    return JSON.stringify(jsonLd, null, 2);
  };

  const onSubmit = async (data: BlogFormData) => {
    try {
      // Add current timestamp for published blogs
      if (data.status === 'published' && !data.publishedAt) {
        data.publishedAt = new Date().toISOString();
      }

      // Auto-generate JSON-LD if not provided
      if (!data.jsonLd) {
        data.jsonLd = generateJsonLd(data);
      }

      // Here you would save to Supabase
      console.log('Blog data:', { ...data, content: mdValue });
      
      toast({
        title: data.status === 'published' ? 'Blog Published!' : 'Blog Saved as Draft!',
        description: `Your blog post has been ${data.status === 'published' ? 'published' : 'saved'} successfully.`,
      });

      if (data.status === 'published') {
        // Navigate to the published blog
        navigate(`/blog/${data.slug}`);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save blog post. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Mock existing blogs data
  const existingBlogs = [
    {
      id: '1',
      title: 'Top 10 Interview Tips for Software Engineers',
      slug: 'top-10-interview-tips-software-engineers',
      status: 'published',
      publishedAt: '2024-01-15',
      author: 'Admin',
      category: 'Career Advice'
    },
    {
      id: '2',
      title: 'Remote Work: The Future of Employment',
      slug: 'remote-work-future-employment',
      status: 'draft',
      publishedAt: null,
      author: 'Admin',
      category: 'Industry Insights'
    }
  ];

  const handleTitleChange = (title: string) => {
    form.setValue('title', title);
    
    // Auto-generate slug
    const slug = generateSlug(title);
    form.setValue('slug', slug);
    
    // Auto-generate meta title if empty
    if (!form.getValues('metaTitle')) {
      form.setValue('metaTitle', title.slice(0, 60));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Blog Manager</h1>
            <p className="text-muted-foreground">Create and manage SEO-optimized blog posts</p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="create">Create New Post</TabsTrigger>
          <TabsTrigger value="manage">Manage Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Content</CardTitle>
                      <CardDescription>Create your blog post content</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter blog title..." 
                                {...field} 
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleTitleChange(e.target.value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="excerpt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Excerpt</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Brief description of your post..." 
                                {...field} 
                                rows={3}
                              />
                            </FormControl>
                            <FormDescription>
                              This will be shown in blog listings and search results
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <Label className="text-sm font-medium">Content</Label>
                        <div className="mt-2">
                          <MDEditor
                            value={mdValue}
                            onChange={(val) => setMdValue(val || '')}
                            preview="edit"
                            hideToolbar={false}
                            data-color-mode="light"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* SEO Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle>SEO Optimization</CardTitle>
                      <CardDescription>Optimize your post for search engines</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>URL Slug</FormLabel>
                            <FormControl>
                              <Input placeholder="post-url-slug" {...field} />
                            </FormControl>
                            <FormDescription>
                              URL: /blog/{field.value || 'your-slug'}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="metaTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Title</FormLabel>
                            <FormControl>
                              <Input placeholder="SEO title for search results..." {...field} />
                            </FormControl>
                            <FormDescription>
                              {field.value?.length || 0}/60 characters
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="metaDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meta Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Description that appears in search results..." 
                                {...field} 
                                rows={3}
                              />
                            </FormControl>
                            <FormDescription>
                              {field.value?.length || 0}/160 characters
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="keywords"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Keywords</FormLabel>
                            <FormControl>
                              <Input placeholder="keyword1, keyword2, keyword3..." {...field} />
                            </FormControl>
                            <FormDescription>
                              Separate keywords with commas
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="jsonLd"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>JSON-LD Structured Data</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Auto-generated JSON-LD..." 
                                {...field} 
                                rows={8}
                                className="font-mono text-sm"
                              />
                            </FormControl>
                            <FormDescription>
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  const jsonLd = generateJsonLd(form.getValues());
                                  form.setValue('jsonLd', jsonLd);
                                }}
                              >
                                Auto-Generate
                              </Button>
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Publish Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Publish</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="career-advice">Career Advice</SelectItem>
                                <SelectItem value="industry-insights">Industry Insights</SelectItem>
                                <SelectItem value="interview-tips">Interview Tips</SelectItem>
                                <SelectItem value="remote-work">Remote Work</SelectItem>
                                <SelectItem value="tech-trends">Tech Trends</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="featuredImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Featured Image URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/image.jpg" {...field} />
                            </FormControl>
                            <FormDescription>
                              Recommended: 1200x600px (2:1 ratio)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Separator />

                      <div className="flex gap-2">
                        <Button type="submit" className="flex-1">
                          <Save className="h-4 w-4 mr-2" />
                          {form.watch('status') === 'published' ? 'Publish' : 'Save Draft'}
                        </Button>
                        {form.watch('slug') && (
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => navigate(`/blog/${form.watch('slug')}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* SEO Preview */}
                  <Card>
                    <CardHeader>
                      <CardTitle>SEO Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-blue-600 text-lg">{form.watch('metaTitle') || 'Your Meta Title'}</div>
                        <div className="text-green-700 text-sm">yoursite.com/blog/{form.watch('slug') || 'your-slug'}</div>
                        <div className="text-gray-600 text-sm">{form.watch('metaDescription') || 'Your meta description will appear here...'}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>Manage Blog Posts</CardTitle>
              <CardDescription>View and manage all your blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {existingBlogs.map((blog) => (
                  <div key={blog.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{blog.title}</h3>
                        <Badge variant={blog.status === 'published' ? 'default' : 'secondary'}>
                          {blog.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {blog.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : 'Not published'}
                        </div>
                        <div className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {blog.category}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate(`/blog/${blog.slug}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlogManager;