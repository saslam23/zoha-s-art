import React, {useState, useEffect} from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import ArtWorkCard from '../cards/ArtWorkCard';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';




const artWorkList = (item) =>{
    return(
    <ArtWorkCard
        key={item._id}
        id={item._id}
        name={item.name}
        size={item.size}
        image={item.image}
        price={item.price}
        />
    )

  }




export default function ArtWorkScreen() {
const productList = useSelector(state => state.productList)
const {loading, products, error} = productList;
const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts());
        return () => {
        }
    }, [])

    return (
            loading ? <div>Loading...</div> : error ? <div>{error}</div> :
               <div className="page-container-control">
                   <h1 style={{textAlign:'center', paddingBottom:'7rem'}}>MY ART</h1>
             <Container fluid>
                 <Row>
                     {products.map(artWorkList)}
                 </Row>
             </Container>
             </div>
            
     
    )
}
