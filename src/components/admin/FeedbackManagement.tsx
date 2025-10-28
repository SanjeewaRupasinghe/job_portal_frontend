import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Search, Eye, Trash2, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Feedback {
  id: string;
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
  rating: number;
  category: 'bug' | 'feature' | 'general' | 'complaint' | 'praise';
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
}

const DUMMY_FEEDBACK: Feedback[] = [
  {
    id: '1',
    userName: 'John Candidate',
    userEmail: 'john.candidate@example.com',
    subject: 'Great job portal!',
    message: 'I love how easy it is to apply for jobs. The interface is very user-friendly.',
    rating: 5,
    category: 'praise',
    status: 'resolved',
    createdAt: '2025-10-20'
  },
  {
    id: '2',
    userName: 'Jane Seeker',
    userEmail: 'jane.seeker@example.com',
    subject: 'Search filter not working',
    message: 'When I try to filter jobs by salary range, the results don\'t update properly.',
    rating: 2,
    category: 'bug',
    status: 'in-progress',
    createdAt: '2025-10-21'
  },
  {
    id: '3',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.employer@company.com',
    subject: 'Request: Analytics Dashboard',
    message: 'Would be great to have analytics on application views and candidate engagement.',
    rating: 4,
    category: 'feature',
    status: 'new',
    createdAt: '2025-10-22'
  },
  {
    id: '4',
    userName: 'Mike Recruiter',
    userEmail: 'mike.recruiter@startup.com',
    subject: 'Bulk actions needed',
    message: 'Can we have bulk actions for managing multiple applications at once?',
    rating: 3,
    category: 'feature',
    status: 'new',
    createdAt: '2025-10-23'
  },
  {
    id: '5',
    userName: 'Anonymous User',
    userEmail: 'user@example.com',
    subject: 'Mobile app availability',
    message: 'Is there a mobile app planned? The mobile web version works but a native app would be better.',
    rating: 4,
    category: 'general',
    status: 'closed',
    createdAt: '2025-10-19'
  }
];

const FeedbackManagement = () => {
  const [feedback, setFeedback] = useState<Feedback[]>(DUMMY_FEEDBACK);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredFeedback = feedback.filter(f =>
    f.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'bug': return 'destructive';
      case 'feature': return 'default';
      case 'praise': return 'secondary';
      case 'complaint': return 'outline';
      case 'general': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'default';
      case 'in-progress': return 'outline';
      case 'resolved': return 'secondary';
      case 'closed': return 'secondary';
      default: return 'default';
    }
  };

  const handleViewFeedback = (item: Feedback) => {
    setSelectedFeedback(item);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Feedback Deleted",
      description: "The feedback has been removed.",
    });
  };

  const handleStatusChange = (id: string, status: string) => {
    toast({
      title: "Status Updated",
      description: `Feedback status changed to ${status}.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback Management</CardTitle>
        <CardDescription>Review and manage user feedback</CardDescription>
        <div className="relative mt-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search feedback by user, subject, or message..."
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
              <TableHead>User</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFeedback.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{item.userName}</div>
                    <div className="text-sm text-muted-foreground">{item.userEmail}</div>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate">{item.subject}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getCategoryColor(item.category)} className="capitalize">
                    {item.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Select defaultValue={item.status} onValueChange={(value) => handleStatusChange(item.id, value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleViewFeedback(item)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredFeedback.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No feedback found
          </div>
        )}

        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Feedback Details</DialogTitle>
              <DialogDescription>View complete feedback information</DialogDescription>
            </DialogHeader>
            {selectedFeedback && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">User</h4>
                  <p>{selectedFeedback.userName} ({selectedFeedback.userEmail})</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Subject</h4>
                  <p>{selectedFeedback.subject}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Message</h4>
                  <p className="whitespace-pre-wrap">{selectedFeedback.message}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-1">Rating</h4>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: selectedFeedback.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Category</h4>
                    <Badge variant={getCategoryColor(selectedFeedback.category)} className="capitalize">
                      {selectedFeedback.category}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Status</h4>
                    <Badge variant={getStatusColor(selectedFeedback.status)} className="capitalize">
                      {selectedFeedback.status}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Date</h4>
                    <p>{selectedFeedback.createdAt}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default FeedbackManagement;
