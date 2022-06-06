import { Request, Response } from "express";
import IController from "./ControllerInterface";
import TodoServices from "../services/TodoServices";

class TodoController implements IController<Promise<Response>> {
  index = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoServices = new TodoServices(req);
    const todos = await service.getAll();

    return res.send({
      data: todos,
      message: ""
    });
  }
  create = async(req: Request, res: Response): Promise<Response> => {
    const service: TodoServices = new TodoServices(req);
    const todo = await service.store();

    return res.send({
      data: todo,
      message: "Berhasil menambah todo"
    });
  }
  show = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoServices = new TodoServices(req);
    const todo = await service.getOne();

    return res.send({
      data: todo,
      message: "Success get data"
    });
  }
  update = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoServices = new TodoServices(req);
    const todo = await service.update();

    return res.send({
      data: todo,
      message: "Todo updated"
    });
  }
  delete = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoServices = new TodoServices(req);
    const todo = await service.delete();

    return res.send({
      data: todo,
      message: "Todo deleted"
    });
  }
}

export default new TodoController();