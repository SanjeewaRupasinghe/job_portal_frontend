import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Edit2, Trash2, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const educationSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  field_of_study: z.string().min(1, 'Field of study is required'),
  level_of_education: z.string().min(1, 'Level of education is required'),
  description: z.string().optional(),
  start_at: z.string().min(1, 'Start date is required'),
  end_at: z.string().optional(),
  graduated_at: z.string().optional(),
  is_currently_studying: z.boolean(),
  gpa: z.string().optional(),
  country: z.string().optional(),
});

type EducationFormData = z.infer<typeof educationSchema>;

interface Education {
  id: string;
  institution: string;
  field_of_study: string;
  level_of_education: string;
  description?: string;
  start_at: string;
  end_at?: string;
  graduated_at?: string;
  is_currently_studying: boolean;
  gpa?: string;
  country?: string;
  created_at: string;
}

const educationLevels = [
  'High School',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Doctoral Degree',
  'Professional Certificate',
  'Diploma',
  'Other'
];

const EducationManager = () => {
  const [educations, setEducations] = useState<Education[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const { toast } = useToast();

  const form = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: '',
      field_of_study: '',
      level_of_education: '',
      description: '',
      start_at: '',
      end_at: '',
      graduated_at: '',
      is_currently_studying: false,
      gpa: '',
      country: '',
    },
  });

  const onSubmit = (data: EducationFormData) => {
    try {
      if (editingEducation) {
        // Update existing education
        setEducations(prev => prev.map(edu => 
          edu.id === editingEducation.id 
            ? { ...edu, ...data }
            : edu
        ));
        toast({
          title: "Education Updated",
          description: "Your education has been updated successfully.",
        });
      } else {
        // Add new education
        const newEducation: Education = {
          id: Date.now().toString(),
          ...data,
          created_at: new Date().toISOString(),
        };
        setEducations(prev => [...prev, newEducation]);
        toast({
          title: "Education Added",
          description: "Your education has been added successfully.",
        });
      }
      
      handleCloseDialog();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save education. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (education: Education) => {
    setEditingEducation(education);
    form.reset({
      institution: education.institution,
      field_of_study: education.field_of_study,
      level_of_education: education.level_of_education,
      description: education.description || '',
      start_at: education.start_at,
      end_at: education.end_at || '',
      graduated_at: education.graduated_at || '',
      is_currently_studying: education.is_currently_studying,
      gpa: education.gpa || '',
      country: education.country || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setEducations(prev => prev.filter(edu => edu.id !== id));
    toast({
      title: "Education Deleted",
      description: "Education has been removed from your profile.",
    });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingEducation(null);
    form.reset();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Education
              </CardTitle>
              <CardDescription>
                Add your educational background and qualifications
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingEducation ? 'Edit Education' : 'Add Education'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingEducation 
                      ? 'Update your educational information.' 
                      : 'Add a new educational qualification to your profile.'
                    }
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="institution"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Institution</FormLabel>
                            <FormControl>
                              <Input placeholder="University/School name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="level_of_education"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Level of Education</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {educationLevels.map((level) => (
                                  <SelectItem key={level} value={level}>
                                    {level}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="field_of_study"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Field of Study</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Computer Science, Business Administration" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                {...field} 
                                disabled={form.watch('is_currently_studying')}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="graduated_at"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Graduation Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="gpa"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>GPA (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 3.8" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., United States" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="is_currently_studying"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Currently Studying</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              I am currently studying at this institution
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your coursework, achievements, or relevant details..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={handleCloseDialog}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingEducation ? 'Update' : 'Add'} Education
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {educations.length === 0 ? (
            <div className="text-center py-8">
              <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Education Added</h3>
              <p className="text-muted-foreground mb-4">
                Add your educational background to strengthen your profile.
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Education
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {educations.map((education) => (
                <Card key={education.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{education.institution}</h3>
                        <Badge variant="secondary">{education.level_of_education}</Badge>
                        {education.is_currently_studying && (
                          <Badge variant="outline" className="text-primary">Currently Studying</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground font-medium mb-2">
                        {education.field_of_study}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(education.start_at)} - {
                            education.is_currently_studying 
                              ? 'Present' 
                              : education.end_at 
                                ? formatDate(education.end_at)
                                : 'N/A'
                          }
                        </div>
                        {education.country && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {education.country}
                          </div>
                        )}
                        {education.gpa && (
                          <div>GPA: {education.gpa}</div>
                        )}
                      </div>
                      {education.graduated_at && (
                        <p className="text-sm text-muted-foreground mb-2">
                          Graduated: {formatDate(education.graduated_at)}
                        </p>
                      )}
                      {education.description && (
                        <p className="text-sm text-muted-foreground">{education.description}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(education)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(education.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EducationManager;