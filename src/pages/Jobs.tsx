import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Search, MapPin, Filter, Bookmark, Clock, DollarSign, Building2 } from "lucide-react";
import JobDetails from "@/components/jobs/JobDetails";

const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120k - $150k",
    type: "Full-time",
    workSetting: "Hybrid",
    category: "Technology",
    postedAt: "2 days ago",
    description: "We're looking for a senior frontend developer to join our team...",
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    featured: true,
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateLab",
    location: "Remote",
    salary: "$90k - $120k",
    type: "Full-time",
    workSetting: "Remote",
    category: "Product",
    postedAt: "1 day ago",
    description: "Join our product team to drive innovation and growth...",
    tags: ["Product Strategy", "Analytics", "Agile", "Roadmapping"],
    featured: true,
  },
  {
    id: 3,
    title: "UX Designer",
    company: "DesignStudio",
    location: "New York, NY",
    salary: "$80k - $100k",
    type: "Full-time",
    workSetting: "On-site",
    category: "Design",
    postedAt: "3 days ago",
    description: "Create beautiful and intuitive user experiences...",
    tags: ["Figma", "User Research", "Prototyping", "Design Systems"],
    featured: false,
  },
  {
    id: 4,
    title: "Backend Engineer",
    company: "ScaleTech",
    location: "Austin, TX",
    salary: "$110k - $140k",
    type: "Full-time",
    workSetting: "Hybrid",
    category: "Technology",
    postedAt: "1 week ago",
    description: "Build scalable backend systems and APIs...",
    tags: ["Node.js", "Python", "AWS", "Microservices"],
    featured: false,
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "DataInsights",
    location: "Boston, MA",
    salary: "$95k - $125k",
    type: "Full-time",
    workSetting: "Remote",
    category: "Data Science",
    postedAt: "5 days ago",
    description: "Analyze data to drive business insights and decisions...",
    tags: ["Python", "ML", "SQL", "Statistics"],
    featured: false,
  },
];

const categories = ["All Categories", "Technology", "Design", "Product", "Data Science", "Marketing", "Sales"];
const workSettings = ["All", "Remote", "On-site", "Hybrid"];
const jobTypes = ["All Types", "Full-time", "Part-time", "Contract", "Internship"];

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [workSetting, setWorkSetting] = useState("All");
  const [jobType, setJobType] = useState("All Types");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [selectedJob, setSelectedJob] = useState<typeof mockJobs[0] | null>(null);

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
    const matchesCategory = category === "All Categories" || job.category === category;
    const matchesWorkSetting = workSetting === "All" || job.workSetting === workSetting;
    const matchesJobType = jobType === "All Types" || job.type === jobType;
    const matchesFeatured = !showFeaturedOnly || job.featured;
    
    return matchesSearch && matchesLocation && matchesCategory && matchesWorkSetting && matchesJobType && matchesFeatured;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Find Your Perfect Job</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover opportunities that match your skills and career goals
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 shadow-soft-md">
          <CardContent className="p-6">
            {/* Main Search */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Job title, keywords, or company"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="City, state, or remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button size="lg" className="h-12 px-8 bg-primary hover:bg-primary-hover">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>

            {/* Filter Row */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex flex-wrap gap-3 flex-1">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={workSetting} onValueChange={setWorkSetting}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Work Setting" />
                  </SelectTrigger>
                  <SelectContent>
                    {workSettings.map((setting) => (
                      <SelectItem key={setting} value={setting}>{setting}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="featured" 
                  checked={showFeaturedOnly}
                  onCheckedChange={(checked) => setShowFeaturedOnly(checked === true)}
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Featured only
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <ResizablePanelGroup direction="horizontal" className="min-h-[800px]">
          {/* Job Listings Panel */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="pr-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  {filteredJobs.length} Jobs Found
                </h2>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                    <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4 max-h-[700px] overflow-y-auto">
                {filteredJobs.map((job) => (
                  <Card 
                    key={job.id} 
                    className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                      selectedJob?.id === job.id ? 'ring-2 ring-primary shadow-md' : ''
                    }`}
                    onClick={() => setSelectedJob(job)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-foreground hover:text-primary">
                              {job.title}
                            </h3>
                            {job.featured && (
                              <Badge variant="secondary" className="bg-warning text-warning-foreground text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-primary font-medium mb-2">{job.company}</p>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-2">
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {job.location}
                            </span>
                            <span className="flex items-center">
                              <Building2 className="h-3 w-3 mr-1" />
                              {job.workSetting}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {job.postedAt}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{job.description}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-sm font-semibold text-foreground">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {job.salary}
                          </div>
                          <Badge variant="outline" className="text-xs">{job.type}</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedJob(job);
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-4">
                <Button variant="outline">
                  Load More Jobs
                </Button>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Job Details Panel */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="pl-4">
              <JobDetails job={selectedJob} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}