import { Request, Response } from "express";
import IController from "./ControllerInterface";

let data: any[] = [
  { id: 1, name: "Jeffri" },
  { id: 2, name: "Debby" },
  { id: 3, name: "Brielle" }
];

class UserController implements IController<Response> {
  index(req: Request, res: Response): Response {
    return res.send(data);
  }
  create(req: Request, res: Response): Response {
    const { id, name } = req.body;

    data.push({ id, name });
    return res.send("Berhasil menambah data");
  }
  show(req: Request, res: Response): Response {
    const { id } = req.params;

    const person = data.find(item => item.id == id);
    return res.send(person);
  }
  update(req: Request, res: Response): Response {
    const { id } = req.params;
    const { name } = req.body;

    let person = data.find(item => item.id === parseInt(id));
    person.name = name;
    return res.send("Update success");
  }
  delete(req: Request, res: Response): Response {
    const { id } = req.params;

    let person = data.filter(item => item.id !== parseInt(id));
    return res.send(person);
  }
}

export default new UserController();