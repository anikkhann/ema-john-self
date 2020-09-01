import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const Shop = () => {
    console.log(fakeData);
  const first10 = fakeData.slice(0, 10);
  //console.log(first10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const savedCart = getDatabaseCart(); //get stored data from local storage : {key:ahah, Quantity:1}
    const productKeys = Object.keys(savedCart);//just see keys [key]
    const previousCart = productKeys.map( existingKey => {
    const product = fakeData.find( pd => pd.key === existingKey); // fake datar key and localstorage theke paw key same hole oi key gular sob data pabo.
    product.quantity = savedCart[existingKey];
    return product;
    });
   // console.log(cartProducts);
   setCart(previousCart);
  }, [])

  const handleAddProduct = (products) =>{
      //add to cart a click korle cart component a jno hiseb thik vabe dekhai sei kaj and database ao add hoy and main thing is product a quantity add korechi
    //   console.log("added", product);
        const toBeAddedKey = products.key;
       // console.log(toBeAddedKey);
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey); //jai product click  korechi  seta age theke  carta ache kina find korlam
        let count= 1;
        let newCart;
        if(sameProduct){ //jodi product pawa jai cart a/ thake 
            count =sameProduct.quantity + 1; //oi product ar quantity cart ar  vetor ro 1 bere jabe
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];

        }
        else{
            products.quantity = 1;//cart ar vetor product age na thakle quantity 1 barbe
            newCart = [...cart, products];
        }

        //const newCart = [...cart, product];
        setCart(newCart);
      //for storing purchase quantity with unique key into local storage.
    //   const sameProduct = newCart.filter(pd => pd.key === product.key);
    //   const count = sameProduct.length;  
      addToDatabaseCart(products.key, count); //database localstorage a koita product cart korlam setar hiseb store korlam (key, quantity).

  }
    return (
        <div className="shop-review-container">
            <div className="product-review-container">
                    {
                        products.map(pd => <Product product={pd} key={pd.key} handleAddProduct={handleAddProduct} showAddToCart={true}></Product>)
                    }    
            </div>
            <div className="cart-container">
                {/* <h3>order summary: {cart.length} </h3> */}
                <Cart cart={cart}>
                    <Link to="/review"><button className="main-button">Review Order</button></Link>
                </Cart>

            </div>
        </div>
    );
};

export default Shop;