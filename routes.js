const router = require("express").Router();

module.exports = () => {
    router.get('/', (req, res) => { return res.status(200).json({})})


    
    return router;
};