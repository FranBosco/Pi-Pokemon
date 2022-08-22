import {
	GET_ALL_POKEMONS,
	GET_ALL_TYPES,
	GET_DETAILS,
	GET_BY_NAME,
	TYPE_FILTER,
	CREATED_FILTER,
	ORDER,
	CREATE_POKEMON
} from '../actions';

let initialState = {
	allPokemons: [],
	allPokemonsCopy: [],
	allTypes: [],
	pokemon: []
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_POKEMONS:
			return {
				...state,
				allPokemons: action.payload,
				allPokemonsCopy: action.payload
			};
		case GET_ALL_TYPES:
			return {
				...state,
				allTypes: action.payload
			};
		case GET_DETAILS:
			return {
				...state,
				pokemon: action.payload
			};
		case GET_BY_NAME:
			return {
				...state,
				allPokemons: action.payload
			};
		case TYPE_FILTER:
			const pokemonsFilterT = state.allPokemons;
			const filter =
				action.payload === 'all'
					? pokemonsFilterT
					: pokemonsFilterT.filter((e) => e.type.includes(action.payload));

			return {
				...state,
				allPokemons: filter
			};
		case CREATED_FILTER:
			const pokemonsFilterC = state.allPokemons;
			const pokemonsCreated =
				action.payload === 'created'
					? pokemonsFilterC.filter((el) => el.createdInDb)
					: pokemonsFilterC.filter((el) => !el.createdInDb);
			return {
				state,
				allPokemons: pokemonsCreated
			};
		case ORDER:
			let nameArray =
				action.payload === 'az'
					? state.allPokemons.sort(function (a, b) {
							if (a.name > b.name) {
								return 1;
							}
							if (a.name < b.name) {
								return -1;
							}
							return 0;
					  })
					: action.payload === 'za'
					? state.allPokemons.sort(function (a, b) {
							if (a.name > b.name) {
								return -1;
							}
							if (a.name < b.name) {
								return 1;
							}
							return 0;
					  })
					: action.payload === 'worstAtk'
					? state.allPokemons.sort(function (a, b) {
							if (a.attack > b.attack) {
								return 1;
							}
							if (a.attack < b.attack) {
								return -1;
							}
							return 0;
					  })
					: action.payload === 'bestAtk'
					? state.allPokemons.sort(function (a, b) {
							if (a.attack > b.attack) {
								return -1;
							}
							if (a.attack < b.attack) {
								return 1;
							}
							return 0;
					  })
					: state.allPokemons.sort(function (a, b) {
							if (a.id > b.id) {
								return 1;
							}
							if (a.id < b.id) {
								return -1;
							}
							return 0;
					  });
			return {
				...state,
				allPokemons: nameArray
			};

		default:
			return state;
	}
}

export default rootReducer;
