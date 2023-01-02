require("dotenv").config();
require("express-async-errors");

// extra security packages
const helmet = require("helmet"); // sets HTTP headers that will secure your app to some extent
const cors = require("cors"); // allows requests across domains
const xss = require("xss-clean"); // sanitizes user POST, GET queries
const rateLimit = require("express-rate-limit"); // prevents incessant spam requests from client

const express = require("express");
const app = express();

// routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowsMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to a maximum of 100 requests per windowMS
  }),
);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use(express.json());

const connectDB = require("./db/connect");

const authenticateUser = require("./middleware/authentication");

// extra packages

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.get("/", (req, res) => {
  res.send(
    "This is the simple job API, login first and proceed to make your API request.",
  );
});

const port = process.env.PORT || 3000;

// start server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    );
  } catch (error) {
    console.log(error);
  }
};

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

start();
