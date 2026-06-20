export default function WhyChooseUs() {
  const features = [
    {
      id: 1,
      title: 'Fast Delivery',
      description: 'Get your orders delivered to your doorstep quickly and securely.',
      icon: 'fas fa-shipping-fast',
    },
    {
      id: 2,
      title: 'Secure Payments',
      description: 'We ensure safe payment processing with top-tier encryption.',
      icon: 'fas fa-lock',
    },
    {
      id: 3,
      title: 'Quality Products',
      description: 'We source only the best products from top-rated global brands.',
      icon: 'fas fa-check-circle',
    },
    {
      id: 4,
      title: '24/7 Support',
      description: 'Our dedicated customer service team is here for you anytime.',
      icon: 'fas fa-headset',
    },
  ];

  return (
    <section className="py-20 bg-amazon-light">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-amazon-black mb-4">
            Why Choose Us
          </h2>
          <div className="w-20 h-1 bg-amazon-blue mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-amazon-light rounded-full flex items-center justify-center text-amazon-orange text-2xl mb-6">
                <i className={feature.icon}></i>
              </div>
              <h3 className="text-xl font-bold text-amazon-dark mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
