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
      getProducts().then((data) => {
        if (data && data.products) {
          const ids = data.products.map((item) => item.product._id);
          setCartItemIds(ids);
          setNumOfCartItems(data.products.length);
        }
      }).catch(() => {});
    } else {
      setCartItemIds([]);
      setNumOfCartItems(0);
    }
  }, [userToken]);

  function getProducts() {
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
    let config = {
      method: 'delete',
      url: `${URL}/${id}`,
      headers: headers,
    };

    return toast.promise(
      axios(config)
        .then((response) => {
          // Response returns the updated cart
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

  function emptyCart() {
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
