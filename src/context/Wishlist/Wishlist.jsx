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
      const savedGuestWishlist = localStorage.getItem('shopwave_guest_wishlist');
      const guestIds = savedGuestWishlist ? JSON.parse(savedGuestWishlist) : [];

      if (guestIds.length > 0) {
        const syncPromises = guestIds.map(id =>
          axios.post(URL, { productId: id }, { headers: { token: userToken } })
            .catch(() => null)
        );

        Promise.all(syncPromises).then(() => {
          localStorage.removeItem('shopwave_guest_wishlist');
          getWishlist().then((data) => {
            if (data) {
              const ids = data.map((item) => item._id);
              setWishlistItemsIds(ids);
            }
          });
        });
      } else {
        getWishlist().then((data) => {
          if (data) {
            const ids = data.map((item) => item._id);
            setWishlistItemsIds(ids);
          }
        }).catch(() => {});
      }
    } else {
      const saved = localStorage.getItem('shopwave_guest_wishlist');
      const ids = saved ? JSON.parse(saved) : [];
      setWishlistItemsIds(ids);
    }
  }, [userToken]);

  function addToWishlist(id) {
    if (!userToken) {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          const saved = localStorage.getItem('shopwave_guest_wishlist');
          let ids = saved ? JSON.parse(saved) : [];
          if (!ids.includes(id)) {
            ids.push(id);
          }
          localStorage.setItem('shopwave_guest_wishlist', JSON.stringify(ids));
          setWishlistItemsIds(ids);
          resolve({ status: 'success' });
        }, 300);
      });

      return toast.promise(promise, {
        loading: 'Adding product to wishlist...',
        success: 'Product added successfully!',
        error: 'Error adding product',
      });
    }

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
    if (!userToken) {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          const saved = localStorage.getItem('shopwave_guest_wishlist');
          let ids = saved ? JSON.parse(saved) : [];
          const filtered = ids.filter(itemId => itemId !== id);
          localStorage.setItem('shopwave_guest_wishlist', JSON.stringify(filtered));
          setWishlistItemsIds(filtered);
          resolve({ status: 'success' });
        }, 300);
      });

      return toast.promise(promise, {
        loading: 'Removing product from wishlist...',
        success: 'Product removed successfully!',
        error: 'Error removing product',
      });
    }

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
    if (!userToken) {
      const saved = localStorage.getItem('shopwave_guest_wishlist');
      const ids = saved ? JSON.parse(saved) : [];
      if (ids.length === 0) {
        return Promise.resolve([]);
      }

      const promises = ids.map(id =>
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
          .then(res => res.data.data)
          .catch(() => null)
      );

      return Promise.all(promises).then(results => results.filter(p => p !== null));
    }

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
