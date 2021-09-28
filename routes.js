const router = require("express").Router();
const CostumerController = require("./controllers/CostumerController");
const EmployeeController = require("./controllers/EmployeeController");
const LeaseController = require("./controllers/LeaseController");
const LeaseObjectController = require("./controllers/LeaseObjectController");
const MaterialController = require("./controllers/MaterialController");

module.exports = () => {
    router.use(EmployeeController)
    router.use(CostumerController);
    router.use(LeaseController);
    router.use(LeaseObjectController);
    router.use(MaterialController);
    return router;
};