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



// ____________Polygon_______________

// import React, { useEffect, useRef, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// const MapboxCycloneTracker = () => {
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef(null);
//   const popupRef = useRef(null);
//   const [error, setError] = useState(null);

//   const cycloneData = {
//     type: "FeatureCollection",  // Changed to FeatureCollection
//     features: [
//       {
//         type: "Feature",  // Added type: "Feature" to each feature
//         properties: {
//           eventtype: "TC",
//           eventid: 1001123,
//           eventname: "VAYU-24",
//           name: "Tropical Cyclone VAYU-24",
//           alertlevel: "Red",
//           country: "India",
//           fromdate: "2024-11-05T06:00:00",
//           todate: "2024-11-10T12:00:00",
//           severitydata: JSON.stringify({
//             severity: 180.23,
//             severitytext: "Severe Cyclonic Storm (maximum wind speed of 180 km/h)",
//             severityunit: "km/h"
//           })
//         },
//         geometry: {
//           type: "Polygon",
//           "coordinates": [
//           [
//             [-174.38, -19.786],
//             [-174.381, -19.755],
//             [-174.382, -19.723],
//             [-174.385, -19.692],
//             [-174.389, -19.661],
//             [-174.395, -19.63],
//             [-174.401, -19.599],
//             [-174.409, -19.568],
//             [-174.417, -19.538],
//             [-174.427, -19.508],
//             [-174.438, -19.478],
//             [-174.45, -19.449],
//             [-174.463, -19.42],
//             [-174.477, -19.391],
//             [-174.492, -19.363],
//             [-174.508, -19.336],
//             [-174.526, -19.309],
//             [-174.544, -19.282],
//             [-174.563, -19.256],
//             [-174.583, -19.231],
//             [-174.604, -19.207],
//             [-174.626, -19.183],
//             [-174.649, -19.16],
//             [-174.672, -19.138],
//             [-174.697, -19.117],
//             [-174.722, -19.096],
//             [-174.748, -19.076],
//             [-174.775, -19.057],
//             [-174.802, -19.039],
//             [-174.83, -19.022],
//             [-174.859, -19.006],
//             [-174.888, -18.991],
//             [-174.918, -18.976],
//             [-174.948, -18.963],
//             [-174.979, -18.951],
//             [-175.01, -18.939],
//             [-175.042, -18.929],
//             [-175.074, -18.92],
//             [-175.106, -18.912],
//             [-175.138, -18.905],
//             [-175.171, -18.899],
//             [-175.204, -18.894],
//             [-175.237, -18.89],
//             [-175.271, -18.887],
//             [-175.304, -18.886],
//             [-175.338, -18.885],
//             [-175.371, -18.886],
//             [-175.404, -18.887],
//             [-175.438, -18.89],
//             [-175.471, -18.894],
//             [-175.504, -18.899],
//             [-175.537, -18.905],
//             [-175.569, -18.912],
//             [-175.601, -18.92],
//             [-175.633, -18.929],
//             [-175.665, -18.939],
//             [-175.696, -18.951],
//             [-175.727, -18.963],
//             [-175.757, -18.976],
//             [-175.787, -18.991],
//             [-175.816, -19.006],
//             [-175.845, -19.022],
//             [-175.873, -19.039],
//             [-175.9, -19.057],
//             [-175.927, -19.076],
//             [-175.953, -19.096],
//             [-175.978, -19.117],
//             [-176.003, -19.138],
//             [-176.026, -19.16],
//             [-176.049, -19.183],
//             [-176.071, -19.207],
//             [-176.092, -19.231],
//             [-176.112, -19.256],
//             [-176.131, -19.282],
//             [-176.149, -19.309],
//             [-176.167, -19.336],
//             [-176.183, -19.363],
//             [-176.198, -19.391],
//             [-176.212, -19.42],
//             [-176.225, -19.449],
//             [-176.237, -19.478],
//             [-176.248, -19.508],
//             [-176.258, -19.538],
//             [-176.266, -19.568],
//             [-176.274, -19.599],
//             [-176.28, -19.63],
//             [-176.286, -19.661],
//             [-176.29, -19.692],
//             [-176.293, -19.723],
//             [-176.294, -19.755],
//             [-176.295, -19.786],
//             [-176.294, -19.817],
//             [-176.293, -19.849],
//             [-176.29, -19.88],
//             [-176.286, -19.911],
//             [-176.28, -19.942],
//             [-176.274, -19.973],
//             [-176.266, -20.004],
//             [-176.258, -20.034],
//             [-176.248, -20.064],
//             [-176.237, -20.094],
//             [-176.225, -20.123],
//             [-176.212, -20.152],
//             [-176.198, -20.181],
//             [-176.183, -20.209],
//             [-176.167, -20.236],
//             [-176.149, -20.263],
//             [-176.131, -20.29],
//             [-176.112, -20.316],
//             [-176.092, -20.341],
//             [-176.071, -20.365],
//             [-176.049, -20.389],
//             [-176.026, -20.412],
//             [-176.003, -20.434],
//             [-175.978, -20.455],
//             [-175.953, -20.476],
//             [-175.927, -20.496],
//             [-175.9, -20.515],
//             [-175.873, -20.533],
//             [-175.845, -20.55],
//             [-175.816, -20.566],
//             [-175.787, -20.581],
//             [-175.757, -20.596],
//             [-175.727, -20.609],
//             [-175.696, -20.621],
//             [-175.665, -20.633],
//             [-175.633, -20.643],
//             [-175.601, -20.652],
//             [-175.569, -20.66],
//             [-175.537, -20.667],
//             [-175.504, -20.673],
//             [-175.471, -20.678],
//             [-175.438, -20.682],
//             [-175.404, -20.685],
//             [-175.371, -20.686],
//             [-175.338, -20.687],
//             [-175.304, -20.686],
//             [-175.271, -20.685],
//             [-175.237, -20.682],
//             [-175.204, -20.678],
//             [-175.171, -20.673],
//             [-175.138, -20.667],
//             [-175.106, -20.66],
//             [-175.074, -20.652],
//             [-175.042, -20.643],
//             [-175.01, -20.633],
//             [-174.979, -20.621],
//             [-174.948, -20.609],
//             [-174.918, -20.596],
//             [-174.888, -20.581],
//             [-174.859, -20.566],
//             [-174.83, -20.55],
//             [-174.802, -20.533],
//             [-174.775, -20.515],
//             [-174.748, -20.496],
//             [-174.722, -20.476],
//             [-174.697, -20.455],
//             [-174.672, -20.434],
//             [-174.649, -20.412],
//             [-174.626, -20.389],
//             [-174.604, -20.365],
//             [-174.583, -20.341],
//             [-174.563, -20.316],
//             [-174.544, -20.29],
//             [-174.526, -20.263],
//             [-174.508, -20.236],
//             [-174.492, -20.209],
//             [-174.477, -20.181],
//             [-174.463, -20.152],
//             [-174.45, -20.123],
//             [-174.438, -20.094],
//             [-174.427, -20.064],
//             [-174.417, -20.034],
//             [-174.409, -20.004],
//             [-174.401, -19.973],
//             [-174.395, -19.942],
//             [-174.389, -19.911],
//             [-174.385, -19.88],
//             [-174.382, -19.849],
//             [-174.381, -19.817],
//             [-174.38, -19.786]
//           ]
//           ]
//         }
//       },
//     ]
//   };

