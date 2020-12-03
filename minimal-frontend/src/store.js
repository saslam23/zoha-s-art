import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { productListReducer, productDetailsReducer, createProductReducer, deleteProductReducer } from './components/reducers/productReducers';
import { cartReducer } from './components/reducers/cartReducers';
import { signinReducer } from './components/reducers/authReducers';


const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;
const initialState = {
    cart:{cartItems, shipping:{}},
    signin: {userInfo}
};

const reducer = combineReducers({
productList: productListReducer,
productDetails: productDetailsReducer,
cart: cartReducer,
signin: signinReducer,
createProduct: createProductReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store=createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
    );


export default store;
