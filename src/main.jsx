import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartContextProvider } from './Cart/CartContext.jsx' 
import { AuthProvider } from './Header/AuthContext.jsx'
import {WishlistProvider} from './Wishlist/WishlistContext.jsx'
import { OrdersProvider } from './Orders/OrdersContext.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <CartContextProvider> 
    <BrowserRouter>
        <AuthProvider>
          <WishlistProvider>
            <OrdersProvider>
              <App />
            </OrdersProvider>
          </WishlistProvider>
        </AuthProvider>
    </BrowserRouter>
      </CartContextProvider>
  </React.StrictMode>,
)
