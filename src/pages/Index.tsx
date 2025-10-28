import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Briefcase, Users, TrendingUp, Star, ArrowRight, CheckCircle } from "lucide-react";

const featuredJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120k - $150k",
    type: "Full-time",
    featured: true,
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateLab",
    location: "Remote",
    salary: "$90k - $120k",
    type: "Full-time",
    featured: true,
  },
  {
    id: 3,
    title: "UX Designer",
    company: "DesignStudio",
    location: "New York, NY",
    salary: "$80k - $100k",
    type: "Full-time",
    featured: false,
  },
];

const stats = [
  { label: "Active Jobs", value: "12,500+", icon: Briefcase },
  { label: "Companies", value: "3,200+", icon: Users },
  { label: "Successful Hires", value: "25,000+", icon: TrendingUp },
  { label: "User Rating", value: "4.9/5", icon: Star },
];

const features = [
  {
    icon: Search,
    title: "Smart Job Matching",
    description: "AI-powered recommendations based on your skills and preferences",
  },
  {
    icon: CheckCircle,
    title: "Verified Companies",
    description: "All employers are thoroughly vetted for authenticity and quality",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Access to career development resources and skill assessments",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-16 bg-gradient-hero">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-slide-up">
              Find Your Dream Job
              <span className="block text-secondary-foreground">Today</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto animate-fade-in">
              Connect with top employers and discover opportunities that match your skills, 
              passion, and career goals.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-12 animate-scale-in">
            <Card className="p-6 shadow-soft-xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Job title, keywords, or company"
                    className="pl-10 h-12 border-0 bg-muted focus:bg-background"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="City, state, or remote"
                    className="pl-10 h-12 border-0 bg-muted focus:bg-background"
                  />
                </div>
                <Button size="lg" className="h-12 px-8 bg-primary hover:bg-primary-hover">
                  Search Jobs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <stat.icon className="h-8 w-8 text-secondary-foreground mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Jobs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover hand-picked opportunities from top companies actively hiring talented professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">{job.title}</h3>
                      <p className="text-primary font-medium mb-1">{job.company}</p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </p>
                    </div>
                    {job.featured && (
                      <span className="bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-foreground">{job.salary}</p>
                      <p className="text-sm text-muted-foreground">{job.type}</p>
                    </div>
                    <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/jobs">
              <Button variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground">
                View All Jobs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose FindJobOffer</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're more than just a job board. We're your partner in career success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join thousands of professionals who've found their perfect job through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="px-8">
                Get Started - It's Free
              </Button>
            </Link>
            <Link to="/jobs">
              <Button size="lg" variant="outline" className="px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
