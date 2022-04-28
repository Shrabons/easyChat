
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAJVi_sxGOyP9Jaqe-54wxWXNpQqE7lDq0",
  authDomain: "easychatapp-b802a.firebaseapp.com",
  projectId: "easychatapp-b802a",
  databaseURL: "https://easychatapp-b802a-default-rtdb.firebaseio.com/",
  storageBucket: "easychatapp-b802a.appspot.com",
  messagingSenderId: "666576572673",
  appId: "1:666576572673:web:6eb06fd4e9324d80748b00",
  measurementId: "G-3ZP6RQQHMB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const analytics = getAnalytics(app);

export default firebaseConfig