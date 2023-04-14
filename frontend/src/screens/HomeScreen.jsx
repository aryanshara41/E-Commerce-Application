import React, { createContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../services/actions/productAction';
import Product from '../components/Product';
import { Col, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const tokenContext = createContext();

const HomeScreen = () => {

    console.log("Entered the homescreen");

    const notify = () => toast("Welcome to Shubham's shop");

    const dispatch = useDispatch();
    const productList = useSelector(state => state.products);

    const { loading, products } = productList;

    useEffect(() => {
        notify();
        dispatch(getProducts());
    }, [])

    return (
        <div>
            <Row>
                <ToastContainer />
                {/* <Product/> */}
                {
                    products.map((product) => {
                        return <Col className='flex' key={product._id}> <Product product={product} /></Col>
                    })
                }
            </Row >
        </div>
    )
}

export default HomeScreen