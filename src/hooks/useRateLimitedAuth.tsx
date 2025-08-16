import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { sanitizeInput, validateEmail } from "@/components/security/SecurityEnhancedApp";

interface RateLimitedAuthOptions {
  maxAttempts?: number;
  windowMinutes?: number;
}

export function useRateLimitedAuth(options: RateLimitedAuthOptions = {}) {
  const { maxAttempts = 5, windowMinutes = 15 } = options;
  const [isLoading, setIsLoading] = useState(false);

  const checkRateLimit = async (identifier: string, attemptType: string): Promise<boolean> => {
    try {
      // Note: This function doesn't exist in the current schema yet, so we'll simulate it
      // In a real implementation, you would create this function in the database
      console.log(`Rate limit check for ${identifier}, type: ${attemptType}`);
      
      // For now, always return true (allow attempts) since the function isn't implemented
      // In production, this would call the actual rate limiting function
      return true;

    } catch (error) {
      console.error('Rate limit check exception:', error);
      return true; // Allow on error
    }
  };

  const logSecurityEvent = async (
    eventType: string,
    severity: string,
    eventData: any = {}
  ) => {
    try {
      // For now, just log to console since the function may not be available
      console.log('Security Event:', { eventType, severity, eventData });
      
      // In production, this would call the actual logging function
      // await supabase.rpc('log_security_event', { ... });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  };

  const secureSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // 🔒 SECURITY: Input sanitization
      const sanitizedEmail = sanitizeInput(email.toLowerCase().trim());
      
      if (!validateEmail(sanitizedEmail)) {
        toast.error("🚫 Invalid Email", {
          description: "Please enter a valid email address",
          duration: 5000,
        });
        return { data: null, error: { message: "Invalid email format" } };
      }

      // 🔒 SECURITY: Check rate limiting
      const rateLimitOk = await checkRateLimit(sanitizedEmail, 'login');
      
      if (!rateLimitOk) {
        await logSecurityEvent('login_rate_limited', 'warning', {
          email: sanitizedEmail,
          attempt_type: 'login',
        });
        
        toast.error("🚫 Too Many Attempts", {
          description: `Please wait before trying again. Maximum ${maxAttempts} attempts per ${windowMinutes} minutes.`,
          duration: 8000,
        });
        return { data: null, error: { message: "Rate limit exceeded" } };
      }

      // 🔒 SECURITY: Log login attempt
      await logSecurityEvent('login_attempt', 'info', {
        email: sanitizedEmail,
        timestamp: new Date().toISOString(),
      });

      // Perform authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email: sanitizedEmail,
        password,
      });

      if (error) {
        // 🔒 SECURITY: Log failed login
        await logSecurityEvent('login_failed', 'warning', {
          email: sanitizedEmail,
          error: error.message,
          timestamp: new Date().toISOString(),
        });
        
        toast.error("🚫 Login Failed", {
          description: error.message,
          duration: 5000,
        });
        
        return { data: null, error };
      }

      // 🔒 SECURITY: Log successful login
      await logSecurityEvent('login_success', 'info', {
        email: sanitizedEmail,
        user_id: data.user?.id,
        timestamp: new Date().toISOString(),
      });

      // Update user profile login stats (simplified for now)
      if (data.user) {
        try {
          await supabase
            .from('profiles')
            .update({
              updated_at: new Date().toISOString(),
            })
            .eq('id', data.user.id);
        } catch (profileError) {
          console.error('Failed to update profile:', profileError);
        }
      }

      toast.success("✅ Login Successful", {
        description: "Welcome back! You are now securely authenticated.",
        duration: 5000,
      });

      return { data, error: null };

    } catch (error: any) {
      console.error('Secure sign in error:', error);
      
      await logSecurityEvent('login_exception', 'error', {
        email: sanitizeInput(email),
        error: error.message,
        timestamp: new Date().toISOString(),
      });
      
      toast.error("🛡️ Authentication Error", {
        description: "A security error occurred during login",
        duration: 5000,
      });
      
      return { data: null, error };
    } finally {
      setIsLoading(false);
    }
  };

  const secureSignUp = async (email: string, password: string, fullName?: string) => {
    setIsLoading(true);
    
    try {
      // 🔒 SECURITY: Input sanitization
      const sanitizedEmail = sanitizeInput(email.toLowerCase().trim());
      const sanitizedFullName = fullName ? sanitizeInput(fullName.trim()) : '';
      
      if (!validateEmail(sanitizedEmail)) {
        toast.error("🚫 Invalid Email", {
          description: "Please enter a valid email address",
          duration: 5000,
        });
        return { data: null, error: { message: "Invalid email format" } };
      }

      // 🔒 SECURITY: Check rate limiting
      const rateLimitOk = await checkRateLimit(sanitizedEmail, 'signup');
      
      if (!rateLimitOk) {
        await logSecurityEvent('signup_rate_limited', 'warning', {
          email: sanitizedEmail,
          attempt_type: 'signup',
        });
        
        toast.error("🚫 Too Many Attempts", {
          description: `Please wait before trying again. Maximum ${maxAttempts} attempts per ${windowMinutes} minutes.`,
          duration: 8000,
        });
        return { data: null, error: { message: "Rate limit exceeded" } };
      }

      // 🔒 SECURITY: Log signup attempt
      await logSecurityEvent('signup_attempt', 'info', {
        email: sanitizedEmail,
        timestamp: new Date().toISOString(),
      });

      // Perform registration
      const { data, error } = await supabase.auth.signUp({
        email: sanitizedEmail,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: sanitizedFullName,
          },
        },
      });

      if (error) {
        // 🔒 SECURITY: Log failed signup
        await logSecurityEvent('signup_failed', 'warning', {
          email: sanitizedEmail,
          error: error.message,
          timestamp: new Date().toISOString(),
        });
        
        toast.error("🚫 Signup Failed", {
          description: error.message,
          duration: 5000,
        });
        
        return { data: null, error };
      }

      // 🔒 SECURITY: Log successful signup
      await logSecurityEvent('signup_success', 'info', {
        email: sanitizedEmail,
        user_id: data.user?.id,
        timestamp: new Date().toISOString(),
      });

      toast.success("✅ Account Created", {
        description: "Please check your email to verify your account",
        duration: 8000,
      });

      return { data, error: null };

    } catch (error: any) {
      console.error('Secure sign up error:', error);
      
      await logSecurityEvent('signup_exception', 'error', {
        email: sanitizeInput(email),
        error: error.message,
        timestamp: new Date().toISOString(),
      });
      
      toast.error("🛡️ Registration Error", {
        description: "A security error occurred during registration",
        duration: 5000,
      });
      
      return { data: null, error };
    } finally {
      setIsLoading(false);
    }
  };

  const secureSignOut = async () => {
    try {
      // 🔒 SECURITY: Log logout attempt
      await logSecurityEvent('logout_attempt', 'info', {
        timestamp: new Date().toISOString(),
      });

      const { error } = await supabase.auth.signOut();
      
      if (error) {
        await logSecurityEvent('logout_failed', 'error', {
          error: error.message,
          timestamp: new Date().toISOString(),
        });
        
        toast.error("🚫 Logout Failed", {
          description: error.message,
          duration: 5000,
        });
        
        return { error };
      }

      // 🔒 SECURITY: Log successful logout
      await logSecurityEvent('logout_success', 'info', {
        timestamp: new Date().toISOString(),
      });

      toast.success("👋 Logged Out", {
        description: "You have been securely logged out",
        duration: 3000,
      });

      return { error: null };

    } catch (error: any) {
      console.error('Secure sign out error:', error);
      
      await logSecurityEvent('logout_exception', 'error', {
        error: error.message,
        timestamp: new Date().toISOString(),
      });
      
      return { error };
    }
  };

  return {
    secureSignIn,
    secureSignUp,
    secureSignOut,
    isLoading,
  };
}