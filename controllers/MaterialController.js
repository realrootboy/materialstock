const { sequelize, Material } = require("./../models");
const router = require("express").Router();

const basePath = "/material";

class MaterialController {

    static get = async (req, res) => {
        const materials = await Material.findAll();
        return res.status(200).json(materials);
    }

    static post = async (req, res) => {
        const { name, description } = req.body;
        const material = await Material.create({ name, description });
        return res.status(200).json(material);
    }

    static put = async (req, res) => {
        const { id } = req.params;
        const { name, description } = req.body;
        const material = await Material.findOne({
            where: { id }
        });
        if (!material) res.status(401).json({ id, message: "ID not found" });
        const update = await material.update({ name, description });
        return res.status(200).json(update);
    }

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
    router.post(basePath, MaterialController.post);
    router.put(`${basePath}/:id`, MaterialController.put);
    router.delete(`${basePath}/:id`, MaterialController.delete);
    return router;
})();
