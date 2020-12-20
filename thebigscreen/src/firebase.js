import firebase from 'firebase'

const firebaseConfig = {

        apiKey: "AIzaSyDOEVbloBJ8wz0wZAa7fdqnUFGE2fp3hoE",
        authDomain: "the-big-screen-9a8e4.firebaseapp.com",
        projectId: "the-big-screen-9a8e4",
        storageBucket: "the-big-screen-9a8e4.appspot.com",
        messagingSenderId: "125272397544",
        appId: "1:125272397544:web:020581f0477e4a07821b5d"

};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const db = firebase.firestore()

export { auth, provider }
export default db