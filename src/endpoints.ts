import { iEndpoint } from "./interfaces/";
import {
  UsersController,
  TypesController,
  AuthenticationController,
} from "./controllers";

const users = new UsersController();
const types = new TypesController();
const authentication = new AuthenticationController();

export const Endpoints: Array<iEndpoint> = [
  // User endpoints
  { url: "/users", handdler: users.create, method: "POST" },
  { url: "/users", handdler: users.create, method: "GET" },
  { url: "/users/:id", handdler: users.create, method: "GET" },
  { url: "/users/:id", handdler: users.create, method: "PUT" },
  { url: "/users/:id", handdler: users.create, method: "DELETE" },
  // Type endpoints
  { url: "/types", handdler: types.create, method: "POST" },
  { url: "/types", handdler: types.create, method: "GET" },
  { url: "/types/:id", handdler: types.create, method: "GET" },
  { url: "/types/:id", handdler: types.create, method: "PUT" },
  { url: "/types/:id", handdler: types.create, method: "DELETE" },
  // Authentication
  { url: "/authentication", handdler: authentication.generateToken, method: "POST" },
];
