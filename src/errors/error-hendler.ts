import { z } from "zod";
import { HttpError } from "./http-error";
import { InvalidInputError } from "./invalid-input-error";
import { ServerError } from "./server-error";

export const handleError = (err: any) => {
  if (err instanceof z.ZodError) {
    new InvalidInputError(err.flatten().fieldErrors).throw();
  } else {
    console.log(err);
    new ServerError().throw();
  }
};
