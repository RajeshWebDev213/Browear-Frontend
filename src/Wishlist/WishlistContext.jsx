import { createContext, useContext, useState,useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({children}) =>{
   const [wishlist, setWishlist] = useState(() => {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
});

useEffect(() => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}, [wishlist]);


const addToWishlist = (item) => {
  if (!item || !item.id) return;

  setWishlist((prev) =>
    prev.some((p) => p.id === item.id)
      ? prev
      : [...prev, item]
  );
};

const removeFromWishlist = (id) => {
  setWishlist((prev) =>
    prev.filter((item) => item.id !== id)
  );
};

    return(
        <WishlistContext.Provider value={{wishlist,addToWishlist,removeFromWishlist}}>
                 {children}
        </WishlistContext.Provider>
    )
}
export const useWishlist = ()=>{
    return useContext(WishlistContext)
}