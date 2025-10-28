import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, UserX, Eye, Mail, Phone } from 'lucide-react';
import { DUMMY_USERS, type MockUser } from '@/lib/mockAuth';
import { toast } from '@/hooks/use-toast';

const UserManagement = () => {
  const [users, setUsers] = useState<MockUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  useEffect(() => {
    // Load users from DUMMY_USERS
    setUsers(DUMMY_USERS);
  }, []);

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.profile.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.profile.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewUser = (user: MockUser) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const handleDeactivateUser = (userId: string) => {
    toast({
      title: "User Deactivated",
      description: "This action would deactivate the user in production.",
    });
  };

  const handleSendEmail = (email: string) => {
    toast({
      title: "Email Sent",
      description: `Email sent to ${email}`,
    });
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'employer':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage all registered users</CardDescription>
        <div className="relative mt-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name or email..."
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
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.profile.first_name} {user.profile.last_name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(user.profile.role)}>
                    {user.profile.role}
                  </Badge>
                </TableCell>
                <TableCell className="capitalize">{user.user_type}</TableCell>
                <TableCell>{user.profile.phone || 'N/A'}</TableCell>
                <TableCell>{user.profile.job_title || 'N/A'}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewUser(user)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSendEmail(user.email)}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeactivateUser(user.id)}
                    >
                      <UserX className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No users found
          </div>
        )}

        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>View complete user information</DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-1">Name</h4>
                    <p>{selectedUser.profile.first_name} {selectedUser.profile.last_name}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p>{selectedUser.email}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p>{selectedUser.profile.phone || 'N/A'}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Role</h4>
                    <Badge variant={getRoleBadgeVariant(selectedUser.profile.role)}>
                      {selectedUser.profile.role}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">User Type</h4>
                    <p className="capitalize">{selectedUser.user_type}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Job Title</h4>
                    <p>{selectedUser.profile.job_title || 'N/A'}</p>
                  </div>
                  {selectedUser.profile.company && (
                    <div>
                      <h4 className="font-semibold mb-1">Company</h4>
                      <p>{selectedUser.profile.company}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold mb-1">User ID</h4>
                    <p className="text-sm text-muted-foreground">{selectedUser.id}</p>
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

export default UserManagement;
