import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';


const Review = () => {
    const [cart, setCart] = useState([]);
    //
    const [orderPlaced, setOrderPlaced] = useState(false);

    //place order a click korle sob kate jabe 
    const handlePlaceOrder = () => {
        setCart([]); //cart ar sokol man clean kora.
        setOrderPlaced(true);
        processOrder(); //database theke use korlam ai function local storage theke  data cleankore
    }
    //review component ar vetor elements gular remove button a click korle seta bad hoye jabe 
    const removeProduct = (productKey) => {
        //console.log(removeProduct);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }//end
    
    useEffect(() => {
        const savedCart = getDatabaseCart(); //get stored data from local storage : {key:ahah, Quantity:1}
        const productKeys = Object.keys(savedCart);//just see keys [key]
        const cartProducts = productKeys.map( key => {
        const product = fakeData.find( pd => pd.key === key); // fake datar key and localstorage theke paw key same hole oi key gular sob data pabo.
        product.quantity = savedCart[key];
        return product;
        });
       // console.log(cartProducts);
       setCart(cartProducts);
    }, [])

    let thankyou;
    if(orderPlaced){
        thankyou = <img src={happyImage} alt=""/>

    }
    return (
        <div className="shop-review-container">
           <div className="product-review-container">
                {/* <h1>Cart Items: {cart.length}</h1> */}
            {
                cart.map(pd => <ReviewItem product={pd} key={pd.key} removeProduct={removeProduct}></ReviewItem>)
            }
            {
                thankyou
            }
           </div>
           <div className="cart-container">
                <Cart cart={cart}>
                    <button className="main-button" onClick={handlePlaceOrder}>Place Order</button>
                </Cart>
           </div>
        </div>
    );
};

export default Review;