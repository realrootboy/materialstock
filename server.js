const express = require("express");
const cors = require("cors");
const routes = require('./routes');

class Server {
    constructor() {
        this.app = express();
        this.app.use(cors());
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
    }
    routes() {
        this.app.use(routes());
    }

}

module.exports = Server;
