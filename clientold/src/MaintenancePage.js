import React from 'react';

const MaintenancePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-800">
          This website is under maintenance
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Please have patience. We'll be back shortly!
        </p>
      </div>
    </div>
  );
};

export default MaintenancePage;
