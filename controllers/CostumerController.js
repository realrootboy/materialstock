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
    /**
     * @swagger
     * /costumer:
     *   get:
     *     tags: [Costumers]
     *     summary: Get all costumers.
     *     responses:
     *       200:
     *         description: Success.
     */
    static get = async (req, res) => {
        const costumers = await Costumer.findAll();
        const headers = ['id', 'name', 'contact', 'location'];
        return res.status(200).json({ costumers, headers });
    }

    /**
     * @swagger
     * 
     * /costumer/{id}:
     *   get:
     *     tags: [Costumers]
     *     summary: Get one costumer by his id.
     *     parameters:
     *       - name: id
     *         description: Id of the costumer.
     *         in: path
     *         type: integer
     *         required: true
     *     responses:
     *       200:
     *         description: Success.
     *       401:
     *         description: Invalid id.
     */
    static getOne = async (req, res) => {
        const { id } = req.params;
        const costumer = await Costumer.findOne({
            where: { id }
        });
        if (!costumer) res.status(401).json({ id, message: "ID not found" });
        return res.status(200).json(costumer);
    }

    /**
     * @swagger
     * 
     * /costumer:
     *   post:
     *     tags: [Costumers]
     *     summary: Creates a new user.
     *     consumes:
     *       - application/json
     *     parameters:
     *       - name: costumer
     *         description: The costumer to create.
     *         in: body
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - name
     *               contact
     *           properties:
     *             name:
     *               type: string
     *               example: joaquim
     *             contact:
     *               type: string
     *               example: (27) 99696-9797
     *             location:
     *               type: string  
     *               example: Pico da neblina
     *     responses:
     *       200:
     *         description: Success.
     */
    static post = async (req, res) => {
        const { name, contact, location } = req.body;
        const costumer = await Costumer.create({ name, contact, location });
        return res.status(200).json(costumer);
    }

    /**
     * @swagger
     * 
     * /costumer/{id}:
     *   put:
     *     tags: [Costumers]
     *     summary: Update a user.
     *     consumes:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Id of the costumer.
     *         in: path
     *         type: integer
     *         required: true
     *       - name: costumer
     *         description: the costumer to update.
     *         in: body
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             name:
     *               type: string
     *               example: joaquim
     *             contact:
     *               type: string
     *               example: (27) 99494-9898
     *             location:
     *               type: string
     *               example: Morro do moreno
     *     responses:
     *       200:
     *         description: Updated.
     *       401:
     *         description: Invalid id.
     */
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

    /**
     * @swagger
     * 
     * /costumer/{id}:
     *   delete:
     *     tags: [Costumers]
     *     summary: Delete a costumer by his id.
     *     parameters:
     *       - name: id
     *         description: Id of the costumer.
     *         in: path
     *         type: integer
     *         required: true
     *     responses:
     *       200:
     *         description: Deleted.
     *       401:
     *         description: Invalid id.
     */
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
