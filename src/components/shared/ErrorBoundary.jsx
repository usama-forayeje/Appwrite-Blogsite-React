// src/components/shared/ErrorBoundary.jsx (একটি নতুন ফাইল)
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {

    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // আপনি এখানে এরর লগিং সার্ভিস ব্যবহার করতে পারেন (যেমন Sentry)
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // আপনি এখানে একটি সুন্দর ফলব্যাক UI দেখাতে পারেন
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
          <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
          <p className="text-lg mb-8">We're sorry for the inconvenience. Please try again later.</p>
          {/* Optional: Show error details in development */}
          {(import.meta.env && import.meta.env.MODE === 'development') && (
            <details className="whitespace-pre-wrap text-sm text-muted-foreground p-4 bg-muted rounded-md max-w-lg overflow-auto">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo?.componentStack}
            </details>
          )}
          <button
            className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// তারপর RootLayout-এ এটি ব্যবহার করুন:
// <ErrorBoundary>
//   <motion.div> ... </motion.div>
// </ErrorBoundary>