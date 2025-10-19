import React from 'react';

const Loading = () => {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
        <p className="text-sm sm:text-base">Loading productszxczxccc...</p>
      </div>
    </div>
  );
};

export default Loading;
