import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  // Mock blog data - will be replaced with real data from Supabase
  const blogPosts = [
    {
      id: '1',
      title: 'Top 10 Interview Tips for Software Engineers',
      content: 'Master the art of technical interviews with these proven strategies...',
      author: 'Admin',
      publishedAt: '2024-01-15',
      slug: 'top-10-interview-tips-software-engineers',
      tags: ['Interview', 'Technology', 'Career']
    },
    {
      id: '2',
      title: 'Remote Work: The Future of Employment',
      content: 'Explore how remote work is reshaping the job market and what it means for professionals...',
      author: 'Admin',
      publishedAt: '2024-01-10',
      slug: 'remote-work-future-employment',
      tags: ['Remote Work', 'Future', 'Career']
    },
    {
      id: '3',
      title: 'Building an Impressive Portfolio',
      content: 'Learn how to showcase your skills and experience effectively...',
      author: 'Admin',
      publishedAt: '2024-01-05',
      slug: 'building-impressive-portfolio',
      tags: ['Portfolio', 'Career', 'Tips']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Career Insights & Tips
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay ahead in your career with expert advice, industry insights, and practical tips from our team.
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <div className="mb-16">
            <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-r from-primary/5 to-secondary/5">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-6xl font-bold text-primary/30">📝</div>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <Badge className="w-fit mb-4" variant="secondary">Featured</Badge>
                  <CardTitle className="text-2xl mb-4">{blogPosts[0].title}</CardTitle>
                  <CardDescription className="text-base mb-6 line-clamp-3">
                    {blogPosts[0].content}
                  </CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {blogPosts[0].author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(blogPosts[0].publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <Button className="w-fit group">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <div className="text-4xl opacity-50">📰</div>
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.content}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                </div>
                <Button variant="outline" className="w-full group">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Blog;