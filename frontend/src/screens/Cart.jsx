import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCartItemsAction } from '../services/actions/getCartItemsAction';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

var items = [];
var totalcost = 0;
const Cart = () => {

  const [cost, setCost] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.orderList);

  useEffect(() => {
    dispatch(getCartItemsAction());
  }, [dispatch])

  const { loading, orderList } = cart;

  const notify = () => toast("Please select the items");
  const addItem = (event) => {
    console.log(event.target.value);
    const t = parseInt(event.target.value, 10);
    if (event.target.checked) {
      items = [...items, event.target.id];
      totalcost += t;
    }
    else {
      totalcost -= t;

      items = items.filter((item) => {
        return item !== event.target.id;
      })
    }

    setCost(totalcost);
    console.log(totalcost);
    console.log(items);
  };

  // send the ordered products to api
  // disptch the orders;

  const deliverOrders = async () => {

    if (items.length == 0) {
      notify();
      return;
    }

    const data = await axios.post('/api/cart/remove', {
      orders: items
    }, {
      headers: {
        authtoken: `${localStorage.getItem('token')}`
      }
    });

    console.log(data);

    window.location.reload();
  }

  console.log(orderList);
  return (
    <>
      <ToastContainer />
      <Row>
        <Col md={8}>
          {
            orderList.map((product) => {
              return <Col>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '3rem' }}>
                  <input // prettier-ignore
                    type='checkbox'
                    id={product.productId}
                    key = {product.productId}
                    style={{ marginRight: '1rem' }}
                    value={product.price * product.qty}
                    onChange={addItem}
                  />
                  <Card style={{ display: 'flex', flexDirection: 'row', maxHeight: 'max-content' }}>
                    <Card.Img variant="top" src={product.image} style={{ height: 'inherit', flex: '1', objectFit: 'fit' }} />
                    <Card.Body style={{ flex: '3' }}>
                      <Card.Title style={{ textAlign: 'center' }}>{product.productName}</Card.Title>
                      <Card.Text style={{ textAlign: 'center' }}>
                        <span>Price: $ {product.price}</span>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <span>Order Count : {product.qty}</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </span>
              </Col>
            })
          }
        </Col>

        <Col md={4} style={{ marginTop: '3rem' }}>
          <Row>
            TotalCost : {cost}
          </Row>
          <Button variant="success" onClick={deliverOrders}>Order Now</Button>{' '}
        </Col>
      </Row>
    </>
  )
}

export default Cart