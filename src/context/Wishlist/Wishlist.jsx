import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { authContext } from '../Auth/Auth';

export const wishlistContext = createContext(null);

export default function WishlistContextProvider(props) {
  const { userToken } = useContext(authContext);
  const [wishlistItemsIds, setWishlistItemsIds] = useState([]);

  const headers = {
    token: userToken,
  };
  const URL = 'https://ecommerce.routemisr.com/api/v1/wishlist';

  useEffect(() => {
    if (userToken) {
      getWishlist().then((data) => {
        if (data) {
          const ids = data.map((item) => item._id);
          setWishlistItemsIds(ids);
        }
      }).catch(() => {});
    } else {
      setWishlistItemsIds([]);
    }
  }, [userToken]);

  function addToWishlist(id) {
    const data = {
      productId: id,
    };

    const config = {
      method: 'post',
      url: URL,
      headers: headers,
      data: data,
    };
    return toast.promise(
      axios(config)
        .then((response) => {
          setWishlistItemsIds((prev) => [...prev, id]);
          return response.data;
        })
        .catch((error) => {
          throw error;
        }),
      {
        loading: 'Adding product to wishlist...',
        success: 'Product added successfully!',
        error: 'Error adding product',
      }
    );
  }

  function deleteWishlistItem(id) {
    const config = {
      method: 'delete',
      url: `${URL}/${id}`,
      headers: headers,
    };

    return toast.promise(
      axios(config)
        .then((response) => {
          setWishlistItemsIds((prev) => prev.filter((itemId) => itemId !== id));
          return response.data;
        })
        .catch((error) => {
          throw error;
        }),
      {
        loading: 'Removing product from wishlist...',
        success: 'Product removed successfully!',
        error: 'Error removing product',
      }
    );
  }

  function getWishlist() {
    let config = {
      method: 'get',
      url: URL,
      headers: headers,
    };

    return axios(config)
      .then((response) => response.data.data)
      .catch((error) => {
        throw error;
      });
  }

  return (
    <wishlistContext.Provider
      value={{ wishlistItemsIds, addToWishlist, getWishlist, deleteWishlistItem }}
    >
      {props.children}
    </wishlistContext.Provider>
  );
}
