const { initailizeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const { getFirestore, doc, setDoc, collection, getDoc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

let app;
let firestoredb

const initializeFirebase = () => {
    try {
        app = initailizeApp(firebaseConfig);  
        firestoredb = getFirestore();
        console.log('Firebase initialized'); 
        return app;   
    }
    catch (error) {
        if (!/already exists/.test(error.message)) {
            console.error('Firebase initialization error', error.stack);
        }
    }
};

const uploadProcessData = async (data) => {
    const dataToUpload = {
        key1: "test",
        key2: 123,
        key3: new Date().toISOString(),

    };
    try {
        const document = doc(firestoredb, 'testing', 'testing-id');
        let dataUploaded = await setDoc(document, dataToUpload);
        return dataUploaded;
    }
    catch (error) {
        console.error('Error uploading data', error.stack);
    }
};

const getProcessData = async () => {
    try {
        const document = doc(firestoredb, 'testing', 'testing-id');
        const data = await getDoc(document);
        if (data.exists()) {
            return data.data();
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error('Error getting data', error.stack);
    }
}; 

const getFirebaseApp = () => {
    return app || initializeFirebase();
};

module.exports = { initializeFirebase, getFirebaseApp, uploadProcessData, getProcessData };