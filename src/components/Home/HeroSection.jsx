import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative bg-amazon-dark text-white overflow-hidden">
      {/* Background Image / Pattern overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-amazon-dark to-amazon-dark/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
          alt="Shopping background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      <div className="container relative z-10 py-24 md:py-32 flex flex-col items-start justify-center">
        <div className="max-w-2xl">
          <span className="text-amazon-orange font-bold tracking-wider uppercase text-sm mb-4 block">
            Welcome to ShopWave
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Discover More, <br className="hidden md:block" /> Spend Less.
          </h1>
          <p className="text-lg md:text-xl text-amazon-light mb-10 max-w-lg leading-relaxed">
            Shop the best brands at your fingertips. Enjoy fast delivery, secure payments, and top-tier customer support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/products"
              className="px-8 py-3 bg-amazon-orange text-white font-semibold rounded-lg hover:bg-opacity-90 transition shadow-lg shadow-amazon-orange/30 text-center"
            >
              Shop Now
            </Link>
            <Link
              to="/categories"
              className="px-8 py-3 bg-white text-amazon-dark font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg text-center"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
