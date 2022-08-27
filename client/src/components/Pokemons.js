import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getPokemons } from '../actions';
import Paginado from './Paginado';
import Pokemon from './Pokemon';
import '../styles/Pokemons.css';

export default function Pokemons() {
	let dispatch = useDispatch();

	const pagePkm = useSelector((state) => state.allPokemons);

	const [currentPage, setCurrentPage] = useState(1);
	const [pkmPerPage, setPkmPerPage] = useState(12);
	const lastPkmPage = currentPage * pkmPerPage;
	const firstPkmPage = lastPkmPage - pkmPerPage;
	const pkmInPage = pagePkm.slice(firstPkmPage, lastPkmPage);

	const paginado = (page) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		dispatch(getPokemons());
	}, [dispatch]);

	return (
		<>
			<Paginado
				pkmPerPage={pkmPerPage}
				pagePkm={pagePkm.length}
				paginado={paginado}
			/>
			{pkmInPage.length > 0 ? (
				pkmInPage.map((p) => {
					return (
						<div key={p.id} className="pokemonCards">
							<Pokemon
								key={p.id}
								id={p.id}
								name={p.name}
								image={p.image}
								type={p.type}
							/>
						</div>
					);
				})
			) : (
				<h2 className="loading">Loading...</h2>
			)}
		</>
	);
}
