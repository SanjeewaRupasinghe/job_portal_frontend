-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('admin', 'employer', 'candidate');

-- Create app status enums
CREATE TYPE public.job_status AS ENUM ('draft', 'active', 'inactive', 'closed');
CREATE TYPE public.application_status AS ENUM ('pending', 'reviewed', 'interviewed', 'rejected', 'accepted');
CREATE TYPE public.interview_status AS ENUM ('scheduled', 'completed', 'cancelled', 'rescheduled');
CREATE TYPE public.work_setting AS ENUM ('remote', 'onsite', 'hybrid');
CREATE TYPE public.salary_type AS ENUM ('hourly', 'monthly', 'yearly');
CREATE TYPE public.proficiency_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'candidate',
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  contact TEXT,
  avatar TEXT,
  cover_image TEXT,
  is_ready_to_work BOOLEAN DEFAULT false,
  about_me TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create countries table
CREATE TABLE public.countries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create companies table
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  logo TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  country_id UUID REFERENCES public.countries(id),
  website TEXT,
  linkedin TEXT,
  twitter TEXT,
  facebook TEXT,
  founder TEXT,
  founded_at DATE,
  description TEXT,
  why_chose_us TEXT,
  size TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create job_posts table
CREATE TABLE public.job_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT,
  category_id UUID REFERENCES public.categories(id),
  country_id UUID REFERENCES public.countries(id),
  location TEXT,
  min_salary DECIMAL,
  max_salary DECIMAL,
  currency TEXT DEFAULT 'USD',
  salary_type salary_type DEFAULT 'yearly',
  status job_status DEFAULT 'draft',
  work_setting work_setting DEFAULT 'onsite',
  openings INTEGER DEFAULT 1,
  filled INTEGER DEFAULT 0,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create applications table
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_post_id UUID NOT NULL REFERENCES public.job_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cover_letter TEXT,
  employer_remarks TEXT,
  resume_id UUID,
  status application_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(job_post_id, user_id)
);

-- Create bookmarks table
CREATE TABLE public.bookmarks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_post_id UUID NOT NULL REFERENCES public.job_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, job_post_id)
);

-- Create skills table
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skill TEXT NOT NULL,
  years_of_experience INTEGER DEFAULT 0,
  level proficiency_level DEFAULT 'beginner',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create experiences table
CREATE TABLE public.experiences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_title TEXT NOT NULL,
  company TEXT NOT NULL,
  job_roles TEXT,
  is_currently_working BOOLEAN DEFAULT false,
  start_at DATE NOT NULL,
  end_at DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create education table
