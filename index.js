const Server = require("./server");
const { sequelize } = require("./models");
const seed  = require("./database/Fakes");

const app = (new Server()).app;

(async () => {
    await sequelize.sync({ force: true });
    
    await seed();

    app.listen(8080, () => {
        console.log("App listening in 8080");
    });
})();
