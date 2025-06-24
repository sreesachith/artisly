"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/Herosection";
import CategoryCard from "@/components/categorycard";

export default function HomePage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/data/artistCategories.json");
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className="bg-black text-white min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <section className="py-12 px-6">
            <h3 className="text-2xl font-semibold text-center mb-8">
              Artist Categories
            </h3>
            <div className="flex flex-col gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.name}
                  name={category.name}
                  image={category.image}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
