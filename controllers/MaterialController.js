const { sequelize, Material } = require("./../models");
const router = require("express").Router();
const { validate, Joi } = require('express-validation');

const basePath = "/material";

const postValidation = {
    body: Joi.object({
        name: Joi.string()
            .required(),
        description: Joi.string(),
        quantity: Joi.number()
    }),
};

const putValidation = {
    body: Joi.object({
        name: Joi.string(),
        description: Joi.string(),
        quantity: Joi.number()
    }),
}

class MaterialController {

    /**
     * @swagger
     * 
     * /material:
     *   get:
     *     tags: [Materials]
     *     summary: Get all materials.
     *     responses:
     *       200:
     *         description: Success.
     */
    static get = async (req, res) => {
        const materials = await Material.findAll();
        return res.status(200).json({ materials, headers: ['id', 'name', 'description', 'quantity'] });
    }

    /**
     * @swagger
     * 
     * /material/{id}:
     *   get:
     *     tags: [Materials]
     *     summary: Get one material by his id.
     *     parameters:
     *       - name: id
     *         description: Id of the material.
     *         in: path
     *         type: integer
     *         required: true
     *     responses:
     *       200:
     *         description: Success
     */
    static getOne = async (req, res) => {
        const { id } = req.params;
        const material = await Material.findOne({
            where: { id }
        });
        if (!material) res.status(401).json({ id, message: "ID not found" });
        return res.status(200).json(material);
    }

    /**
     * @swagger
     * 
     * /material:
     *   post:
     *     tags: [Materials]
     *     summary: Create a material object.
     *     consumes:
     *       - application/json
     *     parameters:
     *       - name: material
     *         description: The material to create.
     *         in: body
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - name
     *               description
     *               quantity
     *           properties:
     *             name:
     *               type: string
     *               example: teste
     *             description:
     *               type: string
     *               example: descrição de teste
     *             quantity:
     *               type: integer
     *               example: 32
     *     responses:
     *       200:
     *         description: Success
     */
    static post = async (req, res) => {
        const { name, description, quantity } = req.body;
        const material = await Material.create({ name, description, quantity });
        return res.status(200).json(material);
    }

    /**
     * @swagger
     * 
     * /material/{id}:
     *   put:
     *     tags: [Materials]
     *     summary: Update a material object.
     *     consumes:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Id of the material.
     *         in: path
     *         type: integer
     *         required: true
     *       - name: material
     *         description: The material to update.
     *         in: body
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             name:
     *               type: string
     *             description:
     *               type: string
     *             quantity:
     *               type: integer
     *     responses:
     *       200:
     *         description: Success
     *       401:
     *         description: Invalid id
     */
    static put = async (req, res) => {
        const { id } = req.params;
        const { name, description, quantity } = req.body;
        const material = await Material.findOne({
            where: { id }
        });
        if (!material) res.status(401).json({ id, message: "ID not found" });
        const update = await material.update({ name, description, quantity });
        return res.status(200).json(update);
    }

    /**
     * @swagger
     * 
     * /material/{id}:
     *   delete:
     *     tags: [Materials]
     *     summary: Delete a material by his id.
     *     parameters:
     *       - name: id
     *         description: Id of the material.
     *         in: path
     *         type: integer
     *         required: true
     *     responses:
     *       200:
     *         description: Deleted
     *       401:
     *         description: Invalid id
     */
    static delete = async (req, res) => {
        const { id } = req.params;
        const material = await Material.findOne({
            where: { id }
        });
        if (!material) res.status(401).json({ id, message: "ID not found" });
        const destroy = await material.destroy();
        return res.status(200).json(destroy);
    }
}

module.exports = (() => {
    router.get(basePath, MaterialController.get);
    router.get(`${basePath}/:id`, MaterialController.getOne);
    router.post(basePath, validate(postValidation), MaterialController.post);
    router.put(`${basePath}/:id`, validate(putValidation), MaterialController.put);
    router.delete(`${basePath}/:id`, MaterialController.delete);

    return router;
})();
