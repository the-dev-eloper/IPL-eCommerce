import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderScreen(props) {

    const orderId = props.match.params.id;

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsOrder(orderId));
    }, [dispatch, orderId]);

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox></MessageBox>
    ) : (

        <div>
            <h1>Order {order._id}</h1>

            <div className="row top">
                <div className="col-2">

                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>

                                <p>
                                    <strong>Name:</strong> {order.shippingDetails.fullName} <br /> 
                                    <strong>City: </strong> {order.shippingDetails.city} <br />

                                    <strong>Owner: </strong> {order.shippingDetails.owner} <br />
                                    <strong>Coach: </strong> {order.shippingDetails.coach} <br />
                                </p>

                                {order.isDelivered ? (
                                    <MessageBox variant="success">
                                        Delivered at {order.deliveredAt}
                                    </MessageBox>
                                ) : (
                                    <MessageBox variant="danger">Not Delivered</MessageBox>
                                )}
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {order.paymentMethod}
                                </p>

                                {order.isPaid ? (
                                    <MessageBox variant="success">
                                        Paid at {order.paidAt}
                                    </MessageBox>
                                ) : (
                                    <MessageBox variant="danger">Not Paid</MessageBox>
                                )}
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {order.orderItems.map((item) => (
                                        <li key={item.product}>
                                            <div className="row">
                                                <div>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="small"
                                                    ></img>
                                                </div>

                                                <div className="min-30">
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </div>

                                                <div>
                                                    Rs. {item.price} Crores
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>

                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>{order.orderItems.length}</div>
                                </div>
                            </li>

                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>Rs. {order.shippingPrice} Crores</div>
                                </div>
                            </li>

                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>Rs. {order.taxPrice} Crores</div>
                                </div>
                            </li>

                            <li>
                                <div className="row">
                                    <div>
                                        <strong> Order Total</strong>
                                    </div>
                                    <div>
                                        <strong>Rs. {order.totalPrice} Crores</strong>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
