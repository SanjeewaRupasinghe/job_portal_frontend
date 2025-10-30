import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/User.types";
import { API_USER } from "@/lib/api";
import axiosClient from "@/axios/axiosClient";

interface AuthContextType {
  user: User | null;
  session: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (
    email: string,
    password: string,
    userData?: any
  ) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  userProfile: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      // setUserProfile(currentUser.profile);
      setSession({ user: currentUser });
    }
    setLoading(false);
  }, []);

  const getCurrentUser = (): User | null => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  };

  const signIn = async (email: string, password: string) => {
    try {
      // api call to register user
      const response = await axiosClient.post(API_USER.LOGIN, {
        email,
        password,
      });

      // set user
      makeUserLogin(response.data);
      console.log("logged in successfully");

      return { error: null };
    } catch (err) {
      // some error
      console.log(err);
      return { error: err };
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      // api call to register user
      const response = await axiosClient.post(API_USER.REGISTER, {
        email,
        password,
        password_confirmation: password,
        ...userData,
      });

      // set user
      makeUserLogin(response.data);
      console.log("registered successfully");

      return { error: null };
    } catch (err) {
      // some error
      console.log(err);
      return { error: err };
    }
  };

  const makeUserLogin = async (user: User) => {
    // set user
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    // set session
    setSession({ user });
  };

  const signOut = async () => {
    localStorage.removeItem("user");
    setUser(null);
    setUserProfile(null);
    setSession(null);
  };

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
