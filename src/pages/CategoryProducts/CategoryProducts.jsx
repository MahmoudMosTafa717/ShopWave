import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Spinner from '../../components/Spinner/Spinner';
import ProductItem from '../../components/ProductItem/ProductItem';
import { useContext } from 'react';
import { wishlistContext } from '../../context/Wishlist/Wishlist';

export default function CategoryProducts() {
  const { categoryId } = useParams();
  const { wishlistItemsIds, addToWishlist, deleteWishlistItem } = useContext(wishlistContext);

  const { data, isLoading } = useQuery({
    queryKey: ['categoryProducts', categoryId],
    queryFn: () =>
      axios
        .get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`)
        .then((response) => response.data.data),
  });

  const { data: categoryData } = useQuery({
    queryKey: ['categoryDetails', categoryId],
    queryFn: () =>
      axios
        .get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`)
        .then((response) => response.data.data),
  });

  const handleWishlist = (productId) => {
    if (wishlistItemsIds?.includes(productId)) {
      deleteWishlistItem(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <>
      <Helmet>
        <title>{categoryData ? `${categoryData.name} - ShopWave` : 'Category Products'}</title>
      </Helmet>
      <div className="container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-amazon-dark">
            {categoryData ? categoryData.name : 'Category'} Products
          </h1>
          <p className="text-gray-500 mt-2">
            Explore the best products in this category.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : data && data.length > 0 ? (
          <div className="flex flex-wrap -mx-3">
            {data.map((product) => (
              <ProductItem
                key={product._id}
                product={product}
                isWished={wishlistItemsIds?.includes(product._id)}
                handleWishlist={handleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
            <i className="fas fa-box-open text-5xl text-gray-300 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-500">No products found in this category.</h2>
          </div>
        )}
      </div>
    </>
  );
}
