import { Suspense } from "react";
import ArtistListingPage from "@/components/artistlisting";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading artists...</div>}>
      <ArtistListingPage />
    </Suspense>
  );
}
