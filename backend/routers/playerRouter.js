import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Player from '../models/playerModel.js';

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

export default playerRouter;