import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import SkillsManager from '@/components/candidate/SkillsManager';
import ExperienceManager from '@/components/candidate/ExperienceManager';
import EducationManager from '@/components/candidate/EducationManager';
import ApplicationsManager from '@/components/candidate/ApplicationsManager';
import InterviewsManager from '@/components/candidate/InterviewsManager';
import ProfileEditor from '@/components/candidate/ProfileEditor';
import { ResumeManager } from '@/components/candidate/ResumeManager';
import JobPostingsManager from '@/components/employer/JobPostingsManager';
import ApplicationsReceived from '@/components/employer/ApplicationsReceived';
import CompanyProfileManager from '@/components/employer/CompanyProfileManager';
import EmployerProfile from '@/components/employer/EmployerProfile';
import UserManagement from '@/components/admin/UserManagement';
import JobManagement from '@/components/admin/JobManagement';
import CompanyManagement from '@/components/admin/CompanyManagement';
import BlogManagement from '@/components/admin/BlogManagement';
import ScheduleManager from '@/components/admin/ScheduleManager';
import FeedbackManagement from '@/components/admin/FeedbackManagement';
import { SampleDataLoader } from '@/components/admin/SampleDataLoader';
import { 
  User, 
  Briefcase, 
  BookOpen, 
  Award, 
  FileText, 
  Settings,
  Calendar,
  MessageSquare,
  Bookmark
} from 'lucide-react';

const Dashboard = () => {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const renderCandidateDashboard = () => (
    <div className="space-y-6">
      <SampleDataLoader />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Total applications submitted</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Scheduled interviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookmarks</CardTitle>
            <Bookmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Saved job posts</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="resumes">Resumes</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <ProfileEditor />
        </TabsContent>
        
        <TabsContent value="resumes">
          <ResumeManager userId={user.id} />
        </TabsContent>
        
        <TabsContent value="skills">
          <SkillsManager />
        </TabsContent>
        
        <TabsContent value="experience">
          <ExperienceManager />
        </TabsContent>
        
        <TabsContent value="education">
          <EducationManager />
        </TabsContent>
        
        <TabsContent value="applications">
          <ApplicationsManager />
        </TabsContent>
        
        <TabsContent value="interviews">
          <InterviewsManager />
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderEmployerDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Job posts currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Total applications received</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Interviews scheduled</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="jobs">Job Posts</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <EmployerProfile />
        </TabsContent>
        
        <TabsContent value="jobs">
          <JobPostingsManager />
        </TabsContent>
        
        <TabsContent value="applications">
          <ApplicationsReceived />
        </TabsContent>
        
        <TabsContent value="company">
          <CompanyProfileManager />
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Posts</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Total job postings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Companies</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Registered companies</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Published blog posts</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="blogs">Blogs & FAQs</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        
        <TabsContent value="jobs">
          <JobManagement />
        </TabsContent>
        
        <TabsContent value="companies">
          <CompanyManagement />
        </TabsContent>
        
        <TabsContent value="blogs">
          <BlogManagement />
        </TabsContent>

        <TabsContent value="schedule">
          <ScheduleManager />
        </TabsContent>

        <TabsContent value="feedback">
          <FeedbackManagement />
        </TabsContent>
      </Tabs>
    </div>
  );

  const getDashboardContent = () => {
    switch (userProfile?.role) {
      case 'admin':
        return renderAdminDashboard();
      case 'employer':
        return renderEmployerDashboard();
      case 'candidate':
      default:
        return renderCandidateDashboard();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back, {userProfile?.first_name || 'User'}!
        </h1>
        <p className="text-muted-foreground mt-2">
          {userProfile?.role === 'admin' && "Manage your platform from the admin dashboard."}
          {userProfile?.role === 'employer' && "Manage your job postings and review applications."}
          {userProfile?.role === 'candidate' && "Track your applications and manage your profile."}
        </p>
      </div>
      {getDashboardContent()}
    </div>
  );
};

export default Dashboard;