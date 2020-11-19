const { ADD_CART_ITEM, DELETE_FROM_CART } = require("../constants/cartConstants");

function cartReducer(state = {cartItems:[]}, action){
    switch(action.type){
        case ADD_CART_ITEM:
         const retrievedProduct = action.payload;
         const product = state.cartItems.find(x => x.id === retrievedProduct.id); //we find the product with similar id as payload
         if(product){
             return{
                 cartItems:
                 state.cartItems.map(x=>x.id === product.id ? retrievedProduct : x) 
             };
         }
         return {cartItems: [...state.cartItems, retrievedProduct]}; //meaning if the id doesn't match any already items in array  we will add the payload to array
        case DELETE_FROM_CART:
            return {cartItems: state.cartItems.map(x =>x.id !== action.payload)}
         default: return state;
    }
}

export{cartReducer};

// if the mapped product is equal to the true conditional product Id, then the ternary
// operator will return the retrieved product as a repalcement