const {
    Costumer,
    Employee,
    Lease,
    LeaseDiary,
    LeaseObject,
    Material,
    sequelize
} = require('./../models');

const seed = async () => {
    await Material.create({ "name": "parafuso" });
    await Material.create({ "name": "corda" });
    await Material.create({ "name": "lona" });

    await (await LeaseObject.create({"name": "tenda"})).setMaterials([1,2,3]);
    await (await LeaseObject.create({"name": "marimba"})).setMaterials([1,2]);

    await (await Employee.create({"name": "Renan", "contact": "+55 27 99999-9999"}));
    await (await Employee.create({"name": "Icaro Mada", "contact": "+55 21 99999-9999"}));

    await (await Costumer.create({"name": "Atilio Canetas", "contact": "+55 21 99999-9090", "location": "Rua Dom João I, Flexal 7 - Serra"}));
    
    await (await Costumer.create({"name": "Pamarques Plantas", "contact": "+55 21 99999-0000", "location": "Rua Bosque Chines, Japão Capixaba - Serra"}));
    
    

}

module.exports = seed;