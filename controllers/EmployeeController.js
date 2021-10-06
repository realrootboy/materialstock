const { sequelize, Employee } = require('./../models');
const router = require("express").Router();
const { validate, Joi } = require('express-validation');

const basePath = "/employee";

const postValidation = {
    body: Joi.object({
        name: Joi.string()
            .required(),
        contact: Joi.string()
    }),
};

const putValidation = {
    body: Joi.object({
        name: Joi.string(),
        contact: Joi.string()
    }),
};

class EmployeeController {
    /**
     * @swagger
     * 
     * /employee:
     *   get:
     *     tags: [Employees]
     *     summary: Get all employeers.
     *     responses:
     *       200:
     *         description: Success
     */
    static get = async (req, res) => {
        const employees = await Employee.findAll();
        const headers = ['id', 'name', 'contact'];
        return res.status(200).json({employees, headers});
    }

    /**
     * @swagger
     * 
     * /employee/{id}:
     *   get:
     *     tags: [Employees]
     *     summary: Get one employee by his id.
     *     parameters:
     *       - name: id
     *         description: Id of the costumer
     *         in: path
     *         type: integer
     *     responses:
     *       200:
     *         description: Success
     */
    static getOne = async (req, res) => {
        const { id} = req.params;
        const employee = await Employee.findOne({
            where: {id}
        });
        if (!employee) res.status(401).json({id, message: "ID not found"});
        return res.status(200).json(employee);
    }

    /**
     * @swagger
     * 
     * /employee:
     *   post:
     *     tags: [Employees]
     *     summary: Create a employee.
     *     consumes:
     *       - application/json
     *     parameters:
     *       - name: employee
     *         description: The employee to create
     *         in: body
     *         schema:
     *           type: object
     *           required:
     *             - name
     *               contact
     *           properties:
     *             name:
     *               type: string
     *             contact:
     *               type: string
     *     responses:
     *       200:
     *         description: Success
     */
    static post = async (req, res) => {
        const { name, contact } = req.body;
        const employee = await Employee.create({ name, contact });
        return res.status(200).json(employee);
    }

    /**
     * @swagger
     * 
     * /employee/{id}:
     *   put:
     *     tags: [Employees]
     *     summary: Update a employee register.
     *     consumes:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Id of the employee
     *         in: path
     *         type: integer
     *       - name: employee
     *         description: the costumer to update
     *         in: body
     *         schema:
     *           type: object
     *           properties:
     *             name:
     *               type: string
     *             contact:
     *               type: string
     *             location:
     *               type: string  
     *     responses:
     *       200:
     *         description: Updated
     *       401:
     *         description: Invalid id
     */
    static put = async (req, res) => {
        const { id } = req.params;
        const { name, contact } = req.body;
        const employee = await Employee.findOne({
            where: { id }
        });
        if (!employee) res.status(401).json({ id, message: "ID not found" });
        const update = await employee.update({ name, contact });
        return res.status(200).json(update);
    }

    /**
     * @swagger
     * 
     * /employee/{id}:
     *   delete:
     *     tags: [Employees]
     *     summary: Delete a employee by his id.
     *     parameters:
     *       - name: id
     *         description: Id of the employee
     *         in: path
     *         type: integer
     *     responses:
     *       200:
     *         description: Deleted
     *       401:
     *         description: Invalid id
     */
    static delete = async (req, res) => {
        const { id } = req.params;
        const employee = await Employee.findOne({
            where: { id }
        });
        if (!employee) res.status(401).json({ id, message: "ID not found" });
        const destroy = await employee.destroy();
        return res.status(200).json(destroy);
    }
}

module.exports = (()=>{
    router.get(basePath,EmployeeController.get);
    router.get(`${basePath}/:id`, EmployeeController.getOne);
    router.post(basePath, validate(postValidation), EmployeeController.post);
    router.put(`${basePath}/:id`, validate(putValidation), EmployeeController.put);
    router.delete(`${basePath}/:id`, EmployeeController.delete);

    return router;
})();
