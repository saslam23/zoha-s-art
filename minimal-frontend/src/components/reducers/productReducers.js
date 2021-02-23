import { STATES } from 'mongoose';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL, 
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    REMOVE_PRODUCT_REQUEST,
    REMOVE_PRODUCT_SUCCESS,
    REMOVE_PRODUCT_FAIL} from '../constants/productConstants';




const createProductReducer = (state = {}, action) =>{
    switch(action.type){
        case CREATE_PRODUCT_REQUEST:
            return {loading: true, data: action.payload};
        case CREATE_PRODUCT_SUCCESS:
            return {loading: false, data: action.payload};
        case CREATE_PRODUCT_FAIL:
            return {loading: false, error: action.payloadd};
        default: return state;
    }
}    

const productListReducer = (state ={products:[]}, action) =>{
    switch (action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products:[]};
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload};
        case REMOVE_PRODUCT_SUCCESS:
                return{loading: false, products: state.products.filter(e => e._id !== action.payload.data._id)};
        case PRODUCT_LIST_FAIL:
            return {loading: false, error:action.payload};
        default: return state;
    }
}

const productDetailsReducer = (state = {product:{}}, action) =>{
    switch (action.type){
        case PRODUCT_DETAIL_REQUEST:
            return{loading: true, product: action.payload};
        case PRODUCT_DETAIL_SUCCESS:
            return {loading: false, product: action.payload};
        case PRODUCT_DETAIL_FAIL:
            return {loading: false, error: action.payload};
        default: return state;        
    }
}

/*const deleteProductReducer = (state = {products: {}}, action) =>{
    switch(action.type){
        case REMOVE_PRODUCT_REQUEST:
            return{loading: true, products:[]};
        case REMOVE_PRODUCT_SUCCESS:
            return{loading: false, products: action.payload};
        case REMOVE_PRODUCT_FAIL:
            return{loading: false, products: action.payload};
        default: return state;
    }
}*/

export {productListReducer, productDetailsReducer, createProductReducer};