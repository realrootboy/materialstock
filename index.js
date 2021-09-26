const Server = require("./server");
const { sequelize } = require("./models");

const app = (new Server()).app;

(async () => {
    await sequelize.sync({ alter: true, logging: false });

    app.listen(8080, () => {
        console.log("App listening in 8080");
    });


})();
