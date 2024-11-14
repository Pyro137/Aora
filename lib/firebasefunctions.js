import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { getFirestore, query, orderBy, limit} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBDYDHoak7WG-mtCTO2-Qrx9rZDCykccsI",
    authDomain: "metin-aora-a770e.firebaseapp.com",
    projectId: "metin-aora-a770e",
    storageBucket: "metin-aora-a770e.firebasestorage.app",
    messagingSenderId: "873670378501",
    appId: "1:873670378501:web:e23ee9a7dc127c277f086c",
    measurementId: "G-FYE3P3PKY1"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();


export const addUser = async (username, email, password) => {
    try {
        // Hash the passwor

        // Add user data to Firestore
        await db.collection('users').add({
            username: username,
            email: email,
            password: password,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        console.log("User data saved in Firestore.");
    } catch (error) {
        console.error("Error adding user:", error);
    }
};

export const addVideo = async (creator,description,thumbnailUrl,title, videoUrl) => {
    try {
        // Hash the passwor

        // Add user data to Firestore
        await db.collection('videos').add({
            creator: creator,
            description: description,
            thumbnailUrl: thumbnailUrl,
            title: title,
            videoUrl:videoUrl,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        console.log("Video data saved in Firestore.");
    } catch (error) {
        console.error("Error adding user:", error);
    }
};


export const fetchVideosFromFirestore= async ()=> {
    const querySnapshot = await getDocs(collection(db, "videos"));
    const videos = [];
    querySnapshot.forEach((doc) => {
      videos.push({ id: doc.id, ...doc.data() });
    });
    return videos;
  }


  export const fetchLatestVideosFromFirestore = async (numPosts = 10) => {
    try {
        const latestPostsQuery = query(
            collection(db, "videos"),
            orderBy("createdAt", "desc"),
            limit(numPosts)
        );

        const querySnapshot = await getDocs(latestPostsQuery);
        const latestPosts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        console.log("Latest Posts:", latestPosts);
        return latestPosts;
    } catch (error) {
        console.error("Error fetching latest posts:", error);
        return [];
    }
};