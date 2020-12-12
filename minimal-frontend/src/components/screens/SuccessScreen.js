import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron';
import {Link} from 'react-router-dom';

export default function SuccessScreen() {
    return (
        <div className="page-container-control">
            <Jumbotron style={{backgroundColor: 'white'}}>
                <h1>Thank you!</h1>
                <p>
                    Your order has been placed successfully.  An email has been sent with details of your order.
                </p>
                <p>
                <Link to="/art"><button className="add-to-cart-button">Back to shopping</button></Link>
                </p>
            </Jumbotron>
        </div>
    )
}
