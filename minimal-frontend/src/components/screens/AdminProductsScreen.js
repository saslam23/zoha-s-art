import React, { useEffect, useState } from 'react';
import {Form, Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, listProducts, deleteProduct } from '../actions/productActions';
import Cookie from 'js-cookie';

import PhotosList from '../cards/PhotosList';




export default function AdminProductsScreen(props) {
    const [modalVisible, setModaleVisible] = useState(false);
  
    const [id, setId]= useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
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
            setModaleVisible(false);
            dispatch(listProducts());
        }
        if(!userInfo){
            props.history.push('/signin');
        }
        return () => {
           
        }
    }, [])


    const editProduct = (product) =>{
        setModaleVisible(true);
        setId(product._id)
        setName(product.name);
        setImage(product.image);
        setPrice(product.price);
        setSize(product.size);
        setDescription(product.description);
        setCountInStock(product.countInStock);
    }


    const deleteHandler = (id) =>{
        dispatch(deleteProduct(id));

    }


   const logoutHandler = () => { 
        Cookie.remove("userInfo")
        window.location = '/';
    }

  





    const createProductHandler = (e) =>{
        e.preventDefault();
       
        dispatch(createProduct({_id: id, name, image, price, size, description, countInStock}))
       window.location = '/admin';
    }

    return (


        <div className="page-container-control">
            { userInfo && userInfo.isAdmin ? 
            <div>

                {modalVisible ?
                <div>
                <Form className="form" onSubmit = {createProductHandler}>
                    <h2>{id ? 'Edit Product' : 'Create Product'}</h2>
                    <Form.Group className="input-with-icon">
                        <Form.Label>Name</Form.Label>            
                            <Form.Control value={name} name="name" placeholder="Name of product" onChange = {(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="input-with-icon">
                        <Form.Label>Image</Form.Label>
                            <Form.Control value={image} name="image" placeholder="Enter image path" onChange = {(e) =>setImage(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="input-with-icon">
                        <Form.Label>Price</Form.Label>
                            <Form.Control value={price} name="price" placeholder="Enter price" onChange = {(e) => setPrice(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="input-with-icon">
                        <Form.Label>Size</Form.Label>
                            <Form.Control value={size}  name="size" placeholder="Enter size" onChange = {(e) => setSize(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="input-with-icon">
                        <Form.Label>Description</Form.Label>
                            <Form.Control value={description} name="description" placeholder="Enter a description for the product" onChange = {(e) =>setDescription(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="input-with-icon">
                        <Form.Label>Stock</Form.Label>
                            <Form.Control  value={countInStock} name="countInStock" placeholder="Amount in Stock" onChange = {(e) =>setCountInStock(e.target.value)}/>
                    </Form.Group>
                    <button type='submit' className="create-product-button" >
                        {id ? 'Update' : 'Create'}
                    </button>
                    <button type='button' className="create-product-button" onClick={() => window.location.reload()}>Cancel</button>
                    </Form>              
                </div>
                
                :

                <div>
                <button style={{marginBottom: '4px'}} className="create-product-button" onClick = {() => setModaleVisible(true)}>Create Product</button>
                <button className="create-product-button"  onClick ={logoutHandler}>Logout</button>
                

                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                            <tbody>
                            {products.map((product) =>
                            <tr>
                                <td>{product.name}</td>
                                <td>{product.size}</td>
                                <td>{product.price}</td>
                                <td>{product.countInStock}</td>
                                <td><button className="actions-button" onClick={()=> editProduct(product)}>edit</button> | <button onClick ={() => deleteHandler( product._id)} className="actions-button">delete</button></td>
                            </tr>
                            )}
                            </tbody>
                </Table>
              
                <PhotosList/>
                </div>
            }
        
      </div>
        :'You are not authorized to view this page'
        
        }
    </div>
    )
}
