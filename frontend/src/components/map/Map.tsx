// import { useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import "./Map.css";
// // Replace with your Mapbox access token
// mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

// const cycloneData = {
//   "type": "FeatureCollection",
//   "features": [
//     {
//       "type": "Feature",
//       "bbox": [-89.9, 24.8, -89.9, 24.8],
//       "geometry": {
//         "type": "Point",
//         "coordinates": [-89.9, 24.8]
//       },
//       "properties": {
//         "eventtype": "TC",
//         "eventid": 1001122,
//         "episodeid": 23,
//         "eventname": "RAFAEL-24",
//         "name": "Tropical Cyclone RAFAEL-24",
//         "description": "Tropical Cyclone RAFAEL-24",
//         "htmldescription": "Orange Tropical Cyclone RAFAEL-24 in Cuba, Jamaica from: 03 Nov 2024  to: 09 Nov 2024 .",
//         "icon": "https://www.gdacs.org/images/gdacs_icons/maps/Green/TC.png",
//         "iconoverall": "https://www.gdacs.org/images/gdacs_icons/maps/Orange/TC.png",
//         "alertlevel": "Orange",
//         "country": "Cuba, Jamaica",
//         "fromdate": "2024-11-03T21:00:00",
//         "todate": "2024-11-09T03:00:00",
//         "severitydata": {
//           "severity": 194.4432,
//           "severitytext": "Tropical Storm (maximum wind speed of 194 km/h)",
//           "severityunit": "km/h"
//         }
//       }
//     },
//     {
//       "type": "Feature",
//       "bbox": [-77.13, 12.97, -77.07, 13.03],
//       "geometry": {
//         "type": "Polygon",
//         "coordinates": [
//           [
//             [-77.1, 12.97],
//             [-77.0985279697702, 12.9700361363138],
//             [-77.0970594857901, 12.9701444581998],
//             [-77.0955980857663, 12.9703247047011],
//             [-77.0941472903395, 12.9705764415879],
//             [-77.0927105946029, 12.9708990624042],
//             [-77.0912914596824, 12.971291789928],
//             [-77.0898933043982, 12.9717536780445],
//             [-77.088519497029, 12.9722836140247],
//             [-77.0871733471971, 12.9728803212063],
//             [-77.0858580978952, 12.9735423620696],
//             [-77.0845769176742, 12.9742681417],
//             [-77.0833328930094, 12.9750559116309],
//             [-77.0821290208652, 12.9759037740556],
//             [-77.0809682014751, 12.9768096863991],
//             [-77.0798532313546, 12.9777714662394],
//             [-77.0787867965644, 12.9787867965644],
//             [-77.0777714662393, 12.9798532313546],
//             [-77.0768096863991, 12.9809682014751],
//             [-77.0759037740556, 12.9821290208652],
//             [-77.0750559116309, 12.9833328930094],
//             [-77.0742681417, 12.9845769176742],
//             [-77.0735423620696, 12.9858580978952],
//             [-77.0728803212063, 12.9871733471971],
//             [-77.0722836140247, 12.988519497029],
//             [-77.0717536780445, 12.9898933043982],
//             [-77.071291789928, 12.9912914596824],
//             [-77.0708990624042, 12.9927105946029],
//             [-77.0705764415879, 12.9941472903395],
//             [-77.0703247047011, 12.9955980857663],
//             [-77.0701444581998, 12.9970594857901],
//             [-77.0700361363138, 12.9985279697702],
//             [-77.07, 13],
//             [-77.0700361363138, 13.0014720302298],
//             [-77.0701444581998, 13.0029405142099],
//             [-77.0703247047011, 13.0044019142337],
//             [-77.0705764415879, 13.0058527096605],
//             [-77.0708990624042, 13.0072894053971],
//             [-77.071291789928, 13.0087085403176],
//             [-77.0717536780445, 13.0101066956018],
//             [-77.0722836140247, 13.011480502971],
//             [-77.0728803212063, 13.0128266528029],
//             [-77.0735423620696, 13.0141419021048],
//             [-77.0742681417, 13.0154230823258],
//             [-77.0750559116309, 13.0166671069906],
//             [-77.0759037740556, 13.0178709791348],
//             [-77.0768096863991, 13.0190317985249],
//             [-77.0777714662393, 13.0201467686454],
//             [-77.0787867965644, 13.0212132034356],
//             [-77.0798532313546, 13.0222285337606],
//             [-77.0809682014751, 13.0231903136009],
//             [-77.0821290208652, 13.0240962259444],
//             [-77.0833328930094, 13.0249440883691],
//             [-77.0845769176742, 13.0257318583],
//             [-77.0858580978952, 13.0264576379305],
//             [-77.0871733471971, 13.0271196787937],
//             [-77.088519497029, 13.0277163859753],
//             [-77.0898933043982, 13.0282463219555],
//             [-77.0912914596824, 13.028708210072],
//             [-77.0927105946029, 13.0291009375958],
//             [-77.0941472903395, 13.0294235584121],
//             [-77.0955980857663, 13.0296752952989],
//             [-77.0970594857901, 13.0298555418002],
//             [-77.0985279697702, 13.0299638636862],
//             [-77.1, 13.03],
//             [-77.1014720302298, 13.0299638636862],
//             [-77.1029405142099, 13.0298555418002],
//             [-77.1044019142337, 13.0296752952989],
//             [-77.1058527096605, 13.0294235584121],
//             [-77.1072894053971, 13.0291009375958],
//             [-77.1087085403176, 13.028708210072],
//             [-77.1101066956018, 13.0282463219555],
//             [-77.111480502971, 13.0277163859753],
//             [-77.1128266528029, 13.0271196787937],
//             [-77.1141419021048, 13.0264576379305],
//             [-77.1154230823258, 13.0257318583],
//             [-77.1166671069906, 13.0249440883691],
//             [-77.1178709791348, 13.0240962259444],
//             [-77.1190317985249, 13.0231903136009],
//             [-77.1201467686454, 13.0222285337606],
//             [-77.1212132034356, 13.0212132034356],
//             [-77.1222285337607, 13.0201467686454],
//             [-77.1231903136009, 13.0190317985249],
//             [-77.1240962259444, 13.0178709791348],
//             [-77.1249440883691, 13.0166671069906],
//             [-77.1257318583, 13.0154230823258],
//             [-77.1264576379304, 13.0141419021048],
//             [-77.1271196787937, 13.0128266528029],
//             [-77.1277163859753, 13.011480502971],
//             [-77.1282463219555, 13.0101066956018],
//             [-77.128708210072, 13.0087085403176],
//             [-77.1291009375958, 13.0072894053971],
//             [-77.1294235584121, 13.0058527096605],
//             [-77.1296752952989, 13.0044019142337],
//             [-77.1298555418002, 13.0029405142099],
//             [-77.1299638636862, 13.0014720302298],
//             [-77.13, 13],
//             [-77.1299638636862, 12.9985279697702],
//             [-77.1298555418002, 12.9970594857901],
//             [-77.1296752952989, 12.9955980857663],
//             [-77.1294235584121, 12.9941472903395],
//             [-77.1291009375958, 12.9927105946029],
//             [-77.128708210072, 12.9912914596824],
//             [-77.1282463219555, 12.9898933043982],
//             [-77.1277163859753, 12.988519497029],
//             [-77.1271196787937, 12.9871733471971],
//             [-77.1264576379304, 12.9858580978952],
//             [-77.1257318583, 12.9845769176742],
//             [-77.1249440883691, 12.9833328930094],
//             [-77.1240962259444, 12.9821290208652],
//             [-77.1231903136009, 12.9809682014751],
//             [-77.1222285337607, 12.9798532313546],
//             [-77.1212132034356, 12.9787867965644],
//             [-77.1201467686454, 12.9777714662394],
//             [-77.1190317985249, 12.9768096863991],
//             [-77.1178709791348, 12.9759037740556],
//             [-77.1166671069906, 12.9750559116309],
//             [-77.1154230823258, 12.9742681417],
//             [-77.1141419021048, 12.9735423620696],
//             [-77.1128266528029, 12.9728803212063],
//             [-77.111480502971, 12.9722836140247],
//             [-77.1101066956018, 12.9717536780445],
//             [-77.1087085403176, 12.971291789928],
//             [-77.1072894053971, 12.9708990624042],
//             [-77.1058527096605, 12.9705764415879],
//             [-77.1044019142337, 12.9703247047011],
//             [-77.1029405142099, 12.9701444581998],
//             [-77.1014720302298, 12.9700361363138],
//             [-77.1, 12.97]
//           ]
//         ]
//       },
//     }
//   ]
// };

