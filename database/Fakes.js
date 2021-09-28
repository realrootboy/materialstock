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
    await Material.create({ "name": "parafuso", "description": "fura muito" });
    await Material.create({ "name": "corda", "description": "não suba!" });
    await Material.create({ "name": "lona" });

    await (await LeaseObject.create({"name": "tenda", "description": "Ideal para cobrir"})).setMaterials([1,2,3]);
    await (await LeaseObject.create({"name": "marimba"})).setMaterials([1,2]);

    await (await Employee.create({"name": "Renan", "contact": "+55 27 99999-9999"}));
    await (await Employee.create({"name": "Icaro Mada", "contact": "+55 21 99999-9999"}));

    await (await Costumer.create({"name": "Atilio Canetas", "contact": "+55 21 99999-9090", "location": "Rua Dom João I, Flexal 7 - Serra"}));
    
    await (await Costumer.create({"name": "Pamarques Plantas", "contact": "+55 21 99999-0000", "location": "Rua Bosque Chines, Japão Capixaba - Serra"}));
    
    let leaseObject = await Lease.create({
        "location": "Rua Ali Perto, num 55 - Vitória ES",
        "mountDay": "1-25-1999 00:00:00",
        "umountDay": null,
        "leaseTime": "01-25-1999 15:00:00",
    })
    
    await leaseObject.setCostumer(1);
    await leaseObject.setEmployees([1,2]);

}

module.exports = seed;