import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA_D4hy4mAWkrQRmGb4CuftGOHe1LRVUYU",
    authDomain: "notestest-359bf.firebaseapp.com",
    projectId: "notestest-359bf",
    storageBucket: "notestest-359bf.appspot.com",
    messagingSenderId: "204514535654",
    appId: "1:204514535654:web:57111096a8a9846769b327"
  };
  firebase.initializeApp(firebaseConfig);
  const projectFirebase = firebase.firestore()
  const projectAuth = firebase.auth()


  const timestamp = firebase.firestore.Timestamp

  export { projectFirebase, projectAuth, timestamp }