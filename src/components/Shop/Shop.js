import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';


const Shop = () => {
  //  console.log(fakeData);
  const first10 = fakeData.slice(0, 10);
  //console.log(first10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);
  const handleAddProduct = (product) =>{
      console.log("added", product);
      const newCart = [...cart, product];
      setCart(newCart);

  }
    return (
        <div className="shop-container">
            <div className="product-container">
                    {
                        products.map(pd => <Product product={pd} handleAddProduct={handleAddProduct}></Product>)
                    }    
            </div>
            <div className="cart-container">
                {/* <h3>order summary: {cart.length} </h3> */}
                <Cart cart={cart}></Cart>

            </div>
        </div>
    );
};

export default Shop;