const lease = require("../models/lease");
const { sequelize, Lease, Employee, Costumer } = require("./../models");
const router = require("express").Router();

const basePath = "/lease";

class LeaseController {
    static get = async (req, res) => {
        const leases = await Lease.findAll();
        return res.status(200).json(leases);
    }

    static post = async (req, res) => {
        const { location, mountDay, umountDay, leaseTime, employees, costumer } = req.body;
        let lease = await Lease.create({ location, mountDay, umountDay, leaseTime });
        if (employees && employees.length)
            await lease.setEmployees(employees.map(el => el.id));
        if (costumer) {
            const c = await Costumer.findOne({
                where: { id: costumer.id }
            });
            if(c)
                await lease.setCostumer(c);
        }
        return res.status(200).json({ lease, employees, costumer });
    }

    static put = async (req, res) => {
        const { id } = req.params;
        const { location, mountDay, umountDay, leaseTime, employees, costumer } = req.body;
        const lease = await Lease.findOne({
            where: { id }
        });
        if (!lease) res.status(401).json({ id, message: "ID not found" });
        const update = await lease.update({ location, mountDay, umountDay, leaseTime });
        if (employees && employees.length)
            await lease.setEmployees(employees.map(el => el.id));
        if (costumer) {
            const c = await Costumer.findOne({
                where: { id: costumer.id }
            });
            await lease.setCostumer(c);
        }
        return res.status(200).json({ Updated: { Lease: update, employees, costumer } });
    }

    static delete = async (req, res) => {
        const { id } = req.params;
        const leaseObject = await Lease.findOne({
            where: { id}
        });
        if (!leaseObject) res.status(401).json({id, message: "ID not found"});
        const destroy = await leaseObject.destroy();
        return res.status(200).json(destroy);
    }
}

module.exports = (()=>{
    router.get(basePath, LeaseController.get);
    router.post(basePath, LeaseController.post);
    router.put(`${basePath}/:id`, LeaseController.put);
    router.delete(`${basePath}/:id`, LeaseController.delete);
    return router;
})();
