export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#f9f6f3] to-[#faf6f3] py-16 rounded-3xl max-w-[95%] mx-auto flex flex-col md:flex-row md:items-center md:justify-between px-6 md:px-12 shadow-xl overflow-hidden">
      {/* Left Section */}
      <div className="md:w-1/2 mb-10 md:mb-0">
        <p className="text-sm text-gray-500 mb-2 tracking-wide uppercase font-semibold">
          Why buy when you can rent royalty?
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-4">
          Royal outfits inspired by <br />
          Udaipur’s grandeur
        </h1>
        <p className="text-gray-700 mb-8 max-w-xl font-medium">
          Browse handcrafted bridal lehengas, regal sherwanis, and elegant party wear in ivory, gold, maroon, and blush tones.
        </p>
        <div className="flex gap-5 mb-10">
          <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-red-700 transition transform hover:-translate-y-1">
            Explore Collection
          </button>
          <button className="bg-white text-gray-900 border border-gray-300 px-8 py-3 rounded-lg font-semibold shadow-sm hover:bg-gray-100 transition">
            View Gallery
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-green-600 text-white px-4 py-1 rounded-full flex items-center text-sm font-semibold shadow">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="inline mr-2">
              <path
                d="M12 2a10 10 0 110 20 10 10 0 010-20zm4.292 7.293a1 1 0 10-1.414 1.414L13 12.586V7a1 1 0 10-2 0v8a1 1 0 00.293.707l4 4a1 1 0 001.414-1.414L13.414 15.5 16.586 12.5a1 1 0 00-1.414-1.414L13 13.172l-2-2V17a1 1 0 001 1h6a1 1 0 100-2h-5v-.68l4-4.027z"
                fill="currentColor"
              />
            </svg>
            4.8 from 1,700+
          </span>
          <span className="text-gray-500 text-sm font-light">
            Free dry-cleaning • Express fitting • Sizes XS–XXL
          </span>
        </div>
      </div>
      {/* Right Section (Image) */}
      <div className="md:w-1/2 flex justify-center items-center relative">
        <img
          src="https://images.pexels.com/photos/28699997/pexels-photo-28699997.jpeg"
          alt="Elegant royal outfits inspired by Udaipur’s grandeur"
          className="rounded-3xl object-cover shadow-2xl w-[360px] h-[375px] md:w-[420px] md:h-[430px] transform transition-transform duration-500 hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse -z-10"></div>
      </div>
    </section>
  );
}
