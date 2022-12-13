import express, { NextFunction, Request, Response, Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { NotFoundError } from "../errors/not-found-error";
import { ServerError } from "../errors/server-error";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { HttpError } from "../errors/http-error";
import { getSwaggerOption } from "../init/swagger-config";
import path from "path";

class CustomExpress {
  app: express.Express | undefined = undefined;

  constructor(router: Router) {
    this.app = this.configExpress(router);
  }

  listen = () => {
    if (this.app)
      this.app.listen(process.env.APP_PORT, () =>
        console.log(`Listenning on port ${process.env.APP_PORT}`)
      );
    else console.log("app is not defined...");
  };

  configExpress = (router: Router) => {
    const app = express();

    app.use(HttpError.init);
    app.use(cors());
    app.use(bodyParser.json());

    app.use("/api", router);

    var publicFolder = path.join(__dirname, "../../public");

    app.use("/", express.static(publicFolder));

    app.use(
      "/api_docs",
      swaggerUI.serve,
      swaggerUI.setup(swaggerJsDoc(getSwaggerOption()))
    );

    app.use((req: Request, res: Response, next: NextFunction) => {
      return new NotFoundError("Route").throw();
    });

    app.use((error: any, req: Request, res: any, next: NextFunction) => {
      console.log(error);
      return new ServerError().throw();
    });

    return app;
  };
}

export default CustomExpress;