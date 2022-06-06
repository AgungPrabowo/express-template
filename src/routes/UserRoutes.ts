import BaseRoutes from "./BaseRoutes";
import { auth } from "../middleware/AuthMiddleware";

// Controllers
import UserController from "../controllers/UserController";

class UserRouter extends BaseRoutes {
  public routes(): void {
    this.router.get("/", auth, UserController.index);
    this.router.post("/", auth, UserController.create);
    this.router.get("/:id", auth, UserController.show);
    this.router.put("/:id", auth, UserController.update);
    this.router.delete("/:id", auth, UserController.delete);
  }
}

export default new UserRouter().router;