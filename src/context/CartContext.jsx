import {
  createContext,
  useState,
  useEffect,
} from "react";

import {
  getCart,
  addToCart as addCartService,
  updateCartQuantity,
  removeFromCart as removeCartService,
  clearCart as clearCartService,
  getCartSummary,
  getCartCount,
} from "../services/cartService";

export const CartContext = createContext();

export const CartContextProvider = ({
  children,
}) => {

  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [cartCount, setCartCount] =
    useState(0);

  const [summary, setSummary] =
    useState(null);

  /*
  =========================================
  LOAD CART
  =========================================
  */

  const refreshCart = async () => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      setCartItems([]);

      setCartCount(0);

      setSummary(null);

      setLoading(false);

      return;

    }

    try {

      setLoading(true);

      const cart =
        await getCart();

      setCartItems(
        cart.items || cart.cartItems || []
      );

      const count =
        await getCartCount();

      setCartCount(
        count.count || 0
      );

      const cartSummary =
        await getCartSummary();

      setSummary(cartSummary);

    }

    catch (err) {

      console.error(err);

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    refreshCart();

  }, []);

  /*
  =========================================
  ADD TO CART
  =========================================
  */

  const addToCart = async (
    productId,
    quantity = 1
  ) => {

    await addCartService(
      productId,
      quantity
    );

    refreshCart();

  };

  /*
  =========================================
  UPDATE QUANTITY
  =========================================
  */

  const updateQuantity = async (
    productId,
    quantity
  ) => {

    await updateCartQuantity(
      productId,
      quantity
    );

    refreshCart();

  };

  /*
  =========================================
  REMOVE ITEM
  =========================================
  */

  const removeFromCart = async (
    productId
  ) => {

    await removeCartService(
      productId
    );

    refreshCart();

  };

  /*
  =========================================
  CLEAR CART
  =========================================
  */

  const clearCart = async () => {

    await clearCartService();

    refreshCart();

  };

  return (

    <CartContext.Provider
      value={{

        cartItems,

        loading,

        cartCount,

        summary,

        addToCart,

        updateQuantity,

        removeFromCart,

        clearCart,

        refreshCart,

      }}
    >

      {children}

    </CartContext.Provider>

  );

};