const { sequelize, Employee } = require('./../models');
const MaterialController = require('./MaterialController');
const router = require("express").Router();

const basePath = "/employee";

class EmployeeController {

    static get = async (req, res) => {
        const employees = await Employee.findAll();
        return res.status(200).json(employees);
    }

    static post = async (req, res) => {
        const { name, contact } = req.body;
        const employee = await Employee.create({ name, contact });
        return res.status(200).json(employee);
    }

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

    static delete = async (req, res) => {
        const { id } = req.params;
        const employee = await Employee.findOne({
            where: { id }
        });
        if (!employee) res.status(401).json({ id, message: "ID not found" });
        const destroy = await MaterialController.destroy();
        return res.status(200).json(destroy);
    }
}

module.exports = (()=>{
    router.get(basePath,EmployeeController.get);
    router.post(basePath,EmployeeController.post);
    router.put(`${basePath}/:id`, EmployeeController.put);
    router.delete(`${basePath}/:id`, EmployeeController.delete);
    return router;
})();
