import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceorderScreen(props) {

    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }

    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;

    const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12

    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.price, 0)
    );

    const ship = 0.20 * cart.itemsPrice;

    cart.shippingPrice = cart.itemsPrice > 50 ? toPrice(0) : toPrice(ship);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const dispatch = useDispatch();

    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };

    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success]);

    return (

        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

            <div className="row top">
                <div className="col-2">
                    <ul>

                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {cart.shippingDetails.fullName} <br />
                                    <strong>Owner: </strong> {cart.shippingDetails.owner} <br />
                                    <strong>City: </strong> {cart.shippingDetails.city}
                                </p>
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {cart.cartItems.map((item) => (
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
                                <div>{cart.cartItems.length}</div>
                                </div>
                            </li>

                            <li>
                                <div className="row">
                                <div>Shipping</div>
                                <div>Rs. {cart.shippingPrice} Crores</div>
                                </div>
                            </li>

                            <li>
                                <div className="row">
                                <div>Tax</div>
                                <div>Rs. {cart.taxPrice} Crores</div>
                                </div>
                            </li>

                            <li>
                                <div className="row">
                                    <div>
                                        <strong> Order Total</strong>
                                    </div>
                                    <div>
                                        <strong>Rs. {cart.totalPrice.toFixed(2)} Crores</strong>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <button
                                    type="button"
                                    onClick={placeOrderHandler}
                                    className="primary block"
                                    disabled={cart.cartItems.length === 0}
                                >
                                    Place Order
                                </button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