CREATE TABLE public.education (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  level_of_education TEXT NOT NULL,
  field_of_study TEXT NOT NULL,
  institution TEXT NOT NULL,
  country UUID REFERENCES public.countries(id),
  gpa DECIMAL,
  description TEXT,
  is_currently_studying BOOLEAN DEFAULT false,
  start_at DATE NOT NULL,
  end_at DATE,
  graduated_at DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create certifications table
CREATE TABLE public.certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  is_expiring BOOLEAN DEFAULT false,
  certification_at DATE NOT NULL,
  expire_on DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create licenses table
CREATE TABLE public.licenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  is_expiring BOOLEAN DEFAULT false,
  expire_on DATE,
  license_at DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create interviews table
CREATE TABLE public.interviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  type TEXT DEFAULT 'video',
  link TEXT,
  address TEXT,
  description TEXT,
  notes TEXT,
  status interview_status DEFAULT 'scheduled',
  is_candidate_will_join BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chats table
CREATE TABLE public.chats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create preferences table
CREATE TABLE public.preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  email_notify_title BOOLEAN DEFAULT true,
  category UUID REFERENCES public.categories(id),
  email_notify_category BOOLEAN DEFAULT true,
  minimum_base_pay_currency TEXT DEFAULT 'USD',
  minimum_base_pay_amount DECIMAL,
  minimum_base_pay_pay_period salary_type DEFAULT 'yearly',
  desired_work_setting work_setting DEFAULT 'onsite',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_languages table
CREATE TABLE public.user_languages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  language TEXT NOT NULL,
  proficiency proficiency_level DEFAULT 'intermediate',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create resumes table
CREATE TABLE public.resumes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  resume TEXT NOT NULL, -- This will store file path or URL
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blogs table
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Companies policies
CREATE POLICY "Everyone can view companies" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Employers can manage their companies" ON public.companies FOR ALL USING (auth.uid() = user_id);

-- Job posts policies
CREATE POLICY "Everyone can view active job posts" ON public.job_posts FOR SELECT USING (status = 'active' OR auth.uid() = employer_id);
CREATE POLICY "Employers can manage their job posts" ON public.job_posts FOR ALL USING (auth.uid() = employer_id);

-- Applications policies
CREATE POLICY "Users can view their applications" ON public.applications FOR SELECT USING (auth.uid() = user_id OR auth.uid() IN (SELECT employer_id FROM job_posts WHERE id = job_post_id));
CREATE POLICY "Candidates can create applications" ON public.applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their applications" ON public.applications FOR UPDATE USING (auth.uid() = user_id OR auth.uid() IN (SELECT employer_id FROM job_posts WHERE id = job_post_id));

-- Bookmarks policies
CREATE POLICY "Users can manage their bookmarks" ON public.bookmarks FOR ALL USING (auth.uid() = user_id);

-- Personal data policies (skills, experiences, education, etc.)
CREATE POLICY "Users can view their own data" ON public.skills FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own data" ON public.experiences FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own data" ON public.education FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own data" ON public.certifications FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own data" ON public.licenses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own data" ON public.preferences FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own data" ON public.user_languages FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own data" ON public.resumes FOR ALL USING (auth.uid() = user_id);

-- Interview policies
CREATE POLICY "Users can view relevant interviews" ON public.interviews FOR SELECT USING (
  auth.uid() IN (
    SELECT user_id FROM applications WHERE id = application_id
    UNION
    SELECT employer_id FROM job_posts WHERE id IN (SELECT job_post_id FROM applications WHERE id = application_id)
  )
);
CREATE POLICY "Employers can manage interviews" ON public.interviews FOR ALL USING (
  auth.uid() IN (SELECT employer_id FROM job_posts WHERE id IN (SELECT job_post_id FROM applications WHERE id = application_id))
);

-- Chat policies
CREATE POLICY "Users can view their chats" ON public.chats FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send chats" ON public.chats FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Blog policies
CREATE POLICY "Everyone can view published blogs" ON public.blogs FOR SELECT USING (published_at IS NOT NULL);
CREATE POLICY "Admins can manage blogs" ON public.blogs FOR ALL USING (
  auth.uid() IN (SELECT user_id FROM profiles WHERE role = 'admin')
);

-- Countries and categories (public read)
CREATE POLICY "Everyone can view countries" ON public.countries FOR SELECT USING (true);
CREATE POLICY "Everyone can view categories" ON public.categories FOR SELECT USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_job_posts_updated_at BEFORE UPDATE ON public.job_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON public.skills FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON public.experiences FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON public.education FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON public.certifications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_licenses_updated_at BEFORE UPDATE ON public.licenses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_interviews_updated_at BEFORE UPDATE ON public.interviews FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_chats_updated_at BEFORE UPDATE ON public.chats FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_preferences_updated_at BEFORE UPDATE ON public.preferences FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_resumes_updated_at BEFORE UPDATE ON public.resumes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name'
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data
-- Countries
INSERT INTO public.countries (name, code) VALUES 
('United States', 'US'),
('Canada', 'CA'),
('United Kingdom', 'GB'),
('Germany', 'DE'),
('France', 'FR'),
('Australia', 'AU'),
('India', 'IN'),
('Japan', 'JP'),
('Brazil', 'BR'),
('Mexico', 'MX');

-- Categories
INSERT INTO public.categories (name, description) VALUES 
('Technology', 'Software development, IT, and tech roles'),
('Healthcare', 'Medical, nursing, and healthcare positions'),
('Finance', 'Banking, accounting, and financial services'),
('Marketing', 'Digital marketing, advertising, and communications'),
('Sales', 'Sales representatives and business development'),
('Education', 'Teaching, training, and educational roles'),
('Engineering', 'Mechanical, civil, electrical engineering'),
('Design', 'UI/UX, graphic design, and creative roles'),
('Human Resources', 'HR, recruitment, and people operations'),
('Operations', 'Operations management and logistics');