// function Map() {
//   const mapContainer = useRef<HTMLDivElement>(null);
//   const map = useRef<mapboxgl.Map | null>(null);

//   useEffect(() => {
//     if (!map.current && mapContainer.current) {
//       // Initialize map with a wider view to see both features
//       map.current = new mapboxgl.Map({
//         container: mapContainer.current,
//         style: 'mapbox://styles/mapbox/streets-v12',
//         center: [-83, 19], // Adjusted center to show both features
//         zoom: 4  // Reduced zoom to show wider area
//       });

//       // Add navigation controls
//       map.current.addControl(new mapboxgl.NavigationControl());

//       map.current.on('load', () => {
//         // Add point marker
//         const pointFeature = cycloneData.features.find(f => f.geometry.type === 'Point');
//         if (pointFeature) {
//           // Create custom marker element
//           const el = document.createElement('div');
//           el.className = 'cyclone-marker';
          
//           // Use the icon from the properties
//           const markerIcon = document.createElement('img');
//           markerIcon.src = pointFeature.properties.iconoverall; // Using the Orange TC icon from your data
//           markerIcon.className = 'marker-icon';
//           el.appendChild(markerIcon);

//           // Create popup with your data
//           const popup = new mapboxgl.Popup({ offset: 25 })
//             .setHTML(`
//               <div class="cyclone-popup">
//                 <h3>${pointFeature.properties.name}</h3>
//                 <p class="alert">Alert Level: ${pointFeature.properties.alertlevel}</p>
//                 <p class="severity">${pointFeature.properties.severitydata.severitytext}</p>
//                 <p>${pointFeature.properties.htmldescription}</p>
//                 <p>Countries: ${pointFeature.properties.country}</p>
//                 <p>From: ${new Date(pointFeature.properties.fromdate).toLocaleDateString()}</p>
//                 <p>To: ${new Date(pointFeature.properties.todate).toLocaleDateString()}</p>
//                 <p>Wind Speed: ${pointFeature.properties.severitydata.severity} ${pointFeature.properties.severitydata.severityunit}</p>
//               </div>
//             `);

