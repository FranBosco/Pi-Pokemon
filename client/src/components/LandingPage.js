import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';

export default function LandingPage() {
	return (
		<div className="landingContainer">
			<h1 className="landingTittle">Welcome to PokeApp!</h1>
			<Link to="/home">
				<button className="landingBtn">Enter</button>
			</Link>
		</div>
	);
}
