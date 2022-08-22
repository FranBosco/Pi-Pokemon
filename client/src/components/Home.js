import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes } from '../actions';
import Paginado from './Paginado';
import { typeFilter, createdFilter, orderSort } from '../actions/index';
import '../styles/Home.css';
import Pokemons from './Pokemons';
import NavBar from './NavBar';
import SearchBar from './SearchBar';

export default function Home() {
	const dispatch = useDispatch();
	//selecciono de mi estado el array de pokemons

	const types = useSelector((state) => state.allTypes);
	const [order, setOrder] = useState('');

	//reemplaza el matchdispatchtoprops
	//lo que ponga dentro del [] reemplaza al componentdidmount, es decis, q cuando se monte lo que le pase en el array va a ejecutarse el useEffect
	useEffect(() => {
		dispatch(getTypes());
	}, []);

	function handleClick(e) {
		e.preventDefault();
		dispatch(getPokemons());
	}

	function handleSelectTypes(e) {
		e.preventDefault();
		dispatch(getTypes(e.target.value));
	}

	function handleFilterTypes(e) {
		dispatch(typeFilter(e.target.value));
	}

	function handleFilterCreated(e) {
		dispatch(createdFilter(e.target.value));
	}

	function handleOrderName(e) {
		e.preventDefault();
		dispatch(orderSort(e.target.value));
		setOrder(`ordenado, ${e.target.value}`);
	}

	return (
		<div className="homeContainer">
			<div>
				<NavBar />
			</div>
			<div>
				<SearchBar />
			</div>
			<h1>PokeApp</h1>
			<button
				className="homeRefreshBtn"
				onClick={(e) => {
					handleClick(e);
				}}
			>
				Refresh
			</button>
			<h2>Order by:</h2>
			<div className="filterContainer">
				<div className="filterNameContainer">
					<h3>Alphabetic/Attack</h3>
					<select className="filterName" onChange={(e) => handleOrderName(e)}>
						<option value="default">Default</option>
						<option value="az">A-Z</option>
						<option value="za">Z-A</option>
						<option value="bestAtk">Best atk</option>
						<option value="worstAtk">Worst atk</option>
					</select>
				</div>

				<div className="createdByContainer">
					<h3>Created by</h3>
					<select
						className="filterCreated"
						onChange={(e) => handleFilterCreated(e)}
					>
						<option value="api">Api</option>
						<option value="created">Created</option>
					</select>
				</div>
				<div className="typesContainer">
					<h3>Type</h3>
					<select className="filterType" onChange={(e) => handleFilterTypes(e)}>
						<option value="all">All</option>
						{types.map((t) => {
							return (
								<option key={t.id} value={t.name}>
									{t.name}
								</option>
							);
						})}
					</select>
				</div>
			</div>
			<Pokemons />
		</div>
	);
}
