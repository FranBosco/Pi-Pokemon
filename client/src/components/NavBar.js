import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
	return (
		<div className="navBarContainer">
			<nav className="nav">
				<div className="link">
					<Link to="/create">
						<button>Create your Pokemon!</button>
					</Link>
				</div>
			</nav>
			{/* <div>
				<SearchBar />
			</div> */}
		</div>
	);
}
