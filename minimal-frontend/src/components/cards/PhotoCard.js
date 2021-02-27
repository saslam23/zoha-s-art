import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
 function PhotoCard(props) {
    return (
        <div>
            <div className="left-photo-card-layout">
            <img className="photo-images" src={props.image} alt={props.altText}/>
            <p className="photo-left-caption">
                {props.caption}
            </p>
            </div>
        </div>
    )
}


function PhotoCardRight(props) {
    return(
    <div>
        <div className="right-photo-card-layout">
        <img className="photo-images" src={props.image} alt={props.altText}/>
        <p className="photo-right-caption">
            {props.caption}
        </p>
        </div>
</div>
    )
}

export {PhotoCard, PhotoCardRight}


