import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { generateSwaggerSpec } from "./swagger";

class App {
  public app: express.Application;
  public port: number;

  constructor(routers: express.Router[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(routers);
    this.initializeSwagger();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private initializeSwagger() {
    this.app.use(swaggerUi.serve);
    this.app.get("/", swaggerUi.setup(generateSwaggerSpec()));
  }

  private initializeControllers(routers: express.Router[]) {
    routers.forEach((router) => {
      this.app.use(router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;