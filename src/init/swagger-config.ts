import swaggerJsDoc from "swagger-jsdoc";

const playerSwaggerProps = {
  id: { type: "integer" },
  firstName: { type: "string" },
  secondName: { type: "string" },
  webname: { type: "string" },
  club: { type: "string" },
  role: { type: "string" },
  createdAt: { type: "string", format: "date-time" },
  updatedAt: { type: "string", format: "date-time" },
  playerStats: { $ref: "#/definitions/PlayerStats" },
};

export const getSwaggerOption = () => {
  const options: swaggerJsDoc.Options = {
    definition: {
      swagger: "2.0",
      info: {
        description:
          "This is a simple example NodeJS API project to demonstrate Swagger Documentation",
        version: "1.0.0",
        title: "App API",
      },
      securityDefinitions: {
        Bearer: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
        },
      },
      schemes: ["http"],
      host: process.env.BACKEND_URL,
      basePath: "/api",
      paths: {
        "/player/{id}": {
          get: {
            summary: "Get player by id",
            description: "Get player by id",
            produces: ["application/json"],
            parameters: [
              {
                name: "id",
                in: "path",
                description: "player id",
                required: true,
                type: "integer",
              },
            ],
            responses: {
              "200": {
                description: "successful operation",
                schema: {
                  type: "object",
                  properties: {
                    player: { type: "object", $ref: "#/definitions/Player" },
                  },
                },
              },
              "400": {
                description: "Invalid status value",
                schema: {
                  $ref: "#/definitions/InvalidResponse",
                },
              },
            },
          },
        },
        "/player/all": {
          get: {
            summary: "Get paginated players",
            description: "Get players in paginated form",
            produces: ["application/json"],
            parameters: [
              {
                in: "query",
                name: "page",
                schema: { type: "integer" },
                description: "",
              },
              {
                in: "query",
                name: "num",
                schema: { type: "integer" },
                description: "",
              },
              {
                in: "query",
                name: "search",
                schema: { type: "string" },
                description: "",
              },
              {
                in: "query",
                name: "role",
                schema: { type: "string" },
                description: "",
              },
              {
                in: "query",
                name: "order",
                schema: { type: "integer" },
                description: "",
              },
              {
                in: "query",
                name: "sortBy",
                schema: { type: "integer" },
                description: "",
              },
            ],
            responses: {
              "200": {
                description: "successful operation",
                schema: {
                  type: "object",
                  properties: {
                    count: { type: "integer" },
                    values: {
                      type: "array",
                      items: {
                        $ref: "#/definitions/Player",
                      },
                    },
                  },
                },
              },
              "400": {
                description: "Invalid status value",
                schema: {
                  $ref: "#/definitions/InvalidResponse",
                },
              },
            },
          },
        },
        "/user/all": {
          get: {
            summary: "Get pagginated users",
            description: "Get pagginated users",
            produces: ["application/json"],
            security: [{ Bearer: [] }],
            parameters: [
              {
                in: "query",
                name: "page",
                schema: { type: "integer" },
                description: "",
              },
              {
                in: "query",
                name: "num",
                schema: { type: "integer" },
                description: "",
              },
              {
                in: "query",
                name: "search",
                schema: { type: "string" },
                description: "",
              },
            ],
            responses: {
              "200": {
                description: "successful operation",
                schema: {
                  properties: {
                    count: { type: "number" },
                    values: {
                      type: "array",
                      items: {
                        $ref: "#/definitions/UserInfo",
                      },
                    },
                  },
                },
              },
              "400": {
                description: "Invalid status value",
                schema: {
                  $ref: "#/definitions/InvalidResponse",
                },
              },
            },
          },
        },
        "/user/{id}": {
          get: {
            summary: "Get user by id",
            description: "Get user by id",
            produces: ["application/json"],
            security: [{ Bearer: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                description: "user id",
                required: true,
                type: "integer",
              },
            ],
            responses: {
              "200": {
                description: "successful operation",
                schema: {
                  properties: {
                    team: { type: "object", $ref: "#/definitions/User" },
                  },
                },
              },
              "400": {
                description: "Invalid status value",
                schema: {
                  $ref: "#/definitions/InvalidResponse",
                },
              },
            },
          },
        },
        "/user/image": {
          put: {
            summary: "Upload user image",
            description: "Upload user image",
            produces: ["application/json"],
            security: [{ Bearer: [] }],
            parameters: [
              {
                name: "image",
                in: "formData",
                description: "image file",
                required: true,
                type: "file",
              },
            ],
            responses: {
              "200": {
                description: "successful operation",
                schema: {
                  properties: {
                    team: { type: "object", $ref: "#/definitions/UserInfo" },
                  },
                },
              },
              "400": {
                description: "Invalid status value",
                schema: {
                  $ref: "#/definitions/InvalidResponse",
                },
              },
            },
          },
        },
        "/auth/login": {
          post: {
            summary: "Login to account",
            description: "Login to account",
            produces: ["application/json"],
            parameters: [
              {
                name: "body",
                in: "body",
                description: "body",
                required: true,
                schema: {
                  type: "object",
                  properties: {
                    username: { type: "string" },
                    password: { type: "string" },
                  },
                },
              },
            ],
            responses: {
              "200": {
                description: "successful operation",
                schema: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                      example:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2MzU4ODE0MCwiZXhwIjoxNjYzNjMxMzQwfQ.yY0P8AqI5B-ryEVPdoQAYfytg3_U_gSjrmJwAr2H9v8",
                    },
                  },
                },
              },
              "404": {
                description: "Invalid status value",
                schema: {
                  $ref: "#/definitions/InvalidResponse",
                },
              },
            },
          },
        },
        "/auth/signup": {
          post: {
            summary: "Signup user",
            description: "Signup user",
            produces: ["application/json"],
            parameters: [
              {
                name: "body",
                in: "body",
                description: "body",
                required: true,
                schema: {
                  type: "object",
                  properties: {
                    username: { type: "string" },
                    password: { type: "string" },
                    firstname: { type: "string" },
                    lastname: { type: "string" },
                    country: { type: "string" },
                    email: { type: "string", format: "email" },
                    birthday: { type: "string", format: "date-time" },
                  },
                },
              },
            ],
            responses: {
              "200": {
                description: "successful operation",
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "boolean", example: "true" },
                  },
                },
              },
              "404": {
                description: "Invalid status value",
                schema: {
                  $ref: "#/definitions/InvalidResponse",
                },
              },
            },
          },
        },
        "/auth/confirmation": {
          post: {
            summary: "Confirm user signup",
            description: "Confirm user signup",
            produces: ["application/json"],
            parameters: [
              {
                name: "body",
                in: "body",
                description: "body",
                required: true,
                schema: {
                  type: "object",
                  properties: {
                    code: { type: "number" },
                    email: { type: "string", format: "email" },
                  },
                },
              },
            ],
            responses: {
              "200": {
                description: "successful operation",
                schema: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                      example:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2MzU4ODE0MCwiZXhwIjoxNjYzNjMxMzQwfQ.yY0P8AqI5B-ryEVPdoQAYfytg3_U_gSjrmJwAr2H9v8",
                    },
                  },
                },
              },
              "404": {
                description: "Invalid status value",
                schema: {
                  $ref: "#/definitions/InvalidResponse",
                },
              },
            },
          },
        },
        "/week/": {
          get: {
            summary: "Get current week",
            description: "Get current week",
            produces: ["application/json"],
            parameters: [],
            responses: {
              "200": {
                description: "successful operation",
                schema: {
                  properties: {
                    week: { type: "object", $ref: "#/definitions/Week" },
                  },
                },
              },
              "400": {
                description: "Invalid status value",
                schema: {
                  $ref: "#/definitions/InvalidResponse",
                },
              },
            },
          },
        },
        "/team/": {
          get: {
            summary: "Get my team",
            description: "Get my team",
            security: [{ Bearer: [] }],
            produces: ["application/json"],
            parameters: [],
            responses: {
              "200": {
                description: "successful operation",
                schema: {
                  properties: {
                    team: { type: "object", $ref: "#/definitions/Team" },
                  },
                },
              },
              "400": {
                description: "Invalid status value",
                schema: {
                  $ref: "#/definitions/InvalidResponse",
                },
              },
            },
          },
        },
        "/team/player": {
          put: {
            summary: "Swap players in team",
            description: "Swap players in team",
            security: [{ Bearer: [] }],
            produces: ["application/json"],
            parameters: [
              {
                in: "query",
                name: "position1",
                schema: { type: "integer" },
                description: "",
              },
              {
                in: "query",
                name: "position2",
                schema: { type: "integer" },
                description: "",
              },
            ],
            responses: {
              "200": {
                description: "successful operation",
                schema: {
                  properties: {
                    team: { type: "object", $ref: "#/definitions/Team" },
                  },
                },
              },
              "400": {
                description: "Invalid status value",
                schema: {
                  $ref: "#/definitions/InvalidResponse",
                },
              },
            },
          },
          post: {
            summary: "Add player to team",
            description: "Add player to team",
            security: [{ Bearer: [] }],
            produces: ["application/json"],
            parameters: [
              {
                name: "body",
                in: "body",
                description: "body",
                required: true,
                schema: {
                  type: "object",
                  properties: {
                    position_num: { type: "number" },
                    player_id: { type: "number" },
                  },
                },
              },
            ],
            responses: {
              "200": {
                description: "successful operation",
                schema: {
                  properties: {
                    team: { type: "object", $ref: "#/definitions/Team" },
                  },
                },
              },
              "400": {
                description: "Invalid status value",
                schema: {
                  $ref: "#/definitions/InvalidResponse",
                },
              },
            },
          },
          delete: {
            summary: "Delete player from team",
            description: "Delete player from team",
            security: [{ Bearer: [] }],
            produces: ["application/json"],
            parameters: [
              {
                name: "position_num",
                in: "query",
                required: true,
                type: "string",
              },
            ],
            responses: {
              "200": {
                description: "successful operation",
                schema: {
                  properties: {
                    team: { type: "object", $ref: "#/definitions/Team" },
                  },
                },
              },
              "400": {
                description: "Invalid status value",
                schema: {
                  $ref: "#/definitions/InvalidResponse",
                },
              },
            },
          },
        },
        "/social/follow/{id}": {
          post: {
            summary: "Follow user",
            description: "Follow user",
            security: [{ Bearer: [] }],
            produces: ["application/json"],
            parameters: [
              {
                name: "id",
                in: "path",
                description: "user id",
                required: true,
                type: "integer",
              },
            ],
            responses: {
              "200": {
                description: "successful operation",
                schema: {
                  properties: {
                    status: { type: "boolean" },
                  },
                },
              },
              "400": {
                description: "Invalid status value",
                schema: {
                  $ref: "#/definitions/InvalidResponse",
                },
              },
            },
          },
        },
        "/social/unfollow/{id}": {
          delete: {
            summary: "Unfollow user",
            description: "Unfollow user",
            security: [{ Bearer: [] }],
            produces: ["application/json"],
            parameters: [
              {
                name: "id",
                in: "path",
                description: "user id",
                required: true,
                type: "integer",
              },
            ],
            responses: {
              "200": {
                description: "successful operation",
                schema: {
                  properties: {
                    status: { type: "boolean" },
                  },
                },
              },
              "400": {
                description: "Invalid status value",
                schema: {
                  $ref: "#/definitions/InvalidResponse",
                },
              },
            },
          },
        },
        "/social/followers": {
          get: {
            summary: "Get user followers",
            description: "Get user followers",
            security: [{ Bearer: [] }],
            produces: ["application/json"],
            parameters: [
              {
                in: "query",
                name: "page",
                schema: { type: "integer" },
                description: "",
              },
              {
                in: "query",
                name: "num",
                schema: { type: "integer" },
                description: "",
              },
            ],
            responses: {
              "200": {
                description: "successful operation",
                schema: {
                  properties: {
                    count: { type: "number" },
                    values: {
                      type: "array",
                      items: { $ref: "#/definitions/UserInfo" },
                    },
                  },
                },
              },
              "400": {
                description: "Invalid status value",
                schema: {
                  $ref: "#/definitions/InvalidResponse",
                },
              },
            },
          },
        },
        "/social/followings": {
          get: {
            summary: "Get user followings",
            description: "Get user followings",
            security: [{ Bearer: [] }],
            produces: ["application/json"],
            parameters: [
              {
                in: "query",
                name: "page",
                schema: { type: "integer" },
                description: "",
              },
              {
                in: "query",
                name: "num",
                schema: { type: "integer" },
                description: "",
              },
            ],
            responses: {
              "200": {
                description: "successful operation",
                schema: {
                  properties: {
                    count: { type: "number" },
                    values: {
                      type: "array",
                      items: { $ref: "#/definitions/UserInfo" },
                    },
                  },
                },
              },
              "400": {
                description: "Invalid status value",
                schema: {
                  $ref: "#/definitions/InvalidResponse",
                },
              },
            },
          },
        },
        "/vitrine/followigs": {
          get: {
            summary: "Get following vitrina",
            description: "Get user followings",
            security: [{ Bearer: [] }],
            produces: ["application/json"],
            parameters: [],
            responses: {
              "200": {
                description: "successful operation",
                schema: {
                  type: "array",
                  items: { $ref: "#/definitions/InvalidResponse" },
                },
              },
              "400": {
                description: "Invalid status value",
                schema: {
                  $ref: "#/definitions/InvalidResponse",
                },
              },
            },
          },
        },
      },
      definitions: {
        PlayerStats: {
          type: "object",
          properties: {
            id: { type: "integer" },
            score: { type: "integer" },
            price: { type: "integer" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            playerId: { type: "integer" },
            weekId: { type: "integer" },
          },
        },
        Player: {
          type: "object",
          properties: {
            ...playerSwaggerProps,
          },
        },
        TeamPlayer: {
          type: "object",
          properties: {
            ...playerSwaggerProps,
            positionNum: { type: "number" },
            isPlaying: { type: "boolean" },
          },
        },
        Week: {
          type: "object",
          properties: {
            id: { type: "number" },
            weekNum: { type: "number" },
            endDate: { type: "string", format: "date-time" },
            deadlineDate: { type: "string", format: "date-time" },
            isCurrent: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Team: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            credit: { type: "number" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
            userId: { type: "number" },
            players: {
              type: "array",
              items: { $ref: "#/definitions/TeamPlayer" },
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "number" },
            username: { type: "string" },
            firstname: { type: "string" },
            lastname: { type: "string" },
            email: { type: "string", format: "email" },
            birthday: { type: "string", format: "date-time" },
            country: { type: "string" },
            profileImage: { type: "string" },
            age: { type: "number" },
            updatedAt: { type: "string", format: "date-time" },
            createdAt: { type: "string", format: "date-time" },
            isFollowed: { type: "boolean" },
            score: { type: "number" },
          },
        },
        UserInfo: {
          type: "object",
          properties: {
            id: { type: "number" },
            username: { type: "string" },
            firstname: { type: "string" },
            lastname: { type: "string" },
            profileImage: { type: "string" },
            isFollowed: { type: "boolean" },
            age: { type: "number" },
          },
        },
        InvalidResponse: {
          type: "object",
          properties: {
            status: { type: "boolean", example: false },
            errorType: { type: "string" },
            message: { type: "string" },
          },
        },
      },
    },
    apis: ["./src/routes/*.ts"],
  };

  return options;
};
