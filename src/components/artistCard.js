export default function ArtistCard({ artist }) {
  return (
    <div className="border rounded-lg shadow-sm p-4 flex flex-col justify-between ">
      <div>
        <h3 className="text-xl font-semibold mb-1">{artist.name}</h3>
        <p className="text-sm text-gray-600 mb-1">{artist.category}</p>
        <p className="text-sm text-gray-600 mb-1">{artist.location}</p>
        <p className="text-sm text-gray-600 font-medium">{artist.priceRange}</p>
      </div>
      <button className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition">
        Ask for Quote
      </button>
    </div>
  );
}
