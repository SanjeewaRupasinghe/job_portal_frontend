-- Create FAQs table
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Admins can manage FAQs
CREATE POLICY "Admins can manage FAQs"
ON public.faqs
FOR ALL
TO authenticated
USING (auth.uid() IN (
  SELECT profiles.user_id 
  FROM profiles 
  WHERE profiles.role = 'admin'
));

-- Everyone can view published FAQs
CREATE POLICY "Everyone can view published FAQs"
ON public.faqs
FOR SELECT
USING (is_published = true);

-- Create trigger for updated_at
CREATE TRIGGER update_faqs_updated_at
BEFORE UPDATE ON public.faqs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();