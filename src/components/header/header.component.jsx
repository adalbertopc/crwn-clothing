import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';

import { connect } from 'react-redux';

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

const mapStateToProps = (state) => ({
	currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
