import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsPlayer } from '../actions/playerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlayerScreen(props) {

    const dispatch = useDispatch();
    const playerId = props.match.params.id;
    const playerDetails = useSelector((state) => state.playerDetails);
    const { loading, error, player } = playerDetails;

    const cartHandler = () => {
        props.history.push(`/cart/${playerId}`)
    }

    useEffect(() => {
       dispatch(detailsPlayer(playerId))
    }, [dispatch, playerId])

    return (

        <div>
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (

                <div>

                    <Link to="/">Back to result</Link>

                    <div className="row top">

                        <div className="col-2">
                            <img className="large" src={player.image} alt={player.name}></img>
                        </div>

                        <div className="col-1">
                            <ul>
                                <li>
                                    <h1>{player.name}</h1>
                                </li>
                                <li>Category: {player.category}</li>
                                <li>Pirce : Rs. {player.price} Crores</li>
                                <li>Country: {player.country}</li>
                                <li>International: {player.international}</li>
                                <li>Ranking: {player.ranking}</li>
                                <li>Description: {player.description}</li>
                            </ul>
                        </div>

                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <div className="row">
                                            <div>Price</div>
                                            <div className="price">Rs. {player.price} Crores </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Status</div>
                                                <div>
                                                    {player.soldTo === 'Yet to buy' ? (
                                                        <span className="success">In Stock</span>
                                                    ) : (
                                                        <span className="error">
                                                            Sold to {player.soldTo}
                                                        </span>
                                                    )}
                                            </div>
                                        </div>
                                    </li>
                                    {player.soldTo === 'Yet to buy' && (
                                        <>
                                            <li>
                                                <button
                                                    className="primary block"
                                                    onClick={cartHandler}
                                                >
                                                    Add to Cart
                                                </button>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
