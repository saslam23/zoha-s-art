import React, { useEffect, useState } from 'react';
import {Form, Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, listProducts } from '../actions/productActions';



export default function AdminProductsScreen(props) {
    const [modalVisible, setModaleVisible] = useState(false);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const [size, setSize] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const dispatch = useDispatch();
    const signin = useSelector(state => state.signin);
    const productList = useSelector(state => state.productList);
    const {products} = productList;
    const {userInfo} = signin;

    useEffect(() => {
        if(userInfo){
            dispatch(listProducts());
        }
        if(!userInfo){
            props.history.push('/signin');
        }
        return () => {
           
        }
    }, [])

    const createProductHandler = (e) =>{
        e.preventDefault();
        dispatch(createProduct(name, image, price, size, description, countInStock))
    }

    return (


        <div className="page-container-control">
            { userInfo && userInfo.isAdmin ? 
            <div>
                {modalVisible ?
                <div>
                    <Form className="form" onSubmit = {createProductHandler}>
                    <h2>Create Product</h2>
                    <Form.Group className="input-with-icon">
                        <Form.Label>Name</Form.Label>            
                            <Form.Control  name="name" placeholder="Name of product" onChange = {(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="input-with-icon">
                        <Form.Label>Image</Form.Label>
                            <Form.Control name="image" placeholder="Enter image path" onChange = {(e) =>setImage(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="input-with-icon">
                        <Form.Label>Price</Form.Label>
                            <Form.Control  name="price" placeholder="Enter price" onChange = {(e) => setPrice(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="input-with-icon">
                        <Form.Label>Size</Form.Label>
                            <Form.Control  name="size" placeholder="Enter size" onChange = {(e) => setSize(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="input-with-icon">
                        <Form.Label>Description</Form.Label>
                            <Form.Control  name="description" placeholder="Enter a description for the product" onChange = {(e) =>setDescription(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="input-with-icon">
                        <Form.Label>Stock</Form.Label>
                            <Form.Control  name="countInStock" placeholder="Amount in Stock" onChange = {(e) =>setCountInStock(e.target.value)}/>
                    </Form.Group>
                    <button type='submit' className="create-product-button" >Create Product</button>
                    <button className="create-product-button" onClick={() => setModaleVisible(false)}>Cancel</button>
                    </Form> 
                </div>:
                <div>
                <button style={{marginBottom: '4px;'}} className="create-product-button" onClick = {() => setModaleVisible(true)}>Create Product</button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Edit</th>
                        </tr>
                    </thead>
                            <tbody>
                            {products.map((product) =>
                            <tr>
                                <td>{product.name}</td>
                                <td>{product.size}</td>
                                <td>{product.price}</td>
                                <td>edit | delete</td>
                            </tr>
                            )}
                            </tbody>
                </Table>
                </div>
            }
        
      </div>
        :'You are not authorized to view this page'
        
        }
    </div>
    )
}
