import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReview } from '../services/actions/reviewAction';
import { Row } from 'react-bootstrap';
import axios from 'axios';
import dayjs from 'dayjs';

const Reviews = ({ productId }) => {
    console.log(productId)
    // const Review = useSelector(state => state.review);
    // const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [review, setReview] = useState({});

    useEffect(() => {
        // dispatch(getReview(productId.id))
        const getReviews = async () => {
            const { data } = await axios.get(`/api/review/${productId.id}`);
            console.log(data);
            setLoading(false);
            setReview(data);
        }

        getReviews();
    }, [productId])

    // const { loading, review } = Review;
    // console.log(review);

    return (
        <div>{
            loading ? <h1>Loading..</h1> :
                <Row>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <i className="fa-solid fa-user"></i> &nbsp;&nbsp;
                        <h6 style={{ margin: '0px' }}>{review.author}</h6>
                        <i style={{ fontSize: '0.8rem'}}> {dayjs(review.createdAt).format('DD/MM/YYYY HH:mm:ss')}</i>
                    </div>
                    <p style={{ marginLeft: '2rem' }}>
                        <i className="fa-solid fa-arrows-turn-right"></i>&nbsp;&nbsp;
                        {review.comment}
                    </p>
                </Row>
        }</div>
    )
}

export default Reviews