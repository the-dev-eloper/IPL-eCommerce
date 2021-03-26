import React from 'react'
import { Link } from 'react-router-dom';

export default function PlayerComponent(props) {

    const { player } = props;

    return (
        <div>

            <div key={player._id} class="card">

                <Link to={`/player/${player._id}`}>
                    <img class="medium" src={player.image} alt="player1" />
                </Link>

                <div class="card-body">

                    <Link to={`/player/${player._id}`}>
                        <h2>{player.name}</h2>
                    </Link>

                    <div class="profile">
                        <h2>{player.category}</h2>
                        <h3>{player.country}</h3>
                    </div>

                    <div class="price">
                        <h2>Rs. {player.price} Crores</h2>
                    </div>
                </div>
            </div>       
        </div>
    );
}
