"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import TableRow from "@/components/TableRow";

export default function ManagerDashboard() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("artistSubmissions")) || [];
    setSubmissions(stored);
  }, []);

  const handleDelete = (id) => {
    const updated = submissions.filter((artist) => artist.id !== id);
    localStorage.setItem("artistSubmissions", JSON.stringify(updated));
    setSubmissions(updated);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Manager Dashboard
        </h1>

        {submissions.length === 0 ? (
          <p className="text-gray-400 text-center">
            No artist submissions yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded border border-gray-700">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-900 text-gray-300 uppercase text-xs">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">City</th>
                  <th className="p-4">Fee</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((artist) => (
                  <TableRow
                    key={artist.id}
                    artist={artist}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
