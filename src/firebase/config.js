import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyClQZ4fQtGpaVdMJgHNYnM_AFxjr0AxF2w",
    authDomain: "gallery-fc705.firebaseapp.com",
    projectId: "gallery-fc705",
    storageBucket: "gallery-fc705.appspot.com",
    messagingSenderId: "624555149882",
    appId: "1:624555149882:web:ede69576b0227dd0600303",
};

const app = initializeApp(firebaseConfig);

const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);

export { projectStorage, projectFirestore };
