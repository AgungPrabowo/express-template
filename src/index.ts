import express, {Application, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors"
import { config as dotenv } from "dotenv";

// Routers
import AuthRoutes from "./routes/AuthRoutes";
import UserRoutes from "./routes/UserRoutes";
import TodoRoutes from "./routes/TodoRoutes";

class App {
  public app: Application;

  constructor(app: Application = express()) {
    this.app = app;
    this.parser();
    this.routes();
    dotenv();
  }

  protected parser(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan("dev")); // debug client hit api apa saja
    this.app.use(compression()); // compress ukuran response
    this.app.use(helmet()); // melindungi header dari client dan sisi serverr
    this.app.use(cors()); // cors origin
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("API WOW");
    });

    this.app.use("/api/v1/users", UserRoutes);
    this.app.use("/api/v1/auth", AuthRoutes);
    this.app.use("/api/v1/todos", TodoRoutes);
  }
}

const port:number = 8000;
const app = new App().app;
app.listen(port, () => {
  console.log(`Running on port: ${port}`);
  // Env
  // process.env.
}) ;