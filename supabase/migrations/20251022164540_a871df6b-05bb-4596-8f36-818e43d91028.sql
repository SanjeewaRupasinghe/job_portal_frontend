-- Insert dummy users (employer and candidates)
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'employer@test.com', crypt('password123', gen_salt('bf')), now(), '{"first_name": "John", "last_name": "Employer"}'::jsonb, now(), now()),
  ('22222222-2222-2222-2222-222222222222', 'candidate1@test.com', crypt('password123', gen_salt('bf')), now(), '{"first_name": "Jane", "last_name": "Candidate"}'::jsonb, now(), now()),
  ('33333333-3333-3333-3333-333333333333', 'candidate2@test.com', crypt('password123', gen_salt('bf')), now(), '{"first_name": "Bob", "last_name": "Smith"}'::jsonb, now(), now())
ON CONFLICT (id) DO NOTHING;

-- Insert profiles for these users
INSERT INTO profiles (user_id, email, first_name, last_name, role, contact)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'employer@test.com', 'John', 'Employer', 'employer', '+1-555-0100'),
  ('22222222-2222-2222-2222-222222222222', 'candidate1@test.com', 'Jane', 'Candidate', 'candidate', '+1-555-0101'),
  ('33333333-3333-3333-3333-333333333333', 'candidate2@test.com', 'Bob', 'Smith', 'candidate', '+1-555-0102')
ON CONFLICT (user_id) DO NOTHING;

-- Insert dummy job posts
INSERT INTO job_posts (id, employer_id, company_id, category_id, title, description, type, work_setting, location, min_salary, max_salary, salary_type, currency, status, openings, start_date)
VALUES 
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'b19079ea-8c69-4de4-8895-9e6829aef80f', '2dd415eb-1deb-4a62-961f-f49aee64264a', 
   'Senior Full Stack Developer', 
   'We are looking for an experienced Full Stack Developer to join our team. You will be working on cutting-edge web applications using React, Node.js, and PostgreSQL.',
   'Full-time', 'hybrid', 'San Francisco, CA', 120000, 180000, 'yearly', 'USD', 'active', 3, '2025-11-01'),
  
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'b19079ea-8c69-4de4-8895-9e6829aef80f', '2dd415eb-1deb-4a62-961f-f49aee64264a',
   'DevOps Engineer', 
   'Join our DevOps team to manage cloud infrastructure, CI/CD pipelines, and automation. Experience with AWS, Docker, and Kubernetes required.',
   'Full-time', 'remote', 'Remote', 100000, 150000, 'yearly', 'USD', 'active', 2, '2025-11-15'),
  
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', 'b4a93f94-b5ee-4544-8d52-e796bc5c61e3', 'ef88062e-02c6-451f-bf8a-9548956e2166',
   'Healthcare Data Analyst', 
   'Analyze healthcare data to improve patient outcomes. Must have experience with SQL, Python, and healthcare systems.',
   'Full-time', 'onsite', 'New York, NY', 80000, 110000, 'yearly', 'USD', 'active', 1, '2025-12-01'),
  
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', 'c2b2fdb3-fe3a-457c-92d5-6a677bab7bff', 'c4f506e1-1086-4af3-8ed2-a29572871e16',
   'Financial Analyst', 
   'Looking for a detail-oriented Financial Analyst to support our finance team. CPA preferred.',
   'Full-time', 'onsite', 'Chicago, IL', 70000, 95000, 'yearly', 'USD', 'active', 2, '2025-11-20'),
  
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '11111111-1111-1111-1111-111111111111', 'b19079ea-8c69-4de4-8895-9e6829aef80f', '2dd415eb-1deb-4a62-961f-f49aee64264a',
   'Frontend Developer (React)', 
   'We need a React expert to build beautiful, responsive user interfaces. Experience with TypeScript and Tailwind CSS is a plus.',
   'Contract', 'remote', 'Remote', 50, 80, 'hourly', 'USD', 'active', 1, '2025-11-10')
ON CONFLICT (id) DO NOTHING;

-- Insert dummy applications
INSERT INTO applications (id, job_post_id, user_id, status, cover_letter)
VALUES 
  ('11111111-aaaa-aaaa-aaaa-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', 'pending',
   'I am very interested in the Senior Full Stack Developer position. With 5+ years of experience in React and Node.js, I believe I would be a great fit for your team.'),
  
  ('22222222-aaaa-aaaa-aaaa-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', 'reviewed',
   'I have been following TechCorp Solutions for years and would love to contribute to your projects. My experience includes building scalable web applications.'),
  
  ('33333333-bbbb-bbbb-bbbb-333333333333', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'accepted',
   'I am excited about the DevOps Engineer role. I have 4 years of experience managing AWS infrastructure and implementing CI/CD pipelines.'),
  
  ('44444444-cccc-cccc-cccc-444444444444', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 'pending',
   'With my background in healthcare analytics and proficiency in Python and SQL, I am confident I can help improve patient outcomes at Healthcare Plus.'),
  
  ('55555555-dddd-dddd-dddd-555555555555', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '22222222-2222-2222-2222-222222222222', 'rejected',
   'I am applying for the Financial Analyst position. I have a CPA certification and 3 years of experience in financial reporting.'),
  
  ('66666666-eeee-eeee-eeee-666666666666', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '33333333-3333-3333-3333-333333333333', 'interviewed',
   'I specialize in React development with TypeScript and would love to work on your frontend projects. My portfolio showcases my responsive design skills.')
ON CONFLICT (id) DO NOTHING;