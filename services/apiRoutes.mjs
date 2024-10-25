import express from 'express';
import * as plantController from '../controllers/plantController.mjs'; // Change the import style

const apiRoutes = express.Router();

// Get all plants
apiRoutes.get('/plants', plantController.getAll);

// Get a plant by common name
apiRoutes.get('/plant/:name', plantController.getByName);

export default apiRoutes; // Use export default for ES Modules