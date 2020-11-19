import axios from 'axios';
import Cookie from 'js-cookie';
import { ADD_CART_ITEM, DELETE_FROM_CART } from '../constants/cartConstants';

const addToCart = (productId, qty) => async(dispatch, getState) =>{
    try {
        const {data} = await axios.get('http://localhost:8000/api/products/' + productId);
        dispatch({
            type: ADD_CART_ITEM,
            payload:{
                id: data._id,
                image: data.image,
                name: data.name,
                size: data.size,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })
        const {cart: {cartItems}} = getState();//getting state from cart reducer cartItems array
        Cookie.set('cartItems', JSON.stringify(cartItems));
    } catch (error) {
        
    }
}

const deleteFromCart = (productId) => async(dispatch, getState) =>{

    dispatch({type: DELETE_FROM_CART, payload:{productId}})
    
    const {cart: {cartItems}} = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));

}

export{addToCart, deleteFromCart};