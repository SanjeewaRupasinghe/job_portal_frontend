import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Eye, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface JobPost {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  status: 'active' | 'draft' | 'closed';
  applicants: number;
  posted_date: string;
}

// Dummy job data for testing
const DUMMY_JOBS: JobPost[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    status: 'active',
    applicants: 45,
    posted_date: '2024-01-15'
  },
  {
    id: '2',
    title: 'UX Designer',
    company: 'StartupXYZ',
    location: 'Remote',
    type: 'Full-time',
    status: 'active',
    applicants: 23,
    posted_date: '2024-01-18'
  },
  {
    id: '3',
    title: 'Product Manager',
    company: 'TechCorp Inc.',
    location: 'New York, NY',
    type: 'Full-time',
    status: 'draft',
    applicants: 0,
    posted_date: '2024-01-20'
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'StartupXYZ',
    location: 'Austin, TX',
    type: 'Contract',
    status: 'closed',
    applicants: 67,
    posted_date: '2024-01-10'
  },
];

const JobManagement = () => {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteJobId, setDeleteJobId] = useState<string | null>(null);

  useEffect(() => {
    setJobs(DUMMY_JOBS);
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteJob = () => {
    if (deleteJobId) {
      setJobs(jobs.filter(job => job.id !== deleteJobId));
      toast({
        title: "Job Deleted",
        description: "The job posting has been removed.",
      });
      setDeleteJobId(null);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'draft':
        return 'secondary';
      case 'closed':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Job Management</CardTitle>
          <CardDescription>Oversee all job postings on the platform</CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>Posted Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(job.status)}>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{job.applicants}</TableCell>
                  <TableCell>{new Date(job.posted_date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteJobId(job.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredJobs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No jobs found
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteJobId} onOpenChange={() => setDeleteJobId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the job posting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteJob}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default JobManagement;
