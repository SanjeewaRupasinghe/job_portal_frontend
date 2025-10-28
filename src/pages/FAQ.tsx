import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, HelpCircle, MessageCircle, Mail } from 'lucide-react';

const FAQ = () => {
  const faqCategories = [
    {
      title: 'Getting Started',
      faqs: [
        {
          question: 'How do I create an account on FindJobOffer?',
          answer: 'Creating an account is simple! Click the "Sign Up" button in the top right corner, choose your account type (Candidate or Employer), fill in your details, and verify your email address. You\'ll be ready to start using the platform immediately.'
        },
        {
          question: 'Is FindJobOffer free to use?',
          answer: 'Yes! Job seekers can use FindJobOffer completely free. This includes creating a profile, searching jobs, applying to positions, and communicating with employers. Employers have access to basic features for free, with premium options available for enhanced visibility and advanced tools.'
        },
        {
          question: 'What types of jobs are available on the platform?',
          answer: 'We feature jobs across all industries and experience levels, from entry-level positions to executive roles. Our categories include Technology, Healthcare, Finance, Marketing, Engineering, Design, and many more. Both full-time and part-time opportunities are available, including remote, hybrid, and on-site positions.'
        }
      ]
    },
    {
      title: 'For Job Seekers',
      faqs: [
        {
          question: 'How do I make my profile stand out to employers?',
          answer: 'Complete all sections of your profile including skills, experience, education, and certifications. Upload a professional resume, write a compelling summary, and keep your information up-to-date. Adding a portfolio or work samples can also significantly improve your visibility to employers.'
        },
        {
          question: 'How does the job matching system work?',
          answer: 'Our smart matching algorithm analyzes your profile, skills, experience, and preferences to suggest relevant job opportunities. The system also considers your location preferences, salary expectations, and work setting preferences to provide personalized recommendations.'
        },
        {
          question: 'Can I apply to multiple jobs at once?',
          answer: 'Yes, you can apply to as many jobs as you like. However, we recommend tailoring your application and cover letter for each position to increase your chances of success. You can track all your applications in your dashboard.'
        },
        {
          question: 'How will I know if an employer is interested?',
          answer: 'You\'ll receive notifications via email and in your dashboard when employers view your profile, respond to your application, or want to schedule an interview. You can also message employers directly through our platform.'
        }
      ]
    },
    {
      title: 'For Employers',
      faqs: [
        {
          question: 'How do I post a job on FindJobOffer?',
          answer: 'After creating an employer account and setting up your company profile, click "Post a Job" in your dashboard. Fill in the job details including title, description, requirements, salary range, and work setting. Your job will be reviewed and published within 24 hours.'
        },
        {
          question: 'How much does it cost to post jobs?',
          answer: 'Basic job posting is free for all employers. Premium features like featured listings, advanced candidate filtering, and priority support are available through our paid plans. Contact us for enterprise pricing if you\'re a large organization with high-volume hiring needs.'
        },
        {
          question: 'How do I find the right candidates?',
          answer: 'Use our advanced search filters to find candidates by skills, experience, location, and other criteria. You can also browse applications for your posted jobs and use our matching suggestions. Premium members get access to additional search and contact features.'
        },
        {
          question: 'Can I schedule interviews through the platform?',
          answer: 'Yes! Our integrated interview scheduling system allows you to send interview invitations, coordinate times, and conduct video interviews directly through the platform. Candidates can accept or propose alternative times, making scheduling seamless.'
        }
      ]
    },
    {
      title: 'Technical Support',
      faqs: [
        {
          question: 'I\'m having trouble uploading my resume. What should I do?',
          answer: 'Ensure your resume is in PDF, DOC, or DOCX format and under 5MB in size. Clear your browser cache and try again. If the problem persists, try using a different browser or contact our support team for assistance.'
        },
        {
          question: 'Why am I not receiving email notifications?',
          answer: 'Check your spam/junk folder first. Then verify your email address in your account settings and ensure notifications are enabled. Add our email domain to your safe senders list to prevent future issues.'
        },
        {
          question: 'How do I delete my account?',
          answer: 'You can delete your account by going to Settings > Account > Delete Account. Please note that this action is permanent and cannot be undone. All your data, applications, and messages will be permanently removed.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Absolutely! We use industry-standard encryption and security measures to protect your data. Your personal information is never shared with third parties without your consent, and you have full control over what information is visible to employers.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to common questions about using FindJobOffer. Can't find what you're looking for? Contact our support team.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search FAQs..." 
              className="pl-10 bg-background border-2"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <HelpCircle className="h-6 w-6 text-primary" />
                  {category.title}
                </CardTitle>
                <CardDescription>
                  Common questions about {category.title.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`${categoryIndex}-${faqIndex}`}
                      className="border-border/50"
                    >
                      <AccordionTrigger className="text-left hover:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Still Need Help?</CardTitle>
              <CardDescription className="text-base">
                Our support team is here to help you with any questions or issues you may have.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Button className="w-full" variant="outline">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Live Chat Support
                </Button>
                <Button className="w-full" variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Support
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Average response time: Less than 4 hours during business hours
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">Popular Help Topics</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'Account Setup',
              'Job Applications',
              'Profile Optimization',
              'Interview Scheduling',
              'Resume Upload',
              'Notification Settings',
              'Privacy Settings',
              'Company Verification'
            ].map((topic) => (
              <Button key={topic} variant="outline" size="sm" className="m-1">
                {topic}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;