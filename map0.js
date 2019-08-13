window.onload = setup;

var map;
var mapboxClient;
var bakerytimesclicked = 0;
var greentimesclicked = 0;
var resttimesclicked = 0;
var librarytimesclicked = 0;

var bakeryplacemarkerslong =[ -73.993702,-73.981566, -73.995581, -74.004950, -74.001918, -74.001507, -73.978939]; //place's longitude(bakeries)
var bakeryplacemarkerslat = [ 40.727610,40.721898, 40.737103, 40.735902, 40.745356, 40.740780, 40.758184]; //place's latitude
var greenplacemarkerslong =[ -73.994611, -73.970501, -73.931300, -73.922121, -73.969289, -73.977391, -74.016745]; //place's longitude(green places)
var greenplacemarkerslat = [ 40.722192, 40.749435, 40.862561, 40.857360, 40.756262, 40.723958, 40.716377]; //place's latitude
var restplacemarkerslong = [-73.983682, -73.991509, -73.981806, -73.988819, -73.950468, -73.960320, -73.950637];//place's longitude(restaurants)
var restplacemarkerslat = [40.730197, 40.728257, 40.714388, 40.713958, 40.78411, 40.814183, 40.821415];//place's latitude
var libraryplacemarkerslong = [-73.979352, -73.999163, -73.982235, -74.015740];
var libraryplacemarkerslat = [40.719910, 40.734595, 40.753200, 40.715758];

var bakerystores = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.993702,
          40.727610
        ]
      },
      "properties": {
        "name":"Lafayette Grand Cafe & Bakery",
        "description":"Classic French fare food",
        "address": "380 Lafayette Street",
        "city": " New York, NY",
        "country": "United States",
        "postalCode": "10003",
        "state": "N.Y."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.981566,
          40.721898
        ]
      },
      "properties": {
        "name":"Rossy’s bakery and coffee shop",
        "description": "Specializing in Dominican baked goods & food",
        "address": "242 E 3rd St",
        "city": " New York, NY",
        "country": "United States",
        "postalCode": "10009",
        "state": "N.Y."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.995581,
          40.737103
        ]
      },
      "properties": {
        "name":"LROOM cafe",
        "description": "Stylish, minimalistic cafe with colorful & creative desserts",
        "address": "41 W 14th St",
        "city": " New York, NY",
        "country": "United States",
        "postalCode": "10011",
        "state": "N.Y."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
         -74.004950,
          40.735902
        ]
      },
      "properties": {
        "name":"Magnolia bakery",
        "description": "Classic and creative baked desserts",
        "address": "401 Bleecker Street",
        "city": " New York, NY",
        "country": "United States",
        "postalCode": "10014",
        "state": "N.Y."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -74.001918,
          40.745356
        ]
      },
      "properties": {
        "name":"Billy’s bakery",
        "description": "Quaint 1940s-style classic bakery",
        "address": "184 9th Ave",
        "city": " New York, NY",
        "country": "United States",
        "postalCode": "10011",
        "state": "N.Y."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -74.001507,
          40.740780
        ]
      },
      "properties": {
        "name":"Empire Cake",
        "description": "Creative & Retro-styled treats",
        "address": "112 8th Ave",
        "city": " New York, NY",
        "country": "United States",
        "postalCode": "10011",
        "state": "N.Y."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.978939,
          40.758184
        ]
      },
      "properties": {
        "name":"Bouchon bakery",
        "description": "Modern, French-inspired pastries",
        "address": "1 Rockefeller Plaza",
        "city": " New York, NY",
        "country": "United States",
        "postalCode": "10020",
        "state": "N.Y."
      }
    }
  ]
};

