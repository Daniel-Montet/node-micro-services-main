import { DataSource } from "typeorm"
import { Product } from "./src/product/entity/product.entity"

const myDataSource = new DataSource({
	type: "mongodb",
	host: "localhost",
	port: 27017,
	database: "node-micro-main",
	entities: [Product],
	logging: false,
	synchronize: true,
})

export default myDataSource;