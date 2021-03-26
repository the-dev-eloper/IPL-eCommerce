import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addtoCart, removefromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {

    const playerId = props.match.params.id;

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if(playerId) {
            dispatch(addtoCart(playerId));
        }
    }, [dispatch, playerId]);

    const removeFromCartHandler = (id) => {
        dispatch(removefromCart(id));
    };

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping'); 
    };

    return (

        <div className="row top">
            <div className="col-2">

                <h1>Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <MessageBox>
                        Cart is empty. <Link to="/">Go Shopping</Link>
                    </MessageBox>
                ) : (
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.player}>

                                <div className="row">
                                    <div>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="small"
                                        />
                                    </div>

                                    <div className="min-30">
                                        <Link to={`/player/${item.player}`}>{item.name}</Link>
                                    </div>

                                    <div>Rs. {item.price} Crores</div>

                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => removeFromCartHandler(item.player)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="col-1">

                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartItems.length} Players) :
                                Rs. {cartItems.reduce((a, c) => a + c.price, 0)} Crores
                            </h2>
                        </li>

                        <li>
                            <button
                                type="button"
                                onClick={checkoutHandler}
                                className="primary block"
                                disabled={cartItems.length === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}