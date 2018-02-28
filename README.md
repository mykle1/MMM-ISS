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
           module: 'MMM-PC-Stats',
           position: 'top_left',
		   config: {
		   videoCard: "NVIDIA GeForce GTX660", // name of your video card
			useHeader: true,           // true if you want a header. 
        	   	header: "MMM-PC-Stats",    // Any text you want. useHeader must be true
        	   	maxWidth: "300px",
        	   	animationSpeed: 0,         // 0 = no fade in and out. Only CPU load and Free RAM usage changes.
			updateInterval: 15 * 1000, // How often the CPU and Free RAM is checked for load and usage.
		}
    },
