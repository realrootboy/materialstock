const { sequelize, LeaseObject, Material, LeaseObjectMaterials } = require("./../models");
const router = require("express").Router();
const { validate, Joi } = require("express-validation");

const basePath = "/leaseobject";

const postValidation = {
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        materials: Joi.array(),
    }),
};

const putValidation = {
    body: Joi.object({
        name: Joi.string(),
        description: Joi.string(),
        materials: Joi.array(),
    }),
};

class LeaseObjectController {
    /**
     * @swagger
     * 
     * /leaseobject:
     *   get:
     *     tags: [LeaseObjects]
     *     summary: Get all lease objects.
     *     responses:
     *       200:
     *         description: Success.
     */
    static get = async (req, res) => {
        const leaseObjects = await LeaseObject.findAll({
            include: { model: Material, as: 'materials' }
        });
        const headers = ['id', 'name', 'description'];
        return res.status(200).json({ leaseObjects, headers });
    }

    /**
     * @swagger
     * 
     * /leaseobject/{id}:
     *   get:
     *     tags: [LeaseObjects]
     *     summary: Get one lease object by his id.
     *     parameters:
     *       - name: id
     *         description: Id of the lease objetct.
     *         in: path
     *         type: integer
     *         required: true
     *     responses:
     *       200:
     *         description: Success.
     */
    static getOne = async (req, res) => {
        const { id } = req.params;
        const leaseObject = await LeaseObject.findOne({
            where: { id },
            include: { model: Material, as: 'materials' }
        });
        if (!leaseObject) res.status(401).json({ id, message: "ID not found" });
        return res.status(200).json(leaseObject);
    }

    /**
     * @swagger
     * 
     * /leaseobject:
     *   post:
     *     tags: [LeaseObjects]
     *     summary: Create a lease object.
     *     consumes:
     *       - application/json
     *     parameters:
     *       - name: leaseObject
     *         description: The lease object to create.
     *         in: body
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - name
     *               description
     *               materials
     *           properties:
     *             name:
     *               type: string
     *               example: tendaa
     *             description:
     *               type: string
     *             materials:
     *               type: object
     *               example: [{id: 1,name: sample2,quantity: 5},{id: 2,name: sample2,quantity: 2}]
     *     responses:
     *       200:
     *         description: Success.
     */
    static post = async (req, res) => {
        const { name, description, materials } = req.body;
        let leaseObject = await LeaseObject.create({ name, description });
        let inserted_materials = [];
        if (materials)
            for (const material of materials) {
                const { id, quantity } = material;
                if (quantity) {
                    let inserted = await LeaseObjectMaterials.create({
                        LeaseObjectId: leaseObject.id, MaterialId: id, quantity
                    });
                    inserted.LeaseId = undefined;
                    inserted.updatedAt = undefined;
                    inserted.createdAt = undefined;
                    inserted_materials.push(inserted);
                }
            }

        return res.status(200).json({ leaseObject, materials: inserted_materials });
    }

    /**
     * @swagger
     * 
     * /leaseobject/{id}:
     *   put:
     *     tags: [LeaseObjects]
     *     summary: Update a lease object.
     *     consumes:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Id of the lease object.
     *         in: path
     *         type: integer
     *         required: true
     *       - name: leaseObject
     *         description: The lease object to update.
     *         in: body
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             name:
     *               type: string
     *               example: tenda
     *             description:
     *               type: string
     *             materials:
     *               type: object
     *               example: [{id: 2,name: sample2,quantity: 5}]
     *     responses:
     *       200:
     *         description: Success.
     *       401:
     *         description: Invalid id.
     */
    static put = async (req, res) => {
        const { id } = req.params;
        const { name, description, materials } = req.body;
        const leaseObject = await LeaseObject.findOne({
            where: { id }
        });
        if (!leaseObject) res.status(401).json({ id, message: "ID not found" });
        const update = await leaseObject.update({ name, description });
        let inserted_materials = []
        if (materials){
            await leaseObject.setMaterials([]);
            for (const material of materials) {
                const { id, quantity } = material;
                if (quantity) {
                    let inserted = await LeaseObjectMaterials.create({
                        LeaseObjectId: leaseObject.id, MaterialId: id, quantity
                    });
                    inserted.LeaseId = undefined;
                    inserted.updatedAt = undefined;
                    inserted.createdAt = undefined;
                    inserted_materials.push(inserted);
                }
            }
        }
        
        
        return res.status(200).json({ Updated: { LeaseObject: update, materials: inserted_materials } });
    }

    /**
     * @swagger
     * 
     * /leaseobject/{id}:
     *   delete:
     *     tags: [LeaseObjects]
     *     summary: Delete a lease object by his id.
     *     parameters:
     *       - name: id
     *         description: Id of the lease object.
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
        const leaseObject = await LeaseObject.findOne({
            where: { id }
        });
        if (!leaseObject) res.status(401).json({ id, message: "ID not found" });
        const destroy = await leaseObject.destroy();
        return res.status(200).json(destroy);
    }
}

module.exports = (() => {
    router.get(basePath, LeaseObjectController.get);
    router.get(`${basePath}/:id`, LeaseObjectController.getOne);
    router.post(basePath, validate(postValidation), LeaseObjectController.post);
    router.put(`${basePath}/:id`, validate(putValidation), LeaseObjectController.put);
    router.delete(`${basePath}/:id`, LeaseObjectController.delete);
    return router;
})();