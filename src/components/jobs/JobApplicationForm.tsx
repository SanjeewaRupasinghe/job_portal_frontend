import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Upload, CheckCircle, Edit } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  workSetting: string;
  category: string;
  postedAt: string;
  description: string;
  tags: string[];
  featured: boolean;
}

interface JobApplicationFormProps {
  job: Job;
  onBack: () => void;
}

interface FormData {
  // Step 1: Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  
  // Step 2: Professional Information
  currentTitle: string;
  experience: string;
  expectedSalary: string;
  availableStart: string;
  
  // Step 3: Application Details
  coverLetter: string;
  resumeFile: File | null;
  portfolioUrl: string;
  linkedinUrl: string;
  
  // Step 4: Additional Information
  relocate: string;
  remote: string;
  referral: string;
  additional: string;
  
  // Terms
  terms: boolean;
  privacy: boolean;
}

const steps = [
  { id: 1, title: "Personal Info", description: "Basic information" },
  { id: 2, title: "Professional", description: "Work experience" },
  { id: 3, title: "Application", description: "Resume & cover letter" },
  { id: 4, title: "Final Details", description: "Additional information" },
  { id: 5, title: "Summary", description: "Review & submit" },
];

export default function JobApplicationForm({ job, onBack }: JobApplicationFormProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    currentTitle: "",
    experience: "",
    expectedSalary: "",
    availableStart: "",
    coverLetter: "",
    resumeFile: null,
    portfolioUrl: "",
    linkedinUrl: "",
    relocate: "",
    remote: "",
    referral: "",
    additional: "",
    terms: false,
    privacy: false,
  });

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you soon.",
    });
  };

  const progress = (currentStep / steps.length) * 100;

  if (isSubmitted) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Application Submitted!</h3>
            <p className="text-muted-foreground mb-6">
              Thank you for applying to {job.title} at {job.company}. 
              We'll review your application and get back to you soon.
            </p>
            <div className="space-y-2">
              <Button onClick={onBack} variant="outline">
                Back to Job Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Apply for {job.title}</CardTitle>
            <p className="text-muted-foreground">{job.company}</p>
          </div>
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        
        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Step {currentStep} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className={`text-xs text-center ${
                  step.id <= currentStep ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div className="font-medium">{step.title}</div>
                <div>{step.description}</div>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>

      <ScrollArea className="flex-1">
        <CardContent className="p-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                  placeholder="Enter your address"
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 2: Professional Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Professional Information</h3>
              <div>
                <Label htmlFor="currentTitle">Current Job Title</Label>
                <Input
                  id="currentTitle"
                  value={formData.currentTitle}
                  onChange={(e) => updateFormData('currentTitle', e.target.value)}
                  placeholder="Enter your current job title"
                />
              </div>
              <div>
                <Label htmlFor="experience">Years of Experience *</Label>
                <RadioGroup 
                  value={formData.experience} 
                  onValueChange={(value) => updateFormData('experience', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0-1" id="exp-0-1" />
                    <Label htmlFor="exp-0-1">0-1 years</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2-5" id="exp-2-5" />
                    <Label htmlFor="exp-2-5">2-5 years</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="6-10" id="exp-6-10" />
                    <Label htmlFor="exp-6-10">6-10 years</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="10+" id="exp-10-plus" />
                    <Label htmlFor="exp-10-plus">10+ years</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="expectedSalary">Expected Salary</Label>
                <Input
                  id="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={(e) => updateFormData('expectedSalary', e.target.value)}
                  placeholder="e.g., $80,000 - $100,000"
                />
              </div>
              <div>
                <Label htmlFor="availableStart">Available Start Date</Label>
                <Input
                  id="availableStart"
                  type="date"
                  value={formData.availableStart}
                  onChange={(e) => updateFormData('availableStart', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 3: Application Details */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Application Details</h3>
              <div>
                <Label htmlFor="coverLetter">Cover Letter *</Label>
                <Textarea
                  id="coverLetter"
                  value={formData.coverLetter}
                  onChange={(e) => updateFormData('coverLetter', e.target.value)}
                  placeholder="Tell us why you're interested in this position..."
                  rows={6}
                />
              </div>
              <div>
                <Label htmlFor="resume">Resume *</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOC, DOCX (max 5MB)
                  </p>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => updateFormData('resumeFile', e.target.files?.[0] || null)}
                    className="mt-2"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                <Input
                  id="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={(e) => updateFormData('portfolioUrl', e.target.value)}
                  placeholder="https://your-portfolio.com"
                />
              </div>
              <div>
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input
                  id="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={(e) => updateFormData('linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
            </div>
          )}

          {/* Step 4: Additional Information */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Information</h3>
              <div>
                <Label>Are you willing to relocate?</Label>
                <RadioGroup 
                  value={formData.relocate} 
                  onValueChange={(value) => updateFormData('relocate', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="relocate-yes" />
                    <Label htmlFor="relocate-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="relocate-no" />
                    <Label htmlFor="relocate-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="maybe" id="relocate-maybe" />
                    <Label htmlFor="relocate-maybe">Maybe</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label>Are you open to remote work?</Label>
                <RadioGroup 
                  value={formData.remote} 
                  onValueChange={(value) => updateFormData('remote', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="remote-yes" />
                    <Label htmlFor="remote-yes">Yes, remote only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hybrid" id="remote-hybrid" />
                    <Label htmlFor="remote-hybrid">Hybrid is fine</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="remote-no" />
                    <Label htmlFor="remote-no">Prefer on-site</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="referral">How did you hear about this position?</Label>
                <Input
                  id="referral"
                  value={formData.referral}
                  onChange={(e) => updateFormData('referral', e.target.value)}
                  placeholder="Job board, referral, company website, etc."
                />
              </div>
              <div>
                <Label htmlFor="additional">Additional Information</Label>
                <Textarea
                  id="additional"
                  value={formData.additional}
                  onChange={(e) => updateFormData('additional', e.target.value)}
                  placeholder="Any additional information you'd like to share..."
                  rows={4}
                />
              </div>
              
              {/* Terms and Conditions */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={formData.terms}
                    onCheckedChange={(checked) => updateFormData('terms', checked)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the Terms and Conditions *
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="privacy" 
                    checked={formData.privacy}
                    onCheckedChange={(checked) => updateFormData('privacy', checked)}
                  />
                  <Label htmlFor="privacy" className="text-sm">
                    I agree to the Privacy Policy *
                  </Label>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Summary */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Review Your Application</h3>
              
              {/* Personal Information Summary */}
              <div className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Personal Information</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setCurrentStep(1)}
                    className="h-8 px-2"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</div>
                  <div><span className="font-medium">Email:</span> {formData.email}</div>
                  <div><span className="font-medium">Phone:</span> {formData.phone}</div>
                  {formData.address && <div><span className="font-medium">Address:</span> {formData.address}</div>}
                </div>
              </div>

              {/* Professional Information Summary */}
              <div className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Professional Information</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setCurrentStep(2)}
                    className="h-8 px-2"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  {formData.currentTitle && <div><span className="font-medium">Current Title:</span> {formData.currentTitle}</div>}
                  <div><span className="font-medium">Experience:</span> {formData.experience}</div>
                  {formData.expectedSalary && <div><span className="font-medium">Expected Salary:</span> {formData.expectedSalary}</div>}
                  {formData.availableStart && <div><span className="font-medium">Available Start:</span> {formData.availableStart}</div>}
                </div>
              </div>

              {/* Application Details Summary */}
              <div className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Application Details</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setCurrentStep(3)}
                    className="h-8 px-2"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Cover Letter:</span>
                    <p className="mt-1 text-muted-foreground line-clamp-3">{formData.coverLetter}</p>
                  </div>
                  <div><span className="font-medium">Resume:</span> {formData.resumeFile ? formData.resumeFile.name : "Not uploaded"}</div>
                  {formData.portfolioUrl && <div><span className="font-medium">Portfolio:</span> {formData.portfolioUrl}</div>}
                  {formData.linkedinUrl && <div><span className="font-medium">LinkedIn:</span> {formData.linkedinUrl}</div>}
                </div>
              </div>

              {/* Additional Information Summary */}
              <div className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Additional Information</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setCurrentStep(4)}
                    className="h-8 px-2"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  {formData.relocate && <div><span className="font-medium">Willing to relocate:</span> {formData.relocate}</div>}
                  {formData.remote && <div><span className="font-medium">Remote work:</span> {formData.remote}</div>}
                  {formData.referral && <div><span className="font-medium">How did you hear about us:</span> {formData.referral}</div>}
                  {formData.additional && (
                    <div className="md:col-span-2">
                      <span className="font-medium">Additional notes:</span>
                      <p className="mt-1 text-muted-foreground">{formData.additional}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Terms Confirmation */}
              <div className="border rounded-lg p-4 bg-primary/5">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Terms and Conditions accepted</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Privacy Policy accepted</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </ScrollArea>

      {/* Navigation */}
      <div className="border-t p-6">
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < steps.length ? (
            <Button onClick={nextStep}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={!formData.terms || !formData.privacy || isSubmitting}
              className="bg-primary hover:bg-primary-hover"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}