import React from 'react';
import { Card, Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    return (
        <>
            <Card style={{ width: '16rem' }} className='my-3 rounded'>
                <Link to={`/product/${product._id}`}>
                    <Card.Img variant="top" src={product.image} style={{ height: '14rem', objectFit: 'fit' }} />
                </Link>

                <Card.Body>
                    <Link to='product/id' style={{ textDecoration: 'none', color: 'black' }} ><Card.Title>{product.name}</Card.Title></Link>
                    {/* <Card.Text> */}
                        <Row>
                            <Col>Price:</Col>
                            <Col>${product.price}</Col>
                        </Row>
                    {/* </Card.Text> */}
                </Card.Body>
            </Card></>
    )
}

export default Product