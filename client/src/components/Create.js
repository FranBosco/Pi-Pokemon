import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes } from '../actions';
import { Link } from 'react-router-dom';

export default function Create() {
	const dispatch = useDispatch();
	const types = useSelector((state) => state.allTypes);
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

	useEffect(() => {
		dispatch(getTypes());
	}, []);

	return (
		<div className="createContainer">
			<Link to="/home">
				<button>Return Home</button>
			</Link>
			<h1>Create your Pokemon!</h1>
			<div>
				<label>Name: </label>
				<input type="text" value={input.name} name="name"></input>
			</div>
			<div>
				<label>image: </label>
				<input type="url" value={input.image} name="image"></input>
			</div>
			<div>
				<label>Hp: </label>
				<input type="number" value={input.hp} name="hp"></input>
			</div>
			<div>
				<label>Attack: </label>
				<input type="number" value={input.attack} name="attack"></input>
			</div>
			<div>
				<label>Defense: </label>
				<input type="number" value={input.defense} name="defense"></input>
			</div>
			<div>
				<label>Speed: </label>
				<input type="number" value={input.speed} name="speed"></input>
			</div>
			<div>
				<label>Height: </label>
				<input type="number" value={input.height} name="height"></input>
			</div>
			<div>
				<label>Weight: </label>
				<input type="number" value={input.weight} name="weight"></input>
			</div>
			<div>
				<label>Types: </label>
				<select>
					{types.map((t) => (
						<option type="checkbox" key={t.name} value={t.name}>
							{t.name}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
