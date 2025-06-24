"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Header from "@/components/Header";
import ArtistCard from "@/components/artistCard";
import FilterDropdown from "@/components/Filters";

export default function ArtistListingPage() {
  const searchParams = useSearchParams(); 
  const [artists, setArtists] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    price: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const categoryOptions = ["Singer", "Dancer", "Stand-up", "DJ"];
  const locationOptions = ["Mumbai", "Delhi", "Bangalore"];
  const priceOptions = [
    "₹0 - ₹20,000",
    "₹20,000 - ₹40,000",
    "₹40,000 - ₹60,000",
    "₹60,000 - ₹80,000",
  ];

  useEffect(() => {
    const presetCategory = searchParams.get("category");
    if (presetCategory) {
      setFilters((prev) => ({ ...prev, category: presetCategory }));
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchArtists = async () => {
      const res = await fetch("/data/artists.json");
      const data = await res.json();
      setArtists(data);
    };

    fetchArtists();
  }, []);

  const isPriceInRange = (artistPrice, selectedRange) => {
    const [artistMin, artistMax] = artistPrice
      .replace(/[₹,]/g, "")
      .split(" - ")
      .map(Number);
    const [filterMin, filterMax] = selectedRange
      .replace(/[₹,]/g, "")
      .split(" - ")
      .map(Number);

    return artistMin >= filterMin && artistMax <= filterMax;
  };

  const filteredArtists = artists.filter((artist) => {
    const matchCategory = filters.category
      ? artist.category === filters.category
      : true;
    const matchLocation = filters.location
      ? artist.location === filters.location
      : true;
    const matchPrice = filters.price
      ? isPriceInRange(artist.priceRange, filters.price)
      : true;

    return matchCategory && matchLocation && matchPrice;
  });

  return (
    <>
      <Header />
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Explore Artists</h1>

        <div className="flex flex-col gap-4 sm:flex-row mb-6">
          <FilterDropdown
            label="Category"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            options={categoryOptions}
          />
          <FilterDropdown
            label="Location"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            options={locationOptions}
          />
          <FilterDropdown
            label="Price"
            name="price"
            value={filters.price}
            onChange={handleFilterChange}
            options={priceOptions}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredArtists.length > 0 ? (
            filteredArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No artists found for the selected filters.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
