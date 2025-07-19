// src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, type ReactNode } from 'react'; // ✅ FIX: Use type-only import for ReactNode

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-20 text-red-400">
          <h2>Something went wrong.</h2>
          <p>Please try refreshing the page.</p>
        </div>
      );
    } // ✅ FIX: The missing '}' was here

    return this.props.children;
  }
}

export default ErrorBoundary; // ✅ FIX: Added the missing default export