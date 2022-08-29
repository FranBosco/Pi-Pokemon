import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pokemon.css';

export default function Pokemon({
	id,
	name,
	type,
	image,
	hp,
	attack,
	defense,
	speed,
	height,
	weight,
	createdInDb
}) {
	return (
		<>
			<div className="pkmCard">
				<h3 className="cardName">
					{id} - {name}
				</h3>
				<img className="cardImg" src={image} alt="img not found"></img>
				<h4>Types: {type}</h4>

				<div>
					<Link to={`/home/details/${id}`}>
						<button>See more details</button>
					</Link>
				</div>
			</div>
		</>
	);
}
