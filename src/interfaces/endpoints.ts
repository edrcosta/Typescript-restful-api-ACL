import { Handler } from "express";

export interface iEndpoint {
  url: string;
  method: "GET" | "POST" | "DELETE" | "PUT";
  handdler: Handler;
}
