import express from "express";
import nunjucks from "nunjucks";
import "dotenv/config";
import api from "./routes/api.mjs";
import web from "./routes/web.mjs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.static("public"));

app.use("/api", api); // api router which fetches external data
app.use("/", web); // for making requests to api for users to edit

// Configure Nunjucks
nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true, // optional: enables auto-refresh for changes
});

app.set("view engine", "njk");

app.listen(3005, () => {
  console.log("Server running on http://localhost:3005");
});

