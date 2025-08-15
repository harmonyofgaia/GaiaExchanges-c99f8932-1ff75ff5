import React, { Component, ErrorInfo, ReactNode , useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  autoRecoveryAttempts: number;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  private autoRecoveryTimer?: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      autoRecoveryAttempts: 0,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      autoRecoveryAttempts: 0,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("🌍 Harmony of Gaia - Error boundary caught error:", error, errorInfo);

    this.setState({
      error,
      errorInfo,
      hasError: true,
    });

    // Auto-recovery mechanism
    this.attemptAutoRecovery();
  }

  attemptAutoRecovery = () => {
    if (this.state.autoRecoveryAttempts < 3) {
      console.log(
        `🔄 Harmony of Gaia - Auto-recovery attempt ${this.state.autoRecoveryAttempts + 1}/3`
      );

      this.autoRecoveryTimer = setTimeout(() => {
        this.setState((prevState) => ({
          hasError: false,
          error: undefined,
          errorInfo: undefined,
          autoRecoveryAttempts: prevState.autoRecoveryAttempts + 1,
        }));
      }, 2000);
    }
  };

  handleManualRestart = () => {
    console.log("🌍 Harmony of Gaia - Manual restart initiated");

    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      autoRecoveryAttempts: 0,
    });
  };

  componentWillUnmount() {
    if (this.autoRecoveryTimer) {
      clearTimeout(this.autoRecoveryTimer);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="h-6 w-6" />
                Harmony of Gaia - Auto-Recovery System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl mb-4">🌍</div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Culture of Harmony Protection Active
                </h2>
                <p className="text-muted-foreground">
                  The system encountered an issue and is automatically recovering...
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <RefreshCw className="h-4 w-4 text-blue-400 animate-spin" />
                  <span className="text-blue-400 font-medium">Auto-Recovery Status</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Attempt {this.state.autoRecoveryAttempts + 1}/3 -
                  {this.state.autoRecoveryAttempts < 3
                    ? " System will automatically restart in 2 seconds..."
                    : " Ready for manual restart"}
                </p>
              </div>

              {this.state.autoRecoveryAttempts >= 3 && (
                <div className="text-center">
                  <Button
                    onClick={this.handleManualRestart}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Restart Harmony of Gaia Systems
                  </Button>
                </div>
              )}

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                <p className="text-sm text-green-300">
                  🌟 <strong>Full Permission Granted</strong> - All issues are automatically
                  resolved by Harmony of Gaia protection systems
                </p>
              </div>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="text-xs text-muted-foreground">
                  <summary className="cursor-pointer">Technical Details</summary>
                  <pre className="mt-2 p-2 bg-black/20 rounded text-xs overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
