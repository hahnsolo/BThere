document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    var list,
    kills,
    count = 0,
    email = "",
    password = "";
    bluetoothle.initialize(initializeSuccess, initializeError, {
        "request": true,
        "statusReceiver": false
    });
    function initializeSuccess() {

    }
    function initializeError() {

    }
    function stopScanSuccess() {
        //var jsonString = JSON.stringify(list);
        email = window.localStorage.getItem("BThereEmail");
        if (list == "CoffeeLoft") {
            $.ajax({
                type: "POST",
                async: "true",
                url: "http://www.greenseedmusic.com/btherecheckin.php",
                data: {
                    email: email,
                    locArr: list
                },
                success: function (personObj) {
                    document.getElementById("checkin").style.display = "none";
                    //personObj.UserName
                    //personObj.UserFact
                    
                    var testPerson = new Person(
                        "John Doe", 
                        "John Doe", 
                        "johndoe@gmail.com", 
                        "Pianist, painter and NASCAR fan!", 
                        "Hey I'm 25 years old and I'm a student at Sheridan College in the Computer Programmer program.");
                    
                    markupToAdd = testPerson.printPersonInfo();
                    markupToAdd += "<br /><button class='button--large--cta letsmeetbutton'>" + testPerson.getName() + "</button>";
                    
                    if (personObj != null) {
                        if (personObj.UserName != undefined) {
                            
                            var personObj = new Person(personObj.UserName, "", "", personObj.UserFact, "");             
                            markupToAdd = personObj.printPersonInfo();'
                            markupToAdd += "<br /><button class='button--large--cta letsmeetbutton'>" + personObj.getName() + "</button>";
                            
                        }
                    }
                    $("#checkinsection").append(markupToAdd).fadeIn();
                },
                error: function (data) {
                    alert("Error");
                }
            });
        } else {
            alert("You may only use this application from the Coffee Loft.");
            document.getElementById("checkin").disabled = false;
        }
    }
    function stopScanError() {

    }
    function startScanSuccess(obj) {
        $("#checkin").text("Loading...");
        document.getElementById("checkin").disabled = true;
        myVar = setTimeout(function () {
            clearTimeout(kills);
            bluetoothle.stopScan(stopScanSuccess, stopScanError)
        }, 6000);
        if (obj.name == "CoffeeLoft" && count < 1) {
            list = obj.name;
            count++;
        }
    }
    function startScanError() {

    }
    function joinClick() {
        (document.getElementById("buttons")).style.display = "none";
        (document.getElementById("signupformsection")).style.display = "block";
    }
    function checkinClick() {
        alert("Check-in success!");
        kills = setTimeout(function () {
            bluetoothle.startScan(startScanSuccess, startScanError, {
                "serviceUuids": []
            });
        }, 500);
    }
    
    document.getElementById("join").addEventListener("click", joinClick);
    document.getElementById("signin").addEventListener("click", joinClick);
    document.getElementById("checkin").addEventListener("click", checkinClick);
    
    if (window.localStorage.getItem("BThere") == "true") {
        email = window.localStorage.getItem("BThereEmail");
        password = window.localStorage.getItem("BTherePassword");
        $.ajax({
            type: "POST",
            async: "true",
            url: "http://www.greenseedmusic.com/btherelogin.php",
            data: {
                email: email,
                password: password
            },
            success: function (data) {
                (document.getElementById("checkinsection")).style.display = "block";
            },
            error: function (data) {}
        });
    } else {
        (document.getElementById("buttons")).style.display = "block";
    }
    $('#Signup').submit(function () {
        $.post('http://www.greenseedmusic.com/bthereinsert.php', $(this).serialize(), function (data) {
            email = $("#signupEmail").val();
            password = $("#signupPassword").val();
            window.localStorage.setItem("BThere", "true");
            window.localStorage.setItem("BThereEmail", email);
            window.localStorage.setItem("BTherePassword", password);
            $("#signupformsection").hide();
            $("#checkinsection").show();
        }).fail(function () {

        });
        return false;
    });
}
/* Objects */
var Person = function(userName, userNickname, userEmail, userFunFact, userBiography) {
    this.Name = userName;
    this.Nickname = userNickname;
    this.Email = userEmail;
    this.FunFact = userFunFact;
    this.Biography = userBiography;
};
Person.prototype.displayInformation = function() {
    return this.Name + "'s biography is: " + this.Biography + " and their fun fact is " + this.FunFact;
};
Person.prototype.printPersonInfo = function() {
    return "<h1 class='userName'>" + this.Name + "</h1>" + 
        "<p class='userFact'>" + this.FunFact + "</p>";
};
Person.prototype.getName = function() {
    return this.Name;
};
var Location = function(locationName) {
    this.Location = locationName;
};
Location.prototype.displayLocationName = function() {
    return "You are in " + this.Location;
};