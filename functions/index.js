const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate');
const firebase = require('firebase-admin');


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

const app = express();

app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

app.get('/', (request,response) =>{
    // response.set('Cache-Control','public,max-age=300,s-maxage=600');
    getFacts().then(facts =>{
        response.render('index',{ facts });
    });
});


exports.app = functions.https.onRequest(app);

