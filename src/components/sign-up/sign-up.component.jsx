import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import './sign-up.styles.scss';
class SignUp extends React.Component {
	constructor() {
		super();

		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: '',
		};
	}
	handleSubmit = async (e) => {
		e.preventDefault();
		const { displayName, email, password, confirmPassword } = this.state;
		if (password !== confirmPassword) {
			alert('contraseñas no coinciden');
			this.setState({ password: '', confirmPassword: '' });
			return;
		}
		if (password.length < 6) {
			alert('la contraseña debe tener mas de 6 caracteres');
			return;
		}
		try {
			const { user } = await auth.createUserWithEmailAndPassword(email, password);
			await createUserProfileDocument(user, { displayName });
			this.setState({ displayName: '', email: '', password: '', confirmPassword: '' });
		} catch (error) {
			console.log(error);
		}
	};

	handleChange = (e) => {
		const { name, value } = e.target;

		this.setState({ [name]: value });
	};
	render() {
		const { displayName, email, password, confirmPassword } = this.state;

		return (
			<div className='sign-up'>
				<h2 className='title'> I do not have an acount</h2>
				<span>Sign up with your email and password</span>

				<form action='' className='sign-up-form' onSubmit={this.handleSubmit}>
					<FormInput
						type='text'
						name='displayName'
						value={displayName}
						label='name'
						onChange={this.handleChange}
						required
					></FormInput>
					<FormInput
						type='email'
						name='email'
						value={email}
						label='email'
						onChange={this.handleChange}
						required
					></FormInput>
					<FormInput
						type='password'
						name='password'
						value={password}
						label='password'
						onChange={this.handleChange}
						required
					></FormInput>
					<FormInput
						type='password'
						name='confirmPassword'
						value={confirmPassword}
						label='confirm password'
						onChange={this.handleChange}
						required
					></FormInput>
					<CustomButton type='submit'>Sign Up</CustomButton>
				</form>
			</div>
		);
	}
}

export default SignUp;
