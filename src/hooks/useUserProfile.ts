import { useState, useEffect, useCallback} from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  updated_at: string;
  avatar_url: string | null;
  last_login: string | null;
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // First get the profile from the profiles table
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) {
          console.error("Error fetching user profile:", profileError);
          setError(profileError.message);
          return;
        }

        // Get the user role from user_roles table
        const { data: roleData, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .single();

        // Create the user profile with available data
        const userProfile: UserProfile = {
          id: profileData.id,
          email: user.email || "",
          full_name: profileData.full_name || "",
          role: roleData?.role || "user",
          created_at: profileData.created_at,
          updated_at: profileData.updated_at,
          avatar_url: null, // Set to null since this field doesn't exist in the current schema
          last_login: user.last_sign_in_at || null,
        };

        setProfile(userProfile);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !profile) return;

    try {
      setError(null);

      // Only update fields that exist in the profiles table
      const profileUpdates: Record<string, unknown> = {};
      if (updates.full_name !== undefined) profileUpdates.full_name = updates.full_name;
      // Note: avatar_url is not included since it doesn't exist in the current schema

      if (Object.keys(profileUpdates).length > 0) {
        const { error } = await supabase.from("profiles").update(profileUpdates).eq("id", user.id);

        if (error) {
          setError(error.message);
          return false;
        }
      }

      setProfile((prev) => (prev ? { ...prev, ...updates } : null));
      return true;
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile");
      return false;
    }
  };

  const refetch = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      // Fetch profile data
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("Error refetching user profile:", profileError);
        setError(profileError.message);
        return;
      }

      // Get the user role from user_roles table
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      // Create the user profile with available data
      const userProfile: UserProfile = {
        id: profileData.id,
        email: user.email || "",
        full_name: profileData.full_name || "",
        role: roleData?.role || "user",
        created_at: profileData.created_at,
        updated_at: profileData.updated_at,
        avatar_url: null, // Set to null since this field doesn't exist in the current schema
        last_login: user.last_sign_in_at || null,
      };

      setProfile(userProfile);
    } catch (err) {
      console.error("Unexpected error during refetch:", err);
      setError("An unexpected error occurred during refetch");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    refetch,
  };
}
