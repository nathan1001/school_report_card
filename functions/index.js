const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate');
const firebase = require('firebase-admin');
//var firebase = require('firebase');
//var firebaseui = require('firebaseui');

//const auth = firebase.auth();

//auth.signInWithEmailAndPassword(email,pass);
//auth.createUserWithEmailAndPassword(email,pass);
//auth.onAuthStateChanged(firebaseUser =>{});


var config = {
    apiKey: "AIzaSyDdEzILP3T5nawNBYkFMlPi_njMNF6t2cY",
    authDomain: "school-eport-card.firebaseapp.com",
    databaseURL: "https://school-eport-card.firebaseio.com",
    projectId: "school-eport-card",
    storageBucket: "school-eport-card.appspot.com",
    messagingSenderId: "461648540722"
  };
  
const firebaseApp = firebase.initializeApp(config);

function getFacts(){
    const ref = firebaseApp.database().ref('facts');
    return ref.once('value').then(snap => snap.val());
}
const login =(email,password) => {

}

const app = express();

// app.engine('html', engines.swig); // take note, using 'html', not 'ejs' or 'pug'..
// app.set('view engine', 'html');

app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

app.get('/login', (request,response) =>{
    // response.set('Cache-Control','public,max-age=300,s-maxage=600');
    getFacts().then(facts =>{
        response.render('facts',{ facts });
    });
});
app.get('/',function(req,res){
       
  res.sendFile('index');

});

// app.get('/login', (request,response) =>{
//   // response.set('Cache-Control','public,max-age=300,s-maxage=600');
//   getFacts().then(facts =>{
//       response.render('login',{ facts });
//   });
// });



exports.app = functions.https.onRequest(app);

