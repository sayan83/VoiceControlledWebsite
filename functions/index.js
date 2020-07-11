const functions = require('firebase-functions');
const {dialogflow} = require('actions-on-google');
const admin = require('firebase-admin');
const app = dialogflow();
admin.initializeApp();
const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


app.intent('Default Welcome Intent', (conv) => {
    conv.ask('Welcome, your instructions are ready to be executed.');
});

app.intent('scroll', (conv) => {
    conv.ask('Okay going down');
    //TODO: explicitely call function to write to database
    db.collection('ID').doc('1').update({
        no_scroll_dwn : admin.firestore.FieldValue.increment(1),
    });
});
app.intent('scrollup', (conv) => {
    conv.ask('Okay going up');
    //TODO: explicitely call function to write to database
    db.collection('ID').doc('1').update({
        no_scroll_up : admin.firestore.FieldValue.increment(1),
    });
});
app.intent('price', (conv) => {
    conv.ask('Okay showing prices');
    //TODO: explicitely call function to write to database
    db.collection('ID').doc('1').update({
        no_price : admin.firestore.FieldValue.increment(1),
    })
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);