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
import { AwardIcon } from "lucide-react";

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
      sessionStorage.getItem("token");

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
  (data.wishlist || []).map(item => item.product)
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

   await refreshWishlist();

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

      await refreshWishlist();

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

      await refreshWishlist();

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