interface SocialControllerInterface {
  follow: import("express").RequestHandler;
  unfollow: import("express").RequestHandler;
  getFollowers: import("express").RequestHandler;
  getFollowings: import("express").RequestHandler;
}