//   useEffect(() => {
//     try {
//       if (!mapRef.current) {
//         console.log('Initializing map...');
//         mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

//         mapRef.current = new mapboxgl.Map({
//           container: mapContainerRef.current,
//           style: 'mapbox://styles/mapbox/streets-v12',
//           center: [83, 21], // Centered on India
//           zoom: 4.5 // Adjusted zoom level to show all of India
//         });

//         // Create popup but don't add to map yet
//         popupRef.current = new mapboxgl.Popup({
//           closeButton: true,
//           closeOnClick: false
//         });

//         // Wait for map to load before adding data
//         mapRef.current.on('load', () => {
//           console.log('Map loaded, adding source and layers...');

//           // First check if source already exists
//           if (!mapRef.current.getSource('cyclone')) {
//             // Add the cyclone data source
//             mapRef.current.addSource('cyclone', {
//               type: 'geojson',
//               data: cycloneData
//             });
//             console.log('Source added');
//           }

//           // Check if layer exists before adding
//           if (!mapRef.current.getLayer('cyclone-area')) {
//             // Add the fill layer with color based on alert level
//             mapRef.current.addLayer({
//               id: 'cyclone-area',
//               type: 'fill',
//               source: 'cyclone',
//               paint: {
//                 'fill-color': [
//                   'match',
//                   ['get', 'alertlevel'],
//                   'Red', '#FF0000',
//                   'Orange', '#FFA500',
//                   'Yellow', '#FFFF00',
//                   '#FFA500' // default color
//                 ],
//                 'fill-opacity': 0.5
//               }
//             });
//             console.log('Fill layer added');

