import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, AuthError, Session } from "@supabase/supabase-js";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  requires2FA: boolean;
  sessionDuration: number;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (
    email: string,
    password: string,
    userData?: unknown
  ) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  setSessionDuration: (hours: number) => void;
  complete2FASetup: () => void;
}

const Enhanced2FAAuthContext = createContext<AuthContextType | undefined>(undefined);

export function Enhanced2FAAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [requires2FA, setRequires2FA] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(24); // Default 24 hours

  useEffect(() => {
    // Set up auth state listener FIRST
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (event === "SIGNED_IN" && session?.user) {
        // Check if user needs 2FA setup
        const userMetadata = session.user.user_metadata;
        if (!userMetadata?.has_2fa_setup) {
          setRequires2FA(true);
          toast.info("🔐 2FA Setup Required", {
            description: "Please set up Google Authenticator for enhanced security",
          });
        } else {
          setRequires2FA(false);
          toast.success("Welcome back!", {
            description: `Signed in successfully. Session valid for ${sessionDuration} hours.`,
          });
        }
      } else if (event === "SIGNED_OUT") {
        setRequires2FA(false);
        toast.success("Signed out", {
          description: "You have been signed out successfully.",
        });
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const userMetadata = session.user.user_metadata;
        if (!userMetadata?.has_2fa_setup) {
          setRequires2FA(true);
        }
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [sessionDuration]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Sign in failed", {
        description: error.message,
      });
    }

    return { error };
  };

  const signUp = async (email: string, password: string, userData?: unknown) => {
    const redirectUrl = `${window.location.origin}/`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          ...userData,
          has_2fa_setup: false, // New users must set up 2FA
        },
      },
    });

    if (error) {
      toast.error("Sign up failed", {
        description: error.message,
      });
    } else {
      toast.success("Account created!", {
        description: "Please check your email and set up Google Authenticator after first login.",
      });
    }

    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Sign out failed", {
        description: error.message,
      });
    }
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      toast.error("Password reset failed", {
        description: error.message,
      });
    } else {
      toast.success("Check your email", {
        description: "Please check your email for password reset instructions.",
      });
    }

    return { error };
  };

  const complete2FASetup = async () => {
    if (user) {
      // Update user metadata to mark 2FA as complete
      const { error } = await supabase.auth.updateUser({
        data: { has_2fa_setup: true },
      });

      if (!error) {
        setRequires2FA(false);
        toast.success("🔐 2FA Setup Complete!", {
          description: "Your account is now fully secured",
        });
      }
    }
  };

  const value = {
    user,
    session,
    loading,
    requires2FA,
    sessionDuration,
    signIn,
    signUp,
    signOut,
    resetPassword,
    setSessionDuration,
    complete2FASetup,
  };

  return (
    <Enhanced2FAAuthContext.Provider value={value}>{children}</Enhanced2FAAuthContext.Provider>
  );
}

export function useEnhanced2FAAuth() {
  const context = useContext(Enhanced2FAAuthContext);
  if (context === undefined) {
    throw new Error("useEnhanced2FAAuth must be used within an Enhanced2FAAuthProvider");
  }
  return context;
}
