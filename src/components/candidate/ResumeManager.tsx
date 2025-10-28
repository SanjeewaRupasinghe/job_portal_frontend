import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Trash2, Download, Loader2, Plus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ResumeBuilder } from './ResumeBuilder';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Resume {
  id: string;
  name: string;
  resume: string;
  parsed_content?: string;
  file_size?: number;
  file_type?: string;
  created_at: string;
  updated_at: string;
}

export function ResumeManager({ userId }: { userId: string }) {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [resumeName, setResumeName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadResumes();
  }, [userId]);

  const loadResumes = async () => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResumes(data || []);
    } catch (error) {
      console.error('Error loading resumes:', error);
      toast({
        title: 'Error',
        description: 'Failed to load resumes',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      
      if (!validTypes.includes(file.type)) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a PDF or Word document',
          variant: 'destructive',
        });
        return;
      }

      // Validate file size (20MB max)
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Maximum file size is 20MB',
          variant: 'destructive',
        });
        return;
      }

      setSelectedFile(file);
      if (!resumeName) {
        setResumeName(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !resumeName.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please select a file and enter a name',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    try {
      // Upload file to storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

      // Parse resume content (for PDF/DOCX)
      let parsedContent = '';
      try {
        // Note: In production, you'd use an edge function to parse the resume
        // For now, we'll just store the file reference
        parsedContent = `Resume file: ${selectedFile.name}`;
      } catch (parseError) {
        console.error('Error parsing resume:', parseError);
      }

      // Save to database
      const { error: dbError } = await supabase
        .from('resumes')
        .insert({
          user_id: userId,
          name: resumeName.trim(),
          resume: fileName,
          parsed_content: parsedContent,
          file_size: selectedFile.size,
          file_type: selectedFile.type,
        });

      if (dbError) throw dbError;

      toast({
        title: 'Success',
        description: 'Resume uploaded successfully',
      });

      setResumeName('');
      setSelectedFile(null);
      loadResumes();
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload resume',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (resume: Resume) => {
    try {
      const { data, error } = await supabase.storage
        .from('resumes')
        .download(resume.resume);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resume.name}.${resume.file_type?.split('/').pop() || 'pdf'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to download resume',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const resume = resumes.find(r => r.id === deleteId);
      if (!resume) return;

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('resumes')
        .remove([resume.resume]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('resumes')
        .delete()
        .eq('id', deleteId);

      if (dbError) throw dbError;

      toast({
        title: 'Success',
        description: 'Resume deleted successfully',
      });

      loadResumes();
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete resume',
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="manage" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manage">My Resumes</TabsTrigger>
          <TabsTrigger value="builder">Resume Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-6">
          {/* Upload Section */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Upload New Resume</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="resume-name">Resume Name</Label>
                <Input
                  id="resume-name"
                  placeholder="e.g., Software Engineer Resume 2024"
                  value={resumeName}
                  onChange={(e) => setResumeName(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="resume-file">Choose File</Label>
                <Input
                  id="resume-file"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Accepted formats: PDF, DOC, DOCX (Max 20MB)
                </p>
              </div>

              {selectedFile && (
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Button onClick={handleUpload} disabled={uploading || !selectedFile}>
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Resume
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Resumes List */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">My Resume Versions</h3>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : resumes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>No resumes uploaded yet</p>
                <p className="text-sm mt-2">Upload your first resume to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">{resume.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Uploaded {formatDistanceToNow(new Date(resume.created_at), { addSuffix: true })}
                          {resume.file_size && ` • ${(resume.file_size / 1024 / 1024).toFixed(2)} MB`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(resume)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteId(resume.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="builder">
          <ResumeBuilder userId={userId} onSave={loadResumes} />
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this resume? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
