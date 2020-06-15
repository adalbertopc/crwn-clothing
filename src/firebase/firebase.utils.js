import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//datos de mi bd de firebase
const config = {
	apiKey: 'AIzaSyCJ9q6yhoaZLvJ6aD0k055tfanh8-LHHAk',
	authDomain: 'crwn-db-667c1.firebaseapp.com',
	databaseURL: 'https://crwn-db-667c1.firebaseio.com',
	projectId: 'crwn-db-667c1',
	storageBucket: 'crwn-db-667c1.appspot.com',
	messagingSenderId: '286662764261',
	appId: '1:286662764261:web:ed8cc8eaf918eadc7a560c',
	measurementId: 'G-PMBNDBM8L5',
};

//para crear en la bd el usuario
export const createUserProfileDocument = async (userAuth, additionalData) => {
	//si el usuario que inicio no existe return;
	if (!userAuth) return;
	//returna el usuario que tenga el id que especificamos (exista o no)
	const userRef = firestore.doc(`users/${userAuth.uid}`);
	//retorna una promise de snapshot
	const snapShot = await userRef.get();
	//si el campo exists del obj snapshot entonces insertar un nuevo documento(user) en la base de datos
	if (!snapShot.exists) {
		//destruct al userAuth con solo los datos que necesitamos xq retorna mucho innecesarios
		const { displayName, email } = userAuth;
		//creamos un date para ver en que momento fue registrado
		const createdAt = new Date();
		//tryCatch x si hay un error
		try {
			//aqui es donde se registra en la BD
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
			/* Es lo mismo qe esto pero simplificado:
			await userRef.set({
				displayName: displayName,
				email: email,
				createdAt: createdAt,
				...additionalData,
			});
			*/
		} catch (error) {
			console.log('error creando usuario', error.message);
		}
	}

	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promp: 'select_account' });
//pop up ventana de login de google
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
