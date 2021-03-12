import * as Express from "express";

import { ENV } from "./helpers";
import { Endpoints } from "./endpoints";
import { iEndpoint } from "./interfaces";

(() => {
  ENV.initialize();

  const application = Express();

  Endpoints.forEach((endpoint: iEndpoint) => {
    const method = endpoint.method.toLocaleLowerCase();

    method === "get" ? application.get(endpoint.url, endpoint.handdler) : false;
    method === "post" ? application.post(endpoint.url, endpoint.handdler) : false;
    method === "put" ? application.put(endpoint.url, endpoint.handdler) : false;
    method === "delete" ? application.delete(endpoint.url, endpoint.handdler) : false;
  });

  application.listen(3000);
})();
