import axios from 'axios';
import { SIGN_IN_FAIL, SIGN_IN_REQUEST, SIGN_IN_SUCCESS } from '../constants/authConstants';
import Cookie from 'js-cookie';



const signinAction = (email, password) => async (dispatch, getState) =>{ 

    try {
        dispatch({type: SIGN_IN_REQUEST, payload: {email, password}})

        const {data} = await axios.post('/api/user/signin', {email, password})
    
        dispatch({type: SIGN_IN_SUCCESS, payload: data}) 
        const {signin: {userInfo}} = getState();
        Cookie.set('userInfo', JSON.stringify(userInfo));
    } catch (error) {
        dispatch({type:SIGN_IN_FAIL, error: error.message})
    }


};


export{signinAction}