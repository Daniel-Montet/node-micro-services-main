import express from "express";
import cors from "cors";
import db from "../app-data-source";
import * as amqp from "amqplib"

// establish database connection
db
	.initialize()
	.then(() => {
		// connect to message queue
		amqp.connect("amqps://aaedhswt:w-WQ7z04hr0Ondj_aGIGjNoR499YtUGT@rattlesnake.rmq.cloudamqp.com/aaedhswt").then(async (connection) => {
			const channel = await connection.createChannel()
			// initialize express server
			const app = express();
			const port = process.env.PORT! || 8001;

			channel.assertQueue("hello", { durable: false });


			app.use(cors({
				origin: ['http://localhost:3000']
			}))

			app.use(express.json());

			channel.consume("hello", (message) => {
				console.log(message?.content.toString())
			})
			app.listen(port, () => {
				console.log("Connected to message queue successfully")
				console.log("Data Source has been initialized!")
				console.log(`main app running successfully on port ${port}`)
			})

			process.on("beforeExit", () => {
				console.log("closing");
				connection.close()
			})

		}).catch(error => console.log(error))
	})
	.catch((err) => {
		console.error("Error during Data Source initialization:", err)
	})
