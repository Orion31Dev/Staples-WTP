import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { get, set, ref, getDatabase } from 'firebase/database';
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	type User as FirebaseUser
} from 'firebase/auth';

import { get as storeGet } from 'svelte/store';

import { PUBLIC_FIREBASE_API_KEY } from '$env/static/public';
import { user } from '$lib/stores/user';

const firebaseConfig = {
	apiKey: PUBLIC_FIREBASE_API_KEY,
	authDomain: 'shs-wtp.firebaseapp.com',
	databaseURL: 'https://shs-wtp-default-rtdb.firebaseio.com',
	projectId: 'shs-wtp',
	storageBucket: 'shs-wtp.appspot.com',
	messagingSenderId: '413862155241',
	appId: '1:413862155241:web:915dec04a08a17e4fe3178',
	measurementId: 'G-Z8G62ZBHWQ'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);

// Database
const db = getDatabase(app);

export async function getDraftStatuses() {
	return (await get(ref(db, 'drafts'))).val();
}

export async function getQuestions() {
	return (await get(ref(db, 'questions'))).val();
}

async function isUserAdmin(uid: string) {
	return (await get(ref(db, `admin/${uid}`))).val() === true;
}

// Auth
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export interface User extends FirebaseUser {
	isAdmin: boolean;
}

export async function signInWithGoogle() {
	const res = await signInWithPopup(auth, provider);

	user.set({ ...res.user, isAdmin: await isUserAdmin(res.user.uid) });
}

export async function updateStatus(unit: number, q: number, status: number) {
	if (status < 0 || status > 4) {
		throw new Error('Rejected illegal status update.');
	}

	const curUser = storeGet(user);

	if (!curUser) {
		throw new Error('You are not signed in.');
	}

	const { uid } = curUser;

	if (!(await isUserAdmin(uid))) {
		throw new Error('You are not authorized to do this.');
	}

	try {
		await set(ref(db, `drafts/${unit}/${q}`), status);
	} catch {
		throw new Error('An internal error occurred.');
	}

	return true;
}

export async function signOut() {
	await auth.signOut();

	user.set(null);
}
