import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../actions/cartActions';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

export default function ArtWorkCartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const dispatch = useDispatch();
    const quantity = cartItems.map(item => item.qty);
    const totalAmount = cartItems.reduce((prev, cur)=>
    prev + (cur.price * cur.qty)
   , 0);

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty));
            
        }
       console.log({cartItems})
        return () => {
        }
    }, [qty])


    const deleteFromCartHandler = (productId) =>{
        dispatch(deleteFromCart(productId));
    }

     const checkoutHandler = async (token) =>{
         const items = cartItems.map(item => item.name);
       const response = await axios.post('http://localhost:8000/api/stripe/checkout', 
        {
            token,
            items,
            totalAmount,
        });
        console.log(quantity);
        const {status} = response.data

        if(status === 'success'){
        toast('Transaction successful!', {type:'success'});

    } else{
            toast('Transaction Failed', {type:'error'});
    }

        
    }

    return (
        <div className="page-container-control">
            <Container fluid>
                <Row>
                    <Col md={10}>
                    <h2>Shopping Cart</h2>
                    <p style={{textAlign: 'right'}}>Price</p>
                    <hr/>
            {cartItems.length === 0 ? 'Cart is empty'
            :
            cartItems.map(item =>
                <div> 
                    <Row style={{width:'auto'}}>
                    <Col>
                    <li><img className="art-work-cart-image" src={item.image} alt="art_work_cart_image"/></li>
                    </Col>
                    <Col >
                    <li><strong>{item.name}</strong></li>
                    <select value={item.qty} onChange={(e)=>  
                        dispatch(addToCart(item.id, e.target.value))
                    }
                        >
                        {[...Array(item.countInStock).keys()].map(item =>
                            <option key={item + 1} value={item + 1}>{item + 1}</option>
                            )}
                    </select>
                    <br></br>
                    <button onClick = {() => deleteFromCartHandler(item.id)} className="cart-delete-button">delete</button>
                    
                    </Col>
                    <li style={{paddingRight:'15px'}}><strong>${item.price}</strong></li>  
                    </Row>
                    <hr/>                  
                </div>
                )
            }
            </Col>
            <Col md={2}>
            <div className="proceed-to-checkout-box">
                <h4 className="subtotal">
                Subtotal: ${cartItems.reduce((prev, cur)=>
                 prev + (cur.price * cur.qty)
                , 0)}</h4>
                
                <StripeCheckout
                    stripeKey="pk_test_51HtQ39EHq6DErrpIg5lJPqB6mAOce5KlwUXikXyJcHsszyQ7rdHRr03txC49URpmLHJfqgAm1fdYWvFp41l3bujC00DJn6e6dU"
                    token={checkoutHandler}
                    shippingAddress
                    billingAddress
                    amount = {totalAmount * 100}
                    quantity = {quantity}
                >
                <button disabled={cartItems.length === 0} className="checkout-button">Checkout</button>
                </StripeCheckout>
              
            </div>
            </Col>
            </Row>
            </Container>
 
        </div>
    )
}
