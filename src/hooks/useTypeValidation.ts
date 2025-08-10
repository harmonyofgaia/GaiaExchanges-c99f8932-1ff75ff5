import { useEffect } from "react";
import { TypeValidator } from "@/utils/type-validator";
import { GAIA_TOKEN, GAIA_METRICS } from "@/constants/gaia";

export const useTypeValidation = (componentName: string) => {
  useEffect(() => {
    console.log(`🔍 Running type validation for ${componentName}`);

    // Validate token configuration
    const tokenErrors = TypeValidator.validateTokenConfig(GAIA_TOKEN);
    if (tokenErrors.length > 0) {
      TypeValidator.logValidationErrors(
        `${componentName} - GAIA_TOKEN`,
        tokenErrors,
      );
    }

    // Validate metrics
    const metricsErrors = TypeValidator.validateMetrics(GAIA_METRICS);
    if (metricsErrors.length > 0) {
      TypeValidator.logValidationErrors(
        `${componentName} - GAIA_METRICS`,
        metricsErrors,
      );
    }

    if (tokenErrors.length === 0 && metricsErrors.length === 0) {
      console.log(
        `✅ ${componentName}: All type validations passed successfully`,
      );
    }
  }, [componentName]);

  return {
    validateTokenConfig: (config: Record<string, unknown>) =>
      TypeValidator.validateTokenConfig(config),
    validateMetrics: (metrics: Record<string, unknown>) =>
      TypeValidator.validateMetrics(metrics),
    isValidConfiguration: () => {
      const tokenErrors = TypeValidator.validateTokenConfig(GAIA_TOKEN);
      const metricsErrors = TypeValidator.validateMetrics(GAIA_METRICS);
      return tokenErrors.length === 0 && metricsErrors.length === 0;
    },
  };
};