//           // Add marker to map
//           new mapboxgl.Marker(el)
//             .setLngLat(pointFeature.geometry.coordinates as [number, number])
//             .setPopup(popup)
//             .addTo(map.current);
//         }

//         // Modified polygon layer code
//         const polygonFeature = cycloneData.features.find(f => f.geometry.type === 'Polygon');
//         console.log(polygonFeature);
//         if (polygonFeature && map.current) {
//           map.current.addSource('cyclone-area', {
//             type: 'geojson',
//             data: {
//               type: 'Feature',
//               geometry: polygonFeature.geometry.coordinates,
//               properties: polygonFeature.properties
//             }
//           });

//           // Add fill layer with modified paint properties
//           map.current.addLayer({
//             id: 'cyclone-area-fill',
//             type: 'fill',
//             source: 'cyclone-area',
//             paint: {
//               'fill-color': getAlertColor(polygonFeature.properties.alertlevel),
//               'fill-opacity': 0.5  // Increased opacity
//             }
//           });

//           // Add outline layer with modified paint properties
//           map.current.addLayer({
//             id: 'cyclone-area-outline',
//             type: 'line',
//             source: 'cyclone-area',
//             paint: {
//               'line-color': getAlertColor(polygonFeature.properties.alertlevel),
//               'line-width': 3,  // Increased width
//               'line-opacity': 0.8
//             }
//           });
//         }

//         // Add legend
//         addLegend(map.current);
//       });
//     }
//   }, []);

//   return <div ref={mapContainer} className="map-container" style={{ height: "100vh", width: "100%" }} />;
// }

// // Helper function to get color based on alert level
// function getAlertColor(alertLevel: string): string {
//   switch (alertLevel.toLowerCase()) {
//     case 'green':
//       return '#4CAF50';
//     case 'orange':
//       return '#FF9800';
//     case 'red':
//       return '#F44336';
//     default:
//       return '#4CAF50';
//   }
// }

// // Helper function to add legend
// function addLegend(map: mapboxgl.Map) {
//   const legend = document.createElement('div');
//   legend.className = 'map-legend';
//   legend.innerHTML = `
//     <h4>Cyclone Alert Levels</h4>
//     <div><span class="legend-key green"></span>Green - Low Alert</div>
//     <div><span class="legend-key orange"></span>Orange - Medium Alert</div>
//     <div><span class="legend-key red"></span>Red - High Alert</div>
//   `;
//   map.getContainer().appendChild(legend);
// }

// export default Map;

// import React, { useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// const MapboxExample = () => {
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

//     if (!mapRef.current) { // Initialize map only if it doesn't exist
//       mapRef.current = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: 'mapbox://styles/mapbox/streets-v12',
//         center: [-68.137343, 45.137451],
//         zoom: 5
//       });

//       mapRef.current.on('load', () => {
//         // Check if the source "maine" already exists, if not, add it
//         if (!mapRef.current.getSource('maine')) {
//           mapRef.current.addSource('maine', {
//             type: 'geojson',
//             data: {
//               type: 'Feature',
//               geometry: {
//                 type: 'Polygon',
//                 coordinates: [
//                   [
//                 [-67.13734, 45.13745],
//                 [-66.96466, 44.8097],
//                 [-68.03252, 44.3252],
//                 [-69.06, 43.98],
//                 [-70.11617, 43.68405],
//                 [-70.64573, 43.09008],
//                 [-70.75102, 43.08003],
//                 [-70.79761, 43.21973],
//                 [-70.98176, 43.36789],
//                 [-70.94416, 43.46633],
//                 [-71.08482, 45.30524],
//                 [-70.66002, 45.46022],
//                 [-70.30495, 45.91479],
//                 [-70.00014, 46.69317],
//                 [-69.23708, 47.44777],
//                 [-68.90478, 47.18479],
//                 [-68.2343, 47.35462],
//                 [-67.79035, 47.06624],
//                 [-67.79141, 45.70258],
//                 [-67.13734, 45.13745]
//                   ]
//                 ]
//               }
//             }
//           });

//           mapRef.current.addLayer({
//             id: 'maine',
//             type: 'fill',
//             source: 'maine',
//             layout: {},
//             paint: {
//               'fill-color': '#0080ff',
//               'fill-opacity': 0.5
//             }
//           });

//           mapRef.current.addLayer({
//             id: 'outline',
//             type: 'line',
//             source: 'maine',
//             layout: {},
//             paint: {
//               'line-color': '#000',
//               'line-width': 3
//             }
//           });
//         }
//       });
//     }

//     // Cleanup function to remove the map instance on unmount
//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, []);

//   return <div ref={mapContainerRef} style={{ height: '100vh' }} />;
// };

// export default MapboxExample;


import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxCycloneTracker = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const popupRef = useRef(null);
  const [error, setError] = useState(null);

  const cycloneData = {
    type: "FeatureCollection",  // Changed to FeatureCollection
    features: [
      {
        type: "Feature",  // Added type: "Feature" to each feature
        properties: {
          eventtype: "TC",
          eventid: 1001123,
          eventname: "VAYU-24",
          name: "Tropical Cyclone VAYU-24",
          alertlevel: "Red",
          country: "India",
          fromdate: "2024-11-05T06:00:00",
          todate: "2024-11-10T12:00:00",
          severitydata: JSON.stringify({
            severity: 180.23,
            severitytext: "Severe Cyclonic Storm (maximum wind speed of 180 km/h)",
            severityunit: "km/h"
          })
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [72.5, 20.1],
            [72.6, 20.3],
            [72.7, 20.5],
            [72.8, 20.7],
            [72.9, 20.9],
            [73.0, 21.1],
            [73.1, 21.3],
            [73.2, 21.5],
            [73.3, 21.7],
            [73.4, 21.9],
            [73.5, 22.1],
            [73.6, 22.3],
            [72.5, 20.1]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          eventtype: "TC",
          eventid: 1001124,
          eventname: "MAHA-24",
          name: "Tropical Cyclone MAHA-24",
          alertlevel: "Orange",
          country: "India",
          fromdate: "2024-11-08T08:00:00",
          todate: "2024-11-12T16:00:00",
          severitydata: JSON.stringify({
            severity: 160.75,
            severitytext: "Cyclonic Storm (maximum wind speed of 160 km/h)",
            severityunit: "km/h"
          })
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-67.13734, 45.13745],
            [-66.96466, 44.8097],
            [-68.03252, 44.3252],
            [-69.06, 43.98],
            [-70.11617, 43.68405],
            [-70.64573, 43.09008],
            [-70.75102, 43.08003],
            [-70.79761, 43.21973],
            [-70.98176, 43.36789],
            [-70.94416, 43.46633],
            [-71.08482, 45.30524],
            [-70.66002, 45.46022],
            [-70.30495, 45.91479],
            [-70.00014, 46.69317],
            [-69.23708, 47.44777],
            [-68.90478, 47.18479],
            [-68.2343, 47.35462],
            [-67.79035, 47.06624],
            [-67.79141, 45.70258],
            [-67.13734, 45.13745] 
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          eventtype: "TC",
          eventid: 1001125,
          eventname: "NISHA-24",
          name: "Tropical Cyclone NISHA-24",
          alertlevel: "Yellow",
          country: "India",
          fromdate: "2024-11-09T10:00:00",
          todate: "2024-11-13T18:00:00",
          severitydata: JSON.stringify({
            severity: 140.5,
            severitytext: "Cyclonic Storm (maximum wind speed of 140 km/h)",
            severityunit: "km/h"
          })
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [88.1, 21.9],
            [88.2, 22.1],
            [88.3, 22.3],
            [88.4, 22.5],
            [88.5, 22.7],
            [88.6, 22.9],
            [88.7, 23.1],
            [88.8, 23.3],
            [88.9, 23.5],
            [88.1, 21.9]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          eventtype: "TC",
          eventid: 1001126,
          eventname: "PHET-24",
          name: "Tropical Cyclone PHET-24",
          alertlevel: "Orange",
          country: "India",
          fromdate: "2024-11-04T04:00:00",
          todate: "2024-11-08T10:00:00",
          severitydata: JSON.stringify({
            severity: 170.0,
            severitytext: "Cyclonic Storm (maximum wind speed of 170 km/h)",
            severityunit: "km/h"
          })
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [77.3, 15.5],
            [77.4, 15.7],
            [77.5, 15.9],
            [77.6, 16.1],
            [77.7, 16.3],
            [77.8, 16.5],
            [77.9, 16.7],
            [78.0, 16.9],
            [78.1, 17.1],
            [77.3, 15.5]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          eventtype: "TC",
          eventid: 1001127,
          eventname: "BULBUL-24",
          name: "Tropical Cyclone BULBUL-24",
          alertlevel: "Red",
          country: "India",
          fromdate: "2024-11-07T02:00:00",
          todate: "2024-11-14T08:00:00",
          severitydata: JSON.stringify({
            severity: 190.85,
            severitytext: "Very Severe Cyclonic Storm (maximum wind speed of 190 km/h)",
            severityunit: "km/h"
          })
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [93.5, 12.1],
            [93.6, 12.3],
            [93.7, 12.5],
            [93.8, 12.7],
            [93.9, 12.9],
            [94.0, 13.1],
            [94.1, 13.3],
            [94.2, 13.5],
            [94.3, 13.7],
            [94.4, 13.9],
            [94.5, 14.1],
            [93.5, 12.1]
          ]]
        }
      }
    ]
  };

  useEffect(() => {
    try {
      if (!mapRef.current) {
        console.log('Initializing map...');
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [83, 21], // Centered on India
          zoom: 4.5 // Adjusted zoom level to show all of India
        });

        // Create popup but don't add to map yet
        popupRef.current = new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: false
        });

        // Wait for map to load before adding data
        mapRef.current.on('load', () => {
          console.log('Map loaded, adding source and layers...');

          // First check if source already exists
          if (!mapRef.current.getSource('cyclone')) {
            // Add the cyclone data source
            mapRef.current.addSource('cyclone', {
              type: 'geojson',
              data: cycloneData
            });
            console.log('Source added');
          }

          // Check if layer exists before adding
          if (!mapRef.current.getLayer('cyclone-area')) {
            // Add the fill layer with color based on alert level
            mapRef.current.addLayer({
              id: 'cyclone-area',
              type: 'fill',
              source: 'cyclone',
              paint: {
                'fill-color': [
                  'match',
                  ['get', 'alertlevel'],
                  'Red', '#FF0000',
                  'Orange', '#FFA500',
                  'Yellow', '#FFFF00',
                  '#FFA500' // default color
                ],
                'fill-opacity': 0.5
              }
            });
            console.log('Fill layer added');

            // Add the outline layer
            mapRef.current.addLayer({
              id: 'cyclone-outline',
              type: 'line',
              source: 'cyclone',
              paint: {
                'line-color': '#000',
                'line-width': 2
              }
            });
            console.log('Outline layer added');
          }

          // Add click handler
          mapRef.current.on('click', 'cyclone-area', (e) => {
            const coordinates = e.lngLat;
            const properties = e.features[0].properties;
            const severityData = JSON.parse(properties.severitydata);

            const html = `
              <div class="p-4 max-w-sm">
                <h3 class="text-lg font-bold mb-2">${properties.name}</h3>
                <div class="space-y-2">
                  <p><strong>Alert Level:</strong> ${properties.alertlevel}</p>
                  <p><strong>Location:</strong> ${properties.country}</p>
                  <p><strong>Period:</strong><br/>
                     From: ${new Date(properties.fromdate).toLocaleString()}<br/>
                     To: ${new Date(properties.todate).toLocaleString()}</p>
                  <p><strong>Severity:</strong> ${severityData.severitytext}</p>
                </div>
              </div>
            `;

            popupRef.current
              .setLngLat(coordinates)
              .setHTML(html)
              .addTo(mapRef.current);
          });

          // Add hover effects
          mapRef.current.on('mouseenter', 'cyclone-area', () => {
            mapRef.current.getCanvas().style.cursor = 'pointer';
          });

          mapRef.current.on('mouseleave', 'cyclone-area', () => {
            mapRef.current.getCanvas().style.cursor = '';
          });
        });

        // Add error handling
        mapRef.current.on('error', (e) => {
          console.error('Mapbox error:', e);
          setError('An error occurred while loading the map.');
        });
      }
    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Failed to initialize the map.');
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '600px',
    border: '1px solid #ccc'
  };

  return (
    <div className="w-full">
      {error && (
        <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <div 
        ref={mapContainerRef} 
        style={containerStyle}
        className="relative bg-gray-100"
      />
    </div>
  );
};

export default MapboxCycloneTracker;