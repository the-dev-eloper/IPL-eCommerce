import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsPlayer, updatePlayer } from '../actions/playerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PLAYER_UPDATE_RESET } from '../constants/playerConstants';

export default function PlayerEditScreen(props) {

    const playerId = props.match.params.id;

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const [country, setCountry] = useState('');
    const [international, setInternational] = useState('');
    const [ranking, setRanking] = useState(0);
    const [description, setDescription] = useState('');
    const [soldTo, setSoldTo] = useState('');

    const playerDetails = useSelector((state) => state.playerDetails);
    const { loading, error, player } = playerDetails;

    const playerUpdate = useSelector((state) => state.playerUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate
    } = playerUpdate;

    const dispatch = useDispatch();

    useEffect(() => {

        if(successUpdate) {
            props.history.push('/playerlist');
        }

        if(!player || player._id !== playerId || successUpdate) {
            dispatch({ type: PLAYER_UPDATE_RESET });
            dispatch(detailsPlayer(playerId));
        } else {
            setName(player.name);
            setCategory(player.category);
            setImage(player.image);
            setPrice(player.price);
            setCountry(player.country);
            setInternational(player.international);
            setRanking(player.ranking);
            setDescription(player.description);
            setSoldTo(player.soldTo);
        }
    }, [player, dispatch, playerId, successUpdate, props.history]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updatePlayer({
                _id: playerId,
                name,
                category,
                image,
                price,
                country,
                international,
                ranking,
                description,
                soldTo
            })
        );
    };

    return (

        <div>
            <form className="form" onSubmit={submitHandler}>

                <div>
                    <h1>Edit Player {playerId}</h1>
                </div>

                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}

                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="category">Category</label>
                            <input
                                id="category"
                                type="text"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="image">Image</label>
                            <input
                                id="image"
                                type="text"
                                placeholder="Enter image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="price">Price</label>
                            <input
                                id="price"
                                type="text"
                                placeholder="Enter price(In Crores)"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="country">Country</label>
                            <input
                                id="country"
                                type="text"
                                placeholder="Enter country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="international">International</label>
                            <input
                                id="international"
                                type="text"
                                placeholder="Enter international"
                                value={international}
                                onChange={(e) => setInternational(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="ranking">Ranking</label>
                            <input
                                id="ranking"
                                type="number"
                                placeholder="Enter ranking"
                                value={ranking}
                                onChange={(e) => setRanking(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                rows="3"
                                type="text"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="soldTo">Sold To</label>
                            <input
                                id="soldTo"
                                type="text"
                                placeholder="Enter soldTo"
                                value={soldTo}
                                onChange={(e) => setSoldTo(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label></label>
                            <button className="primary" type="submit">
                                Update
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}
