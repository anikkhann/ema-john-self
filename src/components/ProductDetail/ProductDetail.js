import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(prd => prd.key === productKey);
    console.log(product);
    return (
        <div>
            <h1>{productKey} Product detail coming soon</h1>
            <Product showAddToCart={false} product={product}></Product> {/*ei component ar vetor Product component ar jinis gulo dekhabe name a click korar por */}
        </div>
    );
};

export default ProductDetail;