import express from "express";
import fetch from "node-fetch";

const appRoutes = express.Router();


// Route to render a list of plants
appRoutes.get("/", async (req, res) => {
  try {
    const response = await fetch(`http://localhost:3005/api/plants`);

    const data = await response.json();
    console.log("in app routes", data);

    res.render("index.njk", {
      title: "Plants List",
      page: "plants",
      plants: data.data,
    });
  } catch (error) {
    console.error("Error fetching plants:", error);
    res.status(500).send("Error fetching plants.");
  }
});

// Route for a specific plant
appRoutes.get("/plant/:name", async (req, res) => {
  const { name } = req.params;
  try {
    console.log("in plants", name);

    const response = await fetch(`http://localhost:3005/api/plant/${name}`);
    const data = await response.json();
    res.render("index.njk", { title: name, page: "plantDetail", plant: data });
  } catch (error) {
    console.error("Error fetching plant:", error);
    res.status(500).send("Error fetching plant details.");
  }
});

export default appRoutes;
