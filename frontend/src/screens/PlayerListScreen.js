import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPlayer, deletePlayer, listPlayers } from '../actions/playerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PLAYER_CREATE_RESET, PLAYER_DELETE_RESET } from '../constants/playerConstants';

export default function PlayerListScreen(props) {

    const playerList = useSelector((state) => state.playerList);
    const { loading, error, players } = playerList;

    const playerCreate = useSelector((state) => state.playerCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        player: createdPlayer,
    } = playerCreate;

    const playerDelete = useSelector((state) => state.playerDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = playerDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if(successCreate) {
            dispatch({ type: PLAYER_CREATE_RESET });
            props.history.push(`/player/${createdPlayer._id}/edit`);
        }

        if(successDelete) {
            dispatch({ type: PLAYER_DELETE_RESET });
        }
        dispatch(listPlayers());
    }, [createdPlayer, dispatch, props.history, successCreate, successDelete]);

    const createHandler = () => {
        dispatch(createPlayer());
    };

    const deleteHandler = (player) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deletePlayer(player._id));
        }
    };

    return (
        <div>
            <div className="row">
                <h1>Players</h1>

                <button type="button" className="primary" onClick={createHandler}>
                    Create Player
                </button>
            </div>

            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox></MessageBox>
            ) : (
                <table className="table">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>COUNTRY</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {players.map((player) => (
                            <tr key={player._id}>

                                <td>{player._id}</td>
                                <td>{player.name}</td>
                                <td>{player.price} Crores</td>
                                <td>{player.category}</td>
                                <td>{player.country}</td>

                                <td>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() =>
                                        props.history.push(`/player/${player._id}/edit`)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => deleteHandler(player)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            )}
        </div>
    )
}
