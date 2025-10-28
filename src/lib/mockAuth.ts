// Mock Authentication System for Development
// PRODUCTION NOTE: Remove this file and uncomment Supabase auth in AuthContext.tsx when deploying

export interface MockUser {
  id: string;
  email: string;
  password: string;
  user_type: 'candidate' | 'employer' | 'admin';
  profile: {
    first_name: string;
    last_name: string;
    phone?: string;
    company?: string;
    role: 'candidate' | 'employer' | 'admin';
    job_title?: string;
    avatar_url?: string;
  };
}

// DUMMY USERS FOR TESTING
export const DUMMY_USERS: MockUser[] = [
  // Candidate Users
  {
    id: '1',
    email: 'john.candidate@example.com',
    password: 'password123',
    user_type: 'candidate',
    profile: {
      first_name: 'John',
      last_name: 'Candidate',
      phone: '+1 (555) 123-4567',
      role: 'candidate',
      job_title: 'Software Developer'
    }
  },
  {
    id: '2',
    email: 'jane.seeker@example.com',
    password: 'password123',
    user_type: 'candidate',
    profile: {
      first_name: 'Jane',
      last_name: 'Seeker',
      phone: '+1 (555) 234-5678',
      role: 'candidate',
      job_title: 'UX Designer'
    }
  },
  
  // Employer Users
  {
    id: '3',
    email: 'sarah.employer@company.com',
    password: 'password123',
    user_type: 'employer',
    profile: {
      first_name: 'Sarah',
      last_name: 'Johnson',
      phone: '+1 (555) 345-6789',
      company: 'TechCorp Inc.',
      role: 'employer',
      job_title: 'HR Manager'
    }
  },
  {
    id: '4',
    email: 'mike.recruiter@startup.com',
    password: 'password123',
    user_type: 'employer',
    profile: {
      first_name: 'Mike',
      last_name: 'Recruiter',
      phone: '+1 (555) 456-7890',
      company: 'StartupXYZ',
      role: 'employer',
      job_title: 'Lead Recruiter'
    }
  },
  
  // Admin Users
  {
    id: '5',
    email: 'admin@joboffer.com',
    password: 'admin123',
    user_type: 'admin',
    profile: {
      first_name: 'Admin',
      last_name: 'User',
      phone: '+1 (555) 999-0000',
      role: 'admin',
      job_title: 'System Administrator'
    }
  },
  {
    id: '6',
    email: 'super.admin@joboffer.com',
    password: 'superadmin123',
    user_type: 'admin',
    profile: {
      first_name: 'Super',
      last_name: 'Admin',
      phone: '+1 (555) 888-0000',
      role: 'admin',
      job_title: 'Super Administrator'
    }
  }
];

// Mock authentication functions
export const mockSignIn = async (email: string, password: string): Promise<{ user: MockUser | null; error: string | null }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = DUMMY_USERS.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Store in localStorage for persistence
    localStorage.setItem('mockUser', JSON.stringify(user));
    return { user, error: null };
  }
  
  return { user: null, error: 'Invalid email or password' };
};

export const mockSignUp = async (email: string, password: string, userData: any): Promise<{ user: MockUser | null; error: string | null }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if user already exists
  const existingUser = DUMMY_USERS.find(u => u.email === email);
  if (existingUser) {
    return { user: null, error: 'User already exists' };
  }
  
  // Create new user
  const userType = userData.user_type || 'candidate';
  const newUser: MockUser = {
    id: String(Date.now()),
    email,
    password,
    user_type: userType,
    profile: {
      first_name: userData.firstName || '',
      last_name: userData.lastName || '',
      phone: userData.phone || '',
      company: userData.company || '',
      role: userType,
      job_title: userData.role || ''
    }
  };
  
  // Add to dummy users (in real app, this would be saved to database)
  DUMMY_USERS.push(newUser);
  
  // Store in localStorage
  localStorage.setItem('mockUser', JSON.stringify(newUser));
  
  return { user: newUser, error: null };
};

export const mockSignOut = async (): Promise<void> => {
  localStorage.removeItem('mockUser');
};

export const getCurrentMockUser = (): MockUser | null => {
  const stored = localStorage.getItem('mockUser');
  return stored ? JSON.parse(stored) : null;
};

/*
=== QUICK LOGIN CREDENTIALS FOR TESTING ===

CANDIDATES:
- Email: john.candidate@example.com | Password: password123
- Email: jane.seeker@example.com | Password: password123

EMPLOYERS:
- Email: sarah.employer@company.com | Password: password123  
- Email: mike.recruiter@startup.com | Password: password123

ADMINS:
- Email: admin@joboffer.com | Password: admin123
- Email: super.admin@joboffer.com | Password: superadmin123

=== PRODUCTION DEPLOYMENT NOTES ===

1. DELETE this entire file (src/lib/mockAuth.ts)

2. In src/contexts/AuthContext.tsx:
   - Uncomment all Supabase auth code
   - Remove mock auth imports and usage
   - Restore original signIn, signUp, signOut functions

3. Set up proper Supabase authentication:
   - Configure email templates
   - Set up RLS policies
   - Create user profiles table
   - Add proper error handling

4. Update environment variables with production Supabase keys

*/