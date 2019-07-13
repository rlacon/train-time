var firebaseConfig = {
    apiKey: "AIzaSyABqAZU7UeVQ7nA16mkhFxcmjTSM9cXKJA",
    authDomain: "dogwood-terra-183816.firebaseapp.com",
    databaseURL: "https://dogwood-terra-183816.firebaseio.com",
    projectId: "dogwood-terra-183816",
    storageBucket: "dogwood-terra-183816.appspot.com",
    messagingSenderId: "416717539320",
    appId: "1:416717539320:web:5cabe2f014923c29"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(document).ready(function () {
    console.log("Document Loaded!");


    var database = firebase.database();
    var trainName = "";
    var destination = "";
    var trainTime = 0;
    var frequency = 0;

    $(".btn-primary").on("click", function (event) {
        event.preventDefault();
        trainName = $("#trainInput").val().trim();
        destination = $("#destinationInput").val().trim();
        trainTime = $("#timeInput").val().trim();
        frequency = $("#frequencyInput").val().trim();

        console.log(trainName);
        console.log(destination);
        console.log(trainTime);
        console.log(frequency);

        database.ref().push({
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency
        });

    });



});