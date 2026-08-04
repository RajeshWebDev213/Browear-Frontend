import { AuthProvider } from "./AuthContext";
import { CartContextProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { OrdersProvider } from "./OrderContext";
import { LoadingProvider } from "./LoadingContext";

function AppProvider({ children }) {
  return (
    <LoadingProvider>

      <AuthProvider>

        <CartContextProvider>

          <WishlistProvider>

            <OrdersProvider>

              {children}

            </OrdersProvider>

          </WishlistProvider>

        </CartContextProvider>

      </AuthProvider>

    </LoadingProvider>
  );
}

export default AppProvider;