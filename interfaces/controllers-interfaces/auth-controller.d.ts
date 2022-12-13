interface AuthControllerInterface {
  signup: import("express").RequestHandler;
  login: import("express").RequestHandler;
  confirmation: import("express").RequestHandler;
}
