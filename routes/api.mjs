import express from 'express';
import { getAllPlants } from '../service/plants.mjs';

const apiRoutes = express.Router();

// Get all plants
apiRoutes.get("/plants", getAllPlants);



export default apiRoutes;
