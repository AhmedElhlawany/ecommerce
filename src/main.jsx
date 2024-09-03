import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from './Context/CartContext.jsx'
import WishlistContextProvider from './components/WishlistContext/WishlistContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartContextProvider> 
      <WishlistContextProvider>

      <App />
      </WishlistContextProvider>
      
      </CartContextProvider>
   
  </StrictMode>,
)