var green = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.994611,
          40.722192
        ]
      },
      "properties": {
        "name":"Elizabeth Street Garden",
        "description": "Contains multiple sculptures",
        "address": "Elizabeth St",
        "city": " New York, NY",
        "country": "United States",
        "postalCode": "10012",
        "state": "N.Y."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.970501,
          40.749435
        ]
      },
      "properties": {
        "name":"Tudor City Greens",
        "description": "A classic Manhattan Park",
        "address": "38 Tudor City Pl #24",
        "city": " New York, NY",
        "country": "United States",
        "postalCode": "10017",
        "state": "N.Y."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.931300,
          40.862561
        ]
      },
      "properties": {
        "name":"Fort Tryon Park",
        "description": "Scenic park with a museum, gardens, dog run, & playgrounds",
        "address": "41 W 14th St",
        "city": " New York, NY",
        "country": "United States",
        "postalCode": "10011",
        "state": "N.Y."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
         -73.922121,
          40.857360
        ]
      },
      "properties": {
        "name":"Swindler Cove",
        "description": "Contains an urban forest, saltwater marsh & and many wildlife",
        "address": "3703 Harlem River Dr",
        "city": " New York, NY",
        "country": "United States",
        "postalCode": "10034",
        "state": "N.Y."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.969289,
          40.756262
        ]
      },
      "properties": {
        "name":"Greenacre Park",
        "description": "A compact urban park featuring a 25-ft. waterfall",
        "address": "217 E 51st St",
        "city": " New York, NY",
        "country": "United States",
        "postalCode": "10022",
        "state": "N.Y."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.977391,
          40.723958
        ]
      },
      "properties": {
        "name":"Green Oasis Garden",
        "description": "A small community garden with a fish pond",
        "address": "Avenue D & East 7th Street",
        "city": " New York, NY",
        "country": "United States",
        "postalCode": "10009",
        "state": "N.Y."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -74.016745,
          40.71637
        ]
      },
      "properties": {
        "name":"Rockefeller Park",
        "description": "Spacious lawns, gardens, & public artwork",
        "address": "75 Battery Pl",
        "city": " New York, NY",
        "country": "United States",
        "postalCode": "10280",
        "state": "N.Y."
      }
    }
  ]
};

var rest = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.983682,
          40.730197
        ]
      },
      "properties": {
        "name":"S'MAC",
        "description":"The go to spot for different variations of the classic Mac & Cheese",
        "address": "197 1st Avenue",
        "city": " New York NY",
        "country": "United States",
        "postalCode": "10003",
        "state": "N.Y."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.991509,
          40.728257
        ]
      },
      "properties": {
        "name":"Gyu-Kaku Japanese BBQ",
        "description": "Cooking on grill experience",
        "address": "34 Cooper Sq",
        "city": " New York NY",
        "country": "United States",
        "postalCode": "10003",
        "state": "N.Y."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.981806,
          40.714388
        ]
      },
      "properties": {
        "name":"El Castillo De Jagua",
        "description": "Classic spanish restaurant for families",
        "address": "521 Grand St A",
        "city": " New York NY",
        "country": "United States",
        "postalCode": "10002",
        "state": "N.Y."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
         -73.988819,
          40.713958
        ]
      },
      "properties": {
        "name":"Petisco Vegano",
        "description": "Breakfast to Dinner restaurant with Mediterranean dishes",
        "address": "189 E Broadway",
        "city": " New York NY",
        "country": "United States",
        "postalCode": "10002",
        "state": "N.Y."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.950468,
          40.784111
        ]
      },
      "properties": {
        "name":"Barking Dog",
        "description": "Comfort American food with a dogy drinking fountain",
        "address": "1678 Third Ave",
        "city": " New York NY",
        "country": "United States",
        "postalCode": "10128",
        "state": "N.Y."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.960320,
          40.814183
        ]
      },
      "properties": {
        "name":"Pisticci",
        "description": "Basic Italian fare in a homey space with live jazz",
        "address": "125 La Salle St",
        "city": " New York NY",
        "country": "United States",
        "postalCode": "10027",
        "state": "N.Y."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.950637,
          40.821415
        ]
      },
      "properties": {
        "name":"Fumo",
        "description": "Bright, modern neighborhood Italian destination",
        "address": "1600 Amsterdam Ave",
        "city": " New York NY",
        "country": "United States",
        "postalCode": "10031",
        "state": "N.Y."
      }
    }
  ]
};

var libraries = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.979352,
          40.719910
        ]
      },
      "properties": {
        "name":"Hamilton Fish Park Library",
        "description":"",
        "address": "415 E Houston St",
        "city": " New York, NY",
        "country": "United States",
        "postalCode": "10002",
        "state": "N.Y."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.999163,
          40.734595
        ]
      },
      "properties": {
        "name":"Jefferson Market Library",
        "description": "",
        "address": "425 6th Ave",
        "city": " New York, NY",
        "country": "United States",
        "postalCode": "10011",
        "state": "N.Y."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.982235,
          40.753200
        ]
      },
      "properties": {
        "name":"New York Public Library - Stephen A. Schwarzman Building",
        "description": "",
        "address": "476 5th Ave",
        "city": " New York, NY",
        "country": "United States",
        "postalCode": "10018",
        "state": "N.Y."
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
         -74.015740,
          40.715758
        ]
      },
      "properties": {
        "name":"Battery Park City Library",
        "description": "Classic and creative baked desserts",
        "address": "175 North End Ave",
        "city": " New York, NY",
        "country": "United States",
        "postalCode": "10282",
        "state": "N.Y."
      }
    }
  ]
};

