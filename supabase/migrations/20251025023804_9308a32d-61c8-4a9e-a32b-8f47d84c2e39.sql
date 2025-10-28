-- Create a function to insert sample data for the current logged-in user
CREATE OR REPLACE FUNCTION public.insert_sample_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  sample_user_id uuid;
BEGIN
  -- Get current user ID
  sample_user_id := auth.uid();
  
  IF sample_user_id IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated to insert sample data';
  END IF;

  -- Insert sample resumes
  INSERT INTO public.resumes (user_id, name, resume, parsed_content, file_size, file_type) VALUES
    (
      sample_user_id,
      'Software Engineer Resume 2024',
      sample_user_id || '/resume1.pdf',
      'John Doe - Software Engineer with 5 years of experience in React, TypeScript, and Node.js. Expertise in building scalable web applications.',
      245760,
      'application/pdf'
    ),
    (
      sample_user_id,
      'Senior Developer CV',
      sample_user_id || '/resume2.pdf',
      'John Doe - Senior Full Stack Developer. Skills: React, Vue, Python, PostgreSQL. Led teams of 5+ developers on enterprise projects.',
      312000,
      'application/pdf'
    ),
    (
      sample_user_id,
      'Technical Lead Resume',
      sample_user_id || '/resume3.docx',
      'John Doe - Technical Lead with expertise in system architecture, cloud infrastructure (AWS, Azure), and agile methodologies.',
      198500,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );

  -- Insert sample chat messages
  -- Note: These will use random UUIDs for the other party
  INSERT INTO public.chats (sender_id, receiver_id, message, application_id, read_at) VALUES
    (
      sample_user_id,
      gen_random_uuid(),
      'Hi, I would like to inquire about the Senior Developer position.',
      NULL,
      now()
    ),
    (
      gen_random_uuid(),
      sample_user_id,
      'Thank you for your interest! I reviewed your application and I''m impressed with your background.',
      NULL,
      NULL
    ),
    (
      sample_user_id,
      gen_random_uuid(),
      'Thank you! I''m very excited about this opportunity. When would be a good time to discuss further?',
      NULL,
      now()
    ),
    (
      gen_random_uuid(),
      sample_user_id,
      'How about we schedule a call for next Tuesday at 2 PM?',
      NULL,
      NULL
    ),
    (
      gen_random_uuid(),
      sample_user_id,
      'Also, could you please send me your latest resume?',
      NULL,
      NULL
    ),
    (
      gen_random_uuid(),
      sample_user_id,
      'Hello, I saw your profile and wanted to reach out about a job opportunity.',
      NULL,
      NULL
    ),
    (
      sample_user_id,
      gen_random_uuid(),
      'I appreciate your response to my application. Looking forward to the interview!',
      now()
    );
END;
$$;