import { SIGN_IN_FAIL, SIGN_IN_REQUEST, SIGN_IN_SUCCESS } from "../constants/authConstants";


function signinReducer(state = {}, action){
    switch(action.type){
        case SIGN_IN_REQUEST:
            return {loading: true, userInfo: action.payload}
        case SIGN_IN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case SIGN_IN_FAIL:
            return {loading: false, error: action.payload}
        default: return state;
    }

};

export {signinReducer};