import React, { Component, ErrorInfo, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  fallback: string;
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  redirect: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false, redirect: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("ErrorBoundary caught an error", error, info);
  }
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }
  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />;
    } else if (this.state.hasError) {
      return <h2>{this.props.fallback}</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
