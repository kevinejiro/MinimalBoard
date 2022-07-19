import React, { Component, ErrorInfo, ReactNode } from "react";
// import { Navigate } from "react-router-dom";

interface Props {
  fallback: string;
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="loaderWrapper">
          <h2>{this.props.fallback}</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
