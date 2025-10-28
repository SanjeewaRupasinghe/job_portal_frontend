import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Target, 
  Award, 
  Heart, 
  CheckCircle, 
  Linkedin, 
  Twitter, 
  Mail,
  TrendingUp,
  Globe,
  Shield
} from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Active Job Seekers', value: '50,000+', icon: Users },
    { label: 'Companies Hiring', value: '2,500+', icon: TrendingUp },
    { label: 'Jobs Posted Monthly', value: '15,000+', icon: Target },
    { label: 'Success Stories', value: '8,500+', icon: Award },
  ];

  const values = [
    {
      icon: Heart,
      title: 'People First',
      description: 'We believe every career journey matters and strive to create meaningful connections between talented individuals and great companies.'
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'Building trust through transparent processes, honest communication, and reliable service for both job seekers and employers.'
    },
    {
      icon: CheckCircle,
      title: 'Quality Over Quantity',
      description: 'We focus on quality matches rather than volume, ensuring better outcomes for candidates and companies alike.'
    },
    {
      icon: Globe,
      title: 'Global Opportunities',
      description: 'Connecting talent worldwide with opportunities that span across industries, cultures, and geographic boundaries.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Former HR executive with 15+ years in talent acquisition and a passion for connecting people with their dream careers.',
      image: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      bio: 'Tech innovator focused on building scalable platforms that make job searching and hiring more efficient and effective.',
      image: '👨‍💻'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      bio: 'Operations specialist ensuring smooth platform functionality and exceptional user experience for all our users.',
      image: '👩‍💼'
    },
    {
      name: 'David Kim',
      role: 'Lead Designer',
      bio: 'UX/UI expert dedicated to creating intuitive and beautiful interfaces that make job searching a pleasant experience.',
      image: '👨‍🎨'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Connecting Talent with Opportunity
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're on a mission to revolutionize the job search experience, making it easier for talented individuals to find meaningful careers and for companies to discover exceptional talent.
            </p>
            <Button size="lg" className="mr-4">
              Join Our Community
            </Button>
            <Button variant="outline" size="lg">
              Partner With Us
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
              <p className="text-xl text-muted-foreground">
                Empowering careers and building stronger businesses through innovative recruitment solutions.
              </p>
            </div>
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Why FindJobOffer?</h3>
                    <p className="text-muted-foreground mb-6">
                      In today's fast-paced world, finding the right job or the perfect candidate shouldn't be complicated. 
                      We've built a platform that simplifies the process while maintaining the human touch that makes 
                      great matches possible.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>Smart matching algorithms</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>Verified company profiles</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>Real-time communication tools</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>Career development resources</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
                    <div className="text-6xl mb-4">🚀</div>
                    <h4 className="text-xl font-semibold mb-2">Ready to Launch Your Career?</h4>
                    <p className="text-muted-foreground">
                      Join thousands of professionals who have found their dream jobs through our platform.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and shape our company culture.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <value.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind FindJobOffer, dedicated to transforming the way people find careers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg group hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-4">{member.role}</Badge>
                  <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center gap-3">
                    <Button variant="outline" size="sm">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community of professionals and discover opportunities that align with your goals and values.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Find Your Dream Job
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
              Post a Job
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;