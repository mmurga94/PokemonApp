const { Router } = require('express');
const { Type } = require('./../db');
const typeRouter = Router();
const { getTypes } = require('./controllers/controllers')


typeRouter.get('/', async (req, res) => {
    try {
        const types = await getTypes();
        res.status(200).json(types)
    } catch (error) {
        res.status(400).json(error.message);
    }
})

module.exports = typeRouter;