function setup() {
  map = document.getElementById("map");
  map.style.right = "100px";

  mapboxgl.accessToken = 'pk.eyJ1Ijoia3llbTEiLCJhIjoiY2p5enlkcnZiMDJjMTNjbjM5NzF2ZG0yOCJ9.FNq1SSAlIGuvshHFKqX4qA';
  mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });

  mapboxClient.geocoding.forwardGeocode({
      query: "Cooper Hewitt, 2 E 91st St, New York City, New York 10128, United States of America",
      autocomplete: false,
      limit: 1
  })

  .send()
  .then(function (response) {
      if (response && response.body && response.body.features && response.body.features.length) {
          var feature = response.body.features[0];

          map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v11',
            center: feature.center, // long,lat starting position
            zoom: 11 // starting zoom
          });

        }

  // Add zoom and rotation controls to the map.

   map.addControl(new MapboxGeocoder({
   accessToken: mapboxgl.accessToken,
   mapboxgl: mapboxgl
   }));
   map.addControl(new mapboxgl.NavigationControl());
   map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    trackUserLocation: true
    }));

    document.getElementById("bakery").addEventListener ("click", bakeryclicktimes, false);
    document.getElementById("Green").addEventListener ("click", greenclicktimes, false);
    document.getElementById("Restaurants").addEventListener ("click", restclicktimes, false);
    document.getElementById("Library").addEventListener ("click", libraryclicktimes, false);

    });
}


function bakeryclicktimes(){
  bakerytimesclicked ++;
  if (bakerytimesclicked%2!=0){
    console.log(bakerytimesclicked);
    bakerypopup();
  }

  if (bakerytimesclicked%2==0){
    // timesclicked = 1;
    setup();
    for (var i = 0; i < bakerystores.features.length; i++) {
      var holder = document.getElementById('listing-' + i);
      holder.remove();
    }
  }
}
function greenclicktimes(){
  greentimesclicked ++;
  if (greentimesclicked%2!=0){
    console.log(greentimesclicked);
    greenpopup();
  }

  if (greentimesclicked%2==0){
    // timesclicked = 1;
    setup();
    for (var i = 0; i < green.features.length; i++) {
      var holder = document.getElementById('listing-' + i);
      holder.remove();
    }
  }
}


function restclicktimes(){
  resttimesclicked ++;
  if (resttimesclicked%2!=0){
    console.log(resttimesclicked);
    restpopup();
  }

  if (resttimesclicked%2==0){
    // timesclicked = 1;
    setup();
    for (var i = 0; i < rest.features.length; i++) {
      var holder = document.getElementById('listing-' + i);
      holder.remove();
    }
  }
}


function libraryclicktimes(){
  librarytimesclicked ++;
  if (librarytimesclicked%2!=0){
    console.log(librarytimesclicked);
    librarypopup();
  }

  if (librarytimesclicked%2==0){
    // timesclicked = 1;
    setup();
    for (var i = 0; i < Library.features.length; i++) {
      var holder = document.getElementById('listing-' + i);
      holder.remove();
    }
  }
}

function bakerypopup() {

  //side bar markers
    for (var i = 0; i < bakeryplacemarkerslat.length; i++){
      var bakerypos = [bakeryplacemarkerslong[i], bakeryplacemarkerslat[i]];
      console.log("the location bakery", bakerypos);

      new mapboxgl.Marker({color: "#ffdac1"})
          .setLngLat(bakerypos)//marker
          .addTo(map)
        }

//side bar list
      map.addLayer({
        id: 'locations',
        type: 'symbol',
        // Add a GeoJSON source containing place coordinates and information.
        source: {
          type: 'geojson',
          data: bakerystores
        },
        layout: {

          'icon-image': 'marker-15',
          'icon-allow-overlap': true,
        }
      });

//calling list function

    buildLocationList(bakerystores);
}

function greenpopup() {

    for (var i = 0; i < greenplacemarkerslat.length; i++){
      var greenpos = [greenplacemarkerslong[i], greenplacemarkerslat[i]];
      console.log("the location green", greenpos);
      new mapboxgl.Marker({color: "#cdffdd"})
          .setLngLat(greenpos)//marker
          .addTo(map)

//side bar list
      map.addLayer({
        id: 'locations',
        type: 'symbol',
        // Add a GeoJSON source containing place coordinates and information.
        source: {
          type: 'geojson',
          data: green
        },
        layout: {
          'icon-image': 'marker-15',
          'icon-allow-overlap': true,
        }
      });
    }
    buildLocationList(green);
  }

function restpopup() {

  for (var i = 0; i < restplacemarkerslat.length; i++){
    var restpos = [restplacemarkerslong[i], restplacemarkerslat[i]];
    console.log("the location rest", restpos);
    new mapboxgl.Marker({color: "#ffb7b2"})
        .setLngLat(restpos)//marker
        .addTo(map)

//side bar list
    map.addLayer({
      id: 'locations',
      type: 'symbol',
      // Add a GeoJSON source containing place coordinates and information.
      source: {
        type: 'geojson',
        data: rest
      },
      layout: {
        'icon-image': 'marker-15',
        'icon-allow-overlap': true,
      }
    });
  }
  buildLocationList(rest);
}

function librarypopup() {

  //side bar markers
for (var i = 0; i < libraryplacemarkerslat.length; i++){
  var librarypos = [libraryplacemarkerslong[i], libraryplacemarkerslat[i]];
  console.log("the location library", librarypos);
  new mapboxgl.Marker({color: "#ecd4ff"})
        .setLngLat(librarypos)//marker
        .addTo(map)


//side bar list
      map.addLayer({
        id: 'locations',
        type: 'symbol',
        // Add a GeoJSON source containing place coordinates and information.
        source: {
          type: 'geojson',
          data: libraries
        },
        layout: {

          'icon-image': 'marker-15',
          'icon-allow-overlap': true,
        }
      });
    }
    buildLocationList(libraries);
}


//loops to make side list
function buildLocationList(data) {

  // Iterate through the list of bakerystores
  for (var i = 0; i < data.features.length; i++) {
    var currentFeature = data.features[i];
    // Shorten data.feature.properties to `prop` so we're not
    // writing this long form over and over again.
    var prop = currentFeature.properties;
    // Select the listing container in the HTML and append a div
    // with the class 'item' for each store
    var listings = document.getElementById('listings');
    var holder = document.createElement('div');
    holder.id = "holder";
    var listing = listings.appendChild(holder);
    listing.className = 'item';
    listing.id = 'listing-' + i;

    // Create a new link with the class 'title' for each store
    // and fill it with the store address
    var link = listing.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';
    link.dataPosition = i;
    link.innerHTML = prop.name;

//description in side bar
    var details = listing.appendChild(document.createElement('div'));

    details.innerHTML = prop.address + prop.city;

    // if (prop.phone) {
    //   details.innerHTML += ' · ' + prop.phoneFormatted;
    // }




        // Add an event listener for the links in the sidebar listing
        link.addEventListener('click', function(e) {
          // Update the currentFeature to the store associated with the clicked link
          var clickedListing = data.features[this.dataPosition];
          // 1. Fly to the point associated with the clicked link
          flyToStore(clickedListing);
          // 2. Close all other popups and display popup for clicked store
          createPopUp(clickedListing);
          // 3. Highlight listing in sidebar (and remove highlight for all other listings)
          var activeItem = document.getElementsByClassName('active');
          if (activeItem[0]) {
            activeItem[0].classList.remove('active');
          }
          this.parentNode.classList.add('active');
        });


  }

  // Add an event listener for when a user clicks on the map
  map.on('click', function(e) {
    // Query all the rendered points in the view
    var features = map.queryRenderedFeatures(e.point, { layers: ['locations'] });
    if (features.length) {
      var clickedPoint = features[0];
      // 1. Fly to the point
      flyToStore(clickedPoint);
      // 2. Close all other popups and display popup for clicked store
      createPopUp(clickedPoint);
      // 3. Highlight listing in sidebar (and remove highlight for all other listings)
      var activeItem = document.getElementsByClassName('active');
      if (activeItem[0]) {
        activeItem[0].classList.remove('active');
      }
      // Find the index of the store.features that corresponds to the clickedPoint that fired the event listener
      var selectedFeature = clickedPoint.properties.address;

      for (var i = 0; i < data.features.length; i++) {
        if (data.features[i].properties.address === selectedFeature) {
          selectedFeatureIndex = i;
        }
      }
      // Select the correct list item using the found index and add the active class
      var listing = document.getElementById('listing-' + selectedFeatureIndex);
      listing.classList.add('active');
    }
  });


}


function flyToStore(currentFeature) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 13
  });
}

function createPopUp(currentFeature) {
  var popUps = document.getElementsByClassName('mapboxgl-popup');
  // This will let you use the .remove() function later on
  if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  }
  // Check if there is already a popup on the map and if so, remove it
  if (popUps[0]) popUps[0].remove();

  var popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML('<h3>'+ currentFeature.properties.name+'</h3>' +
      '<h4>' + currentFeature.properties.description + '</h4>')
    .addTo(map);
}
