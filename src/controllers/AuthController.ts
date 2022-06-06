import { Request, Response } from "express";
import Authentication from "../utils/Authentication";
const db = require("../db/models");

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    let { username, password } = req.body;

    const hashedPassword: string = await Authentication.passwordHash(password);

    const createdUser = await db.user.create({
      username,
      password: hashedPassword
    });

    return res.send("Registrasi sukses");
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    let { username, password } = req.body;

    const user = await db.user.findOne({
      where: { username }
    });

    // Check password;
    let compare = await Authentication.passwordCompare(password, user.password);
    if (compare) {
      let token = Authentication.generateToken(user.id, username);
      return res.send(token);
    }

    return res.send("Please check your username or password");
  }

  profile = async (req: Request, res: Response): Promise<Response> => {
    return res.send(req.app.locals.credential);
  }
}

export default new AuthController();