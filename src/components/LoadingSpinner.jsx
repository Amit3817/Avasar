import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Loading...', 
  fullScreen = false,
  overlay = true 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.md;

  const SpinnerContent = () => (
    <div className="text-center">
      {/* Main Spinner */}
      <div className="relative inline-block">
        {/* Outer ring */}
        <div className={`${spinnerSize} border-4 border-gray-200 rounded-full animate-pulse`}></div>
        
        {/* Spinning ring */}
        <div className={`${spinnerSize} border-4 border-transparent border-t-primary-600 rounded-full absolute top-0 left-0 animate-spin`}></div>
        
        {/* Inner pulse */}
        <div className={`${spinnerSize} bg-primary-100 rounded-full absolute top-0 left-0 animate-ping opacity-75`}></div>
        
        {/* Center dot */}
        <div className={`${size === 'sm' ? 'w-1 h-1' : size === 'lg' ? 'w-2 h-2' : 'w-1.5 h-1.5'} bg-primary-600 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce`}></div>
      </div>
      
      {/* Loading text */}
      {text && (
        <div className="mt-4">
          <p className="text-gray-600 font-medium">{text}</p>
          {/* Animated dots */}
          <div className="flex justify-center mt-2 space-x-1">
            <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className={`fixed inset-0 ${overlay ? 'bg-white bg-opacity-95' : 'bg-transparent'} flex items-center justify-center z-50`}>
        <div className="transform scale-110">
          <SpinnerContent />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      <SpinnerContent />
    </div>
  );
};

// Page Loading Component
export const PageLoader = ({ text = 'Loading page...' }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <LoadingSpinner size="lg" text={text} />
  </div>
);

// Card Loading Component
export const CardLoader = ({ text = 'Loading...' }) => (
  <div className="card">
    <LoadingSpinner size="md" text={text} />
  </div>
);

// Inline Loading Component
export const InlineLoader = ({ text = 'Loading...' }) => (
  <LoadingSpinner size="sm" text={text} />
);

export default LoadingSpinner; 