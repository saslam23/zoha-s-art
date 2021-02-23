import{ GET_FILE_FAIL, GET_FILE_REQUEST, GET_FILE_SUCCESS, REMOVE_FILE_SUCCESS, UPLOAD_FILE_FAIL, UPLOAD_FILE_REQUEST, UPLOAD_FILE_SUCCESS } from "../constants/uploadFileConstants";


const uploadFileReducer = (state={}, action) =>{
    switch(action.type){
        case UPLOAD_FILE_REQUEST:
            return {loading: true, data: action.payload};
        case UPLOAD_FILE_SUCCESS:
            return {loading: false, data: action.payload};
        case UPLOAD_FILE_FAIL:
            return{loading: false, error: action.payload};
        default: return state;
    }
}

const getFileReducer = (state={photos:[]}, action) =>{
    switch(action.type){
        case GET_FILE_REQUEST:
            return {loading: true, photos:[]};
        case GET_FILE_SUCCESS:
            return {loading: false, photos: action.payload};
        case REMOVE_FILE_SUCCESS:
            return{loading: false, photos: state.photos.filter(e => e._id !== action.payload.data._id)};
        case GET_FILE_FAIL:
            return {loading: false, error: action.payload};
        default: return state;
    }
}
export {uploadFileReducer, getFileReducer};