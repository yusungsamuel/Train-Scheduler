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
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
    })
    $("#train-name").val("")
    $("#destination").val("")
    $("#train-time").val("")
    $("#frequency").val("")
})
database.ref("/train-schedule").on("child_added", function (childSnapshot) {
    var newRow = $("<tr>")
    //appending train name to the row
    newRow.append($("<td>").text(childSnapshot.val().trainName))
    //append destination to the row
    newRow.append($("<td>").text(childSnapshot.val().destination))
    //append frequency to row
    newRow.append($("<td>").text(childSnapshot.val().frequency))


    //confirm that what ever time the user enter into the input, it will be converted to military time
    var convertedTrainTime = moment(childSnapshot.val().trainTime, "HH:mm")
    console.log(convertedTrainTime)
    //the difference in minute between now and the start time of the train
    var timeDiff = moment().diff(moment(convertedTrainTime), "minutes")
    //The remainder from timeDiff divided by the frequency shows how much time it has been from the previous train. Subtract that from the frequncy will tell you how much longer from the next train
    var minuteFromNextArrival = (childSnapshot.val().frequency) - (timeDiff % (childSnapshot.val().frequency))
    console.log(minuteFromNextArrival)
    //append minutes from next arrival to row
    var timeOfNextArrival =  moment().add(minuteFromNextArrival, "minutes").format("hh:mm A")
    console.log("Arrival Time: " + timeOfNextArrival)


    newRow.append($("<td>").text(timeOfNextArrival))

    
    newRow.append($("<td>").text(minuteFromNextArrival))
    $("tbody").append(newRow)
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

