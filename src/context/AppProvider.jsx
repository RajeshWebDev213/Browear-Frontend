import { AuthProvider } from "./AuthContext";
import { CartContextProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { OrdersProvider } from "./OrderContext";

function AppProvider({ children }) {
  return (
    <AuthProvider>
      <CartContextProvider>
        <WishlistProvider>
          <OrdersProvider>
            {children}
          </OrdersProvider>
        </WishlistProvider>
      </CartContextProvider>
    </AuthProvider>
  );
}

export default AppProvider;