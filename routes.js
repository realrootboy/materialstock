const router = require("express").Router();
const MaterialController = require("./controllers/MaterialController");
const LeaseObjectController = require("./controllers/LeaseObjectController");

module.exports = () => {
    router.use(MaterialController);
    router.use(LeaseObjectController);
    return router;
};