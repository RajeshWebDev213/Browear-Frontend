import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartContextProvider } from './context/CartContext.jsx' 
import { AuthProvider } from './context/AuthContext.jsx'
import {WishlistProvider} from './context/WishlistContext.jsx'
import { OrdersProvider } from './context/OrderContext.jsx'
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
