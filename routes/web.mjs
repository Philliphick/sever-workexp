import express from "express";
import { getAllPlants } from "../service/plants.mjs";

const appRoutes = express.Router();

// insert code in the space available to fetch the data you need.
// There is a controller available for you to use to fetch some plant data.
// getAllPlants
// Will Return: all plants
// Extension: if you implement a search feature, you can pass the query parameter
// as an argument to the above controller to return a result for a specific plant.

// Route to render a list of plants
appRoutes.get("/", async (req, res, next) => {
  const { plant } = req.query;
  console.log(plant, "web");
  if (plant) {
    console.log("here", plant, plant);
    try {
      const plants = await getAllPlants(plant);
      console.log("plants", plants);
      return res.render("index.njk", {
        title: "Search results:",
        page: "searchResult",
        plants,
      });
    } catch (error) {
      console.error("Error fetching plants:", error);
      return res.status(500).send("Error fetching plants.");
    }
  }

  try {
    const plants = await getAllPlants(); // Call getAllPlants directly
    res.render("index.njk", {
      title: "Plants List",
      page: "plants",
      plants, // Pass the fetched plants directly
    });
  } catch (error) {
    console.error("Error fetching plants:", error);
    res.status(500).send("Error fetching plants.");
  }
});

// Route for a specific plant
// appRoutes.get("/plant/:name", async (req, res) => {
//   const { name } = req.params;
//   try {
//     const plant = await getPlantByName(name);
//     if (!plant) {
//       return res.status(404).send("Plant not found.");
//     }
//     res.render("index.njk", {
//       title: plant.common_name,
//       page: "plantResult",
//       plant,
//     });
//   } catch (error) {
//     console.error("Error fetching plant:", error);
//     res.status(500).send("Error fetching plant details.");
//   }
// });

export default appRoutes;
