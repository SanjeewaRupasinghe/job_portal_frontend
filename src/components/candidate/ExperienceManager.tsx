import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit2, Trash2, Building2, Calendar, Briefcase } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
// PRODUCTION: Uncomment for Supabase
// import { supabase } from '@/integrations/supabase/client';

const experienceFormSchema = z.object({
  job_title: z.string().min(2, 'Job title must be at least 2 characters'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  start_at: z.string().min(1, 'Start date is required'),
  end_at: z.string().optional(),
  is_currently_working: z.boolean().default(false),
  job_roles: z.string().optional(),
}).refine((data) => {
  if (!data.is_currently_working && !data.end_at) {
    return false;
  }
  return true;
}, {
  message: "End date is required if not currently working",
  path: ["end_at"],
});

type ExperienceFormValues = z.infer<typeof experienceFormSchema>;

interface Experience {
  id: string;
  job_title: string;
  company: string;
  start_at: string;
  end_at?: string;
  is_currently_working: boolean;
  job_roles?: string;
  created_at: string;
  updated_at: string;
}

const ExperienceManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      job_title: '',
      company: '',
      start_at: '',
      end_at: '',
      is_currently_working: false,
      job_roles: '',
    },
  });

  const isCurrentlyWorking = form.watch('is_currently_working');

  // DEVELOPMENT: Mock data (REMOVE IN PRODUCTION)
  useEffect(() => {
    const loadMockExperiences = () => {
      const mockExperiences: Experience[] = [
        {
          id: '1',
          job_title: 'Senior Frontend Developer',
          company: 'TechCorp Inc.',
          start_at: '2022-01-15',
          end_at: undefined,
          is_currently_working: true,
          job_roles: 'Led frontend development team, implemented new features, mentored junior developers, optimized application performance',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          job_title: 'Frontend Developer',
          company: 'StartupXYZ',
          start_at: '2020-06-01',
          end_at: '2021-12-31',
          is_currently_working: false,
          job_roles: 'Developed responsive web applications, collaborated with design team, integrated APIs',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
      setExperiences(mockExperiences);
      setLoading(false);
    };

    loadMockExperiences();
  }, []);

  /* PRODUCTION: Uncomment for Supabase integration
  useEffect(() => {
    const fetchExperiences = async () => {
      if (!user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('experiences')
          .select('*')
          .eq('user_id', user.id)
          .order('start_at', { ascending: false });

        if (error) throw error;
        setExperiences(data || []);
      } catch (error) {
        console.error('Error fetching experiences:', error);
        toast({
          title: 'Error',
          description: 'Failed to load experiences',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [user?.id, toast]);
  */

  const onSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      // DEVELOPMENT: Mock submission (REPLACE WITH SUPABASE IN PRODUCTION)
      const newExperience: Experience = {
        id: editingExperience?.id || Date.now().toString(),
        job_title: values.job_title,
        company: values.company,
        start_at: values.start_at,
        end_at: values.is_currently_working ? undefined : values.end_at,
        is_currently_working: values.is_currently_working,
        job_roles: values.job_roles || '',
        created_at: editingExperience?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (editingExperience) {
        setExperiences(prev => prev.map(e => e.id === editingExperience.id ? newExperience : e));
        toast({
          title: 'Success',
          description: 'Experience updated successfully',
        });
      } else {
        setExperiences(prev => [newExperience, ...prev]);
        toast({
          title: 'Success',
          description: 'Experience added successfully',
        });
      }

      /* PRODUCTION: Uncomment for Supabase
      const experienceData = {
        user_id: user?.id,
        job_title: values.job_title,
        company: values.company,
        start_at: values.start_at,
        end_at: values.is_currently_working ? null : values.end_at,
        is_currently_working: values.is_currently_working,
        job_roles: values.job_roles,
      };

      if (editingExperience) {
        const { error } = await supabase
          .from('experiences')
          .update(experienceData)
          .eq('id', editingExperience.id);

        if (error) throw error;
        
        setExperiences(prev => prev.map(e => 
          e.id === editingExperience.id 
            ? { ...e, ...experienceData, updated_at: new Date().toISOString() }
            : e
        ));
        
        toast({
          title: 'Success',
          description: 'Experience updated successfully',
        });
      } else {
        const { data, error } = await supabase
          .from('experiences')
          .insert([experienceData])
          .select()
          .single();

        if (error) throw error;
        
        setExperiences(prev => [data, ...prev]);
        
        toast({
          title: 'Success',
          description: 'Experience added successfully',
        });
      }
      */

      handleCloseDialog();
    } catch (error) {
      console.error('Error saving experience:', error);
      toast({
        title: 'Error',
        description: 'Failed to save experience',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    form.reset({
      job_title: experience.job_title,
      company: experience.company,
      start_at: experience.start_at,
      end_at: experience.end_at || '',
      is_currently_working: experience.is_currently_working,
      job_roles: experience.job_roles || '',
    });
    setDialogOpen(true);
  };

  const handleDelete = async (experienceId: string) => {
    try {
      // DEVELOPMENT: Mock deletion (REPLACE WITH SUPABASE IN PRODUCTION)
      setExperiences(prev => prev.filter(e => e.id !== experienceId));
      toast({
        title: 'Success',
        description: 'Experience deleted successfully',
      });

      /* PRODUCTION: Uncomment for Supabase
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', experienceId);

      if (error) throw error;
      
      setExperiences(prev => prev.filter(e => e.id !== experienceId));
      
      toast({
        title: 'Success',
        description: 'Experience deleted successfully',
      });
      */
    } catch (error) {
      console.error('Error deleting experience:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete experience',
        variant: 'destructive',
      });
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingExperience(null);
    form.reset();
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM yyyy');
  };

  const calculateDuration = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    
    let totalMonths = years * 12 + months;
    if (totalMonths < 1) totalMonths = 1;
    
    const displayYears = Math.floor(totalMonths / 12);
    const displayMonths = totalMonths % 12;
    
    if (displayYears === 0) {
      return `${displayMonths} month${displayMonths !== 1 ? 's' : ''}`;
    } else if (displayMonths === 0) {
      return `${displayYears} year${displayYears !== 1 ? 's' : ''}`;
    } else {
      return `${displayYears} year${displayYears !== 1 ? 's' : ''} ${displayMonths} month${displayMonths !== 1 ? 's' : ''}`;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-muted animate-pulse rounded" />
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Work Experience</h2>
          <p className="text-muted-foreground">Showcase your professional experience</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingExperience ? 'Edit Experience' : 'Add New Experience'}</DialogTitle>
              <DialogDescription>
                {editingExperience ? 'Update your work experience' : 'Add a new work experience to your profile'}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="job_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Software Engineer, Marketing Manager..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Google, Microsoft, Local Startup..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="start_at"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="end_at"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            disabled={isCurrentlyWorking}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="is_currently_working"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I currently work here</FormLabel>
                        <FormDescription>
                          Check this if this is your current position
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="job_roles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description & Responsibilities</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your key responsibilities, achievements, and impact in this role..."
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Highlight your key accomplishments and responsibilities
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                  <Button type="button" variant="outline" onClick={handleCloseDialog} className="w-full sm:w-auto">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                    {submitting ? 'Saving...' : (editingExperience ? 'Update Experience' : 'Add Experience')}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {experiences.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Briefcase className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No experience added yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Start building your professional profile by adding your work experience
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Experience
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {experiences.map((experience) => (
            <Card key={experience.id} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{experience.job_title}</CardTitle>
                        <CardDescription className="text-base font-medium text-foreground mt-1">
                          {experience.company}
                        </CardDescription>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {formatDate(experience.start_at)} - {' '}
                              {experience.is_currently_working ? 'Present' : formatDate(experience.end_at!)}
                            </span>
                          </div>
                          <Badge variant="secondary">
                            {calculateDuration(experience.start_at, experience.end_at)}
                          </Badge>
                          {experience.is_currently_working && (
                            <Badge className="bg-success text-success-foreground">
                              Current
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(experience)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(experience.id)}
                      className="h-8 w-8 p-0 hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {experience.job_roles && (
                <CardContent className="pt-0">
                  <p className="text-muted-foreground whitespace-pre-line">
                    {experience.job_roles}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceManager;