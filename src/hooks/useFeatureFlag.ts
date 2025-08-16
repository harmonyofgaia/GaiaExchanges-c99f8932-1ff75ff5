import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type FlagKey =
  | "car_free_on_green_investments"
  | "car_free_on_earn_page";

export function useFeatureFlag(key: FlagKey, defaultValue = true) {
  const [enabled, setEnabled] = useState<boolean>(defaultValue);

  useEffect(() => {
    let isMounted = true;

    const fetchFlag = async () => {
      try {
        const { data, error } = await supabase
          .from("feature_flags")
          .select("enabled")
          .eq("key", key)
          .maybeSingle();

        if (error) {
          console.error("feature flag error", error);
          if (isMounted) setEnabled(defaultValue);
          return;
        }
        if (isMounted && data && typeof data.enabled === "boolean") {
          setEnabled(data.enabled);
        }
      } catch (e) {
        console.error("feature flag exception", e);
      }
    };

    fetchFlag();

    const channel = supabase
      .channel(`feature_flag_${key}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "feature_flags", filter: `key=eq.${key}` },
        fetchFlag
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [key]);

  return enabled;
}