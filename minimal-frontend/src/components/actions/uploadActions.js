import axios from 'axios';
import { 
    GET_FILE_FAIL,
    GET_FILE_REQUEST,
    GET_FILE_SUCCESS,
    REMOVE_FILE_FAIL,
    REMOVE_FILE_REQUEST,
    REMOVE_FILE_SUCCESS,
    UPLOAD_FILE_FAIL, 
    UPLOAD_FILE_REQUEST, 
    UPLOAD_FILE_SUCCESS } from '../constants/uploadFileConstants';

const uploadFileAction = (photoInfo) => async (dispatch) =>{
    dispatch({type: UPLOAD_FILE_REQUEST, payload: {photoInfo}});
    console.log(photoInfo)
    try {
        const {data} = await axios.post('http://localhost:8000/api/photos/upload', photoInfo, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({type: UPLOAD_FILE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: UPLOAD_FILE_FAIL, payload: error.message});
    }
}

const getFileAction = () => async(dispatch) =>{
    try {
        dispatch({type: GET_FILE_REQUEST});
        const {data} = await axios.get('http://localhost:8000/api/photos/upload');
        dispatch({type: GET_FILE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: GET_FILE_FAIL, payload: error.message});
    }
}

const deletePhoto = (id) => async (dispatch) =>{
    try {
        dispatch({type:REMOVE_FILE_REQUEST, payload: id});
        const {data} = await axios.delete("http://localhost:8000/api/photos/" + id);
        dispatch({type:REMOVE_FILE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type:REMOVE_FILE_FAIL, payload: error.message});
    }
}
export {uploadFileAction, getFileAction, deletePhoto};