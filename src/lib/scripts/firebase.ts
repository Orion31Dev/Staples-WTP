import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { get, ref, getDatabase } from 'firebase/database';
import { PUBLIC_FIREBASE_API_KEY } from '$env/static/public';

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
const db = getDatabase(app);

export const analytics = getAnalytics(app);

export async function getDraftStatuses() {
	return (await get(ref(db, 'drafts'))).val();
}

export async function getQuestions() {
    return (await get(ref(db, 'questions'))).val();
}