import { useState, useEffect, useCallback} from "react";
import { gaiaTokenService, TokenData } from "@/services/gaiaTokenService";
import { toast } from "sonner";
import { shouldShowNotification } from "@/lib/utils";

export function useGaiaTokenData(autoRefresh: boolean = true) {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await gaiaTokenService.fetchLiveTokenData();
      setTokenData(data);

      if (data.error) {
        setError(data.error);
        console.log("⚠️ GAIA Token Data Warning:", data.error);
        // Only show critical token errors
        if (shouldShowNotification("critical")) {
          toast.error("GAIA Token Error", {
            description: data.error,
            duration: 3000,
          });
        }
      } else if (data.isLive) {
        console.log("✅ GAIA Token Data Updated:", data);
        // Don't show regular update notifications, only log them
      }
    } catch (err) {
      const errorMessage = "Failed to fetch GAIA token data";
      setError(errorMessage);
      console.error("❌", errorMessage, err);

      // Only show critical fetch errors
      if (shouldShowNotification("critical")) {
        toast.error("Token Data Error", {
          description: "Failed to fetch token data",
          duration: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (autoRefresh) {
      const interval = setInterval(fetchData, 60000); // Refresh every minute instead of 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  return {
    tokenData,
    isLoading,
    error,
    refetch: fetchData,
    hasRealData: tokenData?.isLive && !tokenData?.error,
  };
}
