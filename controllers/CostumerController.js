const { sequelize, Costumer } = require("./../models");
const router = require("express").Router();
const { validate, Joi } = require('express-validation');

const basePath = "/costumer";

const postValidation = {
    body: Joi.object({
        name: Joi.string().required(),
        contact: Joi.string(),
        location: Joi.string()
    }),
};

const putValidation = {
    body: Joi.object({
        name: Joi.string(),
        contact: Joi.string(),
        location: Joi.string()
    }),
};

class CostumerController {
    static get = async (req, res) => {
        const costumers = await Costumer.findAll();
        const headers = ['id', 'name', 'contact', 'location'];
        return res.status(200).json({ costumers, headers });
    }

    static getOne = async (req, res) => {
        const { id } = req.params;
        const costumer = await Costumer.findOne({
            where: { id }
        });
        if (!costumer) res.status(401).json({ id, message: "ID not found" });
        return res.status(200).json(costumer);
    }

    static post = async (req, res) => {
        const { name, contact, location } = req.body;
        const costumer = await Costumer.create({ name, contact, location });
        return res.status(200).json(costumer);
    }

    static put = async (req, res) => {
        const { id } = req.params;
        const { name, contact, location } = req.body;
        const costumer = await Costumer.findOne({
            where: { id }
        });
        if (!costumer) res.status(401).json({ id, message: "ID not found" });
        const update = await costumer.update({ name, contact, location });
        return res.status(200).json(update);
    }

    static delete = async (req, res) => {
        const { id } = req.params;
        const costumer = await Costumer.findOne({
            where: { id }
        });
        if (!costumer) res.status(401).json({ id, message: "ID not found" });
        const destroy = await costumer.destroy();
        return res.status(200).json(destroy);
    }
}

module.exports = (() => {
    router.get(basePath, CostumerController.get);
    router.get(`${basePath}/:id`, CostumerController.getOne);
    router.post(basePath, validate(postValidation), CostumerController.post);
    router.put(`${basePath}/:id`, validate(putValidation), CostumerController.put);
    router.delete(`${basePath}/:id`, CostumerController.delete);

    return router;
})();