//             // Add the outline layer
//             mapRef.current.addLayer({
//               id: 'cyclone-outline',
//               type: 'line',
//               source: 'cyclone',
//               paint: {
//                 'line-color': '#000',
//                 'line-width': 2
//               }
//             });
//             console.log('Outline layer added');
//           }

//           // Add click handler
//           mapRef.current.on('click', 'cyclone-area', (e) => {
//             const coordinates = e.lngLat;
//             const properties = e.features[0].properties;
//             const severityData = JSON.parse(properties.severitydata);

//             const html = `
//               <div class="p-4 max-w-sm">
//                 <h3 class="text-lg font-bold mb-2">${properties.name}</h3>
//                 <div class="space-y-2">
//                   <p><strong>Alert Level:</strong> ${properties.alertlevel}</p>
//                   <p><strong>Location:</strong> ${properties.country}</p>
//                   <p><strong>Period:</strong><br/>
//                      From: ${new Date(properties.fromdate).toLocaleString()}<br/>
//                      To: ${new Date(properties.todate).toLocaleString()}</p>
//                   <p><strong>Severity:</strong> ${severityData.severitytext}</p>
//                 </div>
//               </div>
//             `;

//             popupRef.current
//               .setLngLat(coordinates)
//               .setHTML(html)
//               .addTo(mapRef.current);
//           });

//           // Add hover effects
//           mapRef.current.on('mouseenter', 'cyclone-area', () => {
//             mapRef.current.getCanvas().style.cursor = 'pointer';
//           });

//           mapRef.current.on('mouseleave', 'cyclone-area', () => {
//             mapRef.current.getCanvas().style.cursor = '';
//           });
//         });

//         // Add error handling
//         mapRef.current.on('error', (e) => {
//           console.error('Mapbox error:', e);
//           setError('An error occurred while loading the map.');
//         });
//       }
//     } catch (err) {
//       console.error('Error initializing map:', err);
//       setError('Failed to initialize the map.');
//     }

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, []);

//   const containerStyle = {
//     position: 'relative',
//     width: '100%',
//     height: '600px',
//     border: '1px solid #ccc'
//   };

//   return (
//     <div className="w-full">
//       {error && (
//         <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
//           {error}
//         </div>
//       )}
//       <div 
//         ref={mapContainerRef} 
//         style={containerStyle}
//         className="relative bg-gray-100"
//       />
//     </div>
//   );
// };

// export default MapboxCycloneTracker;




// ______________MUlti Polygon_______________

// import React, { useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';

// import 'mapbox-gl/dist/mapbox-gl.css';

// const droughtData = {
//   "type": "FeatureCollection",
//   "features": [
//     {
//       "type": "Feature",
//       "bbox": [29, 6, 34, 12],
//       "geometry": {
//         "type": "MultiPolygon",
//         "coordinates": [[
//           [
//             [32, 11],
//             [31, 11],
//             [31, 12],
//             [30, 12],
//             [30, 11],
//             [29, 11],
//             [29, 10],
//             [29, 9.668],
//             [29, 9],
//             [30, 9],
//             [30, 8],
//             [31, 8],
//             [31, 9],
//             [31, 9.749],
//             [31, 10],
//             [31.509, 10],
//             [32, 10],
//             [32, 10.656],
//             [32, 11]
//           ]
//         ],
//         [
//           [
//             [33, 8],
//             [32, 8],
//             [32, 7],
//             [33, 7],
//             [33, 7.936],
//             [33, 7.937],
//             [33, 8]
//           ]
//         ],
//         [
//           [
//             [34, 7],
//             [33, 7],
//             [33, 6],
//             [34, 6],
//             [34, 7]
//           ]
//         ]]
//       },
//       "properties": {
//         "eventtype": "DR",
//         "name": "Drought in Ethiopia, Sudan, South Sudan",
//         "alertlevel": "Green",
//         "country": "Ethiopia, Sudan, South Sudan"
//       }
//     }
//   ]
// };

// const MapboxExample = () => {
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef(null);
//   const popupRef = useRef(null);

//   useEffect(() => {
//     if (!mapboxgl.accessToken) {
//       mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
//     }

//     if (!mapboxgl.accessToken) {
//       console.error('Mapbox access token is missing!');
//       return;
//     }

//     if (mapRef.current) return;

//     // Initialize the map centered on the polygon area
//     mapRef.current = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/streets-v12',
//       center: [31.5, 9], // Center on Sudan region
//       zoom: 5
//     });

//     mapRef.current.on('load', () => {
//       console.log('Adding drought data source...');
      
//       // Add the drought data source
//       mapRef.current.addSource('drought-data', {
//         type: 'geojson',
//         data: droughtData
//       });

