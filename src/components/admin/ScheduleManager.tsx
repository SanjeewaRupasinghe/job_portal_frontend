import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Edit, Trash2, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Schedule {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'interview' | 'meeting' | 'deadline' | 'event';
  status: 'scheduled' | 'completed' | 'cancelled';
  assignedTo: string;
}

const DUMMY_SCHEDULES: Schedule[] = [
  {
    id: '1',
    title: 'Interview with John Candidate',
    description: 'Technical interview for Senior Developer position',
    date: '2025-10-25',
    time: '10:00 AM',
    type: 'interview',
    status: 'scheduled',
    assignedTo: 'Sarah Johnson'
  },
  {
    id: '2',
    title: 'Team Meeting - Q4 Planning',
    description: 'Quarterly planning session with hiring team',
    date: '2025-10-26',
    time: '2:00 PM',
    type: 'meeting',
    status: 'scheduled',
    assignedTo: 'Mike Recruiter'
  },
  {
    id: '3',
    title: 'Job Posting Deadline',
    description: 'Final date to review and publish new job postings',
    date: '2025-10-28',
    time: '5:00 PM',
    type: 'deadline',
    status: 'scheduled',
    assignedTo: 'Admin User'
  },
  {
    id: '4',
    title: 'Career Fair Event',
    description: 'University career fair - booth setup and recruitment',
    date: '2025-11-02',
    time: '9:00 AM',
    type: 'event',
    status: 'scheduled',
    assignedTo: 'Sarah Johnson'
  },
  {
    id: '5',
    title: 'Interview with Jane Seeker',
    description: 'Design portfolio review for UX Designer role',
    date: '2025-10-22',
    time: '11:00 AM',
    type: 'interview',
    status: 'completed',
    assignedTo: 'Mike Recruiter'
  }
];

const ScheduleManager = () => {
  const [schedules, setSchedules] = useState<Schedule[]>(DUMMY_SCHEDULES);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'interview': return 'default';
      case 'meeting': return 'secondary';
      case 'deadline': return 'destructive';
      case 'event': return 'outline';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'default';
      case 'completed': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'default';
    }
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Schedule Deleted",
      description: "The schedule item has been removed.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Schedule Manager</CardTitle>
            <CardDescription>Manage interviews, meetings, and events</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Schedule</DialogTitle>
                <DialogDescription>Create a new schedule item</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input placeholder="Enter title" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea placeholder="Enter description" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Date</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label>Time</Label>
                    <Input type="time" />
                  </div>
                </div>
                <div>
                  <Label>Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="deadline">Deadline</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Assigned To</Label>
                  <Input placeholder="Enter assignee name" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => {
                  toast({ title: "Schedule Created", description: "New schedule item added." });
                  setIsDialogOpen(false);
                }}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{schedule.title}</div>
                    <div className="text-sm text-muted-foreground">{schedule.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{schedule.date}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{schedule.time}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getTypeColor(schedule.type)} className="capitalize">
                    {schedule.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(schedule.status)} className="capitalize">
                    {schedule.status}
                  </Badge>
                </TableCell>
                <TableCell>{schedule.assignedTo}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(schedule.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ScheduleManager;
