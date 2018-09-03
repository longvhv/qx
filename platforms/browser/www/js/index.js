
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
	    
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
		if(window.cordova && window.StatusBar)
		{
			window.open = cordova.InAppBrowser.open;
			StatusBar.overlaysWebView(false);
			StatusBar.backgroundColorByHexString('#EE6E73');
		}
		
		/*try{
			app.win = window.open('http://beta.viettelstudy.vn/?page=Mobile.home'+((window.app && app.registrationId)?'&androidRegistrationId='+app.registrationId:''), '_blank', 'fullscreen=yes,location=no,zoom=no,status=no,toolbar=no,titlebar=no,disallowoverscroll=yes');
		}
		catch(e)
		{
			alert(e.getMessage());
		}*/
		
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
					app.win = window.open('http://viettelstudy.net/?page=Mobile.home'+((window.app && app.registrationId)?'&androidRegistrationId='+app.registrationId:''), '_blank', 'fullscreen=yes,location=no,zoom=no,status=no,toolbar=no,titlebar=no,disallowoverscroll=yes');
					app.initEvents();
				}, 5000);
			}
		}, false); 
		app.win = window.open('http://viettelstudy.net/?page=Mobile.home', '_blank', 'fullscreen=yes,location=no,zoom=no,status=no,toolbar=no,titlebar=no,disallowoverscroll=yes');
		app.initEvents();
			
		try{
			app.setupPush();
		}
		catch(e)
		{
			alert(e.getMessage());
			
		}
    },
    setupPush: function() {
		
        console.log('calling push init');
		try{
			var push = PushNotification.init({
				"android": {
					"senderID": "278576349838"
				},
				"browser": {},
				"ios": {
			//"senderID": "278576349838",
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
				//alert(app.registrationId);
				//if(app.notFirstTime)
				{
					app.win = window.open('http://viettelstudy.net/?page=Mobile.home&androidRegistrationId='+data.registrationId, '_blank', 'fullscreen=yes,location=no,zoom=no,status=no,toolbar=no,titlebar=no,disallowoverscroll=yes');
					app.initEvents();
				}
			});
		
		/*var myOnClick = function() {
			var ref = window.open('http://beta.viettelstudy.vn/?page=Mobile.home&androidRegistrationId='+data.registrationId, '_blank', 'fullscreen=yes,location=no,zoom=no,status=no,toolbar=no,titlebar=no,disallowoverscroll=yes');
			document.getElementById('mySwipe').style.position = 'absolute';
			return false;
		};
		document.getElementById('img1').addEventListener('click', myOnClick, false);
		document.getElementById('img2').addEventListener('click', myOnClick, false);
		document.getElementById('img3').addEventListener('click', myOnClick, false);*/
		

        push.on('error', function(e) {
            console.log("push error = " + e.message);
		//alert(e.message);
		//if(app.notFirstTime)
		{
			app.win = window.open('http://viettelstudy.net/?page=Mobile.home', '_blank', 'fullscreen=yes,location=no,zoom=no,status=no,toolbar=no,titlebar=no,disallowoverscroll=yes');
			app.initEvents();
		}
		/*var myOnClick = function() {
			var ref = window.open('http://beta.viettelstudy.vn/?page=Mobile.home', '_blank', 'fullscreen=yes,location=no,zoom=no,status=no,toolbar=no,titlebar=no,disallowoverscroll=yes');
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
		catch(e)
		{
			alert(e.getMessage());
		}
    },
	initEvents: function(){
		document.getElementById('mySwipe').style.display = 'none';
		/*app.win.addEventListener('loadstop', function(){
			app.win.executeScript({ code: 'VHV.site;' }, function(response){
				console.log(response);
			});
		});*/
		/*app.win.onscroll = function(){
			scrollWindow();
		};
		function scrollWindow() {
			if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
				document.getElementById("sticky-header").className = "scroll";
			} else {
				document.getElementById("sticky-header").className = "";
			}
		}*/
	}
};

