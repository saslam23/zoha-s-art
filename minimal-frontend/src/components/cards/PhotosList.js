import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Table, Form} from 'react-bootstrap';
import { deletePhoto, getFileAction } from '../actions/uploadActions';
import {uploadFileAction} from '../actions/uploadActions';

export default function PhotosList(props) {
    const getFile = useSelector(state => state.getFile);
    const [id, setId] = useState('');
    const [uploaderVisible, setUploaderVisible] = useState(false);
    const [imagePath , setImagePath] = useState(null);
    const [caption, setCaption] = useState('');
    const [type, setType] = useState('');
    const [altText, setAltText] = useState('');
    const [date, setDate] = useState(new Date());
    const {photos, loading, error} = getFile;
    const photosSorted = photos.reverse();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFileAction());
        return () => {
        }
    }, [])

    
    const editImage = (photo) =>{
        setUploaderVisible(true);
        setId(photo._id);
        setCaption(photo.caption);
        setType(photo.type);
        setAltText(photo.altText);

    }

    const fileSelectedHandler = (e) =>{
        setImagePath(e.target.files[0])
       }

    const postFileHandler = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('pic', imagePath);
        formData.append('caption', caption);
        formData.append('type', type); //sending imagePath state as file to backend where req.files.photo can be used
        formData.append('date', date);
        formData.append('altText', altText);
        dispatch(uploadFileAction(formData, {_id:id} ));
        console.log(imagePath);
        alert('post successfully added to your photography page, Zoha!')
    }

    const deleteHandler = (id) =>{
        dispatch(deletePhoto(id))
    }
    return (
        <div>
              <button className="create-product-button" onClick = {() => setUploaderVisible(true)}>New post</button>
                        <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>File Name</th>
                        <th>Caption</th>
                        <th>Orientation</th>
                        <th>Alt-Text</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                            <tbody>
                            {photosSorted.map((photo) =>
                            <tr>
                                <td>{photo.image}</td>
                                <td>{photo.caption}</td>
                                <td>{photo.type}</td>
                                <td>{photo.altText}</td>
                                <td><button onClick={() =>editImage(photo)} className="actions-button">edit</button> |<button className="actions-button" onClick ={() => deleteHandler(photo._id)}>delete</button></td>
                            </tr>
                            )}
                            </tbody>
                </Table>
                {uploaderVisible ?
                           <Form onSubmit={postFileHandler}>
                            <Form.Group className="input-with-icon"> 
                               <Form.Label>About the photo</Form.Label> 
                               <br></br>
                               <textarea style={{width:'500px', height:'300px'}} name="caption" value={caption} placeholder="Enter caption" onChange={(e) => setCaption(e.target.value)} /> 
                            </Form.Group>
                            <Form.Group className="input-with-icon"> 
                               <Form.Label>Image Orientation</Form.Label> 
                               <Form.Control name="type" value={type} placeholder="Image will be on left or right? (type left or right)" onChange={(e) => setType(e.target.value)} /> 
                            </Form.Group>
                            <Form.Group className="input-with-icon">
                               <Form.Label>Image</Form.Label>
                                <Form.Control name="photo" type='file' onChange={fileSelectedHandler}/>
                           </Form.Group>
                           <Form.Group className="input-with-icon">
                               <Form.Label>alt-text</Form.Label>
                                <Form.Control name="altText" value={altText}  onChange={(e) =>setAltText(e.target.value)}/>
                           </Form.Group>
                           <button type="submit" value="upload" style={{marginBottom: '1rem'}} className="create-product-button">Create post</button>
                           <button type="button" className="create-product-button" onClick={() => setUploaderVisible(false)}>Cancel</button>
                           </Form>:''
            }
        </div>
    )
}
