"use client";

export default function TableRow({ artist, onDelete }) {
  return (
    <tr className="border-b border-gray-600 hover:bg-gray-800 transition">
      <td className="p-4">{artist.name}</td>
      <td className="p-4">{artist.category?.join(", ")}</td>
      <td className="p-4">{artist.location}</td>
      <td className="p-4">{artist.feeRange}</td>
      <td className="p-4">
        <button
          onClick={() => onDelete(artist.id)}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
