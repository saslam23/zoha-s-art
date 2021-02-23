import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { detailProduct } from '../actions/productActions';

export default function ArtWorkDetailsScreen(props) {

    const [qty, setQty] = useState(1)
    const productDetails = useSelector(state => state.productDetails);
    const {loading, product, error} = productDetails;
    const dispatch = useDispatch();

    const cartButtonHandler = () =>{
        props.history.push('/cart/' + props.match.params.id + '?qty=' + qty)
    }

    useEffect(() => {
        dispatch(detailProduct(props.match.params.id));
        return () => {
        }
    }, [])
    return (
        <div className="page-container-control">
            <Link className="art-back-link" to="/art"><span>&laquo;</span></Link>
            <Container>
                <Row >
                    <Col>
            <div><img className="details-screen-image" src={product.image} alt="art_work_image"/></div>
            </Col>
            <Col> 
            <h2>{product.name}</h2>
            <p>{product.size}</p>
            <p>${product.price}</p>
            <p>{product.countInStock > 0 ? <p className="in-stock">Available</p> : <p className="not-in-stock">Out of Stock</p>}</p>
            Qty: {''}
            <select value={qty} onChange={(e) =>{setQty(e.target.value)}}>
            {[...Array(product.countInStock).keys()].map((x) =>
            <option key={x+1} value={x+1}>
                {x+1}
            </option>)}
            </select>
            <p>{product.description}</p>
            {product.countInStock > 0 && <button className="add-to-cart-button" onClick={cartButtonHandler}>Add to Cart</button>}
            
            </Col>
            </Row>
            </Container>
        </div>
    )
}

// For the Quantity drop down menu, we took the value of countInStock(type:Number) and created an array values out of it by using spread operator. Then .keys() to lay
// everything out as an array
