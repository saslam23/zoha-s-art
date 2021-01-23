import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Table} from 'react-bootstrap';
import { deletePhoto, getFileAction } from '../actions/uploadActions';

export default function PhotosList(props) {
    const getFile = useSelector(state => state.getFile);
    const {photos, loading, error} = getFile;
    const photosSorted = photos.reverse();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFileAction());
        return () => {
        }
    }, [])

    const deleteHandler = (id) =>{
        dispatch(deletePhoto(id))
    }
    return (
        <div>
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
                                <td><button className="actions-button" onClick ={() => deleteHandler(photo._id)}>delete</button></td>
                            </tr>
                            )}
                            </tbody>
                </Table>
        </div>
    )
}
