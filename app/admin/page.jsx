import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-semibold text-orange-600 mb-6">
        Admin Dashboard
      </h1>
      <div className="space-x-4">
        <Link
          href="/admin/menu"
          className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600"
        >
          Manage Menu
        </Link>
        <Link
          href="/orders"
          className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
}
