import React from "react";

export default function AdminManagePage() {
  return (
    <div className="bg-gray-100 min-h-full p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>

        <div className="grid grid-cols-2 gap-4">
          {/* Restaurant List */}
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Restaurant List</h2>
            <ul>
              <li>Restaurant 1</li>
              <li>Restaurant 2</li>
              <li>Restaurant 3</li>
              {/* Add more restaurants here */}
            </ul>
          </div>

          {/* Reservation Requests */}
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Reservation Requests</h2>
            <ul>
              <li>Request 1</li>
              <li>Request 2</li>
              <li>Request 3</li>
              {/* Add more reservation requests here */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
