import axios from 'axios';
import { 
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_REQUEST, 
    PRODUCT_DETAIL_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS } from '../constants/productConstants';


const createProduct = (name, image, price, size, description, countInStock) => async (dispatch, getState) =>{ 
    try {
        dispatch({type: CREATE_PRODUCT_REQUEST, payload:{name, image, price, size, description, countInStock}});
    const {signin: {userInfo}}= getState();
    const {data} = await axios.post('http://localhost:8000/api/products/create', {name, image, price, size, description, countInStock},{
    headers: {
        authorization: 'Bearer ' + userInfo.token
    }
    });
    dispatch({type: CREATE_PRODUCT_SUCCESS, payload: data});
        
    } catch (error) {
        dispatch({type:CREATE_PRODUCT_FAIL, payload: error.message});
        
    }
};

const listProducts = () => async (dispatch) =>{
try {
    dispatch({type:PRODUCT_LIST_REQUEST});
    
    const {data} = await axios.get('http://localhost:8000/api/products/');

    dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
} catch (error) {
    dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
}
};

const detailProduct = (id) => async (dispatch) =>{
try {
    dispatch({type: PRODUCT_DETAIL_REQUEST, payload: id})
    const {data} = await axios.get('http://localhost:8000/api/products/' + id);
    dispatch({type: PRODUCT_DETAIL_SUCCESS, payload: data});
} catch (error) {
    dispatch({typs: PRODUCT_DETAIL_FAIL, payload: error.message});
}
};
export {listProducts, detailProduct, createProduct};