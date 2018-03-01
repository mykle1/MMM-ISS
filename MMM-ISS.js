/* Magic Mirror
 * Module: MMM-ISS
 * 
 * By Mykle1 - MIT Licensed
 * 
 */
Module.register("MMM-ISS", {

    // Module config defaults.
    defaults: {
		height: "450px",
		width: "310px",
        lat: "",                                  // latitude
        lng: "",                                  // longitude
		units: "mi",                              // mi = miles,mph, km = kilometers,
        useHeader: false,                         // true if you want a header      
        header: "Spot The Station",          // Any text you want. useHeader must be true
    //    maxWidth: "300px",
        animationSpeed: 3000,
        initialLoadDelay: 4250,
        retryDelay: 2500,
        updateInterval: 2 * 60 * 1000,           // 2 minutes is the least you can use for free

    },

    getStyles: function() {
        return ["MMM-ISS.css"];
    },


    start: function() {
        Log.info("Starting module: " + this.name);


        //  Set locale.
        this.url = "http://api.open-notify.org/iss-pass.json?lat="  + this.config.lat +  "&lon="  + this.config.lng + "&n=5";
        this.ISS = {};
		this.VELALT = {};
        this.scheduleUpdate();
    },

    getDom: function() {
		

        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;

        if (!this.loaded) {
            wrapper.innerHTML = "Is that the ISS?";
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        }

        if (this.config.useHeader != false) {
            var header = document.createElement("header");
            header.classList.add("xsmall", "bright", "header");
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }
		
		var ISS = this.ISS;
		var VELALT = this.VELALT;
		
		
		var velocity = document.createElement("div");
            velocity.classList.add("small", "bright", "velocity");
			if (this.config.units != "km"){
				velocity.innerHTML = "ISS velocity is " + Math.round(VELALT.velocity * 0.621371) + " mph";
			} else {
				velocity.innerHTML = "ISS velocity is " + Math.round(VELALT.velocity) + " km/h";
			}
            wrapper.appendChild(velocity);
			
			
			var altitude = document.createElement("div");
            altitude.classList.add("small", "bright", "altitude");
			if (this.config.units != "km"){
				altitude.innerHTML = "ISS altitude is " + Math.round(VELALT.altitude * 0.621371) + " miles";
			} else {
            altitude.innerHTML = "ISS altitude is " + Math.round(VELALT.altitude) + " km";
			}
            wrapper.appendChild(altitude);
		
		
		
		for (var i = 0, len = ISS.response.length; i < len; i++) {

            var risetime = document.createElement("div");
            risetime.classList.add("xsmall", "bright", "risetime");
            risetime.innerHTML = "ISS appears @ " + moment.unix(ISS.response[i].risetime).format("h:mm a MMMM DD YYYY");
            wrapper.appendChild(risetime);
			
			
			var duration = document.createElement("div");
            duration.classList.add("xsmall", "bright", "duration");
            duration.innerHTML = "Duration of appearance is " + moment.unix(ISS.response[i].duration).format("m") + " min " + moment.unix(ISS.response[0].duration).format("ss") + " secs";
            wrapper.appendChild(duration);
			
		
			
			var spacer = document.createElement("div");
            spacer.classList.add("xsmall", "bright", "spacer");
            spacer.innerHTML = " ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ";
            wrapper.appendChild(spacer);
			
			
			
		var iframe = document.createElement("IFRAME");
		iframe.style = "border:0"
		iframe.width = this.config.width;
		iframe.height = this.config.height;
		iframe.src = 'https://spotthestation.nasa.gov/widget/widget.cfm?country=United_States&region=New_York&city=Staten_Island&theme=2';
		return iframe;
			
			
        }
		

		return wrapper;
		
		
    },
	

    processISS: function(data) {
        this.ISS = data;
		console.log(this.ISS); // for checking in dev console
        this.loaded = true;
    },
	
	
	processVELALT: function(data) {
        this.VELALT = data;
		console.log(this.VELALT); // for checking in dev console
        this.loaded = true;
    },
	
	

    scheduleUpdate: function() {
        setInterval(() => {
            this.getISS();
        }, this.config.updateInterval);
        this.getISS(this.config.initialLoadDelay);
    },

    getISS: function() {
        this.sendSocketNotification('GET_ISS', this.url);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "ISS_RESULT") {
            this.processISS(payload);
            this.updateDom(this.config.animationSpeed);
        }
		
		if (notification === "VELALT_RESULT") {
            this.processVELALT(payload);
            this.updateDom(this.config.fadeSpeed);
        }
		
        this.updateDom(this.config.initialLoadDelay);
    },
});