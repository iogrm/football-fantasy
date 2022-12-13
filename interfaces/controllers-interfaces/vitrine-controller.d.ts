interface VitrineControllerInterface {
  getFollowingVitrines: import("express").RequestHandler;
  like: import("express").RequestHandler;
  unlike: import("express").RequestHandler;
}
