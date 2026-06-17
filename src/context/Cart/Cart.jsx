import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { authContext } from '../Auth/Auth';

export const cartContext = createContext(null);

export default function CartContextProvider(props) {
  const { userToken } = useContext(authContext);
  const [cartItemIds, setCartItemIds] = useState([]);
  const [numOfCartItems, setNumOfCartItems] = useState(0);

  const headers = {
    token: userToken,
  };
  const URL = 'https://ecommerce.routemisr.com/api/v1/cart';

  useEffect(() => {
    if (userToken) {
      const savedGuestCart = localStorage.getItem('shopwave_guest_cart');
      const guestItems = savedGuestCart ? JSON.parse(savedGuestCart) : [];

      if (guestItems.length > 0) {
        const syncPromises = guestItems.map((item) => {
          return axios.post(URL, { productId: item.id }, { headers: { token: userToken } })
            .then((res) => {
              if (item.count > 1) {
                const products = res.data.data.products;
                const match = products.find(p => p.product === item.id || p.product._id === item.id);
                if (match) {
                  return axios.put(`${URL}/${match._id}`, { count: item.count }, { headers: { token: userToken } })
                    .catch(() => null);
                }
              }
            })
            .catch(() => null);
        });

        Promise.all(syncPromises).then(() => {
          localStorage.removeItem('shopwave_guest_cart');
          getProducts().then((data) => {
            if (data && data.products) {
              const ids = data.products.map((item) => item.product._id);
              setCartItemIds(ids);
              setNumOfCartItems(data.products.length);
            }
          }).catch(() => {});
        });
      } else {
        getProducts().then((data) => {
          if (data && data.products) {
            const ids = data.products.map((item) => item.product._id);
            setCartItemIds(ids);
            setNumOfCartItems(data.products.length);
          }
        }).catch(() => {});
      }
    } else {
      const saved = localStorage.getItem('shopwave_guest_cart');
      const items = saved ? JSON.parse(saved) : [];
      setCartItemIds(items.map(i => i.id));
      setNumOfCartItems(items.length);
    }
  }, [userToken]);

  function getProducts() {
    if (!userToken) {
      const saved = localStorage.getItem('shopwave_guest_cart');
      const items = saved ? JSON.parse(saved) : [];
      if (items.length === 0) {
        return Promise.resolve({ products: [], totalCartPrice: 0 });
      }

      const promises = items.map(item =>
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${item.id}`)
          .then(res => ({
            count: item.count,
            price: res.data.data.price,
            product: res.data.data,
            _id: item.id,
          }))
          .catch(() => null)
      );

      return Promise.all(promises).then(results => {
        const products = results.filter(p => p !== null);
        const totalCartPrice = products.reduce((acc, curr) => acc + (curr.price * curr.count), 0);
        return { products, totalCartPrice };
      });
    }

    const config = {
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

  function addProduct(id) {
    if (!userToken) {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          const saved = localStorage.getItem('shopwave_guest_cart');
          let items = saved ? JSON.parse(saved) : [];
          const existing = items.find(item => item.id === id);
          if (existing) {
            existing.count += 1;
          } else {
            items.push({ id: id, count: 1 });
          }
          localStorage.setItem('shopwave_guest_cart', JSON.stringify(items));
          setCartItemIds(items.map(i => i.id));
          setNumOfCartItems(items.length);
          resolve({ status: 'success', message: 'Product added successfully' });
        }, 300);
      });

      return toast.promise(promise, {
        loading: 'Adding product...',
        success: 'Product added successfully!',
        error: 'Error adding product',
      });
    }

    const data = { productId: id };

    const config = {
      method: 'post',
      url: URL,
      headers: headers,
      data: data,
    };

    return toast.promise(
      axios(config)
        .then((response) => {
          setCartItemIds((prev) => [...prev, id]);
          setNumOfCartItems((prev) => prev + 1);
          return response.data;
        })
        .catch((error) => {
          throw error;
        }),
      {
        loading: 'Adding product...',
        success: 'Product added successfully!',
        error: 'Error adding product',
      }
    );
  }

  function deleteProduct(id) {
    if (!userToken) {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          const saved = localStorage.getItem('shopwave_guest_cart');
          let items = saved ? JSON.parse(saved) : [];
          const filtered = items.filter(item => item.id !== id);
          localStorage.setItem('shopwave_guest_cart', JSON.stringify(filtered));
          setCartItemIds(filtered.map(i => i.id));
          setNumOfCartItems(filtered.length);
          resolve({ status: 'success', data: { products: filtered } });
        }, 300);
      });

      return toast.promise(promise, {
        loading: 'Deleting product...',
        success: 'Product deleted successfully!',
        error: 'Error deleting product',
      });
    }

    let config = {
      method: 'delete',
      url: `${URL}/${id}`,
      headers: headers,
    };

    return toast.promise(
      axios(config)
        .then((response) => {
          if (response.data && response.data.data && response.data.data.products) {
            const newIds = response.data.data.products.map((item) => item.product._id);
            setCartItemIds(newIds);
            setNumOfCartItems(response.data.numOfCartItems || response.data.data.products.length);
          }
          return response.data;
        })
        .catch((error) => {
          throw error;
        }),
      {
        loading: 'Deleting product...',
        success: 'Product deleted successfully!',
        error: 'Error deleting product',
      }
    );
  }

  function updateProductQuantity(id, quantity) {
    if (!userToken) {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          const saved = localStorage.getItem('shopwave_guest_cart');
          let items = saved ? JSON.parse(saved) : [];
          const item = items.find(item => item.id === id);
          if (item) {
            item.count = quantity;
          }
          localStorage.setItem('shopwave_guest_cart', JSON.stringify(items));
          resolve({ status: 'success' });
        }, 300);
      });

      return toast.promise(promise, {
        loading: 'Updating product quantity...',
        success: 'Product quantity updated successfully!',
        error: 'Error updating product quantity',
      });
    }

    let data = { count: quantity };

    let config = {
      method: 'put',
      url: `${URL}/${id}`,
      headers: headers,
      data: data,
    };

    return toast.promise(
      axios(config)
        .then((response) => response.data)
        .catch((error) => {
          throw error;
        }),
      {
        loading: 'Updating product quantity...',
        success: 'Product quantity updated successfully!',
        error: 'Error updating product quantity',
      }
    );
  }

  // eslint-disable-next-line no-unused-vars
  function emptyCart() {
    if (!userToken) {
      localStorage.removeItem('shopwave_guest_cart');
      setCartItemIds([]);
      setNumOfCartItems(0);
      return Promise.resolve({ status: 'success' });
    }

    let config = {
      method: 'delete',
      url: URL,
      headers: headers,
    };

    return axios
      .request(config)
      .then((response) => {
        setCartItemIds([]);
        setNumOfCartItems(0);
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }

  return (
    <cartContext.Provider
      value={{
        cartItemIds,
        numOfCartItems,
        getProducts,
        addProduct,
        deleteProduct,
        updateProductQuantity,
        emptyCart,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
