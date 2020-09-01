import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    console.log(props.product);
    const {name, img, seller, price, stock, key} = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>

            <div>
            <h3 className="product-name"><Link to={"/product/"+key}>{name}</Link></h3> 
            <p>by: {seller}</p>
            <p>${price}</p>
            <p><small>only {stock} left in stock - order soon</small></p>

           { props.showAddToCart && <button className="main-button"
                onClick={() => props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart}/> add to cart
            </button> }
            {/* onclick e product data and cart value ek songge dhukbe tai props.handleAddProduct ar vetor product data props diye dhokano hoise */ }
            </div>
            
        </div>

        

        
    );
};

export default Product;