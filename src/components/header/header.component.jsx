import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crwn-logo.svg';
import './header.styles.scss';

const Header = ({ currentUser }) => (
	<div className='header'>
		<Link to='/' className='logo-container'>
			<Logo className='logo'></Logo>
		</Link>
		<div className='options'>
			<Link to='/shop' className='option'>
				SHOP
			</Link>
			<Link to='/contact' className='option'>
				CONTACT
			</Link>

			{currentUser ? (
				<div className='option' onClick={() => auth.signOut()}>
					SIGN OUT
				</div>
			) : (
				<Link to='/sign'>SIGN IN</Link>
			)}
		</div>
	</div>
);

export default Header;
