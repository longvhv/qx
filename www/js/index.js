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
		app.notFirstTime = localStorage.getItem('notFirstTime')?true:false;
		if(!app.notFirstTime)
		{
			localStorage.setItem('notFirstTime', 1);
			var elem = document.getElementById('mySwipe');
			elem.innerHTML = '<div class="swipe-wrap"><a href="javascript:void(0);"><img src="img/01.jpg" width="100%"></a><a href="javascript:void(0);"><img src="img/02.jpg" width="100%"></a><a href="javascript:void(0);"><img src="img/03.jpg" width="100%"></a></div>';
			setTimeout(function(){
				Swipe(elem, {
		   /* transitionEnd: function(){
				window.open('http://quaxanh.top/?page=Mobile.home'+((window.app && app.registrationId)?'&androidRegistrationId='+app.registrationId:''), '_blank', 'fullscreen=yes,location=no,zoom=no,status=no,toolbar=no,titlebar=no,disallowoverscroll=yes');
			}*/
				});
			}, 100);
		}
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
		try{
			app.win = window.open('http://quaxanh.top/?page=Mobile.home'+((window.app && app.registrationId)?'&androidRegistrationId='+app.registrationId:''), '_blank', 'fullscreen=yes,location=no,zoom=no,status=no,toolbar=no,titlebar=no,disallowoverscroll=yes');
		}
		catch(e)
		{
			alert(e.getMessage());
		}
		/*document.getElementById('mySwipe')
		$('#mySwipe').hide();*/
		e.preventDefault();
		return false;
	};
	if(window.cordova && window.StatusBar)
	{
		window.open = cordova.InAppBrowser.open;
		StatusBar.overlaysWebView(false);
		StatusBar.backgroundColorByHexString('#EE6E73');
	}
	document.addEventListener('offline', function(){
		//alert('offline');
		
		if(navigator.notification.activityStart)
		{
			navigator.notification.activityStart("Vui lòng chờ", "Mất kết nối internet...");
		}
		else
		{
			alert('Mất kết nối internet!');
		}
		if(app.win)
		{
			if(app.win.hide)
			{
				app.win.hide();
			}
			else
			{
				app.win.close();
				app.win = false;
			}
			/*app.win.executeScript({
				code: "var obj=document.querySelector('#nointernetconnection'); if(!obj){var element = document.createElement('div'); element.innerHTML = '<div style=\"background-color:yellow;text-align:center;font-weight:bold;\">Mất kết nối internet...</div>'; if (document.body.firstChild) document.body.insertBefore(element, document.body.firstChild); else document.body.appendChild(element);} else {obj.style.display='block';}"
			});*/
		}
		var elem = document.getElementById('mySwipe');
		elem.innerHTML = '<img src="img/disconnect.jpg" width="100%">';
	}, false);
	document.addEventListener('online', function(){
		//alert('online');
		if(navigator.notification.activityStop)
		{
			navigator.notification.activityStop();
		}
		var elem = document.getElementById('mySwipe');
		elem.innerHTML = '<img src="img/welcome.jpg" width="100%">';
		if(app.win)
		{
			app.win.show();
			/*app.win.executeScript({
				code: "var obj=document.querySelector('#nointernetconnection'); if(obj){obj.style.display='none';}"
			});*/
		}
		else
		{
			setTimeout(function(){
				app.win = window.open('http://quaxanh.top/?page=Mobile.home'+((window.app && app.registrationId)?'&androidRegistrationId='+app.registrationId:''), '_blank', 'fullscreen=yes,location=no,zoom=no,status=no,toolbar=no,titlebar=no,disallowoverscroll=yes');
			}, 5000);
		}
	}, false);
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
	
        push.on('registration', function(data) {
            //console.log('registration event: ' + data.registrationId);
		var oldRegId = localStorage.getItem('registrationId');
		if (oldRegId !== data.registrationId) {
		// Save new registration ID
		localStorage.setItem('registrationId', data.registrationId);
		// Post registrationId to your app server as the value has changed
		}
		
		app.registrationId = data.registrationId;
		alert(app.registrationId);
		if(app.notFirstTime)
		{
			app.win = window.open('http://quaxanh.top/?page=Mobile.home&androidRegistrationId='+data.registrationId, '_blank', 'fullscreen=yes,location=no,zoom=no,status=no,toolbar=no,titlebar=no,disallowoverscroll=yes');
		}
		/*var myOnClick = function() {
			var ref = window.open('http://quaxanh.top/?page=Mobile.home&androidRegistrationId='+data.registrationId, '_blank', 'fullscreen=yes,location=no,zoom=no,status=no,toolbar=no,titlebar=no,disallowoverscroll=yes');
			document.getElementById('mySwipe').style.position = 'absolute';
			return false;
		};
		document.getElementById('img1').addEventListener('click', myOnClick, false);
		document.getElementById('img2').addEventListener('click', myOnClick, false);
		document.getElementById('img3').addEventListener('click', myOnClick, false);*/
	});
		

        push.on('error', function(e) {
            //console.log("push error = " + e.message);
		alert('push error');
		if(app.notFirstTime)
		{
			app.win = window.open('http://quaxanh.top/?page=Mobile.home', '_blank', 'fullscreen=yes,location=no,zoom=no,status=no,toolbar=no,titlebar=no,disallowoverscroll=yes');
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

