export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      image: 'https://i.pravatar.cc/150?img=1',
      text: "ShopWave has completely changed how I buy online. The delivery is incredibly fast, and I always find exactly what I'm looking for.",
    },
    {
      id: 2,
      name: 'Michael Chen',
      image: 'https://i.pravatar.cc/150?img=11',
      text: "The product quality is unmatched. Customer support was helpful when I needed to track my order. Highly recommended!",
    },
    {
      id: 3,
      name: 'Emma Watson',
      image: 'https://i.pravatar.cc/150?img=5',
      text: "I love the secure payment options and the huge variety of categories. This is my go-to store for everything.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-amazon-black mb-4">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-amazon-orange mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-amazon-light p-8 rounded-2xl shadow-sm relative mt-8"
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-10">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>
              <div className="pt-10 text-center">
                <div className="text-amazon-orange mb-4">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="text-gray-600 italic mb-6">"{review.text}"</p>
                <h4 className="font-bold text-amazon-dark">{review.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
