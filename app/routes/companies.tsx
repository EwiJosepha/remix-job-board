import { Link } from "@remix-run/react";

export default function Companies() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Companies</h1>
      <p className="text-lg text-gray-600">Welcome to the Companies page!</p>
      <Link
        to="/companies"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go Back Home
      </Link>
    </div>
  );
}
