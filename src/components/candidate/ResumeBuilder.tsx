import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Trash2, FileText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ResumeBuilderProps {
  userId: string;
  onSave: () => void;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

export function ResumeBuilder({ userId, onSave }: ResumeBuilderProps) {
  const [resumeName, setResumeName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [summary, setSummary] = useState('');
  const [skills, setSkills] = useState('');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { id: Date.now().toString(), title: '', company: '', period: '', description: '' }
    ]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { id: Date.now().toString(), degree: '', school: '', year: '' }
    ]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const generateResumeHTML = () => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; }
    h1 { color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px; }
    h2 { color: #1e40af; margin-top: 30px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
    .contact { margin: 10px 0; color: #4b5563; }
    .summary { margin: 20px 0; line-height: 1.6; }
    .experience, .education { margin: 20px 0; }
    .experience-item, .education-item { margin: 15px 0; }
    .title { font-weight: bold; color: #1f2937; }
    .company { color: #6b7280; font-style: italic; }
    .period { color: #9ca3af; }
    .skills { display: flex; flex-wrap: wrap; gap: 10px; margin: 10px 0; }
    .skill { background: #dbeafe; color: #1e40af; padding: 5px 12px; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>${fullName}</h1>
  <div class="contact">
    ${email} | ${phone}
  </div>
  
  ${summary ? `<div class="summary"><h2>Professional Summary</h2><p>${summary}</p></div>` : ''}
  
  ${skills ? `
    <div class="skills-section">
      <h2>Skills</h2>
      <div class="skills">
        ${skills.split(',').map(skill => `<span class="skill">${skill.trim()}</span>`).join('')}
      </div>
    </div>
  ` : ''}
  
  ${experiences.length > 0 ? `
    <div class="experience">
      <h2>Experience</h2>
      ${experiences.map(exp => `
        <div class="experience-item">
          <div class="title">${exp.title}</div>
          <div class="company">${exp.company} | <span class="period">${exp.period}</span></div>
          <p>${exp.description}</p>
        </div>
      `).join('')}
    </div>
  ` : ''}
  
  ${education.length > 0 ? `
    <div class="education">
      <h2>Education</h2>
      ${education.map(edu => `
        <div class="education-item">
          <div class="title">${edu.degree}</div>
          <div class="company">${edu.school} | ${edu.year}</div>
        </div>
      `).join('')}
    </div>
  ` : ''}
</body>
</html>
    `;
  };

  const handleSave = async () => {
    if (!resumeName.trim() || !fullName.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please enter resume name and your full name',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      const htmlContent = generateResumeHTML();
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const fileName = `${userId}/${Date.now()}_${resumeName.replace(/\s+/g, '_')}.html`;

      // Upload HTML file to storage
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, blob);

      if (uploadError) throw uploadError;

      // Save to database
      const { error: dbError } = await supabase
        .from('resumes')
        .insert({
          user_id: userId,
          name: resumeName.trim(),
          resume: fileName,
          parsed_content: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nSummary: ${summary}`,
          file_size: blob.size,
          file_type: 'text/html',
        });

      if (dbError) throw dbError;

      toast({
        title: 'Success',
        description: 'Resume created successfully',
      });

      // Reset form
      setResumeName('');
      setFullName('');
      setEmail('');
      setPhone('');
      setSummary('');
      setSkills('');
      setExperiences([]);
      setEducation([]);
      onSave();
    } catch (error) {
      console.error('Error saving resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to create resume',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="h-6 w-6 text-primary" />
        <h3 className="text-lg font-semibold">Build Your Resume</h3>
      </div>

      <div className="space-y-6">
        {/* Resume Name */}
        <div>
          <Label htmlFor="builder-name">Resume Name *</Label>
          <Input
            id="builder-name"
            placeholder="e.g., Software Developer Resume"
            value={resumeName}
            onChange={(e) => setResumeName(e.target.value)}
          />
        </div>

        <Separator />

        {/* Personal Information */}
        <div className="space-y-4">
          <h4 className="font-semibold">Personal Information</h4>
          
          <div>
            <Label htmlFor="full-name">Full Name *</Label>
            <Input
              id="full-name"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="+1 234 567 8900"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Summary */}
        <div>
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            placeholder="Brief overview of your professional background and goals..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={4}
          />
        </div>

        <Separator />

        {/* Skills */}
        <div>
          <Label htmlFor="skills">Skills (comma-separated)</Label>
          <Input
            id="skills"
            placeholder="JavaScript, React, Node.js, Python"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        <Separator />

        {/* Experience */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Work Experience</h4>
            <Button variant="outline" size="sm" onClick={addExperience}>
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>

          {experiences.map((exp, index) => (
            <Card key={exp.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Experience {index + 1}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <Input
                placeholder="Job Title"
                value={exp.title}
                onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
              />
              <Input
                placeholder="Company Name"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
              />
              <Input
                placeholder="Period (e.g., Jan 2020 - Present)"
                value={exp.period}
                onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
              />
              <Textarea
                placeholder="Job description and achievements..."
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                rows={3}
              />
            </Card>
          ))}
        </div>

        <Separator />

        {/* Education */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Education</h4>
            <Button variant="outline" size="sm" onClick={addEducation}>
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>

          {education.map((edu, index) => (
            <Card key={edu.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Education {index + 1}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <Input
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
              />
              <Input
                placeholder="School/University"
                value={edu.school}
                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
              />
              <Input
                placeholder="Year (e.g., 2020)"
                value={edu.year}
                onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
              />
            </Card>
          ))}
        </div>

        <Separator />

        <Button onClick={handleSave} disabled={saving} className="w-full">
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating Resume...
            </>
          ) : (
            <>
              <FileText className="h-4 w-4 mr-2" />
              Create Resume
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
