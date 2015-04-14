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
                    var markupToAdd = "<h1 class='userName'>" + personObj.UserName + "</h1>" + 
                        "<p class='userFact'>" + personObj.UserFact + "</p>";
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
            
        }).fail(function () {

        });
        return false;
    });
}