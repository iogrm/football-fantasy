interface UserControllerInterface {
  getPaginatedUsers: import("express").RequestHandler;
  getUser: import("express").RequestHandler;
  uploadUserImage: import("express").RequestHandler;
}
