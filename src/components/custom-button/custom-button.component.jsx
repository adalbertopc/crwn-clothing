import React from 'react';
import './custom-button.styles.scss';
//Children es lo que esta en medio de las 2 etiquetas
const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
	<button className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
		{children}
	</button>
);

export default CustomButton;
