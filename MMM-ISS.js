/* Magic Mirror
 * Module: MMM-ISS
 *
 * By Mykle1 - MIT Licensed
 *
 */
Module.register("MMM-ISS", {

    // Module config defaults.
    defaults: {
		country: "France",
		regionState: "",                          // Outside USA may not need regionState. If so, leave blank "".
		city: "Toulon",
        lat: "43.1242",                       // latitude
        lng: "5.9280",                        // longitude
		    units: "km",                          // mi = miles,mph, km = kilometers,
        useHeader: false,                     // true if you want a header
        header: "Spot The Station",           // Any text you want. useHeader must be true
        animationSpeed: 0,
        initialLoadDelay: 4250,
        retryDelay: 2500,
        updateInterval: 5 * 60 * 1000,

    },

    getStyles: function() {
        return ["MMM-ISS.css"];
    },
    getScripts: function() {
	return ["moment.js"];
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

        // replaces spaces with underscores so url doesn't fail
        if (this.config.country != "") {
          this.config.country = (this.config.country).replace(/ /g,"_");
        }

        // replaces spaces with underscores so url doesn't fail
        if (this.config.regionState != "") {
          this.config.regionState = (this.config.regionState).replace(/ /g,"_");
        }

        // replaces spaces with underscores so url doesn't fail
        if (this.config.city != "") {
          this.config.city = (this.config.city).replace(/ /g,"_");
        }

        // When specific countries do not require regionState, replace empty regionState with "None"
        if (this.config.regionState === "") {
          this.config.regionState = "None";
        }




		var iframe = document.createElement("IFRAME");
		iframe.style = "border:0";
		iframe.width = "310px";
		iframe.height = "450px";
		iframe.src = 'https://spotthestation.nasa.gov/widget/widget.cfm?country=' + this.config.country + '&region=' + this.config.regionState + '&city=' + this.config.city + '&theme=2';
		wrapper.appendChild(iframe);


		var ISS = this.ISS;
		var VELALT = this.VELALT;


		var velocity = document.createElement("div");
            velocity.classList.add("xsmall", "velocity");
			if (this.config.units != "km"){
				velocity.innerHTML = "Velocity: " + Math.round(VELALT.velocity * 0.621371) + " mph &nbsp &nbsp &nbsp " + " Altitude: " + Math.round(VELALT.altitude * 0.621371) + " miles";
			} else {
				velocity.innerHTML = "Velocity: " + Math.round(VELALT.velocity) + " km/h &nbsp &nbsp &nbsp " + " Altitude: " + Math.round(VELALT.altitude) + " km";
			}
            wrapper.appendChild(velocity);

		return wrapper;


    },

	/////  Add this function to the modules you want to control with voice //////

    notificationReceived: function(notification, payload) {
        if (notification === 'HIDE_STATION') {
            this.hide(1000);
        }  else if (notification === 'SHOW_STATION') {
            this.show(1000);
        }

    },


    processISS: function(data) {
        this.ISS = data;
	//	console.log(this.ISS); // for checking in dev console
        this.loaded = true;
    },


	processVELALT: function(data) {
        this.VELALT = data;
	//	console.log(this.VELALT); // for checking in dev console
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
