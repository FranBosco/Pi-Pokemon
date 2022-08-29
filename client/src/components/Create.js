import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes } from '../actions';
import { Link, useHistory } from 'react-router-dom';
import { createPokemon } from '../actions';
import '../styles/Create.css';

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
		type: []
	});
	//useEffect para despachar los types
	useEffect(() => {
		dispatch(getTypes());
	}, [dispatch]);
	//para q vaya guardando las cosas q vamos escribiendo en los input
	const handleChange = (e) => {
		// cuando ejecute, traeme lo qeu ya habia en input y agregale el e.target.value en el valor con el name correspondiente, va a tomar el cambio en el input con ese name
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
		setFormErrors(
			validate({
				...input,
				[e.target.name]: e.target.value
			})
		);
	};

	const handleSelect = (e) => {
		setInput({
			...input,
			type: [...input.type, e.target.value]
		});
		setFormErrors(
			validate({
				...input,
				type: [...input.type, e.target.value]
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
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
	};

	const [formErrors, setFormErrors] = useState({});
	const [disableBtn, setDisableBtn] = useState(
		Object.keys(formErrors).length > 1 ? true : false
	);

	function validateName(str) {
		if (typeof str === 'number') return true;
		if (typeof str !== 'string') return true;
		if (str.length < 1) return true;
		if (str[0] === ' ') return true;
	}

	function validateImg(str) {
		if (typeof str !== 'string') return true;
	}

	function validateTypes(input) {
		if (!input) return true;
		if (input.length > 2) return true;
	}

	function validateStats(num) {
		if (isNaN(num)) return true;
		if (num < 1 || num > 999) return true;
	}

	function validate(data) {
		let errors = {};
		if (validateName(data.name)) errors.name = 'Invalid name';
		if (validateImg(data.image)) errors.image = 'Invalid image url';
		if (validateTypes(data.type)) errors.type = 'Select types: min 1 max 2';
		if (validateStats(data.hp)) errors.hp = 'number > 0 and < 999';
		if (validateStats(data.speed)) errors.speed = 'number > 0 and < 999';
		if (validateStats(data.attack)) errors.attack = 'number > 0 and < 999';
		if (validateStats(data.defense)) errors.defense = 'number > 0 and < 999';
		if (validateStats(data.weight)) errors.weight = 'number > 0 and < 999';
		if (validateStats(data.height)) errors.height = 'number > 0 and < 999';

		return errors;
	}

	return (
		<div className="createContainer">
			<Link to="/home">
				<button className="btnReturnCreate">Return Home</button>
			</Link>
			<h1 className="CreateTitle">Create your Pokemon!</h1>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div className="formCreate">
					<div className="FormName">
						<label>Name: </label>
						<input
							type="text"
							value={input.name}
							name="name"
							onChange={(e) => handleChange(e)}
						></input>
						{formErrors.name ? (
							<h4 className="errorForm">
								<small>{formErrors.name}</small>
							</h4>
						) : (
							false
						)}
					</div>
					<div className="formImg">
						<label>image: </label>
						<input
							type="url"
							value={input.image}
							name="image"
							onChange={(e) => handleChange(e)}
						></input>
						{formErrors.image ? (
							<h4 className="errorForm">{formErrors.image}</h4>
						) : (
							false
						)}
					</div>
					<div className="formHp">
						<label>Hp: </label>
						<input
							type="number"
							value={input.hp}
							name="hp"
							onChange={(e) => handleChange(e)}
						></input>
						{formErrors.hp ? (
							<h4 className="errorForm">{formErrors.hp}</h4>
						) : (
							false
						)}
					</div>
					<div className="formAtk">
						<label>Attack: </label>
						<input
							type="number"
							value={input.attack}
							name="attack"
							onChange={(e) => handleChange(e)}
						></input>
						{formErrors.attack ? (
							<h4 className="errorForm">{formErrors.attack}</h4>
						) : (
							false
						)}
					</div>
					<div className="formDef">
						<label>Defense: </label>
						<input
							type="number"
							value={input.defense}
							name="defense"
							onChange={(e) => handleChange(e)}
						></input>
						{formErrors.defense ? (
							<h4 className="errorForm">{formErrors.defense}</h4>
						) : (
							false
						)}
					</div>
					<div className="formSpeed">
						<label>Speed: </label>
						<input
							type="number"
							value={input.speed}
							name="speed"
							onChange={(e) => handleChange(e)}
						></input>
						{formErrors.speed ? (
							<h4 className="errorForm">{formErrors.speed}</h4>
						) : (
							false
						)}
					</div>
					<div className="formHeight">
						<label>Height: </label>
						<input
							type="number"
							value={input.height}
							name="height"
							onChange={(e) => handleChange(e)}
						></input>
						{formErrors.height ? (
							<h4 className="errorForm">{formErrors.height}</h4>
						) : (
							false
						)}
					</div>
					<div>
						<label className="formWeight">Weight: </label>
						<input
							type="number"
							value={input.weight}
							name="weight"
							onChange={(e) => handleChange(e)}
						></input>
						{formErrors.weight ? (
							<h4 className="errorForm">{formErrors.weight}</h4>
						) : (
							false
						)}
					</div>
					<div className="formTypes">
						<label>Types: </label>
						<select onChange={(e) => handleSelect(e)}>
							{types.map((t) => (
								<option type="checkbox" key={t.name} value={t.name}>
									{t.name}
								</option>
							))}
						</select>
						<ul>
							<li className="TypesSelected" key={types.id}>
								{input.type.map((t) => t + ', ')}
							</li>
						</ul>

						{formErrors.type ? (
							<h4 className="errorForm">{formErrors.type}</h4>
						) : (
							false
						)}
					</div>
					<button
						type="submit"
						className="submitBtnCreate"
						disabled={disableBtn}
					>
						Create
					</button>
				</div>
			</form>
		</div>
	);
}
