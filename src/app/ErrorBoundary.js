// src/app/ErrorBoundary.js
import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-screen items-center justify-center bg-surface text-ink font-sans">
          <div className="p-8 border border-red/20 rounded-lg bg-panel">
            <h1 className="text-xl font-mono text-red mb-2">Something went wrong</h1>
            <pre className="text-xs text-ink-mute font-mono whitespace-pre-wrap">
              {this.state.error?.message}
            </pre>
            <button
              className="mt-4 px-4 py-2 border border-white/10 rounded bg-white/[0.02] text-ink-dim hover:text-ink transition"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}