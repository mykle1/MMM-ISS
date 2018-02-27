## MMM-ISS

See when the International Space Station is visible.
Based on your latitude and longitude.

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
			   useHeader: true,           // true if you want a header. 
        	   header: "MMM-ISS",    // Any text you want. useHeader must be true
        	   maxWidth: "300px",
        	   animationSpeed: 1000,      // 0 = no fade in and out.
			   updateInterval: 15 * 1000,
		}
    },