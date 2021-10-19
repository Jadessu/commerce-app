import './App.css';
// import Products from './components/Products/Products';
// import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { Products} from "./components"
import { commerce } from "./lib/commerce"
import { useState, useEffect} from "react"
import Navbar from './components/realNavbar/Navbar';
function App() {
  const [products, setProducts] = useState([])
  const [ cart, setCart] = useState({})

  const fetchProducts = async ()=> {
    const {data} = await commerce.products.list()
    setProducts(data)
  }

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve()
    setCart(cart)
  }

  const handleAddToCart = async (productId,quantity) => {
    const item = await commerce.cart.add(productId, quantity)
    setCart(item.cart)
  }
  
  useEffect( () => {
fetchProducts()
fetchCart()
  }, [])
  
  return (
    <div className="App">
    
        
    <Navbar/>
      <Products products={products} onAddToCart={handleAddToCart}/>
   
    </div>
  );
}

export default App;
