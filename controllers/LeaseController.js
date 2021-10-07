const {
    sequelize,
    Lease,
    Costumer,
    LeaseMaterials,
    LeaseEmployees,
    Material,
    Employee
} = require("./../models");

const router = require("express").Router();
const { validate, Joi } = require("express-validation");

const basePath = "/lease";

const postValidation = {
    body: Joi.object({
        location: Joi.string().required(),
        mountDay: Joi.date().allow(null),
        unmountDay: Joi.date().allow(null),
        leaseTime: Joi.date().allow(null),
        employees: Joi.array(),
        materials: Joi.array(),
        costumer: Joi.object().required(),
    }),
};

const putValidation = {
    body: Joi.object({
        location: Joi.string(),
        mountDay: Joi.date().allow(null),
        unmountDay: Joi.date().allow(null),
        leaseTime: Joi.date().allow(null),
        employees: Joi.array(),
        materials: Joi.array(),
        costumer: Joi.object(),
    }),
};

class LeaseController {
    /**
     * @swagger
     * 
     * /lease:
     *   get:
     *     tags: [Leases]
     *     summary: Get all leases.
     *     responses:
     *       200:
     *         description: Success.
     */
    static get = async (req, res) => {
        const leases = await Lease.findAll({

            include: [
                { model: Material, as: 'materials' },
                { model: Employee, as: 'employees' }
            ],
            attributes: { exclude: ['updatedAt'] }

        });
        const headers = ['id', 'location', 'mountDay', 'unmountDay', 'leaseTime'];
        return res.status(200).json({ leases, headers });
    }

    /**
     * @swagger
     * 
     * /lease/{id}:
     *   get:
     *     tags: [Leases]
     *     summary: Get one lease by his id.
     *     parameters:
     *       - name: id
     *         description: Id of the lease.
     *         in: path
     *         type: integer
     *         required: true
     *     responses:
     *       200:
     *         description: Success.
     */
    static getOne = async (req, res) => {
        const { id } = req.params;
        const lease = await Lease.findOne({
            where: { id },
            include: [
                { model: Material, as: 'materials' },
                { model: Employee, as: 'employees' }
            ],
            attributes: { exclude: ['updatedAt'] }
        });
        if (!lease) res.status(401).json({ id, message: "ID not found" });
        return res.status(200).json(lease);
    }

    /**
     * @swagger
     * 
     * /lease:
     *   post:
     *     tags: [Leases]
     *     summary: Create a lease.
     *     consumes:
     *       - application/json
     *     parameters:
     *       - name: lease
     *         description: The lease to create.
     *         in: body
     *         required: true
     *         schema:
     *           type: object
     *           required:
     *             - location
     *               mountDay
     *               unmountDay
     *               leaseTime
     *               costumer
     *               materials
     *           properties:
     *             location:
     *               type: string
     *               example: Rua Ali Perto, num 55 - Vitória ES
     *             mountDay:
     *               type: string
     *               example: 1-25-1999 00:00:00
     *             unmountDay:
     *               type: string
     *               example: 01-28-1999 15:00:00
     *             leaseTime:
     *               type: string
     *               example: 01-25-1999 15:00:00
     *             employees:
     *               type: object
     *               example: [{id: 1,action: motorista},{id: 2}]
     *             costumer:
     *               type: object
     *               example: { "id": 1 }
     *             materials:
     *               type: object
     *               example: [{id: 1,quantity: 20},{id: 2, quantity: 15}]
     *     responses:
     *       200:
     *         description: Success
     */
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
        let inserted_materials = [];
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

    /**
     * @swagger
     * 
     * /lease/{id}:
     *   put:
     *     tags: [Leases]
     *     summary: Update a lease.
     *     consumes:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Id of the lease.
     *         in: path
     *         type: integer
     *         required: true
     *       - name: lease
     *         description: The lease to create.
     *         in: body
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             location:
     *               type: string
     *               exampĺe: Rua Ali Perto, num 60 - Vitória ES
     *             mountDay:
     *               type: string
     *               example: 1-26-1999 00:00:00
     *             unmountDay:
     *               type: string
     *               example: 01-29-1999 15:00:00
     *             leaseTime:
     *               type: string
     *               example: 01-26-1999 15:00:00
     *             employees:
     *               type: object
     *               example: [{id: 1,action: conferente},{id: 2}]
     *             costumer:
     *               type: object
     *               example: {id: 2 }
     *             materials:
     *               type: object
     *               example: [{id: 2,quantity: 30},{id: 4}]
     *     responses:
     *       200:
     *         description: Success
     */
    static put = async (req, res) => {
        const { id } = req.params;
        const { location, mountDay, unmountDay, leaseTime, employees, costumer, materials } = req.body;
        const lease = await Lease.findOne({
            where: { id }
        });
        if (!lease) res.status(401).json({ id, message: "ID not found" });
        const update = await lease.update({ location, mountDay, unmountDay, leaseTime });
        if (employees) {
            await lease.setEmployees([]);
            for (const employee of employees) {
                const { id, action } = employee;
                await LeaseEmployees.create({ LeaseId: lease.id, EmployeeId: id, action });
            }
        }
        if (costumer) {
            const c = await Costumer.findOne({
                where: { id: costumer.id }
            });
            if (c)
                await lease.setCostumer(c);
        }
        let inserted_materials = [];
        if (materials) {
            await lease.setMaterials([]);
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
        }
        return res.status(200).json({ Updated: { Lease: update, employees, costumer, materials: inserted_materials } });
    }

    /**
     * @swagger
     * 
     * /lease/{id}:
     *   delete:
     *     tags: [Leases]
     *     summary: Delete a lease by his id.
     *     parameters:
     *       - name: id
     *         description: Id of the lease.
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
    router.get(`${basePath}/:id`, LeaseController.getOne);
    router.post(basePath, validate(postValidation), LeaseController.post);
    router.put(`${basePath}/:id`, validate(putValidation), LeaseController.put);
    router.delete(`${basePath}/:id`, LeaseController.delete);
    return router;
})();
