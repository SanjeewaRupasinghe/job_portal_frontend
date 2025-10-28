import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit2, Trash2, Star, BookOpen } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
// PRODUCTION: Uncomment for Supabase
// import { supabase } from '@/integrations/supabase/client';

const skillFormSchema = z.object({
  skill: z.string().min(2, 'Skill name must be at least 2 characters'),
  level: z.string(),
  years_of_experience: z.string(),
  description: z.string().optional(),
});

type SkillFormValues = z.infer<typeof skillFormSchema>;

interface Skill {
  id: string;
  skill: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  years_of_experience: number;
  description?: string;
  created_at: string;
  updated_at: string;
}

const proficiencyLevels = [
  { value: 'beginner', label: 'Beginner', color: 'bg-muted text-muted-foreground' },
  { value: 'intermediate', label: 'Intermediate', color: 'bg-secondary text-secondary-foreground' },
  { value: 'advanced', label: 'Advanced', color: 'bg-primary text-primary-foreground' },
  { value: 'expert', label: 'Expert', color: 'bg-destructive text-destructive-foreground' },
];

const SkillsManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      skill: '',
      level: 'beginner',
      years_of_experience: '0',
      description: '',
    },
  });

  // DEVELOPMENT: Mock data (REMOVE IN PRODUCTION)
  useEffect(() => {
    const loadMockSkills = () => {
      const mockSkills: Skill[] = [
        {
          id: '1',
          skill: 'JavaScript',
          level: 'advanced',
          years_of_experience: 3,
          description: 'Proficient in modern ES6+ features, async/await, and frameworks',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          skill: 'React',
          level: 'intermediate',
          years_of_experience: 2,
          description: 'Experience with hooks, context, and component lifecycle',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
      setSkills(mockSkills);
      setLoading(false);
    };

    loadMockSkills();
  }, []);

  /* PRODUCTION: Uncomment for Supabase integration
  useEffect(() => {
    const fetchSkills = async () => {
      if (!user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setSkills(data || []);
      } catch (error) {
        console.error('Error fetching skills:', error);
        toast({
          title: 'Error',
          description: 'Failed to load skills',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [user?.id, toast]);
  */

  const onSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      // DEVELOPMENT: Mock submission (REPLACE WITH SUPABASE IN PRODUCTION)
      const newSkill: Skill = {
        id: editingSkill?.id || Date.now().toString(),
        skill: values.skill,
        level: values.level as any,
        years_of_experience: parseInt(values.years_of_experience) || 0,
        description: values.description || '',
        created_at: editingSkill?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (editingSkill) {
        setSkills(prev => prev.map(s => s.id === editingSkill.id ? newSkill : s));
        toast({
          title: 'Success',
          description: 'Skill updated successfully',
        });
      } else {
        setSkills(prev => [newSkill, ...prev]);
        toast({
          title: 'Success',
          description: 'Skill added successfully',
        });
      }

      /* PRODUCTION: Uncomment for Supabase
      const skillData = {
        user_id: user?.id,
        skill: values.skill,
        level: values.level,
        years_of_experience: values.years_of_experience,
        description: values.description,
      };

      if (editingSkill) {
        const { error } = await supabase
          .from('skills')
          .update(skillData)
          .eq('id', editingSkill.id);

        if (error) throw error;
        
        setSkills(prev => prev.map(s => 
          s.id === editingSkill.id 
            ? { ...s, ...skillData, updated_at: new Date().toISOString() }
            : s
        ));
        
        toast({
          title: 'Success',
          description: 'Skill updated successfully',
        });
      } else {
        const { data, error } = await supabase
          .from('skills')
          .insert([skillData])
          .select()
          .single();

        if (error) throw error;
        
        setSkills(prev => [data, ...prev]);
        
        toast({
          title: 'Success',
          description: 'Skill added successfully',
        });
      }
      */

      handleCloseDialog();
    } catch (error) {
      console.error('Error saving skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to save skill',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    form.reset({
      skill: skill.skill,
      level: skill.level,
      years_of_experience: skill.years_of_experience.toString(),
      description: skill.description || '',
    });
    setDialogOpen(true);
  };

  const handleDelete = async (skillId: string) => {
    try {
      // DEVELOPMENT: Mock deletion (REPLACE WITH SUPABASE IN PRODUCTION)
      setSkills(prev => prev.filter(s => s.id !== skillId));
      toast({
        title: 'Success',
        description: 'Skill deleted successfully',
      });

      /* PRODUCTION: Uncomment for Supabase
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', skillId);

      if (error) throw error;
      
      setSkills(prev => prev.filter(s => s.id !== skillId));
      
      toast({
        title: 'Success',
        description: 'Skill deleted successfully',
      });
      */
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete skill',
        variant: 'destructive',
      });
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingSkill(null);
    form.reset();
  };

  const getProficiencyColor = (level: string) => {
    const levelData = proficiencyLevels.find(l => l.value === level);
    return levelData?.color || 'bg-muted text-muted-foreground';
  };

  const getStarsForLevel = (level: string) => {
    const levels = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };
    return levels[level as keyof typeof levels] || 1;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Skills</h2>
          <p className="text-muted-foreground">Showcase your technical and soft skills</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</DialogTitle>
              <DialogDescription>
                {editingSkill ? 'Update your skill information' : 'Add a new skill to your profile'}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="skill"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., JavaScript, Leadership, Design..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Proficiency Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {proficiencyLevels.map(level => (
                              <SelectItem key={level.value} value={level.value}>
                                {level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="years_of_experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" max="50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your experience with this skill..."
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Provide context about your experience and expertise
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
                    {submitting ? 'Saving...' : (editingSkill ? 'Update Skill' : 'Add Skill')}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {skills.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No skills added yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Start building your profile by adding your technical and soft skills
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Skill
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <Card key={skill.id} className="group hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{skill.skill}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getProficiencyColor(skill.level)}>
                        {proficiencyLevels.find(l => l.value === skill.level)?.label}
                      </Badge>
                      <div className="flex items-center">
                        {Array.from({ length: getStarsForLevel(skill.level) }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current text-warning" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(skill)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(skill.id)}
                      className="h-8 w-8 p-0 hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">{skill.years_of_experience}</span> year{skill.years_of_experience !== 1 ? 's' : ''} experience
                  </div>
                  {skill.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {skill.description}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsManager;