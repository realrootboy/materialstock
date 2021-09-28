const { sequelize, LeaseObject, Material } = require("./../models");
const router = require("express").Router();

const basePath = "/leaseobject";

class LeaseObjectController {
    static get = async (req, res) => {
        const leaseObjects = await LeaseObject.findAll();
        return res.status(200).json(leaseObjects);
    }

    static post = async (req, res) => {
        const { name, description, materials } = req.body;
        let leaseObject = await LeaseObject.create({ name, description });
        if (materials && materials.length)
            await leaseObject.setMaterials(materials.map(el => el.id));
        return res.status(200).json({ leaseObject, materials });
    }

    static put = async (req, res) => {
        const { id } = req.params;
        const { name, description, materials } = req.body;
        const leaseObject = await LeaseObject.findOne({
            where: { id }
        });
        if (!leaseObject) res.status(401).json({ id, message: "ID not found" });
        const update = await leaseObject.update({ name, description });
        if (materials && materials.length)
            await leaseObject.setMaterials(materials.map(el => el.id));
        return res.status(200).json({ Updated: { LeaseObject: update, materials } });
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
    router.post(basePath, LeaseObjectController.post);
    router.put(`${basePath}/:id`, LeaseObjectController.put);
    router.delete(`${basePath}/:id`, LeaseObjectController.delete);
    return router;
})();