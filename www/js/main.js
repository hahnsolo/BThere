document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    alert("Hi, I am an alert");
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
        email = window.localStorage.getItem("BThereEmail");
		
		/* TEST CODE */
		list = "CoffeeLoft";
		
        if (list == "CoffeeLoft") {
            $.ajax({
                type: "POST",
                async: "true",
                url: "http://www.greenseedmusic.com/btherecheckin.php",
                data: {
                    email: email,
                    locArr: list
                },
                success: function (data) {
					alert
					/*
					var userList = JSON.parse(data);
					$("#selectUser1").click(function(){
						chooseMeet("yes");
					});
					$("#selectUser2").click(function(){
						chooseMeet("no");
					});
					(document.getElementById("checkin")).style.display = "none";
					(document.getElementById("userSelection")).style.display = "block";
					
					var tempList = new Array();
					var i = 0;
					
					display();
					*/
					//Display the data to the user.
					function display() {
						$("#uListPos").html("Number: " + (i+1) + "/" + (userList.length));
						$("#uListName").html("User: " + userList[i][1]);
						$("#uListFact").html("Fact:<br>" + userList[i][2]);
					}
					
					//Push the ID of the user into the table if needed.
					function chooseMeet(ans){
						if (ans === "yes"){
							tempList.push(userList[i][0]);
						}
						i++;
						if (i >= userList.length){
							complete();
						}
						else{
							display();
						}
					}
					
					//The function is complete.
					function complete(){
						(document.getElementById("userSelection")).style.display = "none";
						var isUsers = JSON.stringify(window.localStorage.getItem("BThereEmail"));
						var temps = JSON.stringify(tempList);
						$.ajax({
							type: "POST",
							async: "true",
							url: "http://www.greenseedmusic.com/btheremeetup.php",
							data: {
								userEmai: isUsers,
								userList: temps
							},
							success: function(data){
								alert("WORKS!");
								alert(JSON.parse(data));
								//OMITTED UNTIL TESTING COMPLETE
								/*
								var interval = setInterval(function(){
									checkDatabase();
								}, 300);
								function checkDatabase(){
									$.ajax({
										type: "POST",
										async: "true",
										url: "http://www.greenseedmusic.com/btherecheckmeet.php",
										data: {
											userEmail: isUsers
										},
										success: function(data){
											var tempData = JSON.parse(data);
											alert(tempData);
											if (tempData != "noone"){
												alert(isUsers + " -- " + tempData);
												clearInterval(interval);
											}
										},
										error: function(data){
											alert("ERROR in USERINTERVAL");
										}
									});
								}
								*/
							},
							error: function(data){
								alert("ERROR");
								alert(JSON.parse(data));
							}
						});
					}
					
				},
                error: function (data) {
                    alert("Error");
                }
            });
        } else {
            alert("You may only use this application from the Coffee Loft.");
            $("#checkin").text("Check-in");
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
		if (isValidForm() === true){
			var myDat = $(this).serialize();
			$.ajax({
				type: "POST",
				url: "http://www.greenseedmusic.com/bthereinsert.php",
				data: myDat,
				success: function(data){
					alert("input successful:" + data);
					email = $("#signupEmail").val();
					password = $("#signupPassword").val();
					window.localStorage.setItem("BThere", "true");
					window.localStorage.setItem("BThereEmail", email);
					window.localStorage.setItem("BTherePassword", password);
					$("#signupformsection").hide();
					$("#checkinsection").show();
				},
				error: function(){
					alert("ERROR");
				},
				fail: function(){
					alert("broke");
				}
			});
		}
		else{
			alert("error");
		}
		return false;
    });
}

/* Validation */
function isValidForm(){
	var email = $("#signupEmail").val();
	var pass = $("#signupPassword").val();
	var name = $("#signupName").val();
	var fact = $("#signupFunFact").val();
	//Data invalid if there is only spaces in any field.
	if ((email.trim() === "") || (pass.trim() === "") || (name.trim() === "") || (fact.trim() === "")){
		return false;
	}
	return true;
}