//       // Add fill layer for MultiPolygon
//       mapRef.current.addLayer({
//         id: 'drought-areas',
//         type: 'fill',
//         source: 'drought-data',
//         paint: {
//           'fill-color': '#4CAF50',
//           'fill-opacity': 0.3
//         }
//       });

//       // Add outline layer for MultiPolygon
//       mapRef.current.addLayer({
//         id: 'drought-outline',
//         type: 'line',
//         source: 'drought-data',
//         paint: {
//           'line-color': '#2E7D32',
//           'line-width': 2
//         }
//       });

//       // Add click events for polygon features
//       mapRef.current.on('click', 'drought-areas', (e) => {
//         if (!e.features[0].properties) return;

//         const coordinates = e.lngLat;
//         const properties = e.features[0].properties;

//         const popupContent = `
//           <div class="drought-popup">
//             <h3>${properties.name}</h3>
//             <p><strong>Alert Level:</strong> ${properties.alertlevel}</p>
//             <p><strong>Countries:</strong> ${properties.country}</p>
//           </div>
//         `;

//         if (!popupRef.current) {
//           popupRef.current = new mapboxgl.Popup({
//             closeButton: true,
//             closeOnClick: false
//           });
//         }

//         popupRef.current
//           .setLngLat(coordinates)
//           .setHTML(popupContent)
//           .addTo(mapRef.current);
//       });

//       // Change cursor on hover
//       mapRef.current.on('mouseenter', 'drought-areas', () => {
//         mapRef.current.getCanvas().style.cursor = 'pointer';
//       });

//       mapRef.current.on('mouseleave', 'drought-areas', () => {
//         mapRef.current.getCanvas().style.cursor = '';
//       });

//       // Add navigation control
//       mapRef.current.addControl(new mapboxgl.NavigationControl());
//     });

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, []);

//   return (
//     <div 
//       id="map" 
//       ref={mapContainerRef} 
//       style={{ 
//         height: '100vh',
//         width: '100%',
//         position: 'relative'
//       }} 
//     />
//   );
// };

// export default MapboxExample;

// ______________Multiple Geometry types_______________

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

// Dummy data with separated locations
const geographicData = {
  "type": "FeatureCollection",
  "features": [
    {
      // Point feature - Khartoum, Sudan
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [32.5355, 15.5915]
      },
      "properties": {
        "name": "Khartoum Monitoring Station",
        "type": "monitoring_point",
        "severity": "high",
        "description": "Central monitoring station for climate data"
      }
    },
    {
      // Another Point - Port Sudan
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [37.2164, 19.6158]
      },
      "properties": {
        "name": "Port Sudan Station",
        "type": "monitoring_point",
        "severity": "medium",
        "description": "Coastal monitoring station"
      }
    },
    {
      // Polygon feature - Darfur Region
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [23.5000, 12.5000],
          [23.5000, 14.5000],
          [25.5000, 14.5000],
          [25.5000, 12.5000],
          [23.5000, 12.5000]
        ]]
      },
      "properties": {
        "name": "Darfur Agricultural Zone",
        "type": "agricultural_zone",
        "severity": "medium",
        "description": "Agricultural monitoring region in Darfur"
      }
    },
    {
      // Another Polygon - Blue Nile State
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [33.5000, 10.5000],
          [33.5000, 12.5000],
          [35.5000, 12.5000],
          [35.5000, 10.5000],
          [33.5000, 10.5000]
        ]]
      },
      "properties": {
        "name": "Blue Nile Region",
        "type": "watershed",
        "severity": "high",
        "description": "Blue Nile watershed monitoring area"
      }
    },
    {
      // MultiPolygon feature - Ethiopian Border Regions
      "type": "Feature",
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [[ // Amhara Region
            [36.5000, 11.5000],
            [36.5000, 13.5000],
            [38.5000, 13.5000],
            [38.5000, 11.5000],
            [36.5000, 11.5000]
          ]],
          [[ // Tigray Region
            [38.5000, 13.5000],
            [38.5000, 14.5000],
            [40.5000, 14.5000],
            [40.5000, 13.5000],
            [38.5000, 13.5000]
          ]]
        ]
      },
      "properties": {
        "name": "Border Drought Regions",
        "type": "drought_zone",
        "severity": "critical",
        "description": "Multiple affected areas along Ethiopian border"
      }
    }
  ]
};

