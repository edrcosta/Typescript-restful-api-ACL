import * as Express from "express";

import { ENV } from "./helpers";
import { Endpoints } from "./endpoints";
import { iEndpoint } from "./interfaces";

(() => {
  ENV.initialize();

  const app = Express();

  Endpoints.forEach((endpoint: iEndpoint) => {
    if (endpoint.method === "GET") app.get(endpoint.url, endpoint.handdler);
    else if (endpoint.method === "POST")
      app.post(endpoint.url, endpoint.handdler);
    else if (endpoint.method === "PUT")
      app.put(endpoint.url, endpoint.handdler);
    else if (endpoint.method === "DELETE")
      app.delete(endpoint.url, endpoint.handdler);
    else {
      throw new Error(`${endpoint.method} method is not allowed`);
    }
  });

  app.listen(3000);
})();
