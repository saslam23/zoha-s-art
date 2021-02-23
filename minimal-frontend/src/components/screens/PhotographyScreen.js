import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getFileAction } from '../actions/uploadActions';
import {PhotoCard,PhotoCardRight} from '../cards/PhotoCard';



const photoCard = (photo) =>{
    if(photo.type === 'left' ){
        return <PhotoCard
        id={photo.id}
        key={photo.id}
        image={photo.image}
        caption={photo.caption}
        altText={photo.altText}
    
    />
    } else{
        return <PhotoCardRight
        id={photo.id}
        key={photo.id}
        image={photo.image}
        caption={photo.caption}
        altText={photo.altText}
    
    />

    }

}

export default function PhotographyScreen() {
    const getFile = useSelector(state => state.getFile);
    const {photos, loading, error} = getFile;
    const photosSorted = photos.reverse();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFileAction());
        return () => {
        }
    }, [])
    return (
        
        <div className="photo-page-container-control">
            <h1 style={{marginBottom: '8rem'}}>MY PHOTOS</h1>
        {photosSorted.map(photoCard)}
        </div>
    )
}