const MultiGeometryMap = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const popupRef = useRef(null);

  // Color mapping based on severity
  const getSeverityColor = (severity) => {
    const colors = {
      low: '#4CAF50',      // Green
      medium: '#FFA726',   // Orange
      high: '#EF5350',     // Red
      critical: '#B71C1C'  // Dark Red
    };
    return colors[severity] || '#4CAF50';
  };

  useEffect(() => {
    if (!mapboxgl.accessToken) {
      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    }

    if (!mapboxgl.accessToken) {
      console.error('Mapbox access token is missing!');
      return;
    }

    if (mapRef.current) return;

    // Initialize map with a center point that shows all features
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [32, 13], // Centered to show all features
      zoom: 4.5 // Zoomed out to show the whole region
    });

    mapRef.current.on('load', () => {
      // Add data source
      mapRef.current.addSource('geographic-data', {
        type: 'geojson',
        data: geographicData
      });

      // Points Layer
      mapRef.current.addLayer({
        id: 'point-layer',
        type: 'circle',
        source: 'geographic-data',
        filter: ['==', ['geometry-type'], 'Point'],
        paint: {
          'circle-radius': 8,
          'circle-color': ['get', 'color'],
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });

      // Add text labels for points
      mapRef.current.addLayer({
        id: 'point-labels',
        type: 'symbol',
        source: 'geographic-data',
        filter: ['==', ['geometry-type'], 'Point'],
        layout: {
          'text-field': ['get', 'name'],
          'text-offset': [0, 1.5],
          'text-anchor': 'top'
        },
        paint: {
          'text-color': '#000',
          'text-halo-color': '#fff',
          'text-halo-width': 1
        }
      });

      // Polygon Layer
      mapRef.current.addLayer({
        id: 'polygon-layer',
        type: 'fill',
        source: 'geographic-data',
        filter: ['==', ['geometry-type'], 'Polygon'],
        paint: {
          'fill-color': ['get', 'color'],
          'fill-opacity': 0.5
        }
      });

      // Polygon Outline
      mapRef.current.addLayer({
        id: 'polygon-outline',
        type: 'line',
        source: 'geographic-data',
        filter: ['==', ['geometry-type'], 'Polygon'],
        paint: {
          'line-color': ['get', 'color'],
          'line-width': 2
        }
      });

      // MultiPolygon Layer
      mapRef.current.addLayer({
        id: 'multipolygon-layer',
        type: 'fill',
        source: 'geographic-data',
        filter: ['==', ['geometry-type'], 'MultiPolygon'],
        paint: {
          'fill-color': ['get', 'color'],
          'fill-opacity': 0.5
        }
      });

      // MultiPolygon Outline
      mapRef.current.addLayer({
        id: 'multipolygon-outline',
        type: 'line',
        source: 'geographic-data',
        filter: ['==', ['geometry-type'], 'MultiPolygon'],
        paint: {
          'line-color': ['get', 'color'],
          'line-width': 2
        }
      });

      // Add popups for all layers
      const layerIds = ['point-layer', 'polygon-layer', 'multipolygon-layer'];
      
      layerIds.forEach(layerId => {
        mapRef.current.on('click', layerId, (e) => {
          if (!e.features[0].properties) return;

          const coordinates = e.lngLat;
          const properties = e.features[0].properties;

          const popupContent = `
            <div class="feature-popup">
              <h3>${properties.name}</h3>
              <p><strong>Type:</strong> ${properties.type}</p>
              <p><strong>Severity:</strong> ${properties.severity}</p>
              <p><strong>Description:</strong> ${properties.description}</p>
            </div>
          `;

          if (!popupRef.current) {
            popupRef.current = new mapboxgl.Popup({
              closeButton: true,
              closeOnClick: false
            });
          }

          popupRef.current
            .setLngLat(coordinates)
            .setHTML(popupContent)
            .addTo(mapRef.current);
        });

        // Hover effects
        mapRef.current.on('mouseenter', layerId, () => {
          mapRef.current.getCanvas().style.cursor = 'pointer';
        });

        mapRef.current.on('mouseleave', layerId, () => {
          mapRef.current.getCanvas().style.cursor = '';
        });
      });

      // Add navigation controls
      mapRef.current.addControl(new mapboxgl.NavigationControl());

      // Process features to add color property
      const processedData = {
        ...geographicData,
        features: geographicData.features.map(feature => ({
          ...feature,
          properties: {
            ...feature.properties,
            color: getSeverityColor(feature.properties.severity)
          }
        }))
      };

      // Update the source with processed data
      mapRef.current.getSource('geographic-data').setData(processedData);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      id="map" 
      ref={mapContainerRef} 
      style={{ 
        height: '600px',
        width: '100%',
        position: 'relative'
      }} 
    />
  );
};

export default MultiGeometryMap;



