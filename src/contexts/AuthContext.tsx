import React, { createContext, useContext, useEffect, useState } from 'react';
// PRODUCTION: Uncomment these imports for Supabase auth
// import { User, Session } from '@supabase/supabase-js';
// import { supabase } from '@/integrations/supabase/client';

// DEVELOPMENT: Mock auth imports (REMOVE IN PRODUCTION)
import { MockUser, mockSignIn, mockSignUp, mockSignOut, getCurrentMockUser } from '@/lib/mockAuth';

interface AuthContextType {
  // DEVELOPMENT: Using MockUser type (CHANGE TO User | null IN PRODUCTION)
  user: MockUser | null;
  session: any; // PRODUCTION: Change back to Session | null
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  userProfile: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // DEVELOPMENT: Using MockUser (CHANGE TO User | null IN PRODUCTION)
  const [user, setUser] = useState<MockUser | null>(null);
  const [session, setSession] = useState<any>(null); // PRODUCTION: Change to Session | null
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    // DEVELOPMENT: Mock auth initialization (REPLACE WITH SUPABASE IN PRODUCTION)
    const checkMockUser = () => {
      const mockUser = getCurrentMockUser();
      if (mockUser) {
        setUser(mockUser);
        setUserProfile(mockUser.profile);
        setSession({ user: mockUser }); // Mock session
      }
      setLoading(false);
    };

    checkMockUser();

    /* PRODUCTION: Uncomment this Supabase auth code
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile
          setTimeout(async () => {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', session.user.id)
              .single();
            setUserProfile(profile);
          }, 0);
        } else {
          setUserProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
    */
  }, []);

  // DEVELOPMENT: Mock auth functions (REPLACE WITH SUPABASE IN PRODUCTION)
  const signIn = async (email: string, password: string) => {
    const { user: mockUser, error } = await mockSignIn(email, password);
    if (mockUser) {
      setUser(mockUser);
      setUserProfile(mockUser.profile);
      setSession({ user: mockUser });
    }
    return { error };
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    const { user: mockUser, error } = await mockSignUp(email, password, userData);
    if (mockUser) {
      setUser(mockUser);
      setUserProfile(mockUser.profile);
      setSession({ user: mockUser });
    }
    return { error };
  };

  const signOut = async () => {
    await mockSignOut();
    setUser(null);
    setUserProfile(null);
    setSession(null);
  };

  /* PRODUCTION: Uncomment these Supabase functions
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: userData
      }
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };
  */

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    userProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};