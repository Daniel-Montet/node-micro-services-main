"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var product_entity_1 = require("./src/product/entity/product.entity");
var myDataSource = new typeorm_1.DataSource({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "node-micro-main",
    entities: [product_entity_1.Product],
    logging: false,
    synchronize: true,
});
exports.default = myDataSource;
