import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getDetails } from '../actions';

export default function Details() {
	let dispatch = useDispatch();
	let pkmDetail = useSelector((state) => state.pokemon);

	const { id } = useParams();

	useEffect(() => {
		dispatch(getDetails(id));
	}, [dispatch]);

	return (
		<>
			<div className="detailsContainer">
				<Link to="/home">
					<button>return to home</button>
				</Link>
				<div>
					<h1 className="detailName">
						{pkmDetail.id} - {pkmDetail.name}
					</h1>
					<img
						src={pkmDetail.image}
						alt="img not found"
						className="detailImg"
					></img>
					<h3 className="detailTypes">Types: {pkmDetail.type}</h3>
					<div className="detailStats">
						<ul>
							<li>Hp: {pkmDetail.hp}</li>
							<li>Attack: {pkmDetail.attack} </li>
							<li>Defense: {pkmDetail.defense}</li>
							<li>Speed: {pkmDetail.speed}</li>
							<li>Height: {pkmDetail.height}</li>
							<li>Weight: {pkmDetail.weight}</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
