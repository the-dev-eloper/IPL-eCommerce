import React, { useEffect } from 'react'

import PlayerComponent from '../components/PlayerComponent'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listPlayers } from '../actions/playerActions';

export default function HomeScreen() {

    const dispatch = useDispatch();
    const playerList = useSelector((state) => state.playerList)
    const { players, loading, error } = playerList;

    useEffect(() => {
        dispatch(listPlayers());
    }, [dispatch]);

    return (

        <div>
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ): (
                <div class="row center">
                    {players.map((player) => (
                        <PlayerComponent key={player._id} player={player}></PlayerComponent>
                    ))}
                </div>
            )}
        </div>
    );
}
