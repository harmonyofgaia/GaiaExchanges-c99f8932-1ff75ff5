// This component is deprecated and replaced by SecureAdminLogin
// Redirecting to secure authentication system
import { useEffect } from "react";
import { SecureAdminLogin } from "./SecureAdminLogin";

interface AdminOnlyLoginProps {
  onAdminLogin: () => void;
}

export function AdminOnlyLogin({ onAdminLogin }: AdminOnlyLoginProps) {
  useEffect(() => {
    console.warn("AdminOnlyLogin is deprecated. Use SecureAdminLogin instead.");
  }, []);

  return <SecureAdminLogin onAdminLogin={onAdminLogin} />;
}
