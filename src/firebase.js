import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDJnO2o0r7a4xxKzotE3HGpvL_1KjPpsfw",
  authDomain: "netflix-clone-cfce8.firebaseapp.com",
  projectId: "netflix-clone-cfce8",
  storageBucket: "netflix-clone-cfce8.appspot.com",
  messagingSenderId: "1034609932661",
  appId: "1:1034609932661:web:36213cf19648308a383b3c",
});

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };
export default db; //export default hanya memiliki 1 tiap file
