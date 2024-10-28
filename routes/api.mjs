import express from 'express';
import { getByName, getAll } from '../controllers/plantController.mjs';

const apiRoutes = express.Router();

// Get all plants
apiRoutes.get("/plants", getAll);

// Get a plant by common name
apiRoutes.get("/plant/:name", getByName);

export default apiRoutes;
