const {
    sequelize,
    Lease,
    Costumer,
    LeaseMaterials,
    LeaseEmployees
} = require("./../models");

const router = require("express").Router();
const { validate, Joi } = require("express-validation");

const basePath = "/lease";

const postValidation = {
    body: Joi.object({
        location: Joi.string().required(),
        mountDay: Joi.date(),
        unmountDay: Joi.date(),
        leaseTime: Joi.date(),
        employees: Joi.array(),
        materials: Joi.array(),
        costumer: Joi.object().required(),
    }),
};

const putValidation = {
    body: Joi.object({
        location: Joi.string(),
        mountDay: Joi.date(),
        unmountDay: Joi.date(),
        leaseTime: Joi.date(),
        employees: Joi.array(),
        materials: Joi.array(),
        costumer: Joi.object(),
    }),
};

class LeaseController {
    static get = async (req, res) => {
        const leases = await Lease.findAll();
        return res.status(200).json(leases);
    }

    static post = async (req, res) => {
        const { location, mountDay, unmountDay, leaseTime, employees, costumer, materials } = req.body;
        let lease = await Lease.create({ location, mountDay, unmountDay, leaseTime });
        if (employees)
            for (const employee of employees) {
                const { id, action } = employee;
                await LeaseEmployees.create({ LeaseId: lease.id, EmployeeId: id, action });
            }
        await lease.setEmployees(employees.map(el => el.id));
        if (costumer) {
            const c = await Costumer.findOne({
                where: { id: costumer.id }
            });
            if (c)
                await lease.setCostumer(c);
        }
        let inserted_materials = []
        if (materials)
            for (const material of materials) {
                const { id, quantity } = material;
                if (quantity) {
                    let inserted = await LeaseMaterials.create({ LeaseId: lease.id, MaterialId: id, quantity });
                    inserted.LeaseId = undefined;
                    inserted.updatedAt = undefined;
                    inserted.createdAt = undefined;
                    inserted_materials.push(inserted);
                }
            }

        return res.status(200).json({ lease, employees, costumer, materials: inserted_materials });
    }

    static put = async (req, res) => {
        const { id } = req.params;
        const { location, mountDay, unmountDay, leaseTime, employees, costumer, materials } = req.body;
        const lease = await Lease.findOne({
            where: { id }
        });
        if (!lease) res.status(401).json({ id, message: "ID not found" });
        const update = await lease.update({ location, mountDay, unmountDay, leaseTime });
        await lease.setEmployees([]);
        if (employees)
            for (const employee of employees) {
                const { id, action } = employee;
                await LeaseEmployees.create({ LeaseId: lease.id, EmployeeId: id, action });
            }
        if (costumer) {
            const c = await Costumer.findOne({
                where: { id: costumer.id }
            });
            if (c)
                await lease.setCostumer(c);
        }
        if (materials)
            for (const material of materials) {
                const { id, quantity } = material;
                if (quantity) {
                    let inserted = await LeaseMaterials.create({ LeaseId: lease.id, MaterialId: id, quantity });
                    inserted.LeaseId = undefined;
                    inserted.updatedAt = undefined;
                    inserted.createdAt = undefined;
                    inserted_materials.push(inserted);
                }
            }
        return res.status(200).json({ Updated: { Lease: update, employees, costumer } });
    }

    static delete = async (req, res) => {
        const { id } = req.params;
        const leaseObject = await Lease.findOne({
            where: { id }
        });
        if (!leaseObject) res.status(401).json({ id, message: "ID not found" });
        const destroy = await leaseObject.destroy();
        return res.status(200).json(destroy);
    }
}

module.exports = (() => {
    router.get(basePath, LeaseController.get);
    router.post(basePath, validate(postValidation), LeaseController.post);
    router.put(`${basePath}/:id`, validate(putValidation), LeaseController.put);
    router.delete(`${basePath}/:id`, LeaseController.delete);
    return router;
})();