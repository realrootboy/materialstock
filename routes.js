const router = require("express").Router();
const MaterialController = require("./controllers/MaterialController");

module.exports = () => {

    router.use(MaterialController);
    
    return router;
};