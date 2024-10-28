import express from "express";
import fetch from "node-fetch";

const appRoutes = express.Router();

// Utility function to fetch data from the API
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Error ${response.status}: ${errorBody}`);
  }
  return await response.json();
};

// Route to render a list of plants
appRoutes.get("/", async (req, res) => {
  try {
    console.log("hello")

    const data = await fetchData(`http://localhost:3005/api/plants`);
    console.log("Fetched plants:", data);

    res.render("index.njk", {
      title: "Plants List",
      page: "plants",
      plants: data.data, // Assuming data.data contains the plant array
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
    console.log("Fetching details for plant:", name);

    const data = await fetchData(`http://localhost:3005/api/plant/${name}`);
    res.render("index.njk", {
      title: name,
      page: "plantDetail",
      plant: data, // Assuming data contains the plant object
    });
  } catch (error) {
    console.error("Error fetching plant:", error);
    res.status(500).send("Error fetching plant details.");
  }
});

export default appRoutes;
