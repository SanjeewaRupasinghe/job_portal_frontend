import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MapPin, 
  Building2, 
  DollarSign, 
  Clock, 
  Users, 
  Bookmark,
  Share2,
  Calendar,
  CheckCircle
} from "lucide-react";
import JobApplicationForm from "./JobApplicationForm";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  workSetting: string;
  category: string;
  postedAt: string;
  description: string;
  tags: string[];
  featured: boolean;
}

interface JobDetailsProps {
  job: Job | null;
}

export default function JobDetails({ job }: JobDetailsProps) {
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  if (!job) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-6xl mb-4">💼</div>
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              Select a job to view details
            </h3>
            <p className="text-muted-foreground">
              Click on any job from the list to see more information
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showApplicationForm) {
    return (
      <JobApplicationForm 
        job={job} 
        onBack={() => setShowApplicationForm(false)} 
      />
    );
  }

  return (
    <Card className="h-full">
      <ScrollArea className="h-full">
        <CardHeader className="border-b">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-2xl">{job.title}</CardTitle>
                {job.featured && (
                  <Badge variant="secondary" className="bg-warning text-warning-foreground">
                    Featured
                  </Badge>
                )}
              </div>
              <p className="text-xl text-primary font-semibold mb-4">{job.company}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>{job.workSetting}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">{job.salary}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{job.postedAt}</span>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Badge variant="outline">{job.type}</Badge>
            <Badge variant="outline">{job.category}</Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Quick Apply */}
            <div className="bg-primary/5 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Ready to apply?</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete your application in just a few steps
                  </p>
                </div>
                <Button 
                  onClick={() => setShowApplicationForm(true)}
                  className="bg-primary hover:bg-primary-hover"
                >
                  Apply Now
                </Button>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Job Description</h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {job.description}
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>

            <Separator />

            {/* Requirements */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Requirements</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Bachelor's degree in related field</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">3+ years of relevant experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Strong communication skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Experience with relevant technologies</span>
                </li>
              </ul>
            </div>

            <Separator />

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-3">About {job.company}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {job.company} is a leading company in the {job.category.toLowerCase()} industry, 
                committed to innovation and excellence. We provide a collaborative work environment 
                where talented individuals can grow and make meaningful contributions.
              </p>
              <div className="flex items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>500-1000 employees</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Founded 2010</span>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="pt-4">
              <Button 
                onClick={() => setShowApplicationForm(true)}
                className="w-full bg-primary hover:bg-primary-hover"
                size="lg"
              >
                Apply for this Position
              </Button>
            </div>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}