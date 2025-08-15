import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

export function AdminRouteProtector() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const protectAdminRoutes = async () => {
      const adminRoutes = ["/admin", "/secure-admin", "/secure-vault"];
      const isAdminRoute = adminRoutes.some((route) =>
        location.pathname.includes(route),
      );

      if (isAdminRoute) {
        // Check if user is authenticated
        if (!user) {
          console.log("🚫 UNAUTHENTICATED ACCESS ATTEMPT BLOCKED");
          navigate("/", { replace: true });
          return;
        }

        try {
          // Check if user has valid admin account
          const { data: adminAccount, error } = await supabase
            .from("admin_users")
            .select("*")
            .eq("user_id", user.id)
            .eq("is_active", true)
            .maybeSingle();

          if (error || !adminAccount) {
            console.log("🚫 UNAUTHORIZED ADMIN ACCESS ATTEMPT BLOCKED");
            navigate("/", { replace: true });
            return;
          }

          // Valid admin - apply security measures
          console.log("🛡️ ADMIN ROUTE PROTECTED - SECURE ACCESS VERIFIED");
          document.title = "GAIA - Secure Admin Portal";
        } catch (error) {
          console.error("Admin verification error:", error);
          navigate("/", { replace: true });
        }
      }
    };

    protectAdminRoutes();
  }, [location, navigate, user]);

  return null;
}
