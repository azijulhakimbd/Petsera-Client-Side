import React from "react";

const AccessDenied = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl fredoka font-bold mb-4">🚫 Access Denied</h1>
      <p className="text-lg inter">You must be an admin to view this page.</p>
    </div>
  );
};

export default AccessDenied;
