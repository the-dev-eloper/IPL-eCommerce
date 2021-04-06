import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Player from '../models/playerModel.js';
import { isAuth, isAdmin } from '../utils.js';

const playerRouter = express.Router();

playerRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
      const players = await Player.find({});
      res.send(players);
    })
);

playerRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        // await User.remove({});
        const createdPlayers = await Player.insertMany(data.players);
        res.send({ createdPlayers });
    })
);

playerRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const player = await Player.findById(req.params.id);
        if (player) {
            res.send(player);
        } else {
            res.status(404).send({ message: 'Player Not Found' });
        }
    })
);

playerRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {

        const player = new Player({
            name: 'sample name ' + Date.now(),
            category: 'sample category',
            image: '/images/p1.jpg',
            price: 0,
            country: 'sample country',
            international: 'sample international',
            ranking: 0,
            description: 'sample description',
            soldTo: 'sample soldto',
        });

        const createdPlayer = await player.save();
        res.send({ message: 'Player Created', player: createdPlayer });
    })
);

playerRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {

        const playerId = req.params.id;

        const player = await Player.findById(playerId);
        if(player) {
            player.name = req.body.name;
            player.category = req.body.category;
            player.image = req.body.image;
            player.price = req.body.price;
            player.country = req.body.country;
            player.international = req.body.international;
            player.ranking = req.body.ranking;
            player.description = req.body.description;
            player.soldTo = req.body.soldTo;

            const updatedPlayer = await player.save();
            res.send({ message: 'Player Updated', player: updatedPlayer });
        } else {
            res.status(404).send({ message: 'Player Not Found' });
        }
    })
);

playerRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {

        const playerId = req.params.id;
        const player = await Player.findById(playerId);

        if(player) {
            const deletePlayer = await player.remove();
            res.send({ message: 'Player Deleted', player: deletePlayer });
        } else {
            res.status(404).send({ message: 'Player Not Found' });
        }
    })
);

export default playerRouter;