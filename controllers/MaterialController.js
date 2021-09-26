const {sequelize, Material} = require("./../models");
const router = require("express").Router();

class MaterialController {
    
    static get = async (req, res) => {
        const materials = await Material.findAll();

        return res.status(200).json(materials);
    }

}

module.exports = (()=>{
    
    router.get("/material", MaterialController.get);
    return router;
})();