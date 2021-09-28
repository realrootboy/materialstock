const router = require("express").Router();
const CostumerController = require("./controllers/CostumerController");
const EmployeeController = require("./controllers/EmployeeController");
const LeaseController = require("./controllers/LeaseController");
const LeaseObjectController = require("./controllers/LeaseObjectController");
const MaterialController = require("./controllers/MaterialController");
const {ValidationError} = require('express-validation');
module.exports = () => {
    
    router.use(EmployeeController)
    router.use(CostumerController);
    router.use(LeaseController);
    router.use(LeaseObjectController);
    router.use(MaterialController);

    router.use((err, req, res, next) => {
        if (err instanceof ValidationError) {
            return res.status(err.statusCode).json(err)
        }

        return res.status(500).json(err)
    });
    return router;
};