import express from "express";
import { auth } from "../middleware/check-auth";
import { modifyImage, upload } from "../middleware/uplaod-image";

export const createUserRouter = (controller: UserControllerInterface) => {
  const router = express.Router();

  router.get("/all", auth, controller.getPaginatedUsers);
  router.get("/:userId", auth, controller.getUser);
  router.put("/image", auth, upload, modifyImage, controller.uploadUserImage);
  return router;
};
