import React from 'react'
import {Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default function ArtWorkCard(props) {
    return (
        <div>
            <Col xs={12} m={4}>
                <div><Link to={"/art/" + props.id}><img className="art-work-image" src={props.image} alt="art_work_image"/></Link></div>
                <div><Link to={"/art/" + props.id} className="art-work-name">{props.name}</Link></div>
                <div className="art-work-size">{props.size}</div>
                <div className="art-work-price">${props.price}</div>

            </Col>
            
        </div>
    )
}
