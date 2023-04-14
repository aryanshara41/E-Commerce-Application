import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetails } from '../services/actions/productAction';
import { Row, Col, Button, Image, ListGroup, ListGroupItem, Dropdown, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Reviews from '../components/Reviews';
import axios from 'axios';

const ProductDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewComment, setReviewComment] = useState('');
    const navigate = useNavigate();

    const details = useSelector(state => state.productDetail);
    const { loading, productDetail } = details;

    useEffect(() => {
        dispatch(getProductDetails(params.id));
    }, []);

    console.log(productDetail);

    const AddToCart = async () => {

        // if the user is not logged in then
        if (localStorage.getItem('token')) {
            const data = await axios.post('/api/cart/add', {
                productId: productDetail._id,
                qty: qty,
                price: productDetail.price,
                image: productDetail.image,
                productName: productDetail.name
            }, {
                headers: {
                    authtoken: `${localStorage.getItem('token')}`
                }
            });

            console.log(data);
        }
        else navigate('/login');
    }

    const AddReview = async () => {
        console.log(localStorage.getItem('token'));
        const data = await axios.post('/api/product/review', {
            productId: `${params.id}`,
            rating: `${reviewRating}`,
            comment: `${reviewComment}`
        }, {
            headers: {
                authtoken: `${localStorage.getItem('token')}`
            }
        });

        console.log(data);
        setReviewComment('');
        setReviewRating(0);

        window.location.reload();
    }

    return (
        <>
            {
                loading ? <h1>The product is loading</h1> :
                    <>
                        <Row className='my-3'>
                            <Col style={{ height: '100%', marginRight: '2rem' }} md={4} >
                                <Image src={productDetail.image} alt="Description" height="450rem" rounded fluid />
                            </Col>

                            <Col md={4}>
                                <ListGroup variant='flush'>
                                    <ListGroupItem style={{ textAlign: 'center' }}> <h1>{productDetail.name}</h1></ListGroupItem>
                                    <ListGroupItem style={{ textAlign: 'center' }}>  <Rating /> </ListGroupItem>
                                    <ListGroupItem style={{ textAlign: 'justify' }}>{productDetail.description} </ListGroupItem>
                                </ListGroup>
                            </Col>

                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroupItem style={{ textAlign: 'center' }}><h5>Add to cart</h5></ListGroupItem>
                                    <ListGroupItem className='flex'>
                                        <label>Item Count:</label>
                                        <Form.Select size="sm" as='label'>
                                            <option onClick={(e) => setQty(e.target.value)} value="1">1</option>
                                            <option onClick={(e) => setQty(e.target.value)} value="2">2</option>
                                            <option onClick={(e) => setQty(e.target.value)} value="3">3</option>
                                            <option onClick={(e) => setQty(e.target.value)} value="4">4</option>
                                        </Form.Select>
                                    </ListGroupItem>
                                    <ListGroupItem style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                                        <Button variant="outline-success" onClick={AddToCart} >Add to Cart</Button>
                                    </ListGroupItem>
                                </ListGroup>

                                <Col className='my-5' style={{ textAlign: 'center' }}>
                                    <h5>Add your Reviews</h5>
                                    <span>
                                        Rating : <span style={{ marginLeft: '3px' }}>
                                            <select name="rating" id="rating">
                                                <option value="1" onClick={(e) => setReviewRating(e.target.value)}>1</option>
                                                <option value="2" onClick={(e) => setReviewRating(e.target.value)}>2</option>
                                                <option value="3" onClick={(e) => setReviewRating(e.target.value)}>3</option>
                                                <option value="4" onClick={(e) => setReviewRating(e.target.value)}>4</option>
                                                <option value="5" onClick={(e) => setReviewRating(e.target.value)}>5</option>
                                            </select>
                                        </span>
                                    </span>
                                    <br />
                                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center' }}>
                                        <span style={{ margin: '5px' }}>Comment:</span>

                                        <textarea rows="3" cols="10" placeholder='Write your comment' value={reviewComment} style={{ borderRadius: '1rem' }}
                                            onChange={(e) => setReviewComment(e.target.value)}
                                        >
                                        </textarea>
                                        <span style={{ margin: '1rem' }}><Button variant="outline-success" style={{ width: '6rem' }} onClick={AddReview}>Post</Button></span>
                                    </div>
                                </Col>

                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <h4>Reviews</h4>
                            {
                                productDetail.reviews.map((id) => {
                                    return <Reviews productId={id} key={id} />
                                })
                            }
                        </Row>

                    </>
            }
        </>
    )
}

export default ProductDetails