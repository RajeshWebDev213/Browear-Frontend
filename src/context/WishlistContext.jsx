import {
  createContext,
  useState,
  useEffect,
} from "react";

import {
  getWishlist,
  getWishlistCount,
  addToWishlist as addWishlistService,
  removeFromWishlist as removeWishlistService,
  toggleWishlist as toggleWishlistService,
} from "../services/wishlistService";

export const WishlistContext = createContext();

export const WishlistProvider = ({
  children,
}) => {

  const [wishlist, setWishlist] =
    useState([]);

  const [wishlistCount, setWishlistCount] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  /*
  =========================================
  LOAD WISHLIST
  =========================================
  */

  const refreshWishlist = async () => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      setWishlist([]);

      setWishlistCount(0);

      setLoading(false);

      return;

    }

    try {

      setLoading(true);

      const data =
        await getWishlist();

      setWishlist(
        data.items ||
        data.wishlist ||
        data
      );

      const count =
        await getWishlistCount();

      setWishlistCount(
        count.count || 0
      );

    }

    catch (err) {

      console.error(err);

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    refreshWishlist();

  }, []);

  /*
  =========================================
  ADD
  =========================================
  */

  const addToWishlist = async (
    productId
  ) => {

    await addWishlistService(
      productId
    );

    refreshWishlist();

  };

  /*
  =========================================
  REMOVE
  =========================================
  */

  const removeFromWishlist =
    async (productId) => {

      await removeWishlistService(
        productId
      );

      refreshWishlist();

    };

  /*
  =========================================
  TOGGLE
  =========================================
  */

  const toggleWishlist =
    async (productId) => {

      await toggleWishlistService(
        productId
      );

      refreshWishlist();

    };

  return (

    <WishlistContext.Provider
      value={{

        wishlist,

        wishlistCount,

        loading,

        addToWishlist,

        removeFromWishlist,

        toggleWishlist,

        refreshWishlist,

      }}
    >

      {children}

    </WishlistContext.Provider>

  );

};