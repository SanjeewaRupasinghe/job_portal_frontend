-- Insert test users with specific credentials
-- Note: These passwords will be hashed by Supabase Auth automatically when users sign up

-- First, let's create some sample users by updating our profiles table trigger to handle roles properly
-- Update the profile creation function to handle role data
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', 'User'),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', ''),
    COALESCE((NEW.raw_user_meta_data ->> 'role')::user_role, 'candidate')
  );
  RETURN NEW;
END;
$$;

-- Insert sample job posts (these will be created once we have employer users)
-- We'll create some sample companies first
INSERT INTO public.companies (name, description, is_verified, size) VALUES 
('TechCorp Solutions', 'Leading technology solutions provider specializing in cloud infrastructure and AI development.', true, '500-1000'),
('Healthcare Plus', 'Innovative healthcare technology company improving patient outcomes through digital solutions.', true, '100-500'),
('FinanceFlow', 'Modern financial services company providing digital banking and investment solutions.', false, '50-100'),
('GreenEnergy Co', 'Renewable energy company focused on sustainable power solutions.', true, '200-500'),
('EduTech Innovations', 'Educational technology platform revolutionizing online learning.', false, '20-50');

-- Insert sample blog posts for admin users to manage
INSERT INTO public.blogs (title, content, slug, published_at) VALUES 
(
  'Top 10 Interview Tips for Software Engineers',
  'Preparing for a software engineering interview can be daunting, but with the right strategies, you can showcase your skills effectively. Here are our top 10 tips: 1. Master the fundamentals of computer science, 2. Practice coding problems regularly, 3. Understand system design principles, 4. Prepare your STAR method stories, 5. Research the company thoroughly, 6. Ask thoughtful questions, 7. Practice whiteboard coding, 8. Review your past projects, 9. Stay calm and think out loud, 10. Follow up professionally after the interview.',
  'top-10-interview-tips-software-engineers',
  now() - interval '5 days'
),
(
  'Remote Work: The Future of Employment',
  'The landscape of work has fundamentally changed. Remote work has evolved from a rare perk to a standard expectation for many professionals. This shift brings both opportunities and challenges. Companies are discovering they can access global talent pools, while employees enjoy improved work-life balance. However, this transition requires new skills in digital communication, self-management, and virtual collaboration. As we look to the future, hybrid models are emerging as the preferred approach, combining the benefits of both remote and in-office work.',
  'remote-work-future-employment',
  now() - interval '10 days'
),
(
  'Building an Impressive Portfolio',
  'Your portfolio is often the first impression you make on potential employers. Whether you are a designer, developer, marketer, or any other professional, a well-crafted portfolio can set you apart from the competition. Start by selecting your best work that demonstrates a range of skills and problem-solving abilities. Include case studies that show your process, challenges faced, and solutions implemented. Make sure your portfolio is easily navigable, mobile-friendly, and tells a cohesive story about your professional journey.',
  'building-impressive-portfolio',
  now() - interval '15 days'
);