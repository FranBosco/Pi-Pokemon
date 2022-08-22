const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { Op } = require('sequelize');

// funcion para traer los pokemon de la api
const dataApi = async () => {
	try {
		const apiURL = await axios.get(
			'https://pokeapi.co/api/v2/pokemon?offset=0&limit=40'

			// me trae 40 pkm con las props name y url, en url esta la info de cada pkm
		);
		const info = await apiURL.data.results.map(async (el) => {
			const pkmURL = (await axios.get(el.url)).data;

			// accedo a la prop url de cada pkm que es donde se encuentran las props necesarias
			return {
				id: pkmURL.id,
				name: pkmURL.name,
				hp: pkmURL.stats[0].base_stat,
				type: pkmURL.types.map((e) => e.type.name).join(', '),
				attack: pkmURL.stats[1].base_stat,
				defense: pkmURL.stats[2].base_stat,
				speed: pkmURL.stats[5].base_stat,
				height: pkmURL.height,
				weight: pkmURL.weight,
				image: pkmURL.sprites.other.dream_world.front_default,
				sprite: pkmURL.sprites.front_default
			};
		});

		const totalInfo = await Promise.all(info);
		return totalInfo;
	} catch (error) {
		console.log(error);
	}
};
const dataDb = async () => {
	try {
		let infoDb = await Pokemon.findAll({
			include: {
				model: Type,
				attributes: ['name'],
				through: {
					attributes: []
				}
			}
		});

		return infoDb.map((el) => {
			return {
				id: el.id,
				name: el.name,
				hp: el.hp,
				type: el.types.map((e) => e.name).join(', '),
				attack: el.attack,
				defense: el.defense,
				speed: el.speed,
				height: el.height,
				weight: el.weight,
				image: el.image,
				sprite: el.sprite
			};
		});
	} catch (error) {
		console.log(error);
	}
};

//concateno los pkm que me traigo de la api y los de la db en una sola funcion
const allPokemon = async () => {
	try {
		const apiPkm = await dataApi();
		const dbPkm = await dataDb();
		const allPkm = dbPkm.concat(apiPkm);
		return allPkm;
	} catch (error) {
		console.log(error);
	}
};
// funcion para traer los pokemon de la base de datos

//-----------------------------------------------------------------------------------------------------
const getAllPkm = async (req, res, next) => {
	const { name } = req.query;
	//si me posan un name, busco en la api y en la db si alguno coincide

	try {
		if (name) {
			const pkmByName = await axios.get(
				` https://pokeapi.co/api/v2/pokemon/${name}`
			);
			let pkmApi = {
				id: pkmByName.data.id,
				name: pkmByName.data.name,
				hp: pkmByName.data.stats[0].base_stat,
				attack: pkmByName.data.stats[1].base_stat,
				defense: pkmByName.data.stats[2].base_stat,
				speed: pkmByName.data.stats[5].base_stat,
				height: pkmByName.data.height,
				weight: pkmByName.data.weight,
				image: pkmByName.data.sprites.other.dream_world.front_default,
				type: pkmByName.data.types.map((e) => e.type.name).join(', '),
				sprite: pkmByName.data.sprites.front_default
			};

			const pkmDb = await Pokemon.findAll({
				where: {
					name: { [Op.like]: `%${name}%` }
				},
				include: { model: Type }
			});

			let pkm = pkmApi.concat(pkmDb);
			if (pkm.length) {
				res.status(200).send(pkm);
			} else {
				res.status(400).send('Debe ingresar un nombre valido y en minusculas');
			}
			//si no me pasan un name, retorno todos los pokemon
		} else {
			const allPokemons = await allPokemon();

			res.send(allPokemons);
		}
	} catch (error) {
		res.send(error);
	}
};

//funcion para traer por id
const pkmById = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (id.length > 10) {
			const pkmDbId = await Pokemon.findBypk(id, {
				include: Type
			});
			return res.status(200).send(pkmDbId);
		} else {
			const pkmApiId = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${id}`
			);
			const dataApiId = {
				id: pkmApiId.data.id,
				name: pkmApiId.data.name,
				type: pkmApiId.data.types.map((e) => e.type.name).join(', '),
				hp: pkmApiId.data.stats[0].base_stat,
				attack: pkmApiId.data.stats[1].base_stat,
				defense: pkmApiId.data.stats[2].base_stat,
				speed: pkmApiId.data.stats[5].base_stat,
				height: pkmApiId.data.height,
				weight: pkmApiId.data.weight,
				image: pkmApiId.data.sprites.other.dream_world.front_default,
				sprite: pkmApiId.data.sprites.front_default
			};

			return res.status(200).send(dataApiId);
		}
	} catch (error) {
		console.log(error);
	}
};

//funcion para crear un pokemon
const createPkm = async (req, res) => {
	try {
		const {
			id,
			name,
			type,
			hp,
			attack,
			defense,
			speed,
			height,
			weight,
			image,
			sprite,
			createdInDb
		} = req.body;
		let newPokemon = await Pokemon.create({
			id,
			name,
			hp,
			attack,
			defense,
			speed,
			height,
			weight,
			image,
			sprite,
			createdInDb
		});
		let typeDb = await Type.findAll({
			where: { name: type }
		});
		newPokemon.addType(typeDb);
		res.status(200).send('Your pokemon has been created!');
	} catch (error) {
		console.log(error);
		res.status(400).send('Cannot create your Pokemon');
	}
};

module.exports = {
	getAllPkm,
	pkmById,
	createPkm
};