const express = require("express");
const app = express();
const apiRoutes = require("./services/apiRoutes.cjs");
const appRoutes = require("./services/appRoutes.cjs");

app.use("/api", apiRoutes);
app.use("/", appRoutes); 

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
