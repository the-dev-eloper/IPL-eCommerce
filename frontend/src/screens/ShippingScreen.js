import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingDetails } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingScreen(props) {

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart);
    const { shippingDetails } = cart;

    if (!userInfo) {
        props.history.push('/signin');
    }

    const [fullName, setFullName] = useState(shippingDetails.fullName);
    const [city, setCity] = useState(shippingDetails.city);
    const [owner, setOwner] = useState(shippingDetails.owner);
    const [coach, setCoach] = useState(shippingDetails.coach);
    const [country, setCountry] = useState(shippingDetails.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {

        e.preventDefault();

        dispatch(
            saveShippingDetails({ fullName, city, owner, coach, country })
        );
        props.history.push('/payment');
    };

    return (

        <div>

            <CheckoutSteps step1 step2></CheckoutSteps>

            <form className="form" onSubmit={submitHandler}>

                <div>
                    <h1>Shipping Address</h1>
                </div>

                <div>
                    <label htmlFor="fullName">Team Name</label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="Enter Full Name of Team"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    ></input>
                </div>

                <div>
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    ></input>
                </div>

                <div>
                    <label htmlFor="owner">Owner</label>
                    <input
                        type="text"
                        id="owner"
                        placeholder="Enter Owner name"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        required
                    ></input>
                </div>

                

                <div>
                    <label htmlFor="coach">Coach</label>
                    <input
                        type="text"
                        id="coach"
                        placeholder="Enter Coach name"
                        value={coach}
                        onChange={(e) => setCoach(e.target.value)}
                        required
                    ></input>
                </div>

                <div>
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        placeholder="Enter country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    ></input>
                </div>

                <div>
                    <label />
                    <button className="primary" type="submit">
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );
}
