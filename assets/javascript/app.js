//configure to my firebase database
var config = {
    apiKey: "AIzaSyCQwHI33aLIXjZFR0yDaSjeMMiGgPf8EUY",
    authDomain: "tobi-s-toy.firebaseapp.com",
    databaseURL: "https://tobi-s-toy.firebaseio.com",
    projectId: "tobi-s-toy",
    storageBucket: "tobi-s-toy.appspot.com",
    messagingSenderId: "102493427088"
};

firebase.initializeApp(config);

var database = firebase.database()

//declare global variable to store each elements of the train schedule
var trainName = ""
var destination = ""
var trainTime = ""
var frequency = 0

//event listener for the add train button
$("#add-train").on("click", function (event) {
    event.preventDefault()

    trainName = $("#train-name").val().trim()
    destination = $("#destination").val().trim()
    trainTime = $("#train-time").val().trim()
    frequency = $("#frequency").val().trim()

    database.ref("/train-schedule").push({
        trainName : trainName,
        destination : destination,
        trainTime : trainTime,
        frequency : frequency
    })
})
database.ref("/train-schedule").on("child_added", function(childSnapshot){
    var newRow = $("<tr>")
    newRow.append($("<td>").text(childSnapshot.val().trainName))
    newRow.append($("<td>").text(childSnapshot.val().destination))
    newRow.append($("<td>").text(childSnapshot.val().frequency))
    newRow.append($("<td>").text("placeholder"))
    newRow.append($("<td>").text("placeholder"))
    $("tbody").append(newRow)
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
    })