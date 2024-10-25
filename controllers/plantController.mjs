export const getAll = async (req, res) => {
    try {
        const response = await fetch(`https://trefle.io/api/v1/plants?token=YOUR_API_TOKEN`);

        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`Error ${response.status}: ${response.statusText}`, errorBody);
            return res.status(response.status).json({ error: 'API request failed', details: errorBody });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Caught error:', error);
        res.status(500).json({ error: 'Sorry, no plants found', details: error.message });
    }
};

export const getByName = async (req, res) => {
    const { name } = req.params;
    try {
        const response = await fetch(`https://trefle.io/api/v1/plants?token=YOUR_API_TOKEN&filter[common_name]=${name}`);
        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Error response:', errorBody);
            return res.status(response.status).json({ error: 'API request failed', details: errorBody });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Caught error:', error);
        res.status(500).json({ error: 'Sorry, no plants found', details: error.message });
    }
};
