import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { productListReducer, productDetailsReducer } from './components/reducers/productReducers';
import { cartReducer } from './components/reducers/cartReducers';


const cartItems = Cookie.getJSON('cartItems') || []
const initialState = {
    cart:{cartItems}
};

const reducer = combineReducers({
productList: productListReducer,
productDetails: productDetailsReducer,
cart: cartReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store=createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
    );


export default store;
