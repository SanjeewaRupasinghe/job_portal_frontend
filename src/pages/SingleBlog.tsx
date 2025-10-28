import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, User, Clock, Share2, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function SingleBlog() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Mock blog data - in real app, fetch based on slug
  const blogPost = {
    id: '1',
    title: 'Top 10 Interview Tips for Software Engineers',
    metaTitle: 'Top 10 Interview Tips for Software Engineers - Land Your Dream Job',
    metaDescription: 'Master software engineering interviews with these proven tips. From technical preparation to behavioral questions, get everything you need to succeed.',
    keywords: ['software engineering', 'interview tips', 'career advice', 'technical interviews', 'job search'],
    featuredImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop&crop=center',
    content: `
      <div class="prose prose-lg max-w-none">
        <p>Landing a software engineering job requires more than just technical skills. Here are the top 10 interview tips that will help you stand out from the competition and secure your dream position.</p>
        
        <h2>1. Understand the Fundamentals</h2>
        <p>Before diving into complex algorithms, make sure you have a solid understanding of programming fundamentals. Review data structures like arrays, linked lists, stacks, queues, trees, and graphs. Understanding these basics will help you tackle more complex problems during technical interviews.</p>
        
        <h2>2. Practice Coding Problems</h2>
        <p>Regular practice on platforms like LeetCode, HackerRank, and CodeSignal is essential. Start with easy problems and gradually work your way up to medium and hard difficulties. Focus on understanding the patterns rather than memorizing solutions.</p>
        
        <h2>3. Master System Design</h2>
        <p>For senior positions, system design questions are crucial. Learn about scalability, load balancing, database design, caching strategies, and microservices architecture. Practice designing systems like Twitter, URL shorteners, or chat applications.</p>
        
        <h2>4. Prepare Your STAR Stories</h2>
        <p>Use the STAR (Situation, Task, Action, Result) method to structure your behavioral interview answers. Prepare 3-5 stories that demonstrate leadership, problem-solving, teamwork, and conflict resolution.</p>
        
        <h2>5. Research the Company</h2>
        <p>Understand the company's mission, values, recent news, and technology stack. This shows genuine interest and helps you ask thoughtful questions during the interview.</p>
        
        <h2>6. Ask Thoughtful Questions</h2>
        <p>Prepare intelligent questions about the role, team structure, technology challenges, and company culture. This demonstrates your engagement and helps you evaluate if the position is right for you.</p>
        
        <h2>7. Practice Communication</h2>
        <p>Technical skills alone aren't enough. Practice explaining your thought process clearly and concisely. Use whiteboarding or screen sharing tools to simulate real interview conditions.</p>
        
        <h2>8. Optimize Your Resume</h2>
        <p>Tailor your resume for each application. Highlight relevant experience, quantify your achievements, and ensure it's ATS-friendly. Keep it concise and focus on impact rather than responsibilities.</p>
        
        <h2>9. Prepare for Different Interview Formats</h2>
        <p>Be ready for phone screens, video calls, take-home assignments, and on-site interviews. Each format requires different preparation and mindset.</p>
        
        <h2>10. Follow Up Professionally</h2>
        <p>Send a thank-you email within 24 hours of your interview. Reiterate your interest, address any concerns that came up, and provide additional information if needed.</p>
        
        <h2>Conclusion</h2>
        <p>Remember, interviewing is a skill that improves with practice. Don't get discouraged by rejections – use them as learning opportunities. With consistent preparation and the right mindset, you'll land the software engineering role you're seeking.</p>
        
        <p>Good luck with your interviews!</p>
      </div>
    `,
    author: 'Sarah Johnson',
    authorBio: 'Sarah is a Senior Software Engineer with over 8 years of experience in the tech industry. She has helped hundreds of developers land their dream jobs through mentoring and interview coaching.',
    publishedAt: '2024-01-15',
    slug: 'top-10-interview-tips-software-engineers',
    tags: ['Interview', 'Technology', 'Career', 'Software Engineering'],
    readTime: '8 min read',
    category: 'Career Advice',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Top 10 Interview Tips for Software Engineers - Land Your Dream Job",
      "description": "Master software engineering interviews with these proven tips. From technical preparation to behavioral questions, get everything you need to succeed.",
      "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop&crop=center",
      "author": {
        "@type": "Person",
        "name": "Sarah Johnson"
      },
      "publisher": {
        "@type": "Organization",
        "name": "JobPortal",
        "logo": {
          "@type": "ImageObject",
          "url": ""
        }
      },
      "datePublished": "2024-01-15",
      "dateModified": "2024-01-15",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://yoursite.com/blog/top-10-interview-tips-software-engineers"
      },
      "keywords": ["software engineering", "interview tips", "career advice", "technical interviews", "job search"]
    }
  };

  // Related articles - in real app, fetch from database
  const relatedArticles = [
    {
      id: '2',
      title: 'How to Negotiate Your Salary Like a Pro',
      slug: 'salary-negotiation-guide',
      excerpt: 'Learn the art of salary negotiation with proven strategies that work.',
      category: 'Career Advice',
      publishedAt: '2024-01-10',
      featuredImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: '3',
      title: 'Building a Portfolio That Gets You Hired',
      slug: 'building-portfolio-guide',
      excerpt: 'Showcase your skills effectively with a standout developer portfolio.',
      category: 'Career Development',
      publishedAt: '2024-01-05',
      featuredImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: '4',
      title: 'Remote Work Best Practices for Developers',
      slug: 'remote-work-best-practices',
      excerpt: 'Master the art of remote development with these essential tips.',
      category: 'Remote Work',
      publishedAt: '2024-01-01',
      featuredImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop&crop=center'
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{blogPost.metaTitle}</title>
        <meta name="description" content={blogPost.metaDescription} />
        <meta name="keywords" content={blogPost.keywords.join(', ')} />
        <meta property="og:title" content={blogPost.metaTitle} />
        <meta property="og:description" content={blogPost.metaDescription} />
        <meta property="og:image" content={blogPost.featuredImage} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://yoursite.com/blog/${blogPost.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blogPost.metaTitle} />
        <meta name="twitter:description" content={blogPost.metaDescription} />
        <meta name="twitter:image" content={blogPost.featuredImage} />
        <link rel="canonical" href={`https://yoursite.com/blog/${blogPost.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(blogPost.jsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/blog')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>

        {/* Featured Image */}
        <div className="mb-8">
          <div className="aspect-square w-full max-w-2xl mx-auto overflow-hidden rounded-lg">
            <img 
              src={blogPost.featuredImage} 
              alt={blogPost.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Article Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4">
                {blogPost.category}
              </Badge>
              <h1 className="text-4xl font-bold mb-4 leading-tight">
                {blogPost.title}
              </h1>
              
              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>By {blogPost.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(blogPost.publishedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{blogPost.readTime}</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Article Content */}
        <Card>
          <CardContent className="p-8">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
          </CardContent>
        </Card>

        {/* Author Bio */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">About {blogPost.author}</h3>
                <p className="text-muted-foreground">
                  {blogPost.authorBio}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Articles */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((article) => (
                <div 
                  key={article.id}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/blog/${article.slug}`)}
                >
                  <div className="aspect-video mb-3 overflow-hidden rounded-lg">
                    <img 
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                    <h4 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-6" />
            
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => navigate('/blog')}
                className="group"
              >
                View All Articles
                <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </>
  );
}