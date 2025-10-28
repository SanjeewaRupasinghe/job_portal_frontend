-- Create sample companies without user_id (we'll link them later when users sign up)
-- First, let's temporarily make user_id nullable for companies to add sample data
ALTER TABLE public.companies ALTER COLUMN user_id DROP NOT NULL;

-- Insert sample companies
INSERT INTO public.companies (name, description, is_verified, size, email, website) VALUES 
('TechCorp Solutions', 'Leading technology solutions provider specializing in cloud infrastructure and AI development.', true, '500-1000', 'hr@techcorp.com', 'https://techcorp.com'),
('Healthcare Plus', 'Innovative healthcare technology company improving patient outcomes through digital solutions.', true, '100-500', 'careers@healthcareplus.com', 'https://healthcareplus.com'),
('FinanceFlow', 'Modern financial services company providing digital banking and investment solutions.', false, '50-100', 'jobs@financeflow.com', 'https://financeflow.com'),
('GreenEnergy Co', 'Renewable energy company focused on sustainable power solutions.', true, '200-500', 'talent@greenenergy.com', 'https://greenenergy.com'),
('EduTech Innovations', 'Educational technology platform revolutionizing online learning.', false, '20-50', 'hiring@edutech.com', 'https://edutech.com');

-- Update blog entries to have a system user (we'll use the first user that signs up as admin)
-- For now, we'll use a placeholder and update it later