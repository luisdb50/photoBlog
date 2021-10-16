import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from "firebase/app";
import App from './App';
import reportWebVitals from './reportWebVitals';

const firebaseConfig = {
  apiKey: "AIzaSyAk8mGDw2p8nq3ElUKWPPSoK8D5V3SgZMU",
  authDomain: "photoblog-603e9.firebaseapp.com",
  projectId: "photoblog-603e9",
  storageBucket: "photoblog-603e9.appspot.com",
  messagingSenderId: "353819996479",
  appId: "1:353819996479:web:7853197e1c9ef60e6a238a",
  measurementId: "G-9MKSJCV65E"
};

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
