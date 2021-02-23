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
    PRODUCT_LIST_SUCCESS, 
    REMOVE_PRODUCT_FAIL, 
    REMOVE_PRODUCT_REQUEST,
    REMOVE_PRODUCT_SUCCESS} from '../constants/productConstants';


const createProduct = (product) => async (dispatch, getState) =>{ 
    try {
        dispatch({type: CREATE_PRODUCT_REQUEST, payload:{product}});
    const {signin: {userInfo}}= getState();


    if(!product._id){
    const {data} = await axios.post('http://localhost:8000/api/products/create', product,{
    headers: {
        Authorization: 'Bearer ' + userInfo.token
    }
    });
    dispatch({type: CREATE_PRODUCT_SUCCESS, payload: data});
} else{

    const {data} = await axios.put('http://localhost:8000/api/products/' + product._id, product,{
        headers: {
            Authorization: 'Bearer ' + userInfo.token
        }
        });
        dispatch({type: CREATE_PRODUCT_SUCCESS, payload: data});
}
        
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


const deleteProduct = (id) => async (dispatch) => {

    try {
        dispatch({type: REMOVE_PRODUCT_REQUEST, payload: id});
        const {data} = await axios.delete('http://localhost:8000/api/products/' + id);
        dispatch({type: REMOVE_PRODUCT_SUCCESS, payload: data});

    } catch (error) {
        dispatch({type: REMOVE_PRODUCT_FAIL});
    }
};
export {listProducts, detailProduct, createProduct, deleteProduct};