import { getAllPlants, getPlantByName } from '../service/plants.mjs';


export const getAll = async (req, res) => {
  try {
    const plants = await getAllPlants();
    res.json(plants);
  } catch (error) {
    console.error("Caught error:", error);
    res.status(500).json({ error: "Sorry, no plants found", details: error.message });
  }
};

export const getByName = async (req, res) => {
  const { name } = req.params;
  try {
    const plants = await getPlantByName(name);
    if (plants.length === 0) {
      return res.status(404).json({ error: "Plant not found" });
    }
    res.json(plants);
  } catch (error) {
    console.error("Caught error:", error);
    res.status(500).json({ error: "Sorry, no plants found", details: error.message });
  }
};
