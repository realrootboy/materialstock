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
    static get = async (req, res) => {
        const leaseObjects = await LeaseObject.findAll({
            include: { model: Material, as: 'materials' }
        });
        const headers = ['id', 'name', 'description'];
        return res.status(200).json({ leaseObjects, headers });
    }

    static getOne = async (req, res) => {
        const { id } = req.params;
        const leaseObject = await LeaseObject.findOne({
            where: { id },
            include: { model: Material, as: 'materials' }
        });
        if (!leaseObject) res.status(401).json({ id, message: "ID not found" });
        return res.status(200).json(leaseObject);
    }

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