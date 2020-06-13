import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SingInAndSingUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import Header from './components/header/header.component';

function App() {
	return (
		<div>
			<Header />
			<Switch>
				<Route exact path='/' component={HomePage}></Route>
				<Route path='/shop' component={ShopPage}></Route>
				<Route path='/sign' component={SingInAndSingUpPage}></Route>
			</Switch>
		</div>
	);
}

export default App;
