import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Video, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface Interview {
  id: string;
  job_title: string;
  company_name: string;
  scheduled_at: string;
  type: 'video' | 'phone' | 'onsite';
  status: 'scheduled' | 'completed' | 'cancelled';
  link?: string;
  address?: string;
  description?: string;
  notes?: string;
}

// Mock data for development
const mockInterviews: Interview[] = [
  {
    id: '1',
    job_title: 'Frontend Developer',
    company_name: 'Tech Solutions Inc.',
    scheduled_at: '2024-01-25T10:00:00Z',
    type: 'video',
    status: 'scheduled',
    link: 'https://meet.google.com/abc-defg-hij',
    description: 'Technical interview focusing on React and TypeScript'
  },
  {
    id: '2',
    job_title: 'UI/UX Designer',
    company_name: 'Creative Agency',
    scheduled_at: '2024-01-20T14:30:00Z',
    type: 'onsite',
    status: 'completed',
    address: '123 Design Street, Creative City',
    description: 'Portfolio review and design challenge'
  }
];

const InterviewsManager = () => {
  const [interviews] = useState<Interview[]>(mockInterviews);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'onsite':
        return <MapPin className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (interviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No interviews scheduled yet.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Apply to jobs and wait for interview invitations from employers.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming & Past Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interviews.map((interview) => (
              <Card key={interview.id} className="border-l-4 border-l-primary/50">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{interview.job_title}</h3>
                        <Badge className={getStatusColor(interview.status)}>
                          {interview.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{interview.company_name}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(interview.scheduled_at), 'PPP')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {format(new Date(interview.scheduled_at), 'p')}
                        </div>
                        <div className="flex items-center gap-1">
                          {getTypeIcon(interview.type)}
                          <span className="capitalize">{interview.type}</span>
                        </div>
                      </div>

                      {interview.description && (
                        <p className="text-sm">{interview.description}</p>
                      )}

                      {interview.link && (
                        <div className="flex items-center gap-1 text-sm">
                          <ExternalLink className="h-4 w-4" />
                          <a 
                            href={interview.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Join Video Call
                          </a>
                        </div>
                      )}

                      {interview.address && (
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-4 w-4" />
                          <span>{interview.address}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      {interview.status === 'scheduled' && (
                        <>
                          <Button size="sm">
                            Confirm Attendance
                          </Button>
                          <Button variant="outline" size="sm">
                            Request Reschedule
                          </Button>
                        </>
                      )}
                      {interview.status === 'completed' && (
                        <Button variant="outline" size="sm">
                          View Feedback
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewsManager;