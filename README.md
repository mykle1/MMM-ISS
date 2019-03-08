## MMM-ISS

Know when the International Space Station is visible. Based on your latitude and longitude.

## Cool Fact

The International Space Station travels in orbit around Earth at a speed of roughly 17,150 miles per hour.
That's about 5 miles per second! This means the ISS orbits Earth (and sees a sunrise) once every 92 minutes!

## Can I see it without a telescope?

You sure as hell can! Every so often, you can see the ISS in your night sky. To us on Earth, it looks like 
a bright star moving quickly above the horizon. Visible to the naked eye, the ISS is best seen at dawn and dusk.
It is the third brightest object in the sky. 

## What you get

* The current altitude of the ISS

* The current velocity of the ISS

* The date and time of the next sighting for your location

* Length of time the ISS will be visible

* The direction you should be looking to see the ISS when it appears

## Examples

![](images/1.PNG) ![](images/2.png)

## Installation

* `git clone https://github.com/mykle1/MMM-ISS` into the `~/MagicMirror/modules` directory.

* No dependencies, yet! :-)


## Config.js entry and options

    {
           disabled: false,
           module: 'MMM-ISS',
           position: 'top_center',
		   config: {
			   country: "United_States",                  // NO SPACES, USE UNDERSCORE
			   regionState: "New_York",                   // NO SPACES, USE UNDERSCORE
			   city: "Elmira",                            // NO SPACES, USE UNDERSCORE
			   lat: "40.00",                              // latitude
			   lng: "-74.00",                             // longitude
			   units: "mi",                               // mi = miles, mph / km = kilometers, km/h
			   useHeader: false,                          // true if you want a header      
			   header: "",                                // Any text you want. useHeader must be true
			   updateInterval: 60 * 1000,
		}
    },
