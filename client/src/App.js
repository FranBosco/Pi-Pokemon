import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Details from './components/Details';
import Create from './components/Create';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Route exact path="/" component={LandingPage} />
				<Route exact path="/home/details/:id" component={Details} />
				<Route exact path="/home" component={Home} />
				<Route exact path="/create" component={Create} />
			</div>
		</BrowserRouter>
	);
}

export default App;
