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

    static get = async (req, res) => {
        const employees = await Employee.findAll();
        const headers = ['id', 'name', 'contact'];
        return res.status(200).json({employees, headers});
    }

    static getOne = async (req, res) => {
        const { id} = req.params;
        const employee = await Employee.findOne({
            where: {id}
        });
        if (!employee) res.status(401).json({id, message: "ID not found"});
        return res.status(200).json(employee);
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
