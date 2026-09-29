const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
async function connectToDB() {
  try {
    await connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}
connectToDB();

// PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Swagger
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
const { stuffRouter } = require("./routes/stuffRoute");
app.use("/stuff", stuffRouter);

const { roleRouter } = require("./routes/roleRoute");
app.use("/role", roleRouter);

const { stuffRoleRouter } = require("./routes/stuffRoleRoute");
app.use("/stuffRole", stuffRoleRouter);

const { branchRouter } = require("./routes/branchRoute");
app.use("/branch", branchRouter);

const { groupRouter } = require("./routes/groupRoute");
app.use("/group", groupRouter);

const { groupStuffRouter } = require("./routes/groupStuffRoute");
app.use("/groupStuff", groupStuffRouter);

const { stageRouter } = require("./routes/stageRoute");
app.use("/stage", stageRouter);

const { lidStatusRouter } = require("./routes/lidStatusRoute");
app.use("/lidStatus", lidStatusRouter);

const { reasonLidRouter } = require("./routes/reasonLidRoute");
app.use("/reasonLid", reasonLidRouter);

const { lidRouter } = require("./routes/lidRoute");
app.use("/lid", lidRouter);

const { studentRouter } = require("./routes/studentRoute");
app.use("/student", studentRouter);

const { studentGroupRouter } = require("./routes/studentGroupRoute");
app.use("/studentGroup", studentGroupRouter);

const { lessonRouter } = require("./routes/lessonRoute");
app.use("/lesson", lessonRouter);

const { studentLessonRouter } = require("./routes/studentLessonRoute");
app.use("/studentLesson", studentLessonRouter);

const { paymentRouter } = require("./routes/paymentRoute");
app.use("/payment", paymentRouter);