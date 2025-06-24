import { Suspense } from "react";
import ArtistListingPage from "@/components/artistlisting";

export default function Page() {
  return (
    <div className="bg-black text-white min-h-screen">
    <Suspense fallback={<div>Loading artists...</div>}>
      <ArtistListingPage />
      </Suspense>
    </div>
  );
}
