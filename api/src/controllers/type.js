const axios = require('axios');
const { Type } = require('../db');

const getAllTypes = async (req, res) => {
	try {
		const types = await axios.get('https://pokeapi.co/api/v2/type');
		const apiTypes = types.data.results.map((e) => e.name);
		apiTypes.map((el) =>
			Type.findOrCreate({
				where: { name: el }
			})
		);
		const allTypes = await Type.findAll();
		res.json(allTypes);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getAllTypes
};
