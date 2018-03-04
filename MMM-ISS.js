/* Magic Mirror
 * Module: MMM-ISS
 *
 * By Mykle1 - MIT Licensed
 *
 */

Module.register("MMM-ISS", {

    // Module config defaults.
    defaults: {
        country: "United_States",                 // NO SPACES, USE UNDERSCORE
        regionState: "Illinois",                  // NO SPACES, USE UNDERSCORE
        city: "Chicago",                          // NO SPACES, USE UNDERSCORE
        lat: "",                                  // latitude
        lng: "",                                  // longitude
        units: "mi",                              // mi = miles,mph, km = kilometers,
        useHeader: false,                         // true if you want a header
        header: "Spot The Station",               // Any text you want. useHeader must be true
        animationSpeed: 0,
        initialLoadDelay: 4250,
        retryDelay: 2500,
        updateInterval: 2 * 60 * 1000,
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

        var iframe = document.createElement("IFRAME");
        iframe.style = "border:0";
        iframe.width = "310px";
        iframe.height = "450px";
        iframe.src = 'https://spotthestation.nasa.gov/widget/widget.cfm?country=' + this.config.country + '&region=' + this.config.regionState + '&city=' + this.config.city + '&theme=2';
        wrapper.appendChild(iframe);

        var ISS = this.ISS;
        var VELALT = this.VELALT;
        var velocity = document.createElement("div");
        velocity.classList.add("xsmall", "bright", "velocity");
        if (this.config.units != "km"){
            velocity.innerHTML = "Velocity: " + Math.round(VELALT.velocity * 0.621371) + " mph &nbsp &nbsp &nbsp " + " Altitude: " + Math.round(VELALT.altitude * 0.621371) + " miles";
        } else {
            velocity.innerHTML = "Velocity: " + Math.round(VELALT.velocity) + " km/h &nbsp &nbsp &nbsp " + " Altitude: " + Math.round(VELALT.altitude) + " km";
        }
        wrapper.appendChild(velocity);
        return wrapper;
    },

    processISS: function(data) {
        this.ISS = data;
        //console.log(this.ISS); // for checking in dev console
        this.loaded = true;
    },

    processVELALT: function(data) {
        this.VELALT = data;
        //console.log(this.VELALT); // for checking in dev console
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
