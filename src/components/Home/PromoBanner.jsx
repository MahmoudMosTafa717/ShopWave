import { Link } from 'react-router-dom';

export default function PromoBanner() {
  return (
    <section className="py-12 bg-amazon-dark">
      <div className="container">
        <div className="bg-amazon-blue rounded-2xl overflow-hidden relative shadow-2xl">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 rounded-full bg-amazon-orange opacity-20"></div>
          
          <div className="relative z-10 px-8 py-16 md:px-16 flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-8 md:mb-0 max-w-xl">
              <span className="inline-block py-1 px-3 rounded-full bg-amazon-orange text-white text-xs font-bold uppercase tracking-widest mb-4">
                Limited Time Offer
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Up to 50% Off <br className="hidden md:block"/> Selected Products
              </h2>
              <p className="text-amazon-light text-lg opacity-90">
                Don't miss out on our biggest sale of the season. Upgrade your lifestyle with premium products at unbeatable prices.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a
                href="/#bestsellers"
                className="inline-block bg-amazon-orange text-white font-bold text-lg py-4 px-10 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300"
              >
                Shop the Sale
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
