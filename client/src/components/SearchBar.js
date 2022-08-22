import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName } from '../actions';

export default function SearchBar() {
	const [name, setName] = useState('');
	const dispatch = useDispatch();

	function handleChange(e) {
		e.preventDefault();
		setName(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (name.length > 1) {
			dispatch(searchByName(name));
		} else {
			alert('Debe ingresar un nombre de Pokemon valido');
		}
	}

	return (
		<div>
			<form onSubmit={(e) => handleSubmit(e)}>
				<input
					value={name}
					className="searchInput"
					type="text"
					placeholder="Search Pokemon"
					onChange={(e) => handleChange(e)}
				></input>
				<button className="searchBtn" type="submit">
					Search
				</button>
			</form>
		</div>
	);
}
