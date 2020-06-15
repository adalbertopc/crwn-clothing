import React, { Component } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import './sign-in.styles.scss';

class SignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
		};
	}

	handleSubmit = async (e) => {
		e.preventDefault();

		const { email, password } = this.state;

		try {
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({ email: '', password: '' });
		} catch (error) {
			console.log(error);
		}
	};

	handleChange = (e) => {
		//agarra el value y name del target, en este caso email y password
		const { value, name } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		return (
			<div className='sign-in'>
				<h2>I already have an account</h2>
				<span>Sign in with your email and password</span>

				<form onSubmit={this.handleSubmit}>
					<FormInput
						name='email'
						value={this.state.email}
						type='email'
						handleChange={this.handleChange}
						required
						label='email'
					/>
					<FormInput
						name='password'
						value={this.state.password}
						type='password'
						handleChange={this.handleChange}
						required
						label='password'
					/>
					<div className='buttons'>
						<CustomButton type='submit' value='Submit'>
							SIGN IN
						</CustomButton>
						<CustomButton onClick={signInWithGoogle} isGoogleSignIn>
							{' '}
							SIGN IN WITH GOOGLE{' '}
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}

export default SignIn;
