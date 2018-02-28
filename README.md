## MMM-ISS

Know when the International Space Station is visible. Based on your latitude and longitude.

## Cool fact

The International Space Station travels in orbit around Earth at a speed of roughly 17,150 miles per hour (that's about 5 miles per second!). This means that the Space Station orbits Earth (and sees a sunrise) once every 92 minutes!

## Can I see it without a telescope?

You sure as hell can! Every so often, you can see the ISS in your night sky. To us on Earth, it looks like a bright star moving quickly above the horizon. ... Visible to the naked eye, the station is best seen at dawn and dusk, and is the third brightest object in the sky.

## What you get

* The current altitude of the ISS

* The current velocity of the ISS

* The date and time of the next potential sightings

* Length of time the ISS will be visible

## Examples

TBD

## Installation

* `git clone https://github.com/mykle1/MMM-ISS` into the `~/MagicMirror/modules` directory.

* No dependencies, yet! :-)


## Config.js entry and options

{
disabled: false,
module: 'MMM-ISS',
	position: 'top_left', 
		config: {
		lat: "40.57",                                  // latitude
		lng: "-74.11",                                  // longitude
		units: "km",                              // mi = miles, mph / km = kilometers, km/h
		useHeader: false,                         // true if you want a header      
		header: "International Space Station",          // Any text you want. useHeader must be true
		maxWidth: "254px",
		animationSpeed: 3000,
		updateInterval: 20 * 1000,
	}
},
