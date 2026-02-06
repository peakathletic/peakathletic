import React, { Component, ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App';
import { AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4 text-center">
          <AlertTriangle className="w-16 h-16 text-accent mb-4" />
          <h1 className="text-2xl font-bold text-primary mb-2">عذراً، حدث خطأ ما</h1>
          <p className="text-accent mb-6">واجه النظام مشكلة غير متوقعة. يرجى إعادة تحميل الصفحة.</p>
          <button 
            onClick={() => {
              localStorage.removeItem('peak_academy_content_v1');
              window.location.reload();
            }}
            className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            إعادة تعيين البيانات والتحميل
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);