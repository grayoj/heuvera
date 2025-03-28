import fs from "fs";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Heuvera",
      version: "1.0.0",
      description: "Heuvera API documentation with Swagger",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.join(process.cwd(), "src/app/api/**/*.ts")],
};

const swaggerSpec = swaggerJSDoc(options);
const outputPath = path.join(process.cwd(), "public", "swagger.json");
fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));
