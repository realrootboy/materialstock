const {sequelize, Costumer} = require("./../models");
const router = require("express").Router();

const basePath = "/costumer";

class CostumerController {
    static get = async(req, res) => {
        const costumers = await Costumer.findAll();
        return res.status(200).json(costumers);
    }

    static post = async (req, res) => {
        const { name, contact, location } = req.body;
        const costumer = await Costumer.create({name, contact, location});
        return res.status(200).json(costumer);
    }

    static put = async (req, res) => {
        const { id } = req.params;
        const { name, contact, location } = req.body;
        const costumer = await Costumer.findOne({
            where: {id}
        });
        if(!costumer) res.status(401).json({id, message: "ID not found"});
        const update = await costumer.update({ name, contact, location});
        return res.status(200).json(update);
    }

    static delete = async (req, res) => {
        const {id} = req.params;
        const costumer = await Costumer.findOne({
            where: {id}
        });
        if(!costumer) res.status(401).json({id, message: "ID not found"});
        const destroy = await costumer.destroy();
        return res.status(200).json(destroy);
    }
}

module.exports = (()=>{
    router.get(basePath, CostumerController.get);
    router.post(basePath, CostumerController.post);
    router.put(`${basePath}/:id`, CostumerController.put);
    router.delete(`${basePath}/:id`, CostumerController.delete);
    return router;
})();
