import * as Express from "express";

import { ENV } from "./helpers";
import { Endpoints } from "./endpoints";
import { iEndpoint } from "./interfaces";
import { Database } from "./database";

(() => {
  ENV.initialize();
  Database.initialize("sqlite::memory:");

  const application = Express();

  Endpoints.forEach((endpoint: iEndpoint) => {
    const method = endpoint.method.toLocaleLowerCase();

    if (method === "get") 
      application.get(endpoint.url, endpoint.handdler);
    if (method === "post") 
      application.post(endpoint.url, endpoint.handdler);
    if (method === "put") 
      application.put(endpoint.url, endpoint.handdler);
    if (method === "delete")
      application.delete(endpoint.url, endpoint.handdler);
  });

  application.listen(3000);
})();
