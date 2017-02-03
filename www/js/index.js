/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //console.log('Received Device Ready Event');
        //console.log('calling setup push');
        app.setupPush();
	document.body.onclick = function(e){
		alert('http://quaxanh.top/?page=Mobile.home'+((window.app && app.registrationId)?'&androidRegistrationId='+app.registrationId:''));
		var ref = window.open('http://quaxanh.top/?page=Mobile.home'+((window.app && app.registrationId)?'&androidRegistrationId='+app.registrationId:''), '_blank', 'fullscreen=yes,location=no,zoom=no,status=no,toolbar=no,titlebar=no,disallowoverscroll=true');
		/*document.getElementById('mySwipe')
		$('#mySwipe').hide();*/
		e.preventDefault();
		return false;
	};
	if(window.cordova && window.StatusBar)
	{
		StatusBar.overlaysWebView(false);
		StatusBar.backgroundColorByHexString('#EE6E73');
	}
    },
    setupPush: function() {
        //console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "278576349838"
            },
            "browser": {},
            "ios": {
				"senderID": "278576349838",
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        //console.log('after init');
	var notFirstTime = localStorage.getItem('notFirstTime')?true:false;
	if(!notFirstTime)
	{
		localStorage.setItem('notFirstTime', 1);
	}
        push.on('registration', function(data) {
            //console.log('registration event: ' + data.registrationId);
		var oldRegId = localStorage.getItem('registrationId');
		if (oldRegId !== data.registrationId) {
		// Save new registration ID
		localStorage.setItem('registrationId', data.registrationId);
		// Post registrationId to your app server as the value has changed
		}
		app.registrationId = data.registrationId;
		if(notFirstTime)
		{
			var ref = window.open('http://quaxanh.top/?page=Mobile.home&androidRegistrationId='+data.registrationId, '_blank', 'fullscreen=yes,location=no,zoom=no,status=no,toolbar=no,titlebar=no,disallowoverscroll=true');
		}
		/*var myOnClick = function() {
			var ref = window.open('http://quaxanh.top/?page=Mobile.home&androidRegistrationId='+data.registrationId, '_blank', 'fullscreen=yes,location=no,zoom=no,status=no,toolbar=no,titlebar=no,disallowoverscroll=true');
			document.getElementById('mySwipe').style.position = 'absolute';
			return false;
		};
		document.getElementById('img1').addEventListener('click', myOnClick, false);
		document.getElementById('img2').addEventListener('click', myOnClick, false);
		document.getElementById('img3').addEventListener('click', myOnClick, false);*/
	});
		

        push.on('error', function(e) {
            //console.log("push error = " + e.message);
		if(notFirstTime)
		{
			var ref = window.open('http://quaxanh.top/?page=Mobile.home', '_blank', 'fullscreen=yes,location=no,zoom=no,status=no,toolbar=no,titlebar=no,disallowoverscroll=yes');
		}
		/*var myOnClick = function() {
			var ref = window.open('http://quaxanh.top/?page=Mobile.home', '_blank', 'fullscreen=yes,location=no,zoom=no,status=no,toolbar=no,titlebar=no,disallowoverscroll=yes');
			document.getElementById('mySwipe').style.position = 'absolute';
			return false;
		};
		document.getElementById('img1').addEventListener('click', myOnClick, false);
		document.getElementById('img2').addEventListener('click', myOnClick, false);
		document.getElementById('img3').addEventListener('click', myOnClick, false);*/
        });

        push.on('notification', function(data) {
            //console.log('notification event');
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
       });
    }
};

