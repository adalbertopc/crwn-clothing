import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SingInAndSingUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			currentUser: null,
		};
	}
	unsubscribeFromAuth = null;
	//repasar todo este codigo
	//esto es para saber el state cada que alguien inicia o cierra sesion
	componentDidMount() {
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = createUserProfileDocument(userAuth);
				(await userRef).onSnapshot((snapShot) => {
					this.setState({
						currentUser: {
							id: snapShot.id,
							...snapShot.data(),
						},
					});
				});
			} else {
				this.setState({ currentUser: userAuth });
			}
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header currentUser={this.state.currentUser} />
				<Switch>
					<Route exact path='/' component={HomePage}></Route>
					<Route path='/shop' component={ShopPage}></Route>
					<Route path='/sign' component={SingInAndSingUpPage}></Route>
				</Switch>
			</div>
		);
	}
}

export default App;
