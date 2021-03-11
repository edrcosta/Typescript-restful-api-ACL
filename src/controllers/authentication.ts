import { Request, Response } from "express";

export class AuthenticationController {
  generateToken(req: Request, res: Response) {
    res.json({
      status: "success",
      method: "get",
    });
  }
}
