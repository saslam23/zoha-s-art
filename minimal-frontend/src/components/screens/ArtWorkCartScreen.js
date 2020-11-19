import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';

export default function ArtWorkCartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const dispatch = useDispatch();

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty));
            
        }
       console.log({cartItems})
        return () => {
        }
    }, [qty])

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
                    <Col>
                    <li><strong>{item.name}</strong></li>
                    <select value={item.qty} onChange={(e)=>  
                        dispatch(addToCart(item.id, e.target.value))
                    }
                        >
                        {[...Array(item.countInStock).keys()].map(item =>
                            <option key={item + 1} value={item + 1}>{item + 1}</option>
                            )}

                    </select>
                    
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
                
                <button disabled={cartItems.length === 0} className="checkout-button">Checkout</button>
            </div>
            </Col>
            </Row>
            </Container>
 
        </div>
    )
}
