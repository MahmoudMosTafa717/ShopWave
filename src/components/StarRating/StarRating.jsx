export default function StarRating({ rating, size = 'text-sm' }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center text-amazon-orange ${size}`}>
      {[...Array(fullStars)].map((_, i) => (
        <i key={`full-${i}`} className="fa-solid fa-star"></i>
      ))}
      {hasHalfStar && <i className="fa-solid fa-star-half-stroke"></i>}
      {[...Array(emptyStars)].map((_, i) => (
        <i key={`empty-${i}`} className="fa-regular fa-star text-gray-300"></i>
      ))}
    </div>
  );
}
