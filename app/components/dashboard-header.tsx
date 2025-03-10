import React from "react";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md p-4 flex justify-between items-center w-full rounded-lg">
      <div className="text-2xl font-bold text-gray-800">Dashboard</div>

      <div className="flex items-center gap-3">
        <span className="text-gray-600 font-medium">John Doe</span>

        <div className="w-16 h-16 rounded-full bg-gray-300 border border-gray-400 overflow-hidden">
          <img
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
