"use client";
import { useRouter } from "next/navigation";

export default function CategoryCard({ name, image }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/artists?category=${encodeURIComponent(name)}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative h-48 sm:h-64 rounded-xl overflow-hidden bg-cover bg-center flex items-center justify-center text-white text-2xl font-bold shadow-md cursor-pointer"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <span className="relative z-10">{name}</span>
    </div>
  );
}
