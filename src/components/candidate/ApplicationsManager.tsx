import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Calendar, 
  Building2, 
  MapPin, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Search,
  Filter,
  Eye,
  MessageSquare
} from 'lucide-react';

interface JobPost {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
}

interface Application {
  id: string;
  job_post: JobPost;
  status: 'pending' | 'reviewing' | 'interview' | 'rejected' | 'accepted';
  cover_letter?: string;
  employer_remarks?: string;
  created_at: string;
  updated_at: string;
}

// Mock data for demonstration
const mockApplications: Application[] = [
  {
    id: '1',
    job_post: {
      id: 'job1',
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $150,000'
    },
    status: 'interview',
    cover_letter: 'I am excited to apply for this position...',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-18T14:30:00Z'
  },
  {
    id: '2',
    job_post: {
      id: 'job2',
      title: 'React Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      type: 'Contract',
      salary: '$80 - $100/hour'
    },
    status: 'pending',
    cover_letter: 'With my extensive React experience...',
    created_at: '2024-01-20T09:00:00Z',
    updated_at: '2024-01-20T09:00:00Z'
  },
  {
    id: '3',
    job_post: {
      id: 'job3',
      title: 'Full Stack Engineer',
      company: 'Enterprise Corp',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$110,000 - $140,000'
    },
    status: 'rejected',
    employer_remarks: 'Thank you for your interest. We decided to move forward with another candidate.',
    created_at: '2024-01-10T11:00:00Z',
    updated_at: '2024-01-25T16:00:00Z'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'accepted':
      return 'default';
    case 'interview':
      return 'secondary';
    case 'reviewing':
      return 'outline';
    case 'rejected':
      return 'destructive';
    case 'pending':
    default:
      return 'secondary';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'accepted':
      return <CheckCircle className="h-4 w-4" />;
    case 'interview':
      return <Calendar className="h-4 w-4" />;
    case 'reviewing':
      return <Eye className="h-4 w-4" />;
    case 'rejected':
      return <XCircle className="h-4 w-4" />;
    case 'pending':
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const ApplicationsManager = () => {
  const [applications] = useState<Application[]>(mockApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.job_post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.job_post.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getApplicationsByStatus = (status: string) => {
    return applications.filter(app => app.status === status);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const ApplicationCard = ({ application }: { application: Application }) => (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{application.job_post.title}</h3>
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Building2 className="h-4 w-4" />
            <span>{application.job_post.company}</span>
            <span>•</span>
            <MapPin className="h-4 w-4" />
            <span>{application.job_post.location}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Badge variant="outline">{application.job_post.type}</Badge>
            {application.job_post.salary && (
              <span>{application.job_post.salary}</span>
            )}
          </div>
        </div>
        <Badge variant={getStatusColor(application.status)} className="flex items-center gap-1">
          {getStatusIcon(application.status)}
          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
        </Badge>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          Applied on {formatDate(application.created_at)}
        </div>
        
        {application.updated_at !== application.created_at && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            Last updated {formatDate(application.updated_at)}
          </div>
        )}
        
        {application.employer_remarks && (
          <div className="mt-3 p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2 font-medium mb-1">
              <MessageSquare className="h-4 w-4" />
              Employer Feedback
            </div>
            <p className="text-sm">{application.employer_remarks}</p>
          </div>
        )}
      </div>
      
      <div className="flex justify-end mt-4 space-x-2">
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
        {application.status === 'interview' && (
          <Button size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Interview
          </Button>
        )}
      </div>
    </Card>
  );

  const StatusSummary = () => {
    const statusCounts = {
      pending: getApplicationsByStatus('pending').length,
      reviewing: getApplicationsByStatus('reviewing').length,
      interview: getApplicationsByStatus('interview').length,
      accepted: getApplicationsByStatus('accepted').length,
      rejected: getApplicationsByStatus('rejected').length,
    };

    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {Object.entries(statusCounts).map(([status, count]) => (
          <Card key={status} className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              {getStatusIcon(status)}
            </div>
            <div className="text-2xl font-bold">{count}</div>
            <div className="text-sm text-muted-foreground capitalize">{status}</div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            My Applications
          </CardTitle>
          <CardDescription>
            Track and manage your job applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StatusSummary />
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewing">Reviewing</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({getApplicationsByStatus('pending').length})</TabsTrigger>
              <TabsTrigger value="reviewing">Reviewing ({getApplicationsByStatus('reviewing').length})</TabsTrigger>
              <TabsTrigger value="interview">Interview ({getApplicationsByStatus('interview').length})</TabsTrigger>
              <TabsTrigger value="accepted">Accepted ({getApplicationsByStatus('accepted').length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({getApplicationsByStatus('rejected').length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4 mt-6">
              {filteredApplications.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Applications Found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Try adjusting your search or filter criteria.'
                      : 'Start applying to jobs to see your applications here.'
                    }
                  </p>
                  <Button onClick={() => window.open('/jobs', '_blank')}>
                    Browse Jobs
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredApplications.map((application) => (
                    <ApplicationCard key={application.id} application={application} />
                  ))}
                </div>
              )}
            </TabsContent>
            
            {['pending', 'reviewing', 'interview', 'accepted', 'rejected'].map((status) => (
              <TabsContent key={status} value={status} className="space-y-4 mt-6">
                {getApplicationsByStatus(status).length === 0 ? (
                  <div className="text-center py-8">
                    <div className="flex justify-center mb-4">
                      {getStatusIcon(status)}
                    </div>
                    <h3 className="text-lg font-medium mb-2">No {status.charAt(0).toUpperCase() + status.slice(1)} Applications</h3>
                    <p className="text-muted-foreground">
                      You don't have any applications with "{status}" status yet.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getApplicationsByStatus(status).map((application) => (
                      <ApplicationCard key={application.id} application={application} />
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsManager;