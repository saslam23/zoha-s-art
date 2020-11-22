import React, { useEffect, useState } from 'react';
import {Form, Container} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { signinAction } from '../../actions/authActions';

export default function SigninScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const signin = useSelector(state => state.signin)
    const {userInfo} = signin;
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/art';
    const adminRedirect = '/admin';

    useEffect(() => {
    if(userInfo && userInfo.isAdmin === false){
        props.history.push(redirect)
    } if(userInfo && userInfo.isAdmin === true){
        props.history.push(adminRedirect);
    }
     
        return () => {
        }
    }, [userInfo])

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signinAction(email, password));
    }

    return (
        <div className="page-container-control">
            <Form className="form" onSubmit={submitHandler}>
                <h2>Sign-in</h2>
                <Form.Group className="input-with-icon" controlId="formGroupEmail">
                <i className="fa fa-envelope icon" />
                    <Form.Label>Email address</Form.Label>            
                        <Form.Control type="email" name="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="input-with-icon" controlId="formGroupPassword">
                    <i className="fa fa-key icon" />
                    <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <button type='submit' className="add-to-cart-button" >sign-in</button>
            </Form>
        </div>
    )
}
