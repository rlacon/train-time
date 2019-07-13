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

var database = firebase.database();
var trainName = "";
var destination = "";
// (Let JavaScript identify what these variables will be)
var trainTime
var frequency

// Collect value of data and upload to Firebase
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
        frequency: frequency,
    });

    // Empty fields so new data can be entered
    $("#trainInput").empty();
    $("#destinationInput").empty();
    $("#timeInput").empty();
    $("#frequencyInput").empty();
});

// Adding in train data from Firebase 
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    var tName = childSnapshot.val().trainName;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().trainTime;

    // Formatting how the time will display
    var timeArr = tFirstTrain.split(":");
    var newTrainTime = moment()
        .hours(timeArr[0])
        .minutes(timeArr[1]);
    var tMinutes;
    var tArrival;

    // If the first train is later than the current time, sent arrival to the first train time
    // Calculate the minutes until arrival using hardcore math
    // To calculate the minutes till arrival, take the current time in unix and subtract the FirstTrain time
    // Find the modulus between the difference and the frequency
    var differenceTimes = moment().diff(newTrainTime, "minutes");
    var tRemainder = differenceTimes % tFrequency;
    tMinutes = tFrequency - tRemainder;

    // To calculate the arrival time, add the tMinutes to the current time
    tArrival = moment()
        .add(tMinutes, "m")
        .format("hh:mm A");

    console.log("tMinutes:", tMinutes);
    console.log("tArrival:", tArrival);

    // Display data on the table in a new row
    $("#train-table > tbody").append(
        $("<tr>").append(
            $("<td>").text(tName),
            $("<td>").text(tDestination),
            $("<td>").text(tFrequency),
            $("<td>").text(tArrival),
            $("<td>").text(tMinutes)
        )
    );
});