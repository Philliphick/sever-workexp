// plantService.mjs
const API_URL = 'https://trefle.io/api/v1/plants';
const API_TOKEN = process.env.TREFLE_API_TOKEN;

const handleRequest = async (path, params = {}) => {
  const queryParams = new URLSearchParams({ ...params, token: API_TOKEN });
  const response = await fetch(`${API_URL}${path}?${queryParams}`);
  
  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Error ${response.status}: ${response.statusText}`, errorBody);
    throw new Error(`API request failed: ${errorBody}`);
  }

  return response.json();
};

export const getAllPlants = async () => {
  const results = await handleRequest('/');

  // Log the results to understand the structure
  console.log("Fetched results:", results);

  // Check if results.data is an array
  if (!Array.isArray(results.data)) {
    throw new Error("Expected results.data to be an array");
  }

  return results.data.map(result => ({
    id: result.id,
    common_name: result.common_name,
    scientific_name: result.scientific_name,
    image_url: result.image_url,
    year: result.year, 
    bibliography: result.bibliography,
    family: result.family

  }));
};

// id: 262017,
//       common_name: 'Meadowsweet',
//       slug: 'filipendula-ulmaria',
//       scientific_name: 'Filipendula ulmaria',
//       year: 1879,
//       bibliography: 'Trudy Imp. S.-Peterburgsk. Bot. Sada 6: 251 (1879)',
//       author: '(L.) Maxim.',
//       status: 'accepted',
//       rank: 'species',
//       family_common_name: 'Rose family',
//       genus_id: 12148,
//       image_url: 'https://bs.plantnet.org/image/o/53c73903dc455a3d734b193dad7d9d8c4ec0e324',
//       synonyms: [Array],
//       genus: 'Filipendula',
//       family: 'Rosaceae',
//       links: [Object]

export const getPlantByName = async (name) => {
  const results = await handleRequest('/', { 'filter[common_name]': name });
  
  // Return a subset of fields if needed
  return results.map(result => ({
    id: result.id,
    common_name: result.common_name,
    scientific_name: result.scientific_name,
    // Add more fields as needed
  }));
};
