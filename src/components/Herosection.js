export default function HeroSection() {
  return (
    <section className="py-16 px-6 bg-black-50 text-center">
      <h2 className="text-4xl font-bold mb-4 text-white-700">
        Find Top Performing Artists for Your Event
      </h2>
      <p className="text-lg mb-6 text-gray-600 max-w-2xl mx-auto">
        Artistly connects event planners with singers, dancers, speakers, and
        more. Discover artists and raise booking requests with ease.
      </p>
      <a
        href="/artists"
        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        Explore Artists
      </a>
    </section>
  );
}
