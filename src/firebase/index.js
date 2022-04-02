import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyC7I_NKyWlrGX0RAKM2VBX5pS0dnv6WlVw",
	authDomain: "fakebook-bb252.firebaseapp.com",
	projectId: "fakebook-bb252",
	storageBucket: "fakebook-bb252.appspot.com",
	messagingSenderId: "647401392419",
	appId: "1:647401392419:web:247687d29b17a1e06fe496",
	measurementId: "G-TMZ2KPT0KE"
}

const app = initializeApp(firebaseConfig);

const storage = getStorage(app)

export { storage, ref, uploadBytesResumable, getDownloadURL, deleteObject }