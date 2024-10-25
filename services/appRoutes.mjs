import express from 'express';
import fetch from 'node-fetch'; 

const appRoutes = express.Router();


// Homepage route
appRoutes.get("/", (req, res) => {
  res.render("index.njk", { title: "Home Page" });
});

// Route to render a list of plants
appRoutes.get("/plants", async (req, res) => {
  try {
    const response = await fetch(`http://localhost:3000/api/plants`);
    const data = await response.json();
    res.render("plants.njk", { title: "Plants List", plants: data });
  } catch (error) {
    console.error("Error fetching plants:", error);
    res.status(500).send("Error fetching plants.");
  }
});

// Route for a specific plant
appRoutes.get("/plant/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const response = await fetch(`http://localhost:3000/api/plant/${name}`);
    const data = await response.json();
    res.render("plantDetail.njk", { title: name, plant: data });
  } catch (error) {
    console.error("Error fetching plant:", error);
    res.status(500).send("Error fetching plant details.");
  }
});

export default appRoutes;
