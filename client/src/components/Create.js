import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes } from '../actions';
import { Link, useHistory } from 'react-router-dom';
import { createPokemon } from '../actions';

export default function Create() {
	const dispatch = useDispatch();
	const types = useSelector((state) => state.allTypes);
	const history = useHistory();
	const [input, setInput] = useState({
		name: '',
		image: '',
		hp: '',
		attack: '',
		defense: '',
		speed: '',
		height: '',
		weight: '',
		types: []
	});
	//useEffect para despachar los types
	useEffect(() => {
		dispatch(getTypes());
	}, []);
	//para q vaya guardando las cosas q vamos escribiendo en los input
	function handleChange(e) {
		setInput({
			...input,
			// cuando ejecute, traeme lo qeu ya habia en input y agregale el e.target.value en el valor con el name correspondiente, va a tomar el cambio en el input con ese name
			[e.target.name]: e.target.value
		});
	}

	function handleSelect(e) {
		setInput({
			...input,
			types: [...input.types, e.target.value]
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		console.log(input);
		dispatch(createPokemon(input));
		alert('your pokemon has been created');
		setInput({
			name: '',
			image: '',
			hp: '',
			attack: '',
			defense: '',
			speed: '',
			height: '',
			weight: '',
			type: []
		});
		history.push('/home');
	}

	return (
		<div className="createContainer">
			<Link to="/home">
				<button>Return Home</button>
			</Link>
			<h1>Create your Pokemon!</h1>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div>
					<label>Name: </label>
					<input
						type="text"
						value={input.name}
						name="name"
						onChange={(e) => handleChange(e)}
					></input>
				</div>
				<div>
					<label>image: </label>
					<input
						type="url"
						value={input.image}
						name="image"
						onChange={(e) => handleChange(e)}
					></input>
				</div>
				<div>
					<label>Hp: </label>
					<input
						type="number"
						value={input.hp}
						name="hp"
						onChange={(e) => handleChange(e)}
					></input>
				</div>
				<div>
					<label>Attack: </label>
					<input
						type="number"
						value={input.attack}
						name="attack"
						onChange={(e) => handleChange(e)}
					></input>
				</div>
				<div>
					<label>Defense: </label>
					<input
						type="number"
						value={input.defense}
						name="defense"
						onChange={(e) => handleChange(e)}
					></input>
				</div>
				<div>
					<label>Speed: </label>
					<input
						type="number"
						value={input.speed}
						name="speed"
						onChange={(e) => handleChange(e)}
					></input>
				</div>
				<div>
					<label>Height: </label>
					<input
						type="number"
						value={input.height}
						name="height"
						onChange={(e) => handleChange(e)}
					></input>
				</div>
				<div>
					<label>Weight: </label>
					<input
						type="number"
						value={input.weight}
						name="weight"
						onChange={(e) => handleChange(e)}
					></input>
				</div>
				<div>
					<label>Types: </label>
					<select onChange={(e) => handleSelect(e)}>
						{types.map((t) => (
							<option type="checkbox" key={t.name} value={t.name}>
								{t.name}
							</option>
						))}
					</select>
					<ul>
						<li key={types.id}>{input.types.map((t) => t + ', ')}</li>
					</ul>
				</div>
				<button type="submit">Create</button>
			</form>
		</div>
	);
}
