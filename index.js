const Server = require("./server");
const { sequelize } = require("./models");
const seed  = require("./database/Fakes");

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = require('./config/swaggerOptions')

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = (new Server()).app;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

(async () => {
    await sequelize.sync({ force: true });
    
    await seed();

    app.listen(8080, () => {
        console.log("App listening in 8080");
    });
